// MÚSICA DE FONDO CON FADE
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");
let volumen = 0;

btnMusica.addEventListener("click", () => {
  musica.volume = 0;
  musica.play().catch(() => {});
  btnMusica.style.display = "none"; // Botón desaparece
  fadeIn();
});

function fadeIn() {
  if (volumen < 1) {
    volumen += 0.01;
    musica.volume = volumen;
    requestAnimationFrame(fadeIn);
  }
}

// CANVAS MATRIX CON LETRAS ESPECIALES
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^% ";
const specialTexts = ["Te quiero mucho", "Feliz cumpleaños"];
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for(let x = 0; x < columns; x++) {
  drops[x] = Math.random() * canvas.height;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for(let i = 0; i < drops.length; i++) {
    let text = letters.charAt(Math.floor(Math.random() * letters.length));

    // Letras especiales parpadeando
    if(Math.random() < 0.003) {
      text = specialTexts[Math.floor(Math.random() * specialTexts.length)];
      ctx.fillStyle = "#7CFC00";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.fillStyle = "#00ff00";
      continue;
    }

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Caída variable
    drops[i] += Math.random() * 1.2 + 0.5;
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ESCRITURA LETRA POR LETRA DEL MENSAJE CENTRAL
const tituloText = "Feliz Cumpleaños, [nombre] 🎉";
const mensajeText = "Hoy quiero que sepas lo mucho que te aprecio. Gracias por ser una amiga increíble y por todos los momentos compartidos. Espero que este día esté lleno de alegría, risas y sorpresas. 💚";

const tituloElem = document.getElementById("titulo");
const mensajeElem = document.getElementById("mensaje");

let tituloIndex = 0;
let mensajeIndex = 0;

function typeTitle() {
  if(tituloIndex < tituloText.length) {
    tituloElem.innerHTML += tituloText.charAt(tituloIndex);
    tituloIndex++;
    setTimeout(typeTitle, 100);
  } else {
    typeMessage();
  }
}

function typeMessage() {
  if(mensajeIndex < mensajeText.length) {
    mensajeElem.innerHTML += mensajeText.charAt(mensajeIndex);
    mensajeIndex++;
    setTimeout(typeMessage, 30);
  } else {
    launchConfetti();
  }
}

typeTitle();

// CONFETTI VERDE
function launchConfetti() {
  const confettiCount = 100;
  const confetti = [];
  for(let i=0;i<confettiCount;i++){
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 2,
      d: Math.random() * 4 + 1
    });
  }

  function drawConfetti() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw(); // dibuja matrix de fondo

    for(let i=0;i<confetti.length;i++){
      ctx.beginPath();
      ctx.arc(confetti[i].x, confetti[i].y, confetti[i].r, 0, Math.PI*2);
      ctx.fillStyle = "#00ff00";
      ctx.fill();
      ctx.closePath();

      confetti[i].y += confetti[i].d;
      if(confetti[i].y > canvas.height) confetti[i].y = 0;
    }
    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}
