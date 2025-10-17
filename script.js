// MÚSICA DE FONDO
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");

btnMusica.addEventListener("click", () => {
  if(musica.paused) {
    musica.play().catch(() => {});
    btnMusica.textContent = "🔊 Música sonando";
  } else {
    musica.pause();
    btnMusica.textContent = "🎵 Reproducir música de fondo";
  }
});

// CANVAS MATRIX
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

    // Aleatoriamente insertar frases especiales
    if(Math.random() < 0.002) {
      text = specialTexts[Math.floor(Math.random() * specialTexts.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      continue;
    }

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
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
  }
}

typeTitle();
