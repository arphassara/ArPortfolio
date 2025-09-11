// Canvas trail
const cvs = document.getElementById('trail');
if(cvs){
  const ctx = cvs.getContext('2d');
  let particles = [];
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  function sizeCanvas(){
    cvs.width = innerWidth * DPR;
    cvs.height = innerHeight * DPR;
    cvs.style.width = innerWidth + 'px';
    cvs.style.height = innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  sizeCanvas(); addEventListener('resize', sizeCanvas);

  addEventListener('pointermove', (e)=>{
    for(let i=0;i<6;i++){
      particles.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2,a:1,r:Math.random()*2+1});
    }
    const lights=document.getElementById('lights');
    if(lights){
      const dx=(e.clientX/innerWidth-.5)*30;
      const dy=(e.clientY/innerHeight-.5)*30;
      lights.style.transform=`translate(${dx}px,${dy}px)`;
    }
  });
  function loop(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.a*=.96;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(120,149,178,${p.a*.6})`; ctx.fill();
    });
    particles=particles.filter(p=>p.a>.04);
    requestAnimationFrame(loop);
  } loop();
}

// Intro gate
const siteGate=document.getElementById('siteGate');
const enterBtn=document.getElementById('enterBtn');
function hide(el){el.classList.add('hidden');setTimeout(()=>el.classList.add('hide'),600);}
if(enterBtn&&siteGate){enterBtn.addEventListener('click',()=>hide(siteGate));}

// Carousel
const track=document.getElementById('track');
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
function cardWidth(){
  if(!track||!track.children.length)return 0;
  const first=track.children[0];
  const style=getComputedStyle(track);
  const gap=parseFloat(style.columnGap||style.gap||20);
  return first.getBoundingClientRect().width+gap;
}
if(prevBtn&&nextBtn&&track){
  prevBtn.addEventListener('click',()=>track.scrollBy({left:-cardWidth(),behavior:'smooth'}));
  nextBtn.addEventListener('click',()=>track.scrollBy({left: cardWidth(),behavior:'smooth'}));
}

// Preview overlay
const preview=document.getElementById('preview');
const previewMedia=document.getElementById('previewMedia');
const previewLive=document.getElementById('previewLive');
const previewGit=document.getElementById('previewGit');
const closePreview=document.getElementById('closePreview');
if(preview&&previewMedia&&previewLive&&previewGit&&closePreview){
  document.querySelectorAll('[data-preview]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const src=btn.getAttribute('data-src');
      const live=btn.getAttribute('data-live');
      const git=btn.getAttribute('data-git');
      previewMedia.innerHTML=`<img alt=\"preview\" src=\"${src}\" style=\"width:100%;height:100%;object-fit:cover\">`;
      previewLive.href=live&&live!=='#'?live:'#';
      previewGit.href=git||'#';
      preview.classList.add('show');
    });
  });
  closePreview.addEventListener('click',()=>preview.classList.remove('show'));
  preview.addEventListener('click',(e)=>{if(e.target===preview)preview.classList.remove('show');});
}

// Copy email
const emailBtn=document.querySelector('[data-copy-email]');
if(emailBtn){
  emailBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const email='Arphassara.k@kkumail.com';
    navigator.clipboard.writeText(email).then(()=>{
      emailBtn.textContent='Copied!';
      setTimeout(()=>emailBtn.textContent='Email',1500);
    });
  });
}


