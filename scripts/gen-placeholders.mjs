// Gera ilustrações provisórias (SVG). NÃO são fotografias — substitua pelas fotos reais no painel /admin.
import { writeFileSync } from 'node:fs'
function rng(seed){let s=seed;return()=>((s=(s*1664525+1013904223)%4294967296)/4294967296)}
function scene({seed,w=1600,h=1000,sky=['#f3e3c8','#d8c3a0'],mount=['#7d8f77','#5f7560','#3f5a48'],ground='#23382b',cabin=null,trees=14,fog=true}){
  const r=rng(seed);let o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#f3ece0" stop-opacity=".55"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#s)"/>`
  mount.forEach((c,i)=>{const base=h*(0.42+i*0.1);let d=`M0 ${h} L0 ${base}`;for(let x=0;x<=w;x+=80){d+=` L${x} ${base-r()*h*0.14-(2-i)*30}`}d+=` L${w} ${h} Z`;o+=`<path d="${d}" fill="${c}"/>`;if(fog)o+=`<rect y="${base-40}" width="${w}" height="110" fill="url(#f)"/>`})
  o+=`<path d="M0 ${h} L0 ${h*0.78} Q${w*0.4} ${h*0.7} ${w} ${h*0.8} L${w} ${h} Z" fill="${ground}"/>`
  if(cabin){const {x,y,s=1,wood='#6b4a2f',roof='#3a2a1c'}=cabin;const cw=360*s,ch=170*s;o+=`<g transform="translate(${x} ${y})"><rect width="${cw}" height="${ch}" fill="${wood}"/><rect x="${-12*s}" y="${-26*s}" width="${cw+24*s}" height="${30*s}" fill="${roof}"/><rect x="${30*s}" y="${30*s}" width="${cw*0.5}" height="${ch-60*s}" fill="#f6d79a" opacity=".92"/><rect x="${cw*0.62}" y="${30*s}" width="${cw*0.28}" height="${ch-60*s}" fill="#e9c783" opacity=".85"/><rect x="${-20*s}" y="${ch}" width="${cw+40*s}" height="${14*s}" fill="#4a3320"/></g>`}
  for(let i=0;i<trees;i++){const x=r()*w,th=h*(0.28+r()*0.3),y=h*(0.82+r()*0.14),tw=th*0.38;const c=['#1f3a2a','#2b4a35','#183024'][i%3];o+=`<g fill="${c}"><rect x="${x-6}" y="${y-th*0.15}" width="12" height="${th*0.15}" fill="#3a2a1c"/>`;for(let k=0;k<4;k++){const yy=y-th*0.15-k*th*0.2,ww=tw*(1-k*0.2);o+=`<path d="M${x-ww/2} ${yy} L${x} ${yy-th*0.3} L${x+ww/2} ${yy} Z"/>`}o+=`</g>`}
  return o+`</svg>`}
const warm=['#f6dcb0','#e2b98a'],cool=['#dfe8e4','#b9c9c2'],dusk=['#f1c9a0','#b9877a']
const defs={
 'hero':{seed:11,sky:warm,cabin:{x:880,y:560,s:1.4},trees:16},
 'sobre':{seed:22,sky:cool,trees:20,fog:true},
 'cabana-bosque':{seed:33,sky:cool,mount:['#6f8470','#516a56','#35503f'],cabin:{x:520,y:600,s:1.3},trees:22},
 'cabana-mirante':{seed:44,sky:dusk,mount:['#9a8f86','#6c7a6d','#44594a'],cabin:{x:300,y:610,s:1.2,wood:'#8a6a47'},trees:10},
 'exp-privacidade':{seed:55,sky:cool,trees:26},
 'exp-natureza':{seed:66,sky:warm,trees:30,mount:['#8a9a7a','#6a8061','#46604c']},
 'exp-momentos':{seed:77,sky:dusk,cabin:{x:900,y:620,s:1},trees:12},
 'galeria-1':{seed:88,sky:warm,cabin:{x:200,y:600,s:1.5},trees:12},
 'galeria-2':{seed:99,sky:cool,trees:18,mount:['#a3b0a0','#7c9179','#556f5b']},
 'galeria-3':{seed:111,sky:dusk,trees:8},
 'galeria-4':{seed:122,sky:warm,cabin:{x:700,y:640,s:.9},trees:24},
 'galeria-5':{seed:133,sky:cool,trees:34,fog:false},
 'galeria-6':{seed:144,sky:warm,mount:['#8d9f86','#657d63','#41594a'],trees:6},
 'cta':{seed:155,sky:dusk,cabin:{x:620,y:590,s:1.3},trees:20},
}
for(const[k,v]of Object.entries(defs))writeFileSync(`public/images/${k}.svg`,scene(v))
