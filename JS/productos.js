
class MiGame extends HTMLElement {
    constructor() {

        super();


        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        this.render();
    }


    render() {
        const title = this.getAttribute('title') || 'Título por defecto';
        const appId = this.getAttribute('steam_appid') || '0';
        const imageUrl = this.getAttribute('image-url') || 'https://via.placeholder.com/320x200?text=Imagen+no+disponible';
        const price = this.getAttribute('price') || 'Gratis';
        const description = this.getAttribute('description') || 'Descubre este increíble juego lleno de aventuras y diversión.';


        this.shadowRoot.innerHTML = `
            <style>

                @import url('../CSS/generalStyles.css');
            </style>
            
            <a href="../pages/game.html?appId=${appId}" class="game-card">
                <div class="game-card-content">
                    <img src="${imageUrl}" alt="${title}" class="game-card__image">
                    <div class="game-card__info">
                        <h3 class="game-card__title">${title}</h3>
                        <p class="game-card__description">${description}</p>
                        <div class="game-card__price ${price === 'Gratis' ? 'free' : ''}">${price}</div>
                    </div>
                </div>
            </a>
        `;
    }


    static get observedAttributes() {
        return ['title', 'steam_appid', 'image-url', 'price', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot) {
            this.render();
        }
    }
}


customElements.define('mi-game', MiGame);


async function mostrarJuegos() {
    try {
        const gameList = await fetch('../data/gameList.json').then(res => res.json());
        const productList = document.getElementById('product-list');
        const steamDB = new steamDataBase();


        if (!productList) {
            console.error('Elemento product-list no encontrado');
            return;
        }


        productList.innerHTML = '';


        for (const idgame of gameList) {
            try {
                const gameData = await steamDB.importarJuego(idgame.id);
                

                if (!gameData || !gameData.name) {
                    console.warn(`No se pudieron obtener datos para el juego ID: ${idgame.id}`);
                    continue;
                }

                let textPrice = "";

                if (gameData.is_free) {
                    textPrice = "Gratis";
                } else {
                    try {
                        textPrice = `$${(gameData.price_overview.final / 100).toFixed(2)}`;
                    } catch (error) {
                        textPrice = "Precio no disponible";
                    }
                }


                const cleanTitle = gameData.name.replace(/"/g, '&quot;');
                const cleanDescription = (gameData.short_description || 'Descubre este increíble juego lleno de aventuras y diversión.').replace(/"/g, '&quot;');

                productList.innerHTML += `<mi-game
                    title="${cleanTitle}"
                    steam_appid="${gameData.steam_appid}"
                    image-url="${gameData.capsule_image}"
                    price="${textPrice}"
                    description="${cleanDescription}"
                ></mi-game>`;
            } catch (gameError) {
                console.error(`Error al procesar juego ID ${idgame.id}:`, gameError);
            }
        }
    } catch (error) {
        console.error('Error al mostrar juegos:', error);
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Error al cargar los juegos. Por favor, recarga la página.</p>';
        }
    }
}

mostrarJuegos();