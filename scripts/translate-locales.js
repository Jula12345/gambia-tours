/* Offline import of translations of public website copy. The live site never calls a translation service. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'content/locale-source.json'),'utf8'));
const requested=process.argv.slice(2).length?process.argv.slice(2):['nl','de'];
async function run(lang){
 const dest=path.join(root,'content',lang==='pl'?'subpage-pl.json':'locale-'+lang+'.json');const dict=fs.existsSync(dest)?JSON.parse(fs.readFileSync(dest,'utf8')):{};
 const pending=source.filter(s=>!Object.hasOwn(dict,s));
 let completed=0;
 // Numeric delimiters survive translation and preserve one-to-one source records.
 while(completed<pending.length){
  const batch=[];let length=0;
  while(completed+batch.length<pending.length){const text=pending[completed+batch.length];if(batch.length&&length+text.length+18>3500)break;batch.push(text);length+=text.length+18;}
  const tokens=[];const protect=s=>s.replace(/\{[a-zA-Z][a-zA-Z0-9_]*\}/g,m=>{const id=tokens.push(m)-1;return 'GTPLACEHOLDER'+String(id).padStart(4,'0')+'GT';});
  const q=batch.map((s,i)=>'§'+String(i).padStart(6,'0')+'§ '+protect(s)).join('\n');
  let translated;
  for(let attempt=0;attempt<4;attempt++){
   try{const url=new URL('https://translate.googleapis.com/translate_a/single');for(const [k,v]of Object.entries({client:'gtx',sl:'en',tl:lang,dt:'t',q}))url.searchParams.set(k,v);const response=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!response.ok)throw Error('Translation HTTP '+response.status);const data=await response.json();translated=data[0].map(row=>row[0]||'').join('');break;}catch(e){if(attempt===3)throw e;await new Promise(r=>setTimeout(r,1500*(attempt+1)));}
  }
  const matches=[...translated.matchAll(/§\s*(\d{6})\s*§\s*([\s\S]*?)(?=§\s*\d{6}\s*§|$)/g)];
  if(matches.length!==batch.length)throw Error(lang+': translation segmentation mismatch '+matches.length+'/'+batch.length);
  matches.forEach((match)=>{const original=batch[Number(match[1])];let text=match[2].trim().replace(/GTPLACEHOLDER\s*(\d{4})\s*GT/gi,(_,id)=>tokens[Number(id)]);if(!text||/GTPLACEHOLDER/i.test(text))throw Error('Unresolved translation placeholder');for(const tag of original.match(/\{[a-zA-Z][a-zA-Z0-9_]*\}/g)||[])if(!text.includes(tag))throw Error('Missing '+tag);dict[original]=text;});
  completed+=batch.length;fs.writeFileSync(dest,JSON.stringify(dict,null,2)+'\n');console.log(lang+': '+completed+'/'+pending.length+' strings');
  await new Promise(r=>setTimeout(r,300));
 }
}
Promise.all(requested.map(run)).catch(e=>{console.error(e.message);process.exitCode=1});
