import asyncio,re
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/customer-accounts');OUT.mkdir(parents=True,exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch()
  for width,height in [(390,844),(1440,900)]:
   for sq in [False,True]:
    context=await browser.new_context(viewport={'width':width,'height':height},reduced_motion='reduce')
    page=await context.new_page();page.on('pageerror',lambda e:print('PAGEERROR',e))
    await page.goto('http://localhost:8080'+('/al/kalkulator-transporti' if sq else '/calculator'))
    await expect(page.locator('html')).to_have_attribute('data-customer-ready','true')
    await expect(page.get_by_role('button',name=re.compile('e.g. Houston|p.sh. Houston'))).to_be_visible()
    await page.get_by_role('button',name=re.compile('e.g. Houston|p.sh. Houston')).click()
    try: await expect(page.get_by_role('combobox')).to_be_visible(timeout=1500)
    except AssertionError:
     print(await page.locator('body').aria_snapshot())
     await page.get_by_role('button',name=re.compile('e.g. Houston|p.sh. Houston')).click()
     await expect(page.get_by_role('combobox')).to_be_visible()
    await page.get_by_role('combobox').fill('MANHEIM HOUSTON')
    await page.get_by_role('option',name=re.compile('MANHEIM HOUSTON')).click()
    await page.get_by_role('button',name=re.compile('^Sedan')).click()
    await page.get_by_role('spinbutton').fill('10000')
    await page.get_by_role('button',name=re.compile('AL Albania|AL Shqipëri')).click()
    lock=page.locator('[data-calculator-locked]')
    await expect(lock).to_be_visible()
    await expect(lock).not_to_contain_text(re.compile(r'\$|€|345|12,'))
    await lock.scroll_into_view_if_needed()
    await page.screenshot(path=str(OUT/f'{width}-{sq}-locked.png'))
    await lock.get_by_role('link',name=re.compile('Create free|Krijo llogari')).click()
    print('after signup link',page.url,await page.locator('body').aria_snapshot())
    await expect(page.get_by_role('heading',name=re.compile('Create free|Krijo llogari'))).to_be_visible()
    await page.screenshot(path=str(OUT/f'{width}-{sq}-signup.png'))
    print('PASS locked and signup',width,sq)
    await context.close()
  await browser.close()
asyncio.run(main())
