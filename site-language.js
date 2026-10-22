/* English/Polish presentation without replacing forms, links, or page structure. */
(() => {
 const dictionary=window.GambianTourPolish||{};
 const normalize=value=>value.trim().replace(/\s+/g,' ');
 const home=document.body.dataset.pageLanguage==='home';
 const roots=home?[...document.querySelectorAll('.site-footer,[data-whatsapp-contact]')]:[document.body];
 const texts=[],attributes=[];
 let language='en';
 for(const root of roots){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
   return node.parentElement?.closest('script,style,svg,noscript,.polish-site-invite') || (home && node.parentElement?.closest('[data-i18n]')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }});
  while(walker.nextNode()){
   const node=walker.currentNode,original=node.nodeValue,key=normalize(original);
   if(Object.hasOwn(dictionary,key))texts.push({node,original});
  }
  for(const element of [root,...root.querySelectorAll('*')]){
   for(const name of ['placeholder','aria-label','alt','data-caption']){
    const original=element.getAttribute(name);
    if(original&&Object.hasOwn(dictionary,normalize(original)))attributes.push({element,name,original,polish:dictionary[normalize(original)]});
   }
  }
 }
 // Cache normalized replacements with the original leading/trailing whitespace.
 for(const item of texts){
  const key=normalize(item.original);
  item.polish=item.original.match(/^\s*/)[0]+dictionary[key]+item.original.match(/\s*$/)[0];
 }
 const title=document.title;
 function text(value){return language==='pl'?(dictionary[normalize(value)]??value):value;}
 function apply(next){
  language=next==='pl'?'pl':'en';
  document.documentElement.lang=language;
  for(const item of texts)item.node.nodeValue=language==='pl'?item.polish:item.original;
  for(const item of attributes)item.element.setAttribute(item.name,language==='pl'?item.polish:item.original);
  if(!home){
   document.title=text(title);
   document.querySelectorAll('[data-language]').forEach(button=>{
    const active=button.dataset.language===language;
    button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
   });
   document.querySelectorAll('[data-menu-toggle]').forEach(button=>button.setAttribute('aria-label',text(document.querySelector('[data-nav]')?.classList.contains('open')?'Close navigation':'Open navigation')));
   window.dispatchEvent(new CustomEvent('gambiantour:language',{detail:{language}}));
  }
 }
 function set(next){
  try{window.localStorage.setItem('gambianTourLanguage',next);}catch{}
  apply(next);
 }
 window.GambianTourLanguage={apply,text,get current(){return language;}};
 if(!home)document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>set(button.dataset.language)));
 let stored='en';try{stored=window.localStorage.getItem('gambianTourLanguage')||'en';}catch{}
 apply(stored);
})();
