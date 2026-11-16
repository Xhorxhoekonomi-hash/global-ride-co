# Copart/IAAI addition: search finds new yards at 390/1440 (580 options); signed-in temporary customer sees
# LAS VEGAS WEST (NV) via Los Angeles $485 and IAAI HOUSTON SOUTH via Houston $345. Test user deleted afterwards.
import asyncio,os,re,secrets,uuid,time,requests
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/copart-iaai');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ['SUPABASE_URL'];KEY=os.environ['SUPABASE_SERVICE_ROLE_KEY'];HEAD={'apikey':KEY,'Authorization':'Bearer '+KEY}
L='http://localhost:8080'
async def open_picker(page):
 await page.get_by_role('button',name=re.compile('e.g. Houston')).click();return page.get_by_role('combobox')
async def main():
 uid=None
 try:
  async with async_playwright() as p:
   b=await p.chromium.launch()
   for w,h in [(390,844),(1440,900)]:
    page=await (await b.new_context(viewport={'width':w,'height':h})).new_page()
    await page.goto(L+'/calculator');await expect(page.locator('html')).to_have_attribute('data-customer-ready','true',timeout=60000)
    box=await open_picker(page);opts=page.get_by_role('option');await expect(opts).to_have_count(580)
    lst=page.locator('[cmdk-list]');await lst.evaluate('e=>e.scrollTop=e.scrollHeight');assert await lst.evaluate('e=>e.scrollTop')>1000
    for q,expect_name in [('iaai','IAAI HOUSTON SOUTH'),('crashedtoys',None),('Vallejo','VALLEJO (CA)'),('Hawley','IAAI ABILENE'),(' NV','LAS VEGAS WEST (NV)')]:
     t=time.time();await box.fill(q.strip());n=await opts.count();assert n>0,q
     if expect_name: await expect(page.get_by_role('option',name=re.compile(re.escape(expect_name)))).to_have_count(1)
     print(w,q,'results',n,'ms',int((time.time()-t)*1000))
    await page.screenshot(path=str(OUT/f'{w}-search.png'))
   email='info+e2e-'+uuid.uuid4().hex[:10]+'@alphaworldwidealbania.com';pw=secrets.token_urlsafe(18)
   r=requests.post(BASE+'/auth/v1/admin/users',headers=HEAD,timeout=30,json={'email':email,'password':pw,'email_confirm':True,'user_metadata':{'full_name':'E2E Locations'}});r.raise_for_status();uid=r.json()['id']
   page=await (await b.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')).new_page()
   await page.goto(L+'/account/sign-in');await expect(page.locator('html')).to_have_attribute('data-customer-ready','true',timeout=60000)
   await page.get_by_label('Email',exact=True).fill(email);await page.get_by_label(re.compile('Password')).fill(pw);await page.get_by_role('button',name='Sign in',exact=True).click()
   await page.wait_for_url(re.compile('/calculator|/account'));await page.goto(L+'/calculator');await expect(page.locator('html')).to_have_attribute('data-customer-ready','true',timeout=60000)
   box=await open_picker(page);await box.fill('LAS VEGAS WEST');await page.get_by_role('option',name=re.compile('LAS VEGAS WEST')).click()
   await page.get_by_role('button',name=re.compile('^Sedan')).click();await page.get_by_role('spinbutton').fill('10000');await page.get_by_role('button',name=re.compile('AL Albania')).click()
   cp=page.locator('[data-complete-profile]');await expect(cp).to_be_visible(timeout=20000);await cp.get_by_label(re.compile('Phone')).fill('+355692233416');await cp.locator('input[type=checkbox][required]').check();await cp.get_by_role('button',name='Save and see price').click()
   await expect(page.get_by_text('LAS VEGAS WEST (NV) → Los Angeles, CA')).to_be_visible(timeout=20000);await expect(page.get_by_text('$485',exact=True).first).to_be_visible();await page.screenshot(path=str(OUT/'lasvegas.png'));print('PASS LAS VEGAS WEST via LA $485')
   await page.get_by_role('button',name=re.compile('LAS VEGAS WEST')).first.click();box=page.get_by_role('combobox');await box.fill('IAAI HOUSTON SOUTH');await page.get_by_role('option',name=re.compile('IAAI HOUSTON SOUTH')).click()
   await expect(page.get_by_text('IAAI HOUSTON SOUTH → Houston, TX')).to_be_visible(timeout=20000);await expect(page.get_by_text('$345',exact=True).first).to_be_visible();await page.screenshot(path=str(OUT/'houston-south.png'));print('PASS IAAI HOUSTON SOUTH via Houston $345')
   await b.close()
 finally:
  if uid:
   requests.delete(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30).raise_for_status()
   print('cleanup profiles left',requests.get(BASE+'/rest/v1/profiles?id=eq.'+uid,headers=HEAD,timeout=30).json(),'quotes left',requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30).json())
asyncio.run(main())
