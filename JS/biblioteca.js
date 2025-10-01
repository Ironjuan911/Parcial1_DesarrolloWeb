const template = document.getElementById('game-template');
const contenedor = document.getElementById("game-list");

const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
const bilblioteca = user.biblioteca;
const steamDB = new steamDataBase();



async function cargarBiblioteca() {
    for (const appId of bilblioteca) {
        const game = await steamDB.importarJuego(appId);
        const clone = template.content.cloneNode(true);
        clone.querySelector('.game-card__image').alt = game.name;
        clone.querySelector('.game-card__image').src = game.capsule_image;
        clone.querySelector('.game-card__title').innerHTML = game.name;
        clone.querySelector('.game-card__link').href = `../pages/game.html?appId=${game.steam_appid}`;
        contenedor.appendChild(clone);
    }
}

cargarBiblioteca();