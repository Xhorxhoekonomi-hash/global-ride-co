# End-to-end: real UI sign-up -> confirm (admin API, test env only) -> restored unlocked result -> staff list -> customer refused;
# simulated Google-style user (no customer metadata) -> complete-profile step -> unlocked; staff cannot create a profile;
# Google button starts the OAuth redirect. All temporary users are deleted afterwards.
import asyncio,json,os,re,secrets,uuid,requests
from pathlib import Path
from playwright.async_api import async_playwright,expect
OUT=Path('/tmp/browser/google-accounts');OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ['SUPABASE_URL'];KEY=os.environ['SUPABASE_SERVICE_ROLE_KEY']
HEAD={'apikey':KEY,'Authorization':'Bearer '+KEY}
L='http://localhost:8080'
async def fill_calc(page,sq):
 await page.goto(L+('/al/kalkulator-transporti' if sq else '/calculator'));await expect(page.locator('html')).to_have_attribute('data-customer-ready','true')
 await page.get_by_role('button',name=re.compile('e.g. Houston|p.sh. Houston')).click();await page.get_by_role('combobox').fill('MANHEIM HOUSTON');await page.get_by_role('option',name=re.compile('MANHEIM HOUSTON')).click();await page.get_by_role('button',name=re.compile('^Sedan')).click();await page.get_by_role('spinbutton').fill('10000');await page.get_by_role('button',name=re.compile('AL Albania|AL Shqipëri')).click()
async def unlocked(page):
 await expect(page.get_by_role('spinbutton')).to_have_value('10000');await expect(page.get_by_text('$345',exact=True)).to_have_count(2,timeout=20000);await expect(page.locator('[data-calculator-locked]')).to_have_count(0)
def profile(email): return requests.get(BASE+'/rest/v1/profiles?email=eq.'+requests.utils.quote(email),headers=HEAD,timeout=30).json()
async def main():
 created=[]
 try:
  async with async_playwright() as p:
   browser=await p.chromium.launch()
   for sq,(w,h) in [(False,(390,844)),(True,(1440,900))]:
    ctx=await browser.new_context(viewport={'width':w,'height':h},reduced_motion='reduce');page=await ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    email='alpha-e2e-'+uuid.uuid4().hex[:12]+'@example.com';pw=secrets.token_urlsafe(18)
    await fill_calc(page,sq);await expect(page.locator('[data-calculator-locked]')).to_be_visible();assert '$' not in await page.locator('[data-calculator-locked]').inner_text()
    await page.locator('[data-calculator-locked]').get_by_role('link',name='Krijo llogari falas' if sq else 'Create free account').click()
    await expect(page.get_by_role('button',name='Vazhdo me Google' if sq else 'Continue with Google')).to_be_visible()
    sel=page.get_by_label('Shteti' if sq else 'Country');await expect(sel.locator('option:checked')).to_have_text('Shqipëri' if sq else 'Albania')
    await page.screenshot(path=str(OUT/f'{w}-{sq}-signup.png'))
    await page.get_by_label('Emri i plotë' if sq else 'Full name').fill('E2E Verification');await page.get_by_label('Email',exact=True).fill(email);await page.get_by_label(re.compile('Telefon|Phone')).fill('+355692233416');await page.get_by_label(re.compile('Fjalëkalimi|Password')).fill(pw)
    await page.locator('input[type=checkbox][required]').check();await page.get_by_role('button',name='Krijo llogari falas' if sq else 'Create free account').click()
    await expect(page.get_by_role('heading',name='Kontrolloni email-in' if sq else 'Check your inbox')).to_be_visible(timeout=20000);await page.screenshot(path=str(OUT/f'{w}-{sq}-inbox.png'))
    rows=profile(email);assert len(rows)==1 and rows[0]['marketing_consent'] is False and rows[0]['locale']==('sq' if sq else 'en'),rows;uid=rows[0]['id'];created.append(uid)
    requests.put(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30,json={'email_confirm':True}).raise_for_status()
    await page.goto(L+('/al/llogaria/hyr' if sq else '/account/sign-in'));await page.get_by_label('Email',exact=True).fill(email);await page.get_by_label(re.compile('Fjalëkalimi|Password')).fill(pw);await page.get_by_role('button',name='Hyr' if sq else 'Sign in',exact=True).click()
    await expect(page).to_have_url(re.compile('kalkulator-transporti|/calculator'));await unlocked(page);await page.screenshot(path=str(OUT/f'{w}-{sq}-unlocked.png'))
    await page.goto(L+'/admin/customers');await expect(page).to_have_url(re.compile('/account$'));await page.goto(L+'/admin/leads');await expect(page.get_by_text(re.compile('E2E Verification|\\$345'))).to_have_count(0)
    print('PASS email signup',w,sq,'leads url',page.url,'errors',errors);await ctx.close()
   # Google-style user: confirmed, provider name, no customer metadata -> no profile
   gemail='alpha-e2e-g-'+uuid.uuid4().hex[:10]+'@example.com';gpw=secrets.token_urlsafe(18)
   r=requests.post(BASE+'/auth/v1/admin/users',headers=HEAD,timeout=30,json={'email':gemail,'password':gpw,'email_confirm':True,'user_metadata':{'full_name':'Google Style User'}});r.raise_for_status();gid=r.json()['id'];created.append(gid);assert profile(gemail)==[]
   ctx=await browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');page=await ctx.new_page()
   await fill_calc(page,True);await page.goto(L+'/al/llogaria/hyr');await page.get_by_label('Email',exact=True).fill(gemail);await page.get_by_label(re.compile('Fjalëkalimi')).fill(gpw);await page.get_by_role('button',name='Hyr',exact=True).click()
   cp=page.locator('[data-complete-profile]');await expect(cp).to_be_visible(timeout=20000);await expect(page.get_by_text('$345',exact=True)).to_have_count(0);await expect(cp.locator('option:checked')).to_have_text('Shqipëri');await cp.scroll_into_view_if_needed();await page.screenshot(path=str(OUT/'390-complete-profile.png'))
   await cp.get_by_label(re.compile('Telefon')).fill('+355692233416');await cp.locator('input[type=checkbox][required]').check();await cp.get_by_role('button',name='Ruaj dhe shiko çmimin').click()
   await unlocked(page);rows=profile(gemail);assert rows and rows[0]['full_name']=='Google Style User' and rows[0]['marketing_consent'] is False and rows[0]['privacy_accepted_at'];print('PASS complete-profile unlock',rows[0]['full_name'])
   await page.goto(L+'/admin/customers');await expect(page).to_have_url(re.compile('/account$'));await ctx.close()
   # staff: listed customers; staff cannot complete a customer profile
   with open(os.path.expanduser('~/.cache/lovable-auth/session.json')) as f:a=json.load(f)
   ctx=await browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce');page=await ctx.new_page();await page.goto(L);await page.evaluate('([k,v])=>localStorage.setItem(k,v)',[a['storage_key'],json.dumps(a['session'])])
   await page.goto(L+'/admin/customers');await expect(page.get_by_role('heading',name='Customer accounts')).to_be_visible();await expect(page.get_by_role('button',name=re.compile('E2E Verification'))).to_have_count(2);await expect(page.get_by_role('button',name=re.compile('Google Style User'))).to_have_count(1);await page.screenshot(path=str(OUT/'staff-customers.png'))
   staff_id=a['session']['user']['id'];await fill_calc(page,False);cp=page.locator('[data-complete-profile]');await expect(cp).to_be_visible(timeout=20000);await cp.get_by_label(re.compile('Phone')).fill('+355692233416');await cp.locator('input[type=checkbox][required]').check();await cp.get_by_role('button',name='Save and see price').click();await expect(cp.get_by_role('alert')).to_contain_text('Staff');assert requests.get(BASE+'/rest/v1/profiles?id=eq.'+staff_id,headers=HEAD,timeout=30).json()==[];print('PASS staff listed customers and staff profile refused');await ctx.close()
   # Google button starts the OAuth redirect
   ctx=await browser.new_context(viewport={'width':1440,'height':900});page=await ctx.new_page();urls=[];page.on('request',lambda r:urls.append(r.url));ctx.on('page',lambda pg:urls.append('POPUP '+pg.url))
   await page.goto(L+'/account/sign-in');await expect(page.locator('html')).to_have_attribute('data-customer-ready','true');await page.get_by_role('button',name='Continue with Google').click();await page.wait_for_timeout(4000)
   hits=[u for u in urls if 'oauth' in u.lower() or 'google' in u.lower()];print('google redirect hits',hits[:5],'final',page.url);assert hits;await ctx.close();await browser.close()
 finally:
  for uid in created: requests.delete(BASE+'/auth/v1/admin/users/'+uid,headers=HEAD,timeout=30).raise_for_status()
  left=[requests.get(BASE+'/rest/v1/'+t+'?'+c+'=eq.'+u,headers=HEAD,timeout=30).json() for u in created for t,c in [('profiles','id'),('calculator_quotes','user_id')]]
  print('cleaned',len(created),'leftover rows',sum(len(x) for x in left))
asyncio.run(main())
