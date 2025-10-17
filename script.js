const musica = document.getElementById("musica");
const btnSiguiente = document.getElementById("btn-siguiente");
const scene = document.querySelector(".scene");

// Mensajes
const mensajes = [
  {titulo:"🎉 ¡Feliz cuuum Ale! 🎉", mensaje:"Ojala hayas disfrutado este dia corazon, te lo mereces", color:"#00ff00"},
  {titulo:"Ojala puedas superar tu migajerismo", mensaje:"espero que siempre te rodeen cosas buenas, y puedas sonreir en todo momento", color:"#7CFC00"},
  {titulo:"Y como siempre te dije", mensaje:"Eres alguien increible mija, por to lo q te esforzai y dema, tqm, ahora me voy a dormir q toy hecho vrga", color:"#00ffff"}
];

let mensajeActual = 0;

// Matrix
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({length: columns}, () => Math.random() * canvas.height);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + "px monospace";
  ctx.fillStyle = "#00ff00";

  drops.forEach((y, i) => {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, y * fontSize);
    drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
  });
}
setInterval(drawMatrix, 50);

// Efecto de tipeo
function typeMessage(carta, tituloText, mensajeText) {
  const h1 = carta.querySelector("h1");
  const p = carta.querySelector("p");
  h1.textContent = "";
  p.textContent = "";

  let i = 0, j = 0;
  function typeTitulo() {
    if (i < tituloText.length) {
      h1.textContent += tituloText[i++];
      setTimeout(typeTitulo, 80);
    } else typeMensaje();
  }
  function typeMensaje() {
    if (j < mensajeText.length) {
      p.textContent += mensajeText[j++];
      setTimeout(typeMensaje, 25);
    } else btnSiguiente.style.display = "block";
  }
  typeTitulo();
}

// Botón siguiente
btnSiguiente.addEventListener("click", () => {
  btnSiguiente.style.display = "none";
  const current = document.querySelector(".carta.active");
  current.classList.remove("active");
  current.classList.add("exit");

  mensajeActual++;
  if (mensajeActual >= mensajes.length) {
    setTimeout(() => {
      const finalMsg = document.createElement("div");
      finalMsg.className = "final";
      finalMsg.innerHTML = `<h1>🎂 ¡Feliz cumple, Ale! 🎂</h1><p>Gracias por ser una persona increíble 💚</p>`;
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

// Inicia automáticamente
window.addEventListener("load", () => {
  musica.volume = 0.3;
  musica.play().catch(()=>{});
  const carta = document.querySelector(".carta");
  carta.style.color = mensajes[mensajeActual].color;
  typeMessage(carta, mensajes[mensajeActual].titulo, mensajes[mensajeActual].mensaje);
});

