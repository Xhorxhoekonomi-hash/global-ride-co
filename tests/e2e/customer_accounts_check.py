import asyncio,json,os,re,secrets,uuid,requests
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/customer-accounts');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ['SUPABASE_URL'];KEY=os.environ['SUPABASE_SERVICE_ROLE_KEY'];PUB=os.environ['VITE_SUPABASE_PUBLISHABLE_KEY']
HEAD={'apikey':KEY,'Authorization':'Bearer '+KEY}
async def main():
 created=[]
 try:
  async with async_playwright() as p:
   browser=await p.chromium.launch()
   for sq in [False,True]:
    email='alpha-account-check-'+uuid.uuid4().hex+'@example.com';password=secrets.token_urlsafe(24)
    r=requests.post(BASE+'/auth/v1/admin/users',headers=HEAD,timeout=30,json={'email':email,'password':password,'email_confirm':False,'user_metadata':{'customer_account':True,'full_name':'Account Verification','phone':'+355692233416','country':'Albania','locale':'sq' if sq else 'en','privacy_accepted':True,'marketing_consent':False}})
    if r.status_code>=400: raise RuntimeError('Test account creation failed '+str(r.status_code))
    uid=r.json()['id'];created.append(uid)
    for w,h in [(390,844),(1440,900)]:
     context=await browser.new_context(viewport={'width':w,'height':h},reduced_motion='reduce');page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
     cp='/al/kalkulator-transporti' if sq else '/calculator';signin='/al/llogaria/hyr' if sq else '/account/sign-in'
     await page.goto('http://localhost:8080'+cp);await expect(page.locator('html')).to_have_attribute('data-customer-ready','true')
     await page.get_by_role('button',name=re.compile('e.g. Houston|p.sh. Houston')).click();await page.get_by_role('combobox').fill('MANHEIM HOUSTON');await page.get_by_role('option',name=re.compile('MANHEIM HOUSTON')).click();await page.get_by_role('button',name=re.compile('^Sedan')).click();await page.get_by_role('spinbutton').fill('10000');await page.get_by_role('button',name=re.compile('AL Albania|AL Shqipëri')).click();await expect(page.locator('[data-calculator-locked]')).to_be_visible()
     if w==390:
      r=requests.put(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30,json={'email_confirm':True});r.raise_for_status()
     await page.locator('[data-calculator-locked]').get_by_role('link',name='Hyr' if sq else 'Sign in',exact=True).click();await expect(page.get_by_role('heading',name='Hyr' if sq else 'Sign in',exact=True)).to_be_visible()
     await page.get_by_label('Email',exact=True).fill(email);await page.get_by_label(re.compile('Password|Fjalëkalimi')).fill(password);await page.get_by_role('button',name='Hyr' if sq else 'Sign in',exact=True).click()
     await expect(page.get_by_role('spinbutton')).to_have_value('10000');await expect(page.get_by_text('$345',exact=True)).to_have_count(2,timeout=15000)
     await expect(page.locator('[data-calculator-locked]')).to_have_count(0)
     await page.get_by_text('MANHEIM HOUSTON → Houston, TX',exact=True).scroll_into_view_if_needed();await page.screenshot(path=str(OUT/f'{w}-{sq}-unlocked.png'))
     await page.goto('http://localhost:8080'+('/al/llogaria' if sq else '/account'));await expect(page.get_by_label('Emri i plotë' if sq else 'Full name')).to_have_value('Account Verification');await page.screenshot(path=str(OUT/f'{w}-{sq}-account.png'))
     await page.get_by_label('Emri i plotë' if sq else 'Full name').fill('Account Verification Updated');await page.get_by_role('button',name='Ruaj ndryshimet' if sq else 'Save changes').click();await expect(page.get_by_role('status')).to_be_visible();await page.reload();await expect(page.get_by_label('Emri i plotë' if sq else 'Full name')).to_have_value('Account Verification Updated')
     await page.get_by_label(re.compile('Email me occasional|Më dërgoni')).check();await page.get_by_role('button',name='Ruaj ndryshimet' if sq else 'Save changes').click();await expect(page.get_by_role('status')).to_be_visible();await page.reload();await expect(page.get_by_label(re.compile('Email me occasional|Më dërgoni'))).to_be_checked()
     await page.goto('http://localhost:8080/admin/customers');await expect(page).to_have_url(re.compile('/account$'))
     # Reset name for next size.
     await page.get_by_label('Full name').fill('Account Verification');await page.get_by_role('button',name='Save changes').click();await expect(page.get_by_role('status')).to_be_visible()
     print('PASS customer unlock restore profile save and staff refusal',w,sq,'errors',errors)
     await context.close()
   # staff sees created customers and their saved quotes
   with open(os.path.expanduser('~/.cache/lovable-auth/session.json')) as f:a=json.load(f)
   context=await browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce');page=await context.new_page();await page.goto('http://localhost:8080');await page.evaluate('([k,v])=>localStorage.setItem(k,v)',[a['storage_key'],json.dumps(a['session'])]);await page.goto('http://localhost:8080/admin/customers');await expect(page.get_by_role('heading',name='Customer accounts')).to_be_visible();await expect(page.get_by_role('button',name=re.compile('Account Verification'))).to_have_count(2);await page.screenshot(path=str(OUT/'staff-populated.png'));print('PASS staff populated list');
   async with page.expect_download() as d:
    await page.get_by_role('button',name='Export CSV',exact=True).click()
   download=await d.value;await download.save_as(str(OUT/'customers-test.csv'));assert 'Account Verification' in (OUT/'customers-test.csv').read_text();print('PASS actual CSV download')
   for uid in created:
    rows=requests.get(BASE+'/rest/v1/calculator_quotes?user_id=eq.'+uid,headers=HEAD,timeout=30).json();print('quote rows for repeated identical inputs',len(rows));assert len(rows)==1
   await browser.close()
 finally:
  for uid in created:
   r=requests.delete(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30)
   if r.status_code>=400:raise RuntimeError('Test cleanup failed')
  print('Temporary customers cleaned up',len(created))
asyncio.run(main())
