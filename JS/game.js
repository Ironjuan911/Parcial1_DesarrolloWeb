const template = document.getElementById("game-template");
const contenedor = document.getElementById("game-content");

const steamDB = new steamDataBase();

// 1. Obtener la cadena de consulta (query string) de la URL actual
const queryString = window.location.search;
// 2. Crear un objeto URLSearchParams
// Esto facilita la lectura de los parámetros
const urlParams = new URLSearchParams(queryString);

const appId = urlParams.get('appId'); // 'appId' es el nombre del parámetro que esperamos

async function cargarJuego(appId) {
    const game = await steamDB.importarJuego(appId);
    if (game.sussess) {
        const clone = template.content.cloneNode(true);
        clone.querySelector('title').textContent = game.name;
        clone.querySelector('description').textContent = game.short_description;
        clone.querySelector('img').src = game.capsule_image;
        clone.querySelector('img').alt = game.name;
        clone.querySelector('price').textContent = game.is_free ? "Gratis" : `$${game.price_overview.final / 100}`;
        contenedor.appendChild(clone);
    
        clone.querySelector('').textContent
    }
}