const contenedor = document.getElementById("game-content");

const steamDB = new steamDataBase();


const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const appId = urlParams.get('appId');

async function cargarJuego(appId) {
    const game = await steamDB.importarJuego(appId);
    if (true) {
        console.log("Cargando juego:");

        contenedor.querySelector('.background-image').src = game.background;

        let textPrice = "";

        if (game.is_free) {
            textPrice = "Gratis";
        } else {
            try{
                textPrice = `$${game.price_overview.final / 100}`
            } catch (error) {
                textPrice = "No disponible";
            }
        }

        contenedor.querySelector('.title').innerHTML += game.name;
        contenedor.querySelector('.short_description').innerHTML += game.short_description;
        contenedor.querySelector('.thumbnail').src = game.header_image;
        contenedor.querySelector('.thumbnail').alt = game.name;
        contenedor.querySelector('.price').innerHTML += textPrice;
        contenedor.querySelector('.detailed_description').innerHTML += game.about_the_game || "No disponible";
        contenedor.querySelector('.min-pc_requirements').innerHTML += game.pc_requirements.minimum || "No disponible";
        contenedor.querySelector('.recomended-pc_requirements').innerHTML += game.pc_requirements.recommended || "No disponible";

        const btnComprar = contenedor.querySelector('.btn--buyGame');
        btnComprar.addEventListener('click', function() {
            if (localStorage.getItem('usuarioLogueado')) {
                const dataMgr = new dataManager();
                dataMgr.buygame(game.steam_appid);
                window.location.href = "../pages/productos.html";
            } else {
                alert("Debes iniciar sesion para comprar el juego.");
                window.location.href = "../pages/login.html";
            }
        });
    }
}



cargarJuego(appId);