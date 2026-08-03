var block;
(()=>{'use strict';
const q=s=>document.querySelector(s),M=(T,c,e=.1)=>new T.MeshStandardMaterial({color:c,roughness:.55,metalness:.15,emissive:c,emissiveIntensity:e});
function panel(t,h){let p=q('#w20');if(!p)return World3D.msg(t);q('#w20t').textContent=t;q('#w20body').innerHTML=h;p.classList.add('on');document.exitPointerLock?.()}
function addRep(n,v){let k='nm_w20',s={};try{s=JSON.parse(localStorage.getItem(k)||'{}')}catch{}s.rep=s.rep||{};s.rep[n]=Math.min(100,(s.rep[n]||0)+v);localStorage.setItem(k,JSON.stringify(s))}
function extras(W){if(W.P20)return;W.P20=true;const T=W.THREE;
 const areas=[['НЕОНОВАЯ АРКАДА',-28,-22,0x33f2ff,['Mistral','ChatGPT','Grok','Зая']],['АРХИВНАЯ БАШНЯ',28,-22,0xffc24b,['Kimi','Claude','Perplexity','Codex']],['ПОДВОДНЫЙ ДОК',-28,22,0x33ddff,['DeepSeek','Gemma','Зая','Kimi']],['СЦЕНА ЭФИРА',28,22,0xff3df2,['Gemma','Grok','Mistral','ChatGPT']]];
 areas.forEach(([zone,x,z,c,owners])=>{
  const lift=new T.Mesh(new T.CylinderGeometry(1.15,1.15,.18,24),M(T,0xffc24b,.65));lift.position.set(x+4,8.35,z);lift.userData={t:'liftPatch',to:[x+4,1.7,z],n:zone};W.scene.add(lift);W.interactables.push(lift);
  for(let i=0;i<4;i++){const a=i/4*Math.PI*2,door=new T.Mesh(new T.PlaneGeometry(1.15,1.9),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.9}));door.position.set(x+Math.sin(a)*4,9.35,z+Math.cos(a)*4);door.lookAt(x,9.35,z);door.userData={t:'roomPatch',owner:owners[i],zone};W.scene.add(door);W.interactables.push(door)}
 });
 const arenaBase=new T.Mesh(new T.CylinderGeometry(4.2,4.5,.5,40),M(T,0x2b1020,.18));arenaBase.position.set(37,.22,30);W.scene.add(arenaBase);
 const arena=new T.Mesh(new T.TorusGeometry(3.2,.22,12,48),M(T,0xff4d6b,.9));arena.rotation.x=Math.PI/2;arena.position.set(37,.55,30);arena.userData={t:'arenaPatch'};W.scene.add(arena);W.interactables.push(arena);
 const club=new T.Mesh(new T.CylinderGeometry(3.2,3.2,.3,32),M(T,0xff3df2,.3));club.position.set(24,.16,31);club.userData={t:'clubPatch'};W.scene.add(club);W.interactables.push(club);
 for(let i=-2;i<=2;i++){const l=new T.SpotLight(i%2?0x33f2ff:0xff3df2,18,14,.42,.55);l.position.set(24+i*1.3,5,28);l.target.position.set(24,.1,31);W.scene.add(l,l.target)}
 const finalArt=W.interactables.find(o=>o.userData&&o.userData.t==='art'&&o.userData.id==='a11');if(finalArt)finalArt.position.y=17.8;
 World3D.msg('Дополнение активировано: личные комнаты, верхние лифты, арена и ночной клуб.');
}
function boot(){const W=window.World3D;if(!W||!W.w20)return setTimeout(boot,80);if(W.w20patch)return;W.w20patch=true;const oi=W.init.bind(W),od=W.doInteract.bind(W);W.init=async function(){await oi();extras(this)};W.doInteract=function(){const u=this.cur?.userData;if(u?.t==='liftPatch'){this.pos.set(...u.to);this.msg('Лифт вернул тебя на нижний уровень.');return}if(u?.t==='roomPatch'){addRep(u.owner,6);this.msg('Личная комната '+u.owner+' · '+u.zone+'. Здесь хранятся заметки, трофеи и предметы персонажа.');return}if(u?.t==='arenaPatch'){const A=['Grok','Claude','DeepSeek','Mistral','Gemma','Kimi','Зая','ChatGPT'],a=A[Math.random()*A.length|0],b=A.filter(x=>x!==a)[Math.random()*(A.length-1)|0],w=Math.random()>.5?a:b;addRep(w,8);panel('Арена нейромафии',`<p><b>${a}</b> против <b>${b}</b></p><h3>Победитель: ${w}</h3><p>Дуэль рассчитала логику, харизму, выживаемость и случайный хаос.</p>`);return}if(u?.t==='clubPatch'){panel('Ночной клуб Базарии','<p>Световые лучи включены. На сцене начинается импровизированный концерт NPC.</p><p>Здесь можно запустить ритм-игру через главную Сцену эфира.</p>');return}od()};}
boot();
})();
