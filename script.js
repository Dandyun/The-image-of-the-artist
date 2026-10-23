'use strict';

/*
 * THE IMAGE OF THE ARTIST
 * Image numbers match artist1.png through artist25.png from the research list.
 * Place images inside ./artist/ (preferred) or alongside index.html (fallback).
 */
const CATEGORIES = {
  tools: 'Tools', body: 'Body & Pose', space: 'Space',
  process: 'Process', object: 'Symbolic Object'
};
const ACTIVITIES = [
  'Make images or objects',
  'Express ideas or emotions',
  'Document people or places',
  'Experiment with materials or technology',
  'Question conventions or society',
  'Tell stories or preserve memory',
  'Teach or collaborate',
  'Something else / not sure'
];
const VISUALS = [
  'Tools they use',
  'Clothing or appearance',
  'Body language or pose',
  'Studio or working environment',
  'Act of making something',
  'Objects associated with art',
  'None of these / not sure'
];
const FIRST_IMPRESSIONS = [
  'Painter / painting', 'Artist / art', 'Designer / illustrator',
  'Other creative role', 'Other / unsure'
];

const artworks = [
  {id:1,artist:'Albrecht Dürer',title:'Self-Portrait at Twenty-Eight',year:'1500',yearSort:1500,medium:'Oil painting',categories:['body'],elements:['Frontal pose','Direct gaze','Fur-trimmed clothing','Hand gesture'],representation:'The artist presents himself through clothing, frontal posture, and direct eye contact rather than painting tools.',source:'https://www.sammlung.pinakothek.de/en'},
  {id:2,artist:'Sofonisba Anguissola',title:'Self-Portrait at the Easel',year:'c. 1556',yearSort:1556,medium:'Painting',categories:['tools','body','space','process'],elements:['Easel','Painting','Hand gesture','Working environment'],representation:'The artist places herself at an easel, making the act of painting central to her self-representation.',source:'https://www.wga.hu/html_m/a/anguisso/sofonisb/index.html'},
  {id:3,artist:'Anthony van Dyck',title:'Self-Portrait',year:'c. 1620–1621',yearSort:1620,medium:'Oil painting',categories:['body'],elements:['Clothing','Posture','Hand gesture','Facial expression'],representation:'The artist appears in elegant clothing without the conventional tools of painting.',source:'https://www.metmuseum.org/art/collection/search/436258'},
  {id:4,artist:'Rembrandt van Rijn',title:'The Artist in His Studio',year:'c. 1628',yearSort:1628,medium:'Oil painting · Studio scene',categories:['tools','space','process'],elements:['Easel','Canvas','Studio','Distance'],representation:'A figure and an oversized easel occupy the studio. The artist’s identity is suggested through the workplace; this is not a securely identified self-portrait.',source:'https://www.mfa.org/'},
  {id:5,artist:'Judith Leyster',title:'Self-Portrait',year:'c. 1630',yearSort:1630,medium:'Oil painting',categories:['tools','body','space','process'],elements:['Paintbrush','Palette','Easel','Painting in progress','Clothing'],representation:'The artist shows herself at the easel with tools and an unfinished work, addressing the viewer directly.',source:'https://www.nga.gov/artworks/37003-self-portrait'},
  {id:6,artist:'Artemisia Gentileschi',title:'Self-Portrait as the Allegory of Painting',year:'c. 1638–1639',yearSort:1638,medium:'Oil painting',categories:['tools','body','space','process'],elements:['Brush','Palette','Gesture','Working posture'],representation:'The artist depicts herself painting and personifies the act of Painting through her own body.',source:'https://www.rct.uk/collection/stories/women-artists/self-portrait-as-the-allegory-of-painting-la-pittura'},
  {id:7,artist:'Gerrit Dou',title:'Self-Portrait',year:'c. 1665',yearSort:1665,medium:'Oil painting',categories:['tools','body','space'],elements:['Painting tools','Stone alcove','Clothing','Framed space'],representation:'Painting equipment and a staged architectural setting establish a professional identity.',source:'https://www.metmuseum.org/art/collection/search/436210'},
  {id:8,artist:'Élisabeth Vigée Le Brun',title:'Self-Portrait in a Straw Hat',year:'1782',yearSort:1782,medium:'Oil painting',categories:['tools','body'],elements:['Paintbrush','Palette','Straw hat','Direct gaze'],representation:'A brush and palette make the sitter’s occupation recognizable alongside her chosen appearance.',source:'https://www.nationalgallery.org.uk/paintings/elisabeth-louise-vigee-le-brun-self-portrait-in-a-straw-hat'},
  {id:9,artist:'Adélaïde Labille-Guiard',title:'Self-Portrait with Two Pupils',year:'1785',yearSort:1785,medium:'Oil painting',categories:['tools','body','space','process'],elements:['Easel','Palette','Students','Studio','Formal clothing'],representation:'The artist appears at her easel with two pupils, presenting painting and teaching in the same image.',source:'https://www.metmuseum.org/art/collection/search/436840'},
  {id:10,artist:'Henri Fantin-Latour',title:'Self-Portrait',year:'c. 1858',yearSort:1858,medium:'Oil painting',categories:['body'],elements:['Facial expression','Lighting','Dark background','Brushwork'],representation:'A close portrait communicates self-image through the face, light, and paint handling rather than tools.',source:'https://www.metmuseum.org/art/collection/search/436297'},
  {id:11,artist:'Vincent van Gogh',title:'Self-Portrait',year:'1889',yearSort:1889,medium:'Oil painting',categories:['tools','body'],elements:['Paintbrushes','Palette','Painter’s smock','Expressive brushstrokes'],representation:'Recognizable painter’s tools appear beside an individual artistic style expressed through brushwork.',source:'https://www.nga.gov/artworks/106382-self-portrait'},
  {id:12,artist:'Egon Schiele',title:'Self-Portrait with Palette',year:'1905',yearSort:1905,medium:'Painting',categories:['tools','body'],elements:['Palette','Clothing','Front-facing body'],representation:'A palette serves as a visible occupational sign in an early self-portrait.',source:'https://onlinecollection.leopoldmuseum.org/en/object/544-self-portrait-with-palette/'},
  {id:13,artist:'Claude Cahun',title:'Self-Portrait (I Am in Training, Don’t Kiss Me)',year:'1927',yearSort:1927,medium:'Photograph',categories:['body','object'],elements:['Costume','Makeup','Pose','Written text'],representation:'Costume, body language, and text construct an ambiguous performed identity.',source:'https://catalogue.jerseyheritage.org/cahun-collection-highlights/'},
  {id:14,artist:'Frida Kahlo',title:'Self-Portrait with Cropped Hair',year:'1940',yearSort:1940,medium:'Oil painting',categories:['body','object'],elements:['Oversized suit','Cut hair','Scissors','Seated pose'],representation:'The artist uses clothing, scissors, and cut hair to construct a personal image rather than displaying painting tools.',source:'https://www.moma.org/collection/works/78333'},
  {id:15,artist:'Norman Rockwell',title:'Triple Self-Portrait',year:'1960',yearSort:1960,medium:'Painting / illustration',categories:['tools','body','space','process'],elements:['Mirror','Easel','Paintbrush','Palette','Working artist'],representation:'The artist appears as a working figure, a reflection, and a painted image within the same composition.',source:'https://americanart.si.edu/exhibitions/rockwell'},
  {id:16,artist:'Nam June Paik',title:'Zen for Head',year:'1961 / 1962',yearSort:1962,medium:'Performance · Photographic documentation',categories:['body','space','process','object'],elements:['Head','Hair','Ink','Paper','Bodily movement'],representation:'The artist uses his head and hair to draw a line. His own body becomes the drawing instrument; this is performance documentation, not a conventional self-portrait.',source:'https://www.moma.org/collection/works/127631'},
  {id:17,artist:'Jim Dine',title:'Gray Palette',year:'1963',yearSort:1963,medium:'Mixed-media artwork',categories:['tools','object'],elements:['Palette shape','Absence of body','Object as stand-in'],representation:'The palette stands in for the artist as a surrogate self-portrait, without depicting his face.',source:'https://www.metmuseum.org/art/collection/search/493901'},
  {id:18,artist:'Andy Warhol',title:'Self-Portrait',year:'1966',yearSort:1966,medium:'Silkscreen painting',categories:['body','object'],elements:['Repeated face','Color variations','Silkscreen','Grid'],representation:'The artist’s face becomes a repeated, mechanically reproduced image.',source:'https://www.moma.org/collection/works/79889'},
  {id:19,artist:'Bruce Nauman',title:'Self-Portrait as a Fountain',year:'1966–1967',yearSort:1967,medium:'Photograph · Performance-based action',categories:['body','process','object'],elements:['Body','Water','Gesture','Fountain reference'],representation:'The artist uses his body to imitate a fountain, making an action the basis for his self-image.',source:'https://whitney.org/collection/works/5714'},
  {id:20,artist:'Cindy Sherman',title:'Untitled Film Still #21',year:'1978',yearSort:1978,medium:'Staged photograph · Not a literal self-portrait',categories:['body','space','process'],elements:['Costume','Facial expression','Staged identity','Urban setting'],representation:'The artist performs a fictional cinematic character. This is a staged identity, not a conventional self-portrait.',source:'https://www.moma.org/collection/works/56618'},
  {id:21,artist:'Marc Quinn',title:'Self',year:'1991',yearSort:1991,medium:'Sculpture · Frozen blood',categories:['body','object'],elements:['Cast head','Artist’s own blood','Frozen material'],representation:'The artist represents his head using material from his own body. The first version dates to 1991; later casts also exist.',source:'https://www.npg.org.uk/collections/search/portrait/mw138260/Marc-Quinn-Self'},
  {id:22,artist:'Janine Antoni',title:'Loving Care',year:'1993',yearSort:1993,medium:'Performance · Photographic documentation',categories:['tools','body','space','process'],elements:['Hair','Hair dye','Floor','Movement'],representation:'The artist uses her hair as a painting tool, applying dye to the gallery floor.',source:'https://www.janineantoni.net/loving-care/'},
  {id:23,artist:'Sarah Lucas',title:'Self Portrait with Fried Eggs',year:'1996',yearSort:1996,medium:'Color photograph',categories:['body','space','object'],elements:['Seated posture','Casual clothing','Fried eggs','Interior space'],representation:'Ordinary objects, posture, and styling replace conventional artistic tools in a staged self-image.',source:'https://www.nationalgalleries.org/art-and-artists/76022/self-portrait-fried-eggs-1996'},
  {id:24,artist:'Yasumasa Morimura',title:'An Inner Dialogue with Frida Kahlo (Collar of Thorns)',year:'2001',yearSort:2001,medium:'Staged photographic self-representation',categories:['body','space','object'],elements:['Costume','Makeup','Re-created composition','Symbolic objects'],representation:'The artist takes on Frida Kahlo’s visual identity through costume, photography, and a staged composition.',source:'https://collections.lacma.org/object/119385'},
  {id:25,artist:'Gillian Wearing',title:'Self Portrait as My Mother, Jean Gregory',year:'2003',yearSort:2003,medium:'Gelatin silver photograph',categories:['body','object'],elements:['Mask','Prosthetics','Clothing','Hairstyle'],representation:'The artist adopts her mother’s appearance, using a mask and disguise to construct a self-portrait.',source:'https://www.sfmoma.org/artwork/2003.222/'}
].sort((a,b)=>a.yearSort-b.yearSort||a.id-b.id);

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const volatileStore = new Map();
const safeGet = (key, fallback=null) => {try{const val=localStorage.getItem(key);return val===null?(volatileStore.has(key)?volatileStore.get(key):fallback):JSON.parse(val)}catch{return volatileStore.has(key)?volatileStore.get(key):fallback}};
const safeSet = (key, value) => {volatileStore.set(key,value);try{localStorage.setItem(key, JSON.stringify(value))}catch{}};
const LOCAL_KEY = 'image_of_artist_responses_v1';
const OWN_KEY = 'image_of_artist_my_submission_v1';
const OWN_ANSWERS_KEY = 'image_of_artist_my_answers_v1';
const FIRST_KEY = 'image_of_artist_first_word_v1';
let selectedFilter = 'all';
let surveyStep = 0;
let impression = safeGet(FIRST_KEY, '') || '';
let surveyAnswers = {activities:[],visuals:[]};
let currentSection='landing', lastFocus=null;
let backendAvailable=false;
let pollTimer=null;
const SECTIONS=['landing','survey','archive','results','reflection'];

function el(tag, cls, text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function goToSection(id, addHistory=true){
  if(!SECTIONS.includes(id)) return;
  const previous=currentSection;
  currentSection=id;
  SECTIONS.forEach(pageId=>{
    const page=document.getElementById(pageId);
    page.hidden=pageId!==id;
    page.classList.remove('page-enter');
  });
  const active=document.getElementById(id);
  // Re-trigger the gentle page transition, respecting reduced-motion preferences.
  if(previous!==id){void active.offsetWidth;active.classList.add('page-enter');}
  document.querySelector('#navigation').classList.remove('open');
  document.querySelector('#menuToggle').setAttribute('aria-expanded','false');
  document.querySelector('#siteHeader').classList.toggle('show-brand',id!=='landing');
  document.querySelector('#siteHeader').classList.toggle('scrolled',false);
  document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.go===id));
  window.scrollTo({top:0,behavior:'instant'});
  if(addHistory && (location.hash!==`#${id}`)) history.pushState({page:id},'',`#${id}`);
  // Entering Survey always displays the questions, including after submission.
  // Previous submissions are review-only and never add another vote.
  if(id==='survey') {
    surveyStep=0;
    if(safeGet(OWN_KEY)) surveyAnswers=getSubmittedAnswers();
    renderQuestion();
  }
  if(id==='results') loadResults();
  if(id==='results' && backendAvailable) startPolling();
  else if(pollTimer){clearInterval(pollTimer);pollTimer=null;}
}

function makePlaceholder(title, year, index){
  const safeTitle=title.replace(/[<&>\"']/g,'');
  const safeYear=year.replace(/[<&>\"']/g,'');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="760" viewBox="0 0 640 760"><rect width="640" height="760" fill="#f3f3f1"/><path d="M34 34h572v692H34z" stroke="#ddd" fill="none"/><circle cx="320" cy="288" r="93" stroke="#ccc" stroke-width="2" fill="none"/><path d="M183 523c0-74 62-135 137-135s137 61 137 135" stroke="#ccc" stroke-width="2" fill="none"/><text x="320" y="612" font-family="Arial" font-size="19" text-anchor="middle" fill="#666">${safeTitle.slice(0,36)}</text><text x="320" y="647" font-family="Arial" font-size="16" text-anchor="middle" fill="#999">${safeYear} · IMAGE ${index}</text><text x="320" y="682" font-family="Arial" font-size="12" text-anchor="middle" fill="#999">ADD artist${index}.png</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
function setupArtworkImage(img,artwork){
  const candidates=[`artist/artist${artwork.id}.png`,`artist${artwork.id}.png`];let next=0;
  img.alt=`${artwork.title}, ${artwork.artist}, ${artwork.year}`;
  img.onerror=()=>{if(next<candidates.length){img.src=candidates[next++]}else{img.onerror=null;img.src=makePlaceholder(artwork.title,artwork.year,artwork.id)}};
  img.src=candidates[next++];
}
function setupEmojiImages(){
  $$('img[data-fallback="emoji"]').forEach(img=>{
    let triedSameFolder=false;
    const onFailure=()=>{if(!triedSameFolder){triedSameFolder=true;img.src='emoji.png'}else{img.onerror=null;img.classList.add('is-missing')}};
    img.onerror=onFailure;
    if(img.complete && !img.naturalWidth) onFailure();
  });
}
function setupNavigation(){
  document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>goToSection(button.dataset.go)));
  $('#homeMark').addEventListener('click',()=>goToSection('landing'));
  $('#menuToggle').addEventListener('click',()=>{
    const isOpen=$('#navigation').classList.toggle('open');
    $('#menuToggle').setAttribute('aria-expanded',String(isOpen));
  });
  window.addEventListener('popstate',()=>goToSection(location.hash.slice(1)||'landing',false));
  window.addEventListener('hashchange',()=>{
    const dest=location.hash.slice(1);
    if(SECTIONS.includes(dest)&&dest!==currentSection)goToSection(dest,false);
  });
  window.addEventListener('scroll',()=>{
    $('#siteHeader').classList.toggle('scrolled',window.scrollY>15 && currentSection==='archive');
  },{passive:true});
  const initial=SECTIONS.includes(location.hash.slice(1))?location.hash.slice(1):'landing';
  // Browser history also works with directly linked sections.
  goToSection(initial,false);
}

function setupImpression(){
  const input=$('#impressionInput'); if(impression)input.value=impression;
  $('#impressionForm').addEventListener('submit',e=>{
    e.preventDefault();const value=input.value.trim();
    if(!value){$('#impressionError').textContent='Please enter your first impression.';input.focus();return}
    $('#impressionError').textContent=''; impression=value;safeSet(FIRST_KEY,value);renderPastAnswer();goToSection('survey');
  });
}
function getQuestionOptions(){return surveyStep===0?ACTIVITIES:VISUALS}
// V2 already stores a local response; read it for visitors upgrading from V2.
// Store individual selections separately in V3 so a previous vote is preserved.
function getSubmittedAnswers(){
  const own=safeGet(OWN_ANSWERS_KEY);
  if(own && Array.isArray(own.activities) && Array.isArray(own.visuals)){
    return {activities:[...own.activities],visuals:[...own.visuals]};
  }
  const stored=safeGet(LOCAL_KEY,[]);
  const last=Array.isArray(stored)?stored[stored.length-1]:null;
  if(last && Array.isArray(last.activities) && Array.isArray(last.visuals)){
    return {activities:[...last.activities],visuals:[...last.visuals]};
  }
  return {activities:[],visuals:[]};
}
function renderQuestion(){
  const alreadySubmitted=Boolean(safeGet(OWN_KEY));
  // Never hide the survey just because the visitor has submitted once.
  $('#surveyQuestionContainer').hidden=false;
  $('#surveyComplete').hidden=true;
  const message=$('#surveyReviewNotice');
  message.hidden=!alreadySubmitted;
  $('#surveyKicker').textContent=surveyStep===0?'01':'02';
  $('#surveyQuestionTitle').textContent=surveyStep===0?'What does an artist do?':'What makes someone look like an artist?';
  $('#surveyNext').innerHTML=surveyStep===0?'Next <span aria-hidden="true">→</span>':alreadySubmitted?'Finish review <span aria-hidden="true">→</span>':'Submit answers <span aria-hidden="true">→</span>';
  $$('.progress-dot').forEach((dot,i)=>{dot.classList.toggle('is-current',i===surveyStep);dot.classList.toggle('is-done',i<surveyStep)});
  const target=$('#surveyOptions');target.replaceChildren();$('#surveyValidation').textContent='';
  const choiceKey=surveyStep===0?'activities':'visuals';
  getQuestionOptions().forEach(text=>{
    const selected=surveyAnswers[choiceKey].includes(text);
    const btn=el('button','option-card'+(selected?' selected':''));btn.type='button';btn.setAttribute('aria-pressed',String(selected));
    btn.append(el('span','option-title',text),el('span','option-indicator',selected?'✓':''));
    btn.addEventListener('click',()=>{
      const a=surveyAnswers[choiceKey];const has=a.includes(text);
      const exclusive=text.includes('not sure');
      surveyAnswers[choiceKey]=has?a.filter(x=>x!==text):exclusive?[text]:[...a.filter(x=>!x.includes('not sure')),text];
      renderQuestion();
    });target.append(btn);
  });
}
function showSurveyComplete(reviewOnly){
  $('#surveyQuestionContainer').hidden=true;
  $('#surveyComplete').hidden=false;
  $('#surveyCompleteMessage').textContent=reviewOnly
    ?'You have already submitted once. \nThis review was not counted as another response.'
    :'Your answers are saved in this browser. Connect a database to share results across visitors.';
}
function setupSurvey(){
  $('#reviewSurveyAgain').addEventListener('click',()=>{
    surveyStep=0;
    surveyAnswers=getSubmittedAnswers();
    renderQuestion();
  });
  $('#surveyNext').addEventListener('click',async()=>{
    const alreadySubmitted=Boolean(safeGet(OWN_KEY));
    const key=surveyStep===0?'activities':'visuals';
    if(!alreadySubmitted && surveyAnswers[key].length===0){$('#surveyValidation').textContent='Select at least one response to continue.';return}
    if(surveyStep===0){surveyStep=1;renderQuestion();return}
    if(alreadySubmitted){showSurveyComplete(true);return}
    const button=$('#surveyNext');button.disabled=true;button.textContent='Saving…';
    const bucket=categorizeImpression(impression);
    const record={first_impression:bucket,activities:[...surveyAnswers.activities],visuals:[...surveyAnswers.visuals]};
    let uploaded=false;
    try{if(cloudEnabled()){await cloudInsert(record);uploaded=true;backendAvailable=true}}catch(err){console.warn('Shared survey unavailable; using local-only results.',err);backendAvailable=false}
    const responses=safeGet(LOCAL_KEY,[]);responses.push(record);safeSet(LOCAL_KEY,responses);
    safeSet(OWN_ANSWERS_KEY,{activities:[...surveyAnswers.activities],visuals:[...surveyAnswers.visuals]});
    safeSet(OWN_KEY,{cloud:uploaded,submittedAt:new Date().toISOString()});
    button.disabled=false;
    showSurveyComplete(false);
    await loadResults();
  });
  renderQuestion();
}
function categorizeImpression(text){
  const s=String(text||'').trim().toLowerCase();
  if(/paint|painter|painting|그림|화가|붓/.test(s))return FIRST_IMPRESSIONS[0];
  if(/design|illustrat|designer|graphic|디자인|일러스트/.test(s))return FIRST_IMPRESSIONS[2];
  if(/artist|artwork|art\b|예술|아티스트|미술/.test(s))return FIRST_IMPRESSIONS[1];
  if(/sculpt|photo|film|creator|creative|photograph|music|draw|sketch|작가|창작/.test(s))return FIRST_IMPRESSIONS[3];
  return FIRST_IMPRESSIONS[4];
}
function renderPastAnswer(){
  const value=safeGet(FIRST_KEY,'');if(value){$('#pastAnswer').hidden=false;$('#pastAnswerText').textContent=value}else $('#pastAnswer').hidden=true;
}
function renderArchive(){
  const container=$('#artworkGrid');container.replaceChildren();
  const filtered=artworks.filter(a=>selectedFilter==='all'||a.categories.includes(selectedFilter));
  $('#worksCount').textContent=`${filtered.length} ${filtered.length===1?'work':'works'}`;
  if(!filtered.length){container.append(el('p','empty-filter','No works match these filters. Choose another category.'));return}
  filtered.forEach(work=>{
    const card=el('button','artwork-card');card.type='button';card.setAttribute('aria-label',`View ${work.title} by ${work.artist}, ${work.year}`);
    const media=el('div','artwork-media');const img=el('img');img.loading=work.id>7?'lazy':'eager';img.decoding='async';setupArtworkImage(img,work);media.append(img);
    const meta=el('div','artwork-meta');const title=el('h3',null,work.artist);const year=el('span','year',work.year);meta.append(title,year);
    card.append(media,meta,el('div','artwork-title',work.title));
    card.addEventListener('click',()=>openArtwork(work,card));container.append(card);
  });
}
function setupFilters(){
  $$('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{
    selectedFilter=btn.dataset.category;
    $$('.filter-chip').forEach(b=>{
      const isActive=b.dataset.category===selectedFilter;
      b.classList.toggle('active',isActive);
      b.setAttribute('aria-pressed',String(isActive));
    });
    renderArchive();
  }));
  renderArchive();
}

function openArtwork(work,caller){
  lastFocus=caller;const modal=$('#artworkOverlay');const img=$('#detailImage');setupArtworkImage(img,work);
  $('#detailOverline').textContent=`Artwork · ${work.year}`;
  $('#detailTitle').textContent=work.title;$('#detailArtist').textContent=work.artist;$('#detailYear').textContent=work.year;
  $('#detailMedium').textContent=work.medium;$('#detailRepresentation').textContent=work.representation;
  $('#detailImageLabel').textContent=`${work.artist} · ${work.year}`;
  const elList=$('#detailElements');elList.replaceChildren(...work.elements.map(x=>el('span','element-tag',x)));
  $('#detailCategories').replaceChildren(...work.categories.map(x=>el('span','category-pill',CATEGORIES[x])));
  $('#detailSource').href=work.source;modal.hidden=false;document.body.classList.add('is-modal-open');$('.artwork-dialog').focus();
}
function closeOverlay(name){const node=$(`#${name}Overlay`);node.hidden=true;document.body.classList.remove('is-modal-open');lastFocus?.focus();lastFocus=null}
function setupOverlays(){
  $('#detailClose').addEventListener('click',()=>closeOverlay('artwork'));
  $('#aboutClose').addEventListener('click',()=>closeOverlay('about'));
  $('#aboutButton').addEventListener('click',()=>{lastFocus=document.activeElement;$('#aboutOverlay').hidden=false;document.body.classList.add('is-modal-open');$('.about-dialog').focus();$('#navigation').classList.remove('open')});
  $$('[data-close]').forEach(node=>node.addEventListener('click',()=>closeOverlay(node.dataset.close)));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){if(!$('#artworkOverlay').hidden)closeOverlay('artwork');else if(!$('#aboutOverlay').hidden)closeOverlay('about')}
    if(event.key==='Tab'){
      const modal=!$('#artworkOverlay').hidden?$('.artwork-dialog'):!$('#aboutOverlay').hidden?$('.about-dialog'):null;
      if(!modal)return;const items=$$('a[href],button:not([disabled]),input:not([disabled])',modal).filter(e=>e.getClientRects().length);
      if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });
}

/* CLOUD STORAGE: Supabase REST. Leave keys empty to run in local browser-only mode. */
function cloudEnabled(){
  const conf=window.SURVEY_CONFIG||{};
  return typeof conf.supabaseUrl==='string'&&/^https:\/\//.test(conf.supabaseUrl)&&typeof conf.anonKey==='string'&&conf.anonKey.trim().length>10;
}
function cloudHeaders(){const conf=window.SURVEY_CONFIG;return {'apikey':conf.anonKey,'Authorization':`Bearer ${conf.anonKey}`,'Content-Type':'application/json'}}
async function cloudInsert(record){
  const base=window.SURVEY_CONFIG.supabaseUrl.replace(/\/$/,'');
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),9000);
  try{const resp=await fetch(`${base}/rest/v1/artist_survey_responses`,{method:'POST',headers:{...cloudHeaders(),'Prefer':'return=minimal'},body:JSON.stringify(record),signal:controller.signal});if(!resp.ok)throw new Error(`Insert rejected: HTTP ${resp.status}`)}finally{clearTimeout(timeout)}
}
async function cloudGetSummary(){
  const base=window.SURVEY_CONFIG.supabaseUrl.replace(/\/$/,'');
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),9000);
  try{const resp=await fetch(`${base}/rest/v1/rpc/artist_survey_summary`,{method:'POST',headers:cloudHeaders(),body:'{}',signal:controller.signal});if(!resp.ok)throw new Error(`Summary unavailable: HTTP ${resp.status}`);return await resp.json()}finally{clearTimeout(timeout)}
}
function localSummary(){
  const list=safeGet(LOCAL_KEY,[]);const totals={total:list.length,impressions:{},activities:{},visuals:{}};
  list.forEach(row=>{totals.impressions[row.first_impression]=(totals.impressions[row.first_impression]||0)+1;row.activities.forEach(x=>totals.activities[x]=(totals.activities[x]||0)+1);row.visuals.forEach(x=>totals.visuals[x]=(totals.visuals[x]||0)+1)});
  return totals;
}
function renderChart(selector,options,counts,total){
  const root=$(selector);root.replaceChildren();if(!total){root.append(el('div','empty-chart','No responses yet.'));return}
  options.forEach(label=>{
    const count=Number(counts?.[label]||0);const pct=Math.round(count/total*100);
    const row=el('div','bar-row');const top=el('div','bar-top');top.append(el('span','bar-label',label),el('span','bar-value',`${pct}% · ${count}`));
    const track=el('div','bar-track');const fill=el('div','bar-fill');fill.style.width='0%';track.append(fill);row.append(top,track);root.append(row);
    requestAnimationFrame(()=>{fill.style.width=Math.min(100,pct)+'%'});
  });
}
async function loadResults(){
  let summary;let live=false;let error=false;
  if(cloudEnabled()){
    try{summary=await cloudGetSummary();live=true;backendAvailable=true}catch(err){console.warn('Shared totals not available:',err);error=true;backendAvailable=false}
  }
  if(!summary)summary=localSummary();
  const total=Number(summary.total||0);$('#responseTotal').textContent=total.toLocaleString();$('#responseUnit').textContent=total===1?' response collected':' responses collected';
  const status=$('#dataStatus');status.classList.toggle('live',live);
  status.lastElementChild.textContent=live?'Shared results · Updated':error?'Connection unavailable · This browser':'This browser only · Demo mode';
  renderChart('#activitiesChart',ACTIVITIES,summary.activities,total);
  renderChart('#visualsChart',VISUALS,summary.visuals,total);
  if(live && currentSection==='results')startPolling();
}
function startPolling(){if(!backendAvailable||pollTimer)return;pollTimer=setInterval(()=>{if(document.visibilityState==='visible'&&currentSection==='results')loadResults()},15000)}
function setupResults(){$('#refreshResults').addEventListener('click',loadResults);window.addEventListener('storage',e=>{if(e.key===LOCAL_KEY||e.key===OWN_KEY){renderQuestion();loadResults()}});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&currentSection==='results')loadResults()})}
function init(){setupEmojiImages();setupNavigation();setupImpression();setupSurvey();setupFilters();setupOverlays();setupResults();renderPastAnswer();loadResults()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
