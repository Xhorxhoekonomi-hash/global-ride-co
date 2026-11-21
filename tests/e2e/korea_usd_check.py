# Daily FX: signed-in Korea/USA use seeded rates and their date at 390/1440 EN+SQ; temporary customer deleted afterwards.
import asyncio,os,re,secrets,uuid,requests
from datetime import date
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/korea-usd');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ['SUPABASE_URL'];KEY=os.environ['SUPABASE_SERVICE_ROLE_KEY'];HEAD={'apikey':KEY,'Authorization':'Bearer '+KEY}
L='http://localhost:8080'
async def main():
 uid=None
 try:
  rates_response=requests.get(L+'/api/public/calculator-fx',timeout=30);rates_response.raise_for_status();rates=rates_response.json()
  assert not rates['usdEur']['fallback'] and not rates['eurKrw']['fallback']
  usd_rate=rates['usdEur']['rate'];krw_rate=rates['eurKrw']['rate'];total=10000*usd_rate+1750
  fmt=lambda v:f'{int(v+0.5):,}'
  price_eur=fmt(10000*usd_rate);total_label='€'+fmt(total)
  reference=date.fromisoformat(rates['usdEur']['date']);en_date=reference.strftime('%-d %b %Y')
  months=['janar','shkurt','mars','prill','maj','qershor','korrik','gusht','shtator','tetor','nëntor','dhjetor'];sq_date=f'{reference.day} {months[reference.month-1]} {reference.year}'
  email='info+e2e-'+uuid.uuid4().hex[:10]+'@alphaworldwidealbania.com';pw=secrets.token_urlsafe(18)
  r=requests.post(BASE+'/auth/v1/admin/users',headers=HEAD,timeout=30,json={'email':email,'password':pw,'email_confirm':True,'user_metadata':{'full_name':'E2E Korea USD'}});r.raise_for_status();uid=r.json()['id']
  async with async_playwright() as p:
   b=await p.chromium.launch();first=True
   for sq in [False,True]:
    for w,h in [(390,844),(1440,900)]:
     ctx=await b.new_context(viewport={'width':w,'height':h},reduced_motion='reduce');page=await ctx.new_page();errors=[]
     page.on('pageerror',lambda e:errors.append(str(e)))
     await page.goto(L+'/account/sign-in');await expect(page.locator('html')).to_have_attribute('data-customer-ready','true',timeout=60000)
     await page.get_by_label('Email',exact=True).fill(email);await page.get_by_label(re.compile('Password')).fill(pw);await page.get_by_role('button',name='Sign in',exact=True).click()
     await page.wait_for_url(lambda u: 'sign-in' not in u,timeout=30000)
     await page.goto(L+('/al/kalkulator-transporti' if sq else '/calculator'));await expect(page.locator('html')).to_have_attribute('data-customer-ready','true',timeout=60000)
     await page.get_by_role('tab',name=re.compile('Kore')).first.click()
     if first:
      cp=page.locator('[data-complete-profile]')
     await page.get_by_role('button',name=re.compile('^Sedan')).first.click()
     usd=page.get_by_role('button',name='$ USD');await usd.click();await expect(usd).to_have_attribute('aria-pressed','true')
     bx=await usd.bounding_box();assert bx['height']>=47.5,bx
     await page.get_by_role('spinbutton').fill('10000')
     await expect(page.get_by_text(re.compile(re.escape(f'≈ €{price_eur} · ≈ ₩{fmt(10000*usd_rate*krw_rate)}')))).to_be_visible()
     await page.get_by_role('button',name=re.compile('AL ')).first.click()
     await page.get_by_role('button',name=re.compile('RoRo')).first.click()
     if first:
      cp=page.locator('[data-complete-profile]')
      await cp.wait_for(timeout=20000)
      if True:
       await cp.get_by_label(re.compile('Phone|Telefon')).fill('+355692233416');await cp.locator('input[type=checkbox][required]').check();await cp.get_by_role('button').last.click()
      first=False
     try: await expect(page.get_by_text(total_label).first).to_be_visible(timeout=20000)
     except Exception:
      await page.screenshot(path=str(OUT/'debug.png'));print('URL',page.url,await page.locator('main').inner_text());raise
     await expect(page.get_by_text(f'$10,000 (≈ €{price_eur})').first).to_be_visible()
     await page.get_by_text(total_label).first.scroll_into_view_if_needed()
     await page.screenshot(path=str(OUT/f"{'sq' if sq else 'en'}-{w}.png"));print('PASS USD',('SQ' if sq else 'EN'),w)
     await page.get_by_role('button',name='₩ KRW').click()
     await page.get_by_role('spinbutton').fill(str(krw_rate*10000))
     helper=page.get_by_text(re.compile(r'≈ €10,000 · ≈ \$'))
     await expect(helper).to_be_visible()
     krw_display=f'{krw_rate:,.2f}'.rstrip('0').rstrip('.')
     if sq:krw_display=krw_display.replace(',','_').replace('.',',').replace('_','.')
     await expect(helper).to_contain_text('₩'+krw_display+' = €1')
     await expect(helper).to_contain_text(sq_date if sq else en_date)
     await helper.scroll_into_view_if_needed()
     await page.screenshot(path=str(OUT/f"{'sq' if sq else 'en'}-{w}-krw.png"));print('PASS KRW',('SQ' if sq else 'EN'),w)
     await page.get_by_role('tab',name=re.compile('Copart')).click()
     await page.get_by_role('button',name=re.compile('Houston TX')).click()
     await page.get_by_role('combobox').fill('IAAI HOUSTON SOUTH')
     await page.get_by_role('option',name=re.compile('IAAI HOUSTON SOUTH')).click()
     await page.get_by_role('button',name=re.compile('^Sedan')).first.click()
     await page.get_by_role('spinbutton').fill('10000')
     await page.get_by_role('button',name=re.compile('AL ')).first.click()
     note=page.get_by_text(re.compile(r'\* USD→EUR'))
     await expect(note).to_be_visible(timeout=20000)
     await expect(note).to_contain_text(sq_date if sq else en_date)
     await expect(note).to_contain_text(str(usd_rate).replace('.',',') if sq else str(usd_rate))
     await expect(note).to_contain_text('European Central Bank (via Frankfurter)')
     await note.scroll_into_view_if_needed()
     await page.screenshot(path=str(OUT/f"{'sq' if sq else 'en'}-{w}-usa.png"));print('PASS USA NOTE',('SQ' if sq else 'EN'),w,await note.inner_text())
     assert not errors,errors
     await ctx.close()
   await b.close()
  q=requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid+'&tab=eq.korea&select=inputs,total,currency,result',headers=HEAD,timeout=30).json()
  assert any(v['inputs']['currency']=='USD' and v['inputs']['price']==10000 and abs(v['total']-total)<0.01 for v in q)
  assert any(v['result']['fxRates']['usdEur']['rate']==usd_rate and v['result']['fxRates']['eurKrw']['rate']==krw_rate for v in q)
  print('Saved USD quote total verified:',total,'using rate',usd_rate)
 finally:
  if uid:
   requests.delete(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30)
   requests.delete(BASE+'/rest/v1/profiles?id=eq.'+uid,headers=HEAD,timeout=30)
   requests.delete(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30).raise_for_status()
   profiles=requests.get(BASE+'/rest/v1/profiles?id=eq.'+uid,headers=HEAD,timeout=30);profiles.raise_for_status()
   quotes=requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30);quotes.raise_for_status()
   assert profiles.json()==[] and quotes.json()==[]
   print('Cleanup verified: 0 profiles, 0 quotes; test auth user deleted')
asyncio.run(main())
