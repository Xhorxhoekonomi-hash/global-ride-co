"""Regression: mobile menu sheet must open full-height in both header states.
Run: python3 tests/e2e/mobile_menu_check.py [base_url]  (dev server on :8080)"""
import asyncio, sys, re
from pathlib import Path
from playwright.async_api import async_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
SHOTS = Path("/tmp/browser/menu"); SHOTS.mkdir(parents=True, exist_ok=True)
SIZES = [(375, 667), (390, 844), (430, 932)]
PAGES = ["/", "/al", "/how-it-works", "/import-usa"]

async def check(page, w, h, path, scroll):
    await page.goto(BASE + path, wait_until="domcontentloaded")
    btn = page.locator("button.header-menu-button")
    await expect(btn).to_be_visible()
    await page.wait_for_function("document.documentElement.classList.contains('motion-ok') || document.readyState==='complete'")
    if scroll: await page.mouse.wheel(0, 600); await page.wait_for_function("scrollY>=500")
    sheet = page.locator("#mobile-navigation")
    for _ in range(5):
        if await btn.get_attribute("aria-expanded") == "true": break
        await btn.click()
        try: await expect(btn).to_have_attribute("aria-expanded", "true", timeout=1500)
        except AssertionError: pass
    await expect(sheet).to_be_visible()
    box = await sheet.bounding_box()
    parent = await sheet.evaluate("e => e.parentElement.tagName")
    assert parent == "BODY", parent
    assert box["height"] > min(500, h - 120), (path, w, scroll, box)
    hidden = await page.evaluate("""() => [...document.querySelectorAll('.sticky-action-bar,.whatsapp-float')].every(e => getComputedStyle(e).visibility==='hidden' || getComputedStyle(e).display==='none')""")
    assert hidden, "sticky bar / WhatsApp still visible"
    link = sheet.locator("a.mobile-sheet-link, button.mobile-sheet-link").first
    await expect(link).to_be_visible(); await expect(link).to_be_in_viewport()
    await page.screenshot(path=str(SHOTS / f"{w}{path.replace('/','_') or '_'}_{'scrolled' if scroll else 'top'}.png"))
    target = sheet.locator("a.mobile-sheet-link").first
    href = await target.get_attribute("href")
    await target.click()
    await expect(page).to_have_url(re.compile(re.escape(href) + "$"))
    await expect(sheet).to_have_count(0)
    print("ok", w, h, path, "scrolled" if scroll else "top", int(box["height"]))

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        for w, h in SIZES:
            ctx = await b.new_context(viewport={"width": w, "height": h}, has_touch=True, is_mobile=True)
            page = await ctx.new_page()
            for path in PAGES:
                for scroll in (False, True):
                    await check(page, w, h, path, scroll)
            await ctx.close()
        await b.close()
asyncio.run(main())
