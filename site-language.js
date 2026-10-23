/* Language URLs are authoritative. This script only enhances navigation and booking drafts. */
(() => {
 const data=window.GambianTourLocale||{};
 const language=document.documentElement.lang||'en';
 const source=document.body.dataset.sourcePage||'index.html';
 const translate=value=>data.text?.[String(value).trim().replace(/\s+/g,' ')]??value;
 const format=(value,values={})=>Object.entries(values).reduce((s,[key,v])=>s.replaceAll('{'+key+'}',v),translate(value));
 window.GambianTourLanguage={current:language,locale:data.locale||'en-GB',text:translate,format,apply(){}};
 const picker=document.querySelector('.language-picker');
 document.addEventListener('click',event=>{if(picker&&!picker.contains(event.target))picker.open=false;});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&picker?.open){picker.open=false;picker.querySelector('summary').focus();}});
 const draftKey='gambianTourLanguageDraft:'+source;
 const fields=form=>[...form.querySelectorAll('input[name],select[name],textarea[name]')].filter(n=>!['hidden','password','file','submit'].includes(n.type)&&!n.name.startsWith('_'));
 document.querySelectorAll('[data-language-link]').forEach(link=>{
  const target=new URL(link.href);target.search=location.search;target.hash=location.hash;link.href=target.href;
  link.addEventListener('click',event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   try{
    const forms=[...document.querySelectorAll('.trip-form,[data-quick-book]')].map(form=>fields(form).map(n=>({name:n.name,value:n.value,checked:n.checked})));
    sessionStorage.setItem(draftKey,JSON.stringify({created:Date.now(),forms}));
    localStorage.setItem('gambianTourLanguage',link.dataset.languageLink);
   }catch{}
  });
 });
 function restore(){
  try{
   const raw=sessionStorage.getItem(draftKey);if(!raw)return;sessionStorage.removeItem(draftKey);
   const draft=JSON.parse(raw);if(Date.now()-draft.created>30*60*1000)return;
   document.querySelectorAll('.trip-form,[data-quick-book]').forEach((form,index)=>{
    for(const saved of draft.forms[index]||[]){const node=fields(form).find(n=>n.name===saved.name);if(!node)continue;
     if(node.type==='checkbox'||node.type==='radio')node.checked=saved.checked;
     else if(node.tagName!=='SELECT'||[...node.options].some(o=>o.value===saved.value))node.value=saved.value;
     node.dispatchEvent(new Event('change',{bubbles:true}));
    }
   });
  }catch{}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore,{once:true});else restore();
})();
