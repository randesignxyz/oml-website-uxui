/* Journey content follows the supplied 2008–2026 milestone reference. */
const journeyMilestones = [
  {year:'2008',label:'The beginning',name:'ONE MORE LTD',title:'One vision. More possibilities.',text:'Established in Phnom Penh with a clear vision: to become Cambodia’s most trusted integrated business conglomerate, improving life through manufacturing and distribution.',color:'#063e89',mark:'ONE MORE',sub:'LIMITED',image:'imgRectangle7',caption:'Our people, united by a shared ambition.'},
  {year:'2008',label:'A place at the table',name:'ONE MORE Restaurant',title:'Bringing people together.',text:'We entered hospitality with ONE MORE Restaurant, celebrating Cambodian culinary culture and extending the OML family of brands into dining and food service.',color:'#56784c',mark:'ONE MORE',sub:'RESTAURANT',detail:'Cambodian roots. Shared experiences.'},
  {year:'2010',label:'Everyday refreshment',name:'Vital Premium Water',title:'A new standard of refreshment.',text:'Partnering with NVC Corporation, we introduced Vital Premium Water to the Cambodian market — growing into a bottled water brand trusted by millions nationwide.',color:'#087cb7',mark:'Vital',sub:'PREMIUM WATER',image:'imgRectangle10',caption:'Vital Premium Water · international recognition in 2025.'},
  {year:'2010',label:'Connecting Cambodia',name:'ONE FRATERNITY Co., Ltd',title:'The network behind the growth.',text:'Built from day one as the distribution backbone to launch and scale Vital Premium Water across Cambodia, ONE FRATERNITY connected our brands with the communities they serve.',color:'#a18432',mark:'ONE',sub:'FRATERNITY',image:'imgRectangle8',caption:'Working together to reach further.'},
  {year:'2019',label:'A taste of home',name:'Mee Chiet',title:'Khmer taste. A new chapter.',text:'Mee Chiet launched as Cambodia’s first locally owned instant noodle manufacturer, bringing authentic Khmer tastes together with Japanese machinery and technology.',color:'#8a742c',mark:'Mee Chiet',sub:'AUTHENTIC KHMER TASTE',detail:'Made in Cambodia. Inspired by home.'},
  {year:'2026',label:'Into every kitchen',name:'ONE MORE Kitchen',title:'More flavour. Every day.',text:'Our expansion into household food products brought ketchup, soybean sauce, oyster sauce and seasonings to the portfolio — bringing Cambodian-made condiments to every kitchen in the country.',color:'#790e18',mark:'ONE MORE',sub:'KITCHEN',detail:'Cooking essentials for everyday life.'}
];
function journeyHero(){return pageHero('Our journey.','From a single vision in 2008 to a family of businesses — discover the milestones that shaped One More Group.','About Us / Journey')}
function journeyPage(){return `<div class="journey-page" id="journey-start"><div class="journey-intro"><div><span class="eyebrow">OUR ROAD TO MORE</span><h2>Every turn.<br>One more possibility.</h2></div><div><span class="journey-age">18 <small>years & growing</small></span><p>Follow the road from our first vision in 2008 to the businesses shaping everyday life today.</p></div></div><div class="journey-road"><svg class="journey-road-lines" aria-hidden="true"><defs><linearGradient id="journey-road-gradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#063e89"/><stop offset="1" stop-color="#71a7d8"/></linearGradient></defs><g class="journey-road-paths"></g></svg><ol class="journey-stops">${journeyMilestones.map((m,i)=>`<li class="journey-chapter ${i%2?'stop-right':'stop-left'}" id="journey-chapter-${i}" style="--chapter-color:${m.color}" aria-labelledby="journey-title-${i}"><div class="journey-stop-marker"><div class="journey-stop-core"><span class="journey-step">${String(i+1).padStart(2,'0')}</span><strong>${m.year}</strong><span class="journey-stop-label">${m.label}</span></div></div><div class="journey-stop-content"><span class="eyebrow">${i===0?'WHERE IT ALL BEGAN':i===5?'A NEW CHAPTER':'ONE MORE MILESTONE'}</span><h3 id="journey-title-${i}">${m.name}</h3><span class="journey-stop-subtitle">${m.title}</span><p>${m.text}</p><button class="text-link journey-next" type="button" onclick="document.getElementById('${i===5?'journey-future':'journey-chapter-'+(i+1)}').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})">${i===5?'Our next chapter':'Next milestone'} <span aria-hidden="true">↓</span></button></div><span class="journey-section-count" aria-hidden="true">${String(i+1).padStart(2,'0')} / 06</span></li>`).join('')}</ol><div class="journey-road-end"><span aria-hidden="true">↓</span> THE STORY CONTINUES</div></div><section class="journey-future" id="journey-future"><span class="eyebrow">THIS IS ONLY THE BEGINNING</span><h2>Our next chapter?<br><em>We build it together.</em></h2><p>From a single vision in 2008 to a family of businesses serving everyday life. Our ambition keeps growing.</p>${btn('Connect with us','#/contact')}<button class="text-link journey-back" onclick="document.getElementById('journey-start').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})">Back to the beginning</button></section></div>`}
(() => {
 let resizeObserver, frame;
 window.OMLJourney={cleanup(){document.documentElement.classList.remove('journey-scroll');resizeObserver?.disconnect();resizeObserver=null;cancelAnimationFrame(frame)},mount(){
  const road=document.querySelector('.journey-road');
  if(!road)return;
  document.documentElement.classList.add('journey-scroll');
  const draw=()=>{
   const bounds=road.getBoundingClientRect();
   const points=[...road.querySelectorAll('.journey-stop-marker')].map(el=>{const chapter=el.closest('.journey-chapter');return {x:chapter.offsetLeft+el.offsetLeft+el.offsetWidth/2,y:road.querySelector('.journey-stops').offsetTop+chapter.offsetTop+el.offsetTop+el.offsetHeight/2}});
   const svg=road.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
   road.querySelector('.journey-road-paths').innerHTML=points.slice(1).map((p,i)=>{
    const a=points[i],mid=(a.y+p.y)/2;
    const d=`M ${a.x} ${a.y} C ${a.x} ${mid}, ${p.x} ${mid}, ${p.x} ${p.y}`;
    return `<path class="road-base" d="${d}"/><path class="road-progress" data-segment="${i}" pathLength="1" d="${d}"/><path class="road-dashes" d="${d}"/>`;
   }).join('');
   window.OMLMotion?.refreshJourneyRoad?.();
  };
  draw();
  let width=road.clientWidth,height=road.clientHeight;
  resizeObserver=new ResizeObserver(()=>{if(width===road.clientWidth&&height===road.clientHeight)return;width=road.clientWidth;height=road.clientHeight;cancelAnimationFrame(frame);frame=requestAnimationFrame(draw)});
  resizeObserver.observe(road);
 }};
})();
