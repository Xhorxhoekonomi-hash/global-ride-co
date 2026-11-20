# Korea USD currency: temporary confirmed customer, USD 10000, Albania RoRo Sedan -> total EUR 10,950 at 390/1440 EN+SQ. User deleted afterwards.
import asyncio,os,re,secrets,uuid,requests
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/korea-usd');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ['SUPABASE_URL'];KEY=os.environ['SUPABASE_SERVICE_ROLE_KEY'];HEAD={'apikey':KEY,'Authorization':'Bearer '+KEY}
L='http://localhost:8080'
async def main():
 uid=None
 try:
  email='info+e2e-'+uuid.uuid4().hex[:10]+'@alphaworldwidealbania.com';pw=secrets.token_urlsafe(18)
  r=requests.post(BASE+'/auth/v1/admin/users',headers=HEAD,timeout=30,json={'email':email,'password':pw,'email_confirm':True,'user_metadata':{'full_name':'E2E Korea USD'}});r.raise_for_status();uid=r.json()['id']
  async with async_playwright() as p:
   b=await p.chromium.launch();first=True
   for sq in [False,True]:
    for w,h in [(390,844),(1440,900)]:
     ctx=await b.new_context(viewport={'width':w,'height':h},reduced_motion='reduce');page=await ctx.new_page()
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
     await expect(page.get_by_text(re.compile('≈ €9,200 · ≈ ₩13,340,000'))).to_be_visible()
     await page.get_by_role('button',name=re.compile('AL ')).first.click()
     await page.get_by_role('button',name=re.compile('RoRo')).first.click()
     if first:
      cp=page.locator('[data-complete-profile]')
      await cp.wait_for(timeout=20000)
      if True:
       await cp.get_by_label(re.compile('Phone|Telefon')).fill('+355692233416');await cp.locator('input[type=checkbox][required]').check();await cp.get_by_role('button').last.click()
      first=False
     try: await expect(page.get_by_text('€10,950').first).to_be_visible(timeout=20000)
     except Exception:
      await page.screenshot(path=str(OUT/'debug.png'));print('URL',page.url,await page.locator('main').inner_text());raise
     await expect(page.get_by_text('$10,000 (≈ €9,200)').first).to_be_visible()
     await page.get_by_text('€10,950').first.scroll_into_view_if_needed()
     await page.screenshot(path=str(OUT/f"{'sq' if sq else 'en'}-{w}.png"));print('PASS',('SQ' if sq else 'EN'),w)
     await ctx.close()
   await b.close()
  q=requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid+'&tab=eq.korea&select=inputs,total,currency',headers=HEAD,timeout=30).json();print('saved quotes',q[:2])
 finally:
  if uid:
   requests.delete(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30)
   requests.delete(BASE+'/rest/v1/profiles?id=eq.'+uid,headers=HEAD,timeout=30)
   requests.delete(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30).raise_for_status()
   print('cleanup profiles left',requests.get(BASE+'/rest/v1/profiles?id=eq.'+uid,headers=HEAD,timeout=30).json(),'quotes left',requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30).json())
asyncio.run(main())
