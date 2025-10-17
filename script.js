// ELEMENTOS
const musica = document.getElementById("musica");
const btnInicio = document.getElementById("btn-inicio");
const btnSiguiente = document.getElementById("btn-siguiente");
const scene = document.querySelector(".scene");

// MENSAJES
const mensajes = [
  {titulo:"🎉 ¡Feliz Cumpleaños, Aleeee!", mensaje:"Espero que puedas disfrutar este dia increible, ere increible y espero no lo hayas olvidado", color:"#00ff00"},
  {titulo:"Que tengas muchas alegrias en tu vida, te deseo lo mejor", mensaje:"Espero puedas tener muchas aventuras y divertirte con los compas 🎈", color:"#7CFC00"},
  {titulo:"🌟 Sylus estaria orgulloso de tí", mensaje:"No gastes mucho tu dinero y trata de ahorrar mamita 💫", color:"#00ffff"}
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

for (let x = 0; x < columns; x++) {
  drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let text = letters.charAt(Math.floor(Math.random() * letters.length));
    if (Math.random() < 0.003) {
      text = specialTexts[Math.floor(Math.random() * specialTexts.length)];
      ctx.fillStyle = "#7CFC00";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.fillStyle = "#00ff00";
      continue;
    }
    ctx.fillStyle = "#00ff00";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i] += Math.random() * 1.2 + 0.5;
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Tipeo natural
function typeMessage(cartaDiv, tituloText, mensajeText) {
  const tituloElem = cartaDiv.querySelector("h1");
  const mensajeElem = cartaDiv.querySelector("p");
  let tIndex = 0;
  let mIndex = 0;

  function typeTitulo() {
    if (tIndex < tituloText.length) {
      tituloElem.innerHTML += tituloText.charAt(tIndex);
      tIndex++;
      setTimeout(typeTitulo, 80 + Math.random() * 40);
    } else typeCuerpo();
  }

  function typeCuerpo() {
    if (mIndex < mensajeText.length) {
      mensajeElem.innerHTML += mensajeText.charAt(mIndex);
      mIndex++;
      setTimeout(typeCuerpo, 25 + Math.random() * 20);
    } else {
      launchConfetti();
      launchGlobos();
      showSorpresa();
      btnSiguiente.style.display = "block";
    }
  }

  typeTitulo();
}

// Confetti multicolor
function launchConfetti() {
  const confettiCount = 120;
  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 2,
      d: Math.random() * 4 + 1,
      color: `hsl(${Math.random()*360}, 100%, 50%)`
    });
  }

  function drawConfetti() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix();

    for (let i = 0; i < confetti.length; i++) {
      ctx.beginPath();
      ctx.arc(confetti[i].x, confetti[i].y, confetti[i].r, 0, Math.PI * 2);
      ctx.fillStyle = confetti[i].color;
      ctx.fill();
      ctx.closePath();
      confetti[i].y += confetti[i].d;
      if (confetti[i].y > canvas.height) confetti[i].y = 0;
    }
    requestAnimationFrame(drawConfetti);
  }
  drawConfetti();
}

// Globos flotando
function launchGlobos() {
  const globoCount = 5;
  const globos = [];
  for (let i = 0; i < globoCount; i++) {
    globos.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      r: 15 + Math.random() * 10,
      color: `hsl(${Math.random()*360}, 100%, 50%)`,
      speed: 1 + Math.random() * 2
    });
  }

  function drawGlobos() {
    for (let i = 0; i < globos.length; i++) {
      ctx.beginPath();
      ctx.arc(globos[i].x, globos[i].y, globos[i].r, 0, Math.PI*2);
      ctx.fillStyle = globos[i].color;
      ctx.fill();
      ctx.closePath();
      globos[i].y -= globos[i].speed;
      if (globos[i].y + globos[i].r < 0) globos[i].y = canvas.height;
    }
    requestAnimationFrame(drawGlobos);
  }
  drawGlobos();
}

// Mensaje sorpresa
function showSorpresa() {
  const sorpresa = document.createElement("div");
  const emojis = ["🎁", "🎈", "✨", "💖"];
  sorpresa.textContent = emojis[Math.floor(Math.random()*emojis.length)] + " Sorpresa!";
  sorpresa.className = "sorpresa";
  document.body.appendChild(sorpresa);
  setTimeout(()=>sorpresa.remove(), 2000);
}

// Música fade in
function fadeInMusica() {
  let vol = 0;
  function increase() {
    if (vol < 1) {
      vol += 0.01;
      musica.volume = vol;
      requestAnimationFrame(increase);
    }
  }
  increase();
}

// BOTÓN INICIO
btnInicio.addEventListener("click", () => {
  musica.volume = 0;
  musica.play().catch(()=>{});
  fadeInMusica();
  btnInicio.style.display = "none";

  // Botón flotante de música
  const musicToggle = document.createElement("button");
  musicToggle.id = "music-toggle";
  musicToggle.textContent = "⏸️ Pausar música";
  document.body.appendChild(musicToggle);

  musicToggle.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      musicToggle.textContent = "⏸️ Pausar música";
    } else {
      musica.pause();
      musicToggle.textContent = "🎵 Reanudar música";
    }
  });

  const cartaDiv = document.querySelector(".carta.active");
  cartaDiv.style.color = mensajes[mensajeActual].color;
  typeMessage(cartaDiv, mensajes[mensajeActual].titulo, mensajes[mensajeActual].mensaje);
});

// BOTÓN SIGUIENTE MENSAJE
btnSiguiente.addEventListener("click", () => {
  btnSiguiente.style.display = "none";

  const current = document.querySelector(".carta.active");
  current.classList.remove("active");
  current.classList.add("exit");

  mensajeActual++;

  if (mensajeActual >= mensajes.length) {
    // Mensaje final
    setTimeout(() => {
      const finalMsg = document.createElement("div");
      finalMsg.className = "final";
      finalMsg.innerHTML = `
        <h1>🎂 ¡Feliz cumpleaños, [nombre]! 🎂</h1>
        <p>Gracias por ser una persona increíble. 💚</p>
      `;
      document.body.appendChild(finalMsg);
    }, 1000);
    return;
  }

  const next = document.createElement("div");
  next.className = "carta enter active";
  next.style.color = mensajes[mensajeActual].color;
  next.innerHTML = `<h1></h1><p></p>`;
  scene.appendChild(next);

  setTimeout(() => {
    current.remove();
    typeMessage(next, mensajes[mensajeActual].titulo, mensajes[mensajeActual].mensaje);
    next.classList.remove("enter");
  }, 1000);
});

