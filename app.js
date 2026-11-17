const guides = [
  {id:'earthquake',no:'01',title:'地震當下',subtitle:'趴下、掩護、穩住',icon:'⌁',color:'gold',intro:'台灣地震頻繁，先保護頭頸，再判斷環境。搖晃停止前不要急著衝出門。',steps:['趴下：降低重心，避免被搖晃甩倒。','掩護：躲到堅固桌下，手臂或枕頭護住頭頸；遠離窗戶、吊燈與高櫃。','穩住：抓牢桌腳。沒有桌子時，靠內側牆蹲低並保護頭部。','停止搖晃後穿鞋，留意餘震與掉落物；走樓梯疏散，絕不搭電梯。']},
  {id:'blackout',no:'02',title:'停電與通訊',subtitle:'留住電力，保持聯絡',icon:'◒',color:'blue',intro:'先確認自身與家人安全，再節省手機電力。停電時避免使用明火照明。',steps:['拔除非必要電器插頭；冰箱門盡量保持關閉。','手機開啟低耗電模式，降低亮度並關閉不必要的定位與藍牙。','用簡訊傳送位置與近況，避免反覆撥打電話；約定外縣市聯絡人。','使用手電筒或頭燈照明；室內不可使用炭火、發電機或露營爐。']},
  {id:'go-bag',no:'03',title:'避難包',subtitle:'準備至少 1–3 天所需',icon:'▱',color:'green',intro:'放在玄關附近、容易拿取的位置。每半年檢查一次飲水、藥品與電池效期。',steps:['飲水與即食食品；依家中人數與需求準備。','常用藥、處方箋影本、簡易急救用品、口罩與濕紙巾。','手電筒、備用電池、行動電源、充電線與哨子。','少量現金、身分文件影本、保暖衣物與輕便雨衣。','嬰幼兒、長者、慢性病患者、身心障礙者與寵物的個別用品。']},
  {id:'evacuation',no:'04',title:'避難與集合',subtitle:'走樓梯，往空曠處移動',icon:'↗',color:'red',intro:'熟悉住家、學校與工作地附近的替代路線。依地方政府公告及現場指揮行動。',steps:['離開建築物前穿鞋，避開外牆磁磚、招牌、玻璃與電線。','走樓梯、不搭電梯；若樓梯受損，留在安全處並求援。','前往事先約定的集合點或地方政府公告的避難收容處所。','淹水時不要涉水穿越地下道、涵洞或不明水域；往高處移動。']},
  {id:'home',no:'05',title:'居家防災',subtitle:'固定家具，確認出口',icon:'⌂',color:'orange',intro:'台灣常見公寓與大樓要特別留意高處家具、瓦斯管線與逃生梯道。',steps:['將高櫃、電視與熱水器固定；重物放低，不放床頭上方。','保持玄關、走道與樓梯間暢通，不堆放雜物。','家人一起確認瓦斯總開關、電箱與住家兩個以上逃生方向。','聞到瓦斯味時不要開關電器或點火，離開現場後聯絡 119 或瓦斯公司。']},
  {id:'family',no:'06',title:'家庭聯絡計畫',subtitle:'先約定，失聯時不慌',icon:'◎',color:'violet',intro:'災時行動網路可能壅塞，事先約定的集合地點與外縣市聯絡人更可靠。',steps:['約定住家附近與外縣市各一處集合點。','指定一位外縣市親友作為家庭聯絡窗口，所有人記下電話。','紙本寫下家人電話、地址、過敏與用藥資訊，放入避難包。','與長者、孩童約定失散時向穿制服的救援人員或服務台求助。']}
];
const items=[['water','飲水與即食食品','依人數準備，定期檢查效期'],['medicine','常用藥與急救用品','含處方箋、過敏與用藥資料'],['light','手電筒、電池與哨子','確認電池可用，放在好拿位置'],['power','充飽的行動電源','附上相容的充電線'],['documents','證件影本與少量現金','防水收納，保留小額鈔票'],['clothes','雨衣、保暖衣物與備用鞋','依季節與家人尺寸調整'],['family','家庭聯絡卡與集合點','每位家人都知道放在哪裡'],['special','家人與寵物個別用品','嬰幼兒、長者與慢性病需求']];
const $=(selector,root=document)=>root.querySelector(selector);
let activeTopic=null;

function setView(view){
  const home=view==='home';
  $('#guide-index').hidden=!home;$('.emergency').hidden=!home;$('.disclaimer').hidden=!home;
  $('#guide-view').hidden=view!=='guide';$('#list-view').hidden=view!=='list';
  document.querySelectorAll('.nav-item').forEach(button=>button.classList.toggle('selected',button.dataset.view===view));
  if(view==='guide') renderGuides($('#search').value);
  window.scrollTo({top:0,behavior:'smooth'});
}
function showDetail(id){
  const guide=guides.find(item=>item.id===id);if(!guide)return;
  activeTopic=id;$('#detail-icon').textContent=guide.icon;$('#detail-number').textContent=`FIELD NOTE ／ ${guide.no}`;
  $('#detail-title').textContent=guide.title;$('#detail-intro').textContent=guide.intro;
  $('#detail-steps').innerHTML=guide.steps.map((step,index)=>`<article class="step"><b>${String(index+1).padStart(2,'0')}</b><p>${step}</p></article>`).join('')+'<aside class="list-tip"><p>地方政府與消防署的最新公告優先於本指南。平時先和家人走一次逃生路線，災時依現場狀況調整。</p></aside>';
  $('.detail-layout').hidden=false;$('#guide-cards').hidden=true;setView('guide');
}
function renderGuides(query=''){
  const q=query.trim().toLocaleLowerCase();
  const filtered=guides.filter(item=>`${item.title} ${item.subtitle} ${item.intro} ${item.steps.join(' ')}`.toLocaleLowerCase().includes(q));
  $('#guide-cards').innerHTML=filtered.map(item=>`<button class="topic-card" data-topic="${item.id}"><span class="topic-icon ${item.color}">${item.icon}</span><small>${item.no}　↗</small><strong>${item.title}</strong><span>${item.subtitle}</span></button>`).join('')||'<p class="empty-result">找不到相關主題，試試「地震」或「停電」。</p>';
  const isDetail=Boolean(activeTopic)&&!q;
  $('.detail-layout').hidden=!isDetail;$('#guide-cards').hidden=isDetail;
}
function loadChecks(){try{return JSON.parse(localStorage.getItem('island-prepared-list')||'[]')}catch{return[]}}
let checked=loadChecks();
function saveChecks(){try{localStorage.setItem('island-prepared-list',JSON.stringify(checked));$('#storage-status').textContent='✓ 清單保存在這台裝置'}catch{$('#storage-status').textContent='此瀏覽器目前無法儲存清單'}}
function renderChecks(){
  $('#checklist').innerHTML=items.map(([id,title,detail],index)=>{const isChecked=checked.includes(id);return `<label class="check-row${isChecked?' checked':''}"><input type="checkbox" data-check="${id}" ${isChecked?'checked':''}><span class="check-number">${String(index+1).padStart(2,'0')}</span><span class="check-copy"><strong>${title}</strong><small>${detail}</small></span><span class="checkmark">${isChecked?'✓':'＋'}</span></label>`}).join('');
  const percent=Math.round(checked.length/items.length*100);$('#progress-value').textContent=percent;$('#progress-count').textContent=`${checked.length} / ${items.length}`;$('#progress-bar').style.width=`${percent}%`;$('#nav-count').textContent=`${checked.length}/${items.length}`;
}
document.addEventListener('click',event=>{
  const target=event.target.closest('button');if(!target)return;
  if(target.dataset.view){const view=target.dataset.view;activeTopic=null;if(view==='guide'){setView('guide');$('.detail-layout').hidden=true;$('#guide-cards').hidden=false}else setView(view);return}
  if(target.dataset.topic){setView('guide');showDetail(target.dataset.topic);return}
  if(target.id==='all-topics'){activeTopic=null;renderGuides($('#search').value);return}
  if(target.id==='clear-checks'){checked=[];saveChecks();renderChecks();return}
  if(target.id==='copy-emergency'){const message='緊急聯絡：110 警察｜119 消防救護｜112 行動電話緊急電話。請傳送你目前的位置與安全狀況。';navigator.clipboard?.writeText(message).then(()=>{target.textContent='聯絡資訊已複製 ✓';setTimeout(()=>target.textContent='複製緊急聯絡資訊',2000)}).catch(()=>{});return}
});
document.addEventListener('change',event=>{const box=event.target.closest('[data-check]');if(!box)return;const id=box.dataset.check;checked=box.checked?[...new Set([...checked,id])]:checked.filter(value=>value!==id);saveChecks();renderChecks()});
$('#search').addEventListener('input',event=>{activeTopic=null;renderGuides(event.target.value)});
function updateNetwork(){const offline=!navigator.onLine;$('#network-label').textContent=offline?'離線閱讀中':'離線內容已備妥';$('.network').classList.toggle('offline',offline)}
window.addEventListener('online',updateNetwork);window.addEventListener('offline',updateNetwork);
renderChecks();updateNetwork();
if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
