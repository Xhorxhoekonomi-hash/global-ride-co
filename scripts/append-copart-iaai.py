import json,re,sys
SRC='data/sources/copart_iaai_locations_2026-11.txt'; TS='src/data/landTransport.ts'; LOC='src/components/calculator/locations.ts'
T={'S':'savannah','E':'elizabeth','H':'houston','L':'la'}
lines=open(SRC).read().split('\n'); assert len(lines)==329
ts=open(TS).read()
start=ts.index('LAND_TRANSPORT_TABLE'); end=ts.index('\n};',start)
existing=re.findall(r'^  "((?:[^"\\]|\\.)*)": \{',ts[start:end],re.M); assert len(existing)==251,len(existing)
rows=[];keys=set()
for ln in lines:
  p=ln.split('|'); assert len(p)==9,ln
  k,c,st=p[:3]; v=list(map(int,p[3:8])); t=T[p[8]]
  assert k not in existing and k not in keys,k; keys.add(k)
  d=dict(zip(['savannah','elizabeth','houston','la','indianapolis'],v))
  rows.append(f'  {json.dumps(k)}: {{ city: {json.dumps(c)}, state: {json.dumps(st)}, savannah: {v[0]}, elizabeth: {v[1]}, houston: {v[2]}, la: {v[3]}, indianapolis: {v[4]}, preferredTerminal: "{t}", basePrice: {d[t]} }},')
assert len(keys)==329
ts=ts[:end]+'\n'+'\n'.join(rows)+ts[end:]; open(TS,'w').write(ts)
allk=re.findall(r'^  "((?:[^"\\]|\\.)*)": \{ city: ("(?:[^"\\]|\\.)*"), state: ("[A-Z]{2}")',ts,re.M); assert len(allk)==580
loc={json.loads('"'+k+'"'):{'city':json.loads(c),'state':json.loads(s)} for k,c,s in allk}
open(LOC,'w').write('export const AUCTION_LOCATIONS: Record<string,{city:string;state:string}> = '+json.dumps(loc,ensure_ascii=False)+';\n')
print('ok',len(loc))
