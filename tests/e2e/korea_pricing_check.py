import asyncio, json, re
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from playwright.async_api import async_playwright, expect

OUT = Path('/tmp/browser/korea-pricing')
OUT.mkdir(parents=True, exist_ok=True)

async def main():
    results=[]; errors=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        for width,height in [(390,844),(1440,900)]:
            for locale,path in [('en','/calculator'),('sq','/al/kalkulator-transporti')]:
                context=await browser.new_context(viewport={'width':width,'height':height}, reduced_motion='reduce')
                page=await context.new_page()
                page.on('pageerror',lambda e: errors.append(str(e)))
                page.on('console',lambda m: errors.append(m.text) if m.type=='error' else None)
                await page.goto('http://localhost:8080'+path, wait_until='domcontentloaded')
                tabname='South Korea — Encar' if locale=='en' else 'Koreja e Jugut — Encar'
                tab=page.get_by_role('tab',name=tabname,exact=True)
                await expect(page.locator('html')).to_have_attribute('lang',locale)
                await expect(tab).to_be_visible()
                await tab.evaluate("el => new Promise(resolve => { const check = () => Object.keys(el).some(k => k.startsWith('__reactFiber')) ? resolve(true) : requestAnimationFrame(check); check(); })")
                await tab.click()
                await expect(tab).to_have_attribute('aria-selected','true')
                panel=page.get_by_role('tabpanel',name=tabname,exact=True)
                types=['Sedan/Coupe','SUV/Minivan','Oversized'] if locale=='en' else ['Sedan/Kupe','SUV/Minivan','I mbi-madhësuar']
                methodtitle='Shipping method' if locale=='en' else 'Metoda e transportit'
                methodgroup=panel.get_by_role('group',name=re.compile(methodtitle))
                dests=['Albania','Germany','Netherlands'] if locale=='en' else ['Shqipëri','Gjermani','Holandë']
                totalname='Estimated Total' if locale=='en' else 'Totali i përllogaritur'
                wa_name='Request This Quote on WhatsApp' if locale=='en' else 'Kërko këtë ofertë në WhatsApp'
                await panel.get_by_role('button',name=types[0],exact=True).click()
                await panel.get_by_role('button',name='€ EUR',exact=True).click()
                await panel.get_by_role('spinbutton').fill('10000')
                await expect(panel.get_by_role('button',name=re.compile(dests[0]))).to_be_visible()
                # Capture WhatsApp without leaving the app or sending a message.
                await page.evaluate('window.__wa=[]; window.open=(url)=>{window.__wa.push(url); return null;}')
                for ti,t in enumerate(types):
                    await panel.get_by_role('button',name=t,exact=True).click()
                    for di,d in enumerate(dests):
                        await panel.get_by_role('button',name=re.compile(d)).click()
                        if di==0:
                            await expect(methodgroup).to_be_visible()
                            await expect(panel.get_by_text(totalname,exact=True)).to_have_count(0)
                            for method,ship in [('roro',[1750,1850,1950][ti]),('container',1090)]:
                                label='RoRo' if method=='roro' else ('Container' if locale=='en' else 'Kontenier')
                                option=methodgroup.get_by_role('button',name=re.compile('^'+label+r'\b'))
                                await expect(option).to_contain_text(f'{ship:,} EUR')
                                if ti==0 and method=='roro':
                                    await methodgroup.scroll_into_view_if_needed()
                                    await methodgroup.screenshot(path=str(OUT/f'{locale}-{width}-step4.png'))
                                await option.click()
                                await expect(option).to_have_attribute('aria-pressed','true')
                                await expect(panel.get_by_text(f'€{10000+ship:,}',exact=True)).to_be_visible()
                                heading=f'Fixed shipping — {label} to {d}' if locale=='en' else f'Transport i fiksuar — {label} drejt {d}'
                                await expect(panel.get_by_text(heading,exact=True)).to_have_count(2)
                                freight='RoRo ocean freight' if locale=='en' and method=='roro' else 'Shared container ocean freight (4 cars per container)' if locale=='en' else 'Transport detar me RoRo' if method=='roro' else 'Transport detar me kontenier të përbashkët (4 makina për kontenier)'
                                await expect(panel.get_by_text(freight,exact=True)).to_be_visible()
                                await panel.get_by_role('button',name=wa_name,exact=True).click()
                                message=parse_qs(urlparse(await page.evaluate('window.__wa.at(-1)')).query)['text'][0]
                                assert ('Shipping method: ' if locale=='en' else 'Metoda e transportit: ')+('RoRo' if method=='roro' else 'Container') in message
                                assert f'€{ship:,}' in message and f'€{10000+ship:,}' in message
                                results.append({'locale':locale,'width':width,'destination':d,'type':t,'method':method,'shipping':ship,'total':10000+ship,'whatsapp':'pass'})
                                if ti==0:
                                    result=panel.locator('div.lg\\:sticky > div')
                                    await result.evaluate("el => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 100)")
                                    await result.screenshot(path=str(OUT/f'{locale}-{width}-{method}-result.png'))
                        else:
                            await expect(methodgroup).to_have_count(0)
                            await expect(panel.get_by_text('€11,000',exact=True)).to_be_visible()
                            await panel.get_by_role('button',name=wa_name,exact=True).click()
                            message=parse_qs(urlparse(await page.evaluate('window.__wa.at(-1)')).query)['text'][0]
                            assert ('Shipping method: RoRo' if locale=='en' else 'Metoda e transportit: RoRo') in message
                            assert '€1,000' in message and '€11,000' in message
                            results.append({'locale':locale,'width':width,'destination':d,'type':t,'method':'roro','shipping':1000,'total':11000,'whatsapp':'pass'})
                    # Returning to Albania must require choosing again.
                    await panel.get_by_role('button',name=re.compile(dests[0])).click()
                    await expect(methodgroup).to_be_visible()
                    for button in await methodgroup.get_by_role('button').all():
                        await expect(button).to_have_attribute('aria-pressed','false')
                    await expect(panel.get_by_text(totalname,exact=True)).to_have_count(0)
                    await panel.get_by_role('button',name=re.compile(dests[1])).click()
                assert await page.locator('body').evaluate('(el)=>el.scrollWidth <= window.innerWidth')
                await context.close()
        await browser.close()
    (OUT/'results.json').write_text(json.dumps({'cases':results,'errors':errors},indent=2))
    assert not errors, errors
    print(f'PASS: {len(results)} price/total/WhatsApp cases; both languages and viewports; reset and availability checks; zero console/page errors.')

asyncio.run(main())
