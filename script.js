// ELEMENTOS
const musica = document.getElementById("musica");
const btnInicio = document.getElementById("btn-inicio");
const btnSiguiente = document.getElementById("btn-siguiente");
const scene = document.querySelector(".scene");

// MENSAJES
const mensajes = [
  {titulo:"Feliz Cumpleaños, [nombre] 🎉", mensaje:"Hoy quiero que sepas lo mucho que te aprecio. Gracias por ser una amiga increíble y por todos los momentos compartidos. 💚", color:"#00ff00"},
  {titulo:"Que tengas un año lleno de alegría 💚", mensaje:"Espero que cada día esté lleno de risas y aventuras emocionantes. 🎈", color:"#7CFC00"},
  {titulo:"Gracias por ser tan especial 🌟", mensaje:"Nunca olvides lo valiosa que eres y cuánto te aprecio. 💫", color:"#00ffff"}
];

let mensajeActual = 0;

// MATRIX CANVAS
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^% ";
const specialTexts = ["Te quiero mucho", "Feliz cumpleaños"];
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for(let x=0;x<columns;x++){
  drops[x]=Math.random()*canvas.height;
}

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){
    let text = letters.charAt(Math.floor(Math.random()*letters.length));

    if(Math.random() < 0.003){
      text = specialTexts[Math.floor(Math.random()*specialTexts.length)];
      ctx.fillStyle = "#7CFC00";
      ctx.fillText(text,i*fontSize,drops[i]*fontSize);
      ctx.fillStyle = "#00ff00";
      continue;
    }

    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    drops[i] += Math.random()*1.2+0.5;
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
  }
}

setInterval(drawMatrix,50);
window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// FUNCIONES DE ESCRITURA
function typeMessage(cartaDiv, tituloText, mensajeText){
  const tituloElem = cartaDiv.querySelector("h1");
  const mensajeElem = cartaDiv.querySelector("p");
  let tIndex = 0;
  let mIndex = 0;

  function typeTitulo(){
    if(tIndex<tituloText.length){
      tituloElem.innerHTML += tituloText.charAt(tIndex);
      tIndex++;
      setTimeout(typeTitulo,100);
    } else {
      typeCuerpo();
    }
  }

  function typeCuerpo(){
    if(mIndex<mensajeText.length){
      mensajeElem.innerHTML += mensajeText.charAt(mIndex);
      mIndex++;
      setTimeout(typeCuerpo,30);
    } else {
      launchConfetti();
      btnSiguiente.style.display="block";
    }
  }

  typeTitulo();
}

// CONFETTI
function launchConfetti(){
  const confettiCount=100;
  const confetti=[];
  for(let i=0;i<confettiCount;i++){
    confetti.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*4+2,d:Math.random()*4+1});
  }

  function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawMatrix();
    for(let i=0;i<confetti.length;i++){
      ctx.beginPath();
      ctx.arc(confetti[i].x,confetti[i].y,confetti[i].r,0,Math.PI*2);
      ctx.fillStyle="#00ff00";
      ctx.fill();
      ctx.closePath();
      confetti[i].y += confetti[i].d;
      if(confetti[i].y>canvas.height) confetti[i].y=0;
    }
    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}

// BOTÓN INICIO
btnInicio.addEventListener("click",()=>{
  // Música fade in
  musica.volume=0;
  musica.play().catch(()=>{});
  fadeInMusica();
  btnInicio.style.display="none";

  // Primer mensaje
  const cartaDiv = document.querySelector(".carta.active");
  cartaDiv.style.color=mensajes[mensajeActual].color;
  typeMessage(cartaDiv,mensajes[mensajeActual].titulo,mensajes[mensajeActual].mensaje);
});

function fadeInMusica(){
  let vol=0;
  function increase(){
    if(vol<1){
      vol+=0.01;
      musica.volume=vol;
      requestAnimationFrame(increase);
    }
  }
  increase();
}

// BOTÓN SIGUIENTE MENSAJE
btnSiguiente.addEventListener("click",()=>{
  btnSiguiente.style.display="none";

  const current = document.querySelector(".carta.active");
  current.classList.remove("active");
  current.classList.add("exit");

  mensajeActual = (mensajeActual+1)%mensajes.length;

  const next = document.createElement("div");
  next.className = "carta enter active";
  next.style.color=mensajes[mensajeActual].color;
  next.innerHTML=`<h1></h1><p></p>`;
  scene.appendChild(next);

  setTimeout(()=>{
    current.remove();
    typeMessage(next,mensajes[mensajeActual].titulo,mensajes[mensajeActual].mensaje);
    next.classList.remove("enter");
  },1000);
});
