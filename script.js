(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),H=document.documentElement;
const run=f=>{try{f()}catch(e){console.error(e)}};H.classList.add('js');
let tm;const toast=m=>{const e=$('#ts');e.textContent=m;e.classList.add('o');clearTimeout(tm);tm=setTimeout(()=>e.classList.remove('o'),2200)};
async function cp(t,m){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast(m)}
/* печать-бейдж: текст ровно по кругу, без наложения */
run(()=>{const t=$('#bdt'),p=$('#cp'),fit=()=>{t.style.letterSpacing='0px';const W=t.getComputedTextLength();if(!(W>0))return;t.style.letterSpacing=Math.max(0,(p.getTotalLength()-W)/t.textContent.length-.15)+'px'};fit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit)});
/* 3D-карусель: тянуть, крутить, листать */
run(()=>{const rg=$('#rg'),rs=$('#rs'),cards=$$('.rc'),N=cards.length,step=360/N;rg.classList.add('jr');
const gR=()=>parseFloat(getComputedStyle(rg).getPropertyValue('--R'));let R=gR(),a=0,ta=0,drag=0,moved=0,lx=0,hov=0,last=-1;addEventListener('resize',()=>{R=gR()});
const fr=()=>((Math.round(-ta/step)%N)+N)%N,lbo=()=>/^#v\d/.test(location.hash),snap=()=>Math.round(ta/step)*step;
(function loop(){if(!drag&&!hov&&!lbo())ta-=.08;a+=(ta-a)*.09;rs.style.transform=`translateZ(${-R}px) rotateY(${a}deg)`;const i=fr();if(i!==last){last=i;$('#rb').textContent=cards[i].dataset.c;$('#rt').textContent=cards[i].dataset.t;$('#ro').href='#v'+i}requestAnimationFrame(loop)})();
rg.addEventListener('pointerdown',e=>{drag=1;moved=0;lx=e.clientX});
addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;moved+=Math.abs(d);ta+=d*.35});
addEventListener('pointerup',()=>{if(drag){drag=0;ta=snap()}});addEventListener('pointercancel',()=>{drag=0});
rg.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hov=1});rg.addEventListener('pointerleave',()=>{hov=0});
rg.addEventListener('click',e=>{if(moved>8){e.preventDefault();e.stopPropagation()}},true);
$('#rp').onclick=()=>{ta=snap()+step};$('#rn').onclick=()=>{ta=snap()-step}});
/* полноэкранный просмотр: клавиши и свайп */
run(()=>{const n=$$('.lbx').length,m=()=>location.hash.match(/^#v(\d+)$/),go=i=>{location.hash='#v'+((i+n)%n)};
addEventListener('keydown',e=>{const x=m();if(!x)return;if(e.key==='Escape')location.hash='#photos';if(e.key==='ArrowLeft')go(+x[1]-1);if(e.key==='ArrowRight')go(+x[1]+1)});
let sx=null;document.addEventListener('touchstart',e=>{sx=e.target.closest('.lbx')?e.touches[0].clientX:null},{passive:true});
document.addEventListener('touchend',e=>{const x=m();if(sx===null||!x)return;const d=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(d)>50)go(+x[1]+(d<0?1:-1))})});
/* калькулятор */
run(()=>{const f=n=>n.toLocaleString('ru-RU')+' ₽',gn=$('#gn'),gv=()=>Math.max(1,parseInt(gn.value)||1);
function calc(){const d=$('input[name=dy]:checked'),b=+d.value,ex=gv()>14?2000:0,s=$('#sa').checked?2000:0,k=$('#ku').checked?3000:0,r=[[d.dataset.n,b]];if(ex)r.push(['Доплата за гостей свыше 14 (указанная сумма)',ex]);if(s)r.push(['Сауна, 3 часа',s]);if(k)r.push(['Купель, 4 часа',k]);
$('#rs2').innerHTML=r.map(x=>`<div class="rw"><span>${x[0]}</span><b>${f(x[1])}</b></div>`).join('');$('#tot').textContent=f(b+ex+s+k)}
$('#mn').onclick=()=>{gn.value=Math.max(1,gv()-1);calc()};$('#pl').onclick=()=>{gn.value=gv()+1;calc()};
$$('input[name=dy],#sa,#ku,#gn').forEach(x=>{x.addEventListener('change',calc);x.addEventListener('input',calc)});calc()});
/* кнопки */
run(()=>{const D='Дом отдыха «ИЗБА» (IZBA BAZA OTDIHA73), Ульяновск, Нижняя терраса. Деревянный дом 132 м²: 4 спальни, 14 спальных мест + место для младенца, зал 42 м², сауна до 8 человек, беседка до 12 человек, мангал, закрытая территория, парковка до 5 авто. Аренда от 13 000 ₽ за сутки (до 14 человек). Телефон: +7 909 354-49-08.';
$('#cdc').onclick=()=>cp(D,'Описание скопировано');$('#cn').onclick=()=>cp('+7 909 354-49-08','Номер скопирован');
$('#sh').onclick=async()=>{const u=location.href.split('#')[0];if(navigator.share){try{await navigator.share({title:document.title,url:u})}catch(e){}}else cp(u,'Ссылка скопирована')};
const fv=$('#fv'),fs=on=>{fv.setAttribute('aria-pressed',on);fv.textContent=on?'♥ В избранном':'♡ В избранное'};try{fs(localStorage.getItem('izba-fav')==='1')}catch(e){}
fv.onclick=()=>{const on=fv.getAttribute('aria-pressed')!=='true';fs(on);try{localStorage.setItem('izba-fav',on?'1':'0')}catch(e){}toast(on?'Добавлено в избранное':'Удалено из избранного')};
$$('#lk a').forEach(a=>a.addEventListener('click',()=>{$('#mt').checked=false}))});
/* наклон карточек за курсором */
run(()=>{$$('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`});el.addEventListener('pointerleave',()=>{el.style.transform=''})})});
/* слова, параллакс, счётчики, появление */
run(()=>{const st=$('#st');st.innerHTML=st.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');const ws=$$('#st span'),px=$$('.px'),hi=$$('.bgi');let tk=0;
const sc=()=>{tk=0;const r=st.getBoundingClientRect(),p=clamp((innerHeight*.8-r.top)/(r.height+innerHeight*.3),0,1);ws.forEach((w,i)=>w.classList.toggle('l',i<p*ws.length*1.15));px.forEach(e=>{const q=e.parentNode.getBoundingClientRect();e.style.transform=`translateY(${(q.top+q.height/2-innerHeight/2)*-.12}px)`});hi.forEach(e=>{e.style.translate=`0 ${Math.min(scrollY,900)*.25}px`})};
addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(sc)},{passive:true});sc()});
run(()=>{const cu=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cu.unobserve(e.target);const n=+e.target.dataset.n,s=performance.now();(function g(t){const p=Math.min(1,(t-s)/1600);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(g)})(s)}),{threshold:.6});$$('[data-n]').forEach(e=>cu.observe(e))});
run(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});$$('.rv').forEach(e=>io.observe(e));H.classList.add('rvon')});
})();
