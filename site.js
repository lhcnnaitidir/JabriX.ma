const menu=document.querySelector('.menu');
const navigation=document.querySelector('header #nav');
const backdrop=document.querySelector('.jx-nav-backdrop');
if(menu&&navigation){
 const mobile=matchMedia('(max-width:1100px)');
 const background=[document.querySelector('main'),document.querySelector('footer'),document.querySelector('.end-cta')].filter(Boolean);
 function toggleMenu(open,restoreFocus=false){
  if(!mobile.matches)open=false;
  navigation.classList.toggle('open',open);document.body.classList.toggle('navigation-open',open);
  menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  background.forEach(element=>element.inert=open);
  if(restoreFocus)menu.focus();
 }
 menu.addEventListener('click',()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true'));
 backdrop?.addEventListener('click',()=>toggleMenu(false,true));
 navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>toggleMenu(false)));
 mobile.addEventListener('change',()=>toggleMenu(false));
 document.addEventListener('keydown',event=>{
  if(menu.getAttribute('aria-expanded')!=='true')return;
  if(event.key==='Escape'){event.preventDefault();toggleMenu(false,true)}
  if(event.key==='Tab'){
   const focusables=[menu,...navigation.querySelectorAll('a,button')].filter(element=>element.getClientRects().length>0);
   const first=focusables[0],last=focusables[focusables.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
 });
}
document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('form');if(form){const v=new URLSearchParams(location.search).get('solution');if(v){const aliases={valorisation:'Carbonisation & pyrolyse',traitement:'Traitement des déchets',fours:'Filtration & fours',logistique:'Logistique & stockage'};document.querySelector('#interest').value=aliases[v]||v}form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body=`Bonjour JABRI X,\n\nProjet : ${d.get('solution')}\n${d.get('message')}\n\nNom : ${d.get('nom')}\nEntreprise : ${d.get('entreprise')}\nE-mail : ${d.get('email')}\nTéléphone : ${d.get('telephone')||'Non renseigné'}`;location.href=`mailto:jabrixarkane@gmail.com?subject=${encodeURIComponent('Projet — '+d.get('solution'))}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Votre demande est préparée. Finalisez l’envoi dans votre messagerie.'})}
document.querySelectorAll('.reveal').forEach(e=>e.classList.add('revealed'));

// Indicate the current page without changing the destination.
document.querySelectorAll('header #nav a').forEach(link=>{if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page')});
const topButton=document.querySelector('.jx-top');
if(topButton){const updateTop=()=>topButton.hidden=window.scrollY<650;window.addEventListener('scroll',updateTop,{passive:true});updateTop();topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}
const sectors={
 sante:{kicker:'HÔPITAUX · CLINIQUES · LABORATOIRES',title:'Traiter les déchets de soins sur site.',description:'Le G.F.A 50 associe traitement thermique et traitement des gaz pour les déchets médicaux compatibles. L’étude commence par la nature des déchets, les volumes et les conditions d’implantation.',points:['Double chambre de combustion','Chaîne de refroidissement et filtration','Formation et accompagnement des équipes'],image:'gfa50-equipment.webp',alt:'Équipement de traitement des déchets médicaux G.F.A 50',href:'gfa50.html',link:'Découvrir le G.F.A 50 →'},
 biomasse:{kicker:'BOIS · COQUES D’ARGAN · MATIÈRES ORGANIQUES',title:'Donner une nouvelle valeur à la biomasse.',description:'Carbonisation et pyrolyse transforment la matière organique selon les objectifs du projet. Le catalogue présente des solutions pour le charbon, le biochar, la bio-huile et les gaz.',points:['Chargement manuel ou mécanique selon l’équipement','Production continue ou traitement par lot selon l’étude','Récupération et condensation des gaz pour la pyrolyse'],image:'carbonisation-hd.webp',alt:'Installation de carbonisation de la biomasse — illustration Beston Group',href:'solutions.html?famille=valorisation',link:'Explorer la valorisation →'},
 industrie:{kicker:'PRODUCTION · TRANSFORMATION · MATÉRIAUX',title:'Maîtriser les procédés. Transformer la matière.',description:'Traitement des gaz, dépoussiérage, cuisson de céramique et de minéraux, fusion de métaux non ferreux : chaque procédé se prépare à partir des matières et des conditions d’exploitation.',points:['Traitement des fumées et des particules','Fours de cuisson à température contrôlée','Creusets et équipements adaptés aux métaux sélectionnés'],image:'ceramique-hd.webp',alt:'Four de cuisson de céramique — photographie d’illustration',href:'solutions.html?famille=fours',link:'Découvrir les fours & la filtration →'},
 logistique:{kicker:'MANUTENTION · ALIMENTATION · STOCKAGE',title:'Organiser les flux de votre installation.',description:'Convoyeurs, trémies et cuves complètent votre chaîne industrielle. L’intégration est étudiée selon les matériaux, le rythme de production et l’espace disponible.',points:['Transport continu de matériaux en vrac','Alimentation régulière par trémies et doseurs','Stockage et mélange en acier carbone ou inox'],image:'convoyeur-hd.webp',alt:'Convoyeur industriel — photographie d’illustration',href:'solutions.html?famille=logistique',link:'Explorer la logistique & le stockage →'}
};
const sectorTabs=[...document.querySelectorAll('[data-sector]')];
function selectSector(button){const data=sectors[button.dataset.sector];if(!data)return;sectorTabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});document.querySelector('#sector-panel').setAttribute('aria-labelledby',button.id);for(const key of ['kicker','title','description'])document.querySelector('#sector-'+key).textContent=data[key];const list=document.querySelector('#sector-points');list.replaceChildren(...data.points.map(point=>{const li=document.createElement('li');li.textContent=point;return li}));const img=document.querySelector('#sector-image');img.src='assets/'+data.image;img.alt=data.alt;const credit=document.querySelector('#sector-photo-credit');if(credit)credit.textContent=button.dataset.sector==='biomasse'?'Photographie d’illustration · Beston Group':button.dataset.sector==='sante'?'Visuel G.F.A 50 fourni pour la présentation':'Photographie d’illustration · configuration selon projet';const link=document.querySelector('#sector-link');link.href=data.href;link.textContent=data.link}
sectorTabs.forEach((button,index)=>{button.addEventListener('click',()=>selectSector(button));button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%sectorTabs.length;else if(event.key==='ArrowLeft')next=(index+sectorTabs.length-1)%sectorTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=sectorTabs.length-1;else return;event.preventDefault();sectorTabs[next].focus();selectSector(sectorTabs[next])})});
