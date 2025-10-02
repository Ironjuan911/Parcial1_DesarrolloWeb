const template = document.getElementById('game-template');
const contenedor = document.getElementById("game-list");

const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
const bilblioteca = user.biblioteca;
const steamDB = new steamDataBase();



async function cargarBiblioteca() {
    for (const appId of bilblioteca) {
        const game = await steamDB.importarJuego(appId);
        // Si el web component <mi-game> está disponible, usarlo para mantener la misma UI que en Productos
        if (window.customElements && customElements.get('mi-game')) {
            const el = document.createElement('mi-game');
            el.setAttribute('title', game.name);
            el.setAttribute('steam_appid', game.steam_appid);
            el.setAttribute('image-url', game.capsule_image);
            // No le pasamos price para la biblioteca
            contenedor.appendChild(el);
        } else {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.game-card__image').alt = game.name;
            clone.querySelector('.game-card__image').src = game.capsule_image;
            clone.querySelector('.game-card__title').innerHTML = game.name;
            clone.querySelector('.game-card__link').href = `../pages/game.html?appId=${game.steam_appid}`;
            contenedor.appendChild(clone);
        }
    }
}

cargarBiblioteca();