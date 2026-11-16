const categories={valorisation:'Carbonisation & pyrolyse',traitement:'Traitement des déchets',fours:'Filtration & fours',logistique:'Logistique & stockage'};
const products=[
[1,'Four de carbonisation','valorisation','Coques d’argan, bois et biomasse','Carbonisation de la biomasse et valorisation des coques d’argan et du bois. Chargement manuel ou mécanique selon la configuration.'],
[2,'Four à charbon continu','valorisation','Production continue de charbon','Un équipement adapté à la carbonisation continue, avec alimentation et récupération conçues selon les besoins de production.'],
[3,'Four de pyrolyse','valorisation','Biochar, bio-huile et gaz','Valorisation de la biomasse et des déchets organiques par pyrolyse, avec récupération et condensation des gaz selon le projet.'],
[4,'Incinérateur médical','traitement','Traitement des déchets de soins','Destruction thermique des déchets médicaux avec double chambre de combustion et traitement des fumées adapté.'],
[5,'Four rotatif industriel','traitement','Déchets industriels sélectionnés','Traitement thermique continu de déchets industriels sélectionnés. Alimentation et traitement des fumées à définir selon les matières.'],
[6,'Incinérateur municipal','traitement','Déchets ménagers et assimilés','Solution de traitement des déchets ménagers à l’échelle d’une installation collective, avec traitement des fumées adapté. Valorisation énergétique à étudier.'],
[7,'Traitement des boues','traitement','Stations d’épuration et industries','Séchage et traitement thermique des boues pour réduire leur volume et leur charge polluante, avec traitement des fumées.'],
[8,'Oxydation thermique','traitement','Gaz et vapeurs industriels','Traitement des gaz et vapeurs industriels, réduction des composés organiques volatils et récupération de chaleur selon le projet.'],
[9,'Traitement des déchets liquides','traitement','Compatibilité après analyse','Traitement thermique ou conditionnement de certains déchets liquides, selon leur analyse physico-chimique.'],
[10,'Systèmes de dépoussiérage','fours','Cyclones, filtres et laveurs de gaz','Captation des poussières et particules, traitement des fumées et des gaz pour réduire les émissions atmosphériques.'],
[14,'Four de cuisson de la poterie','fours','Céramique et faïence','Cuisson de poterie, faïence et céramique à température contrôlée, avec chargement manuel ou sur chariots.'],
[15,'Four de cuisson du plâtre et chaux','fours','Transformation thermique des minéraux','Cuisson du gypse, du plâtre, de la chaux et de matériaux similaires. Alimentation et traitement des fumées à adapter au besoin.'],
[16,'Four de fusion des métaux','fours','Métaux non ferreux · petites capacités','Fusion et préparation de métaux non ferreux, tels que l’aluminium et le cuivre, avec creusets adaptés et mise en chauffe contrôlée.'],
[11,'Convoyeurs & bandes transporteuses','logistique','Manutention de matériaux','Transport continu de déchets, biomasse, charbon et matériaux en vrac. Adaptation aux contraintes de votre environnement industriel.'],
[12,'Trémies & systèmes d’alimentation','logistique','Alimentation régulière et contrôlée','Trémies de stockage et d’alimentation, doseurs, vis sans fin et vannes conçus selon les fours et équipements à alimenter.'],
[13,'Cuves & réservoirs industriels','logistique','Stockage, mélange et traitement','Cuves en acier carbone ou inox selon le besoin, avec agitateurs, vannes et accessoires adaptés au stockage, au mélange ou au traitement.']];

const grid=document.querySelector('#products');
const search=document.querySelector('#equipment-search');
const status=document.querySelector('#search-status');
const params=new URLSearchParams(location.search);
let filter=params.get('famille')||'all';
if(!categories[filter])filter='all';
if(search)search.value=params.get('q')||'';
const normalise=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function render(){
 const q=normalise(search?.value.trim()||'');
 const matches=products.filter(p=>(filter==='all'||p[2]===filter)&&normalise([p[1],p[3],p[4],categories[p[2]]].join(' ')).includes(q));
 grid.replaceChildren();
 matches.forEach(p=>{const a=document.createElement('a');a.className='product';a.href=`equipement-${p[0]}.html`;a.innerHTML=`<div class="product-photo"><img loading="lazy" src="assets/product-${p[0]}.webp" alt="${p[1]} — visuel du catalogue JABRI X"><span>${String(p[0]).padStart(2,'0')}</span></div><div class="product-body"><small>${categories[p[2]]}</small><h3>${p[1]}</h3><p>${p[3]}</p><b aria-hidden="true">→</b></div>`;grid.append(a)});
 if(!matches.length){const message=document.createElement('p');message.className='jx-no-results';message.textContent='Aucun équipement trouvé. Essayez un autre mot ou sélectionnez « Tous les équipements ».';grid.append(message)}
 if(status)status.textContent=`${matches.length} équipement${matches.length===1?'':'s'} ${matches.length===1?'correspond':'correspondent'} à votre sélection.`;
 document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
}
render();
search?.addEventListener('input',render);
document.querySelector('#clear-search')?.addEventListener('click',()=>{search.value='';search.focus();render()});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;render()}));

const shared=document.createElement('script');shared.src='site.js';document.body.append(shared);