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
    if (true) {
        console.log("Cargando juego:");

        contenedor.querySelector('.title').textContent = game.name;
        contenedor.querySelector('.description').textContent = game.short_description;
        contenedor.querySelector('.thumbnail').src = game.capsule_image;
        contenedor.querySelector('.thumbnail').alt = game.name;
        contenedor.querySelector('.price').textContent = game.is_free ? "Gratis" : `$${game.price_overview.final / 100}`;

    }
}

cargarJuego(appId);