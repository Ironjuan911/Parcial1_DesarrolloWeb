// 1. Definir la clase del Web Component
class MiGame extends HTMLElement {
    constructor() {
        // Llamar siempre a super() primero en el constructor
        super();

        // 2. Adjuntar el Shadow DOM para encapsulación
        // 'open' significa que se puede acceder al Shadow DOM desde JavaScript externo.
        this.attachShadow({ mode: 'open' });
    }

    // 3. Método del ciclo de vida: Se invoca cuando el componente se añade al DOM del documento
    connectedCallback() {
        this.render();
    }

    // Método para definir la estructura interna del componente
    render() {
    const title = this.getAttribute('title') || 'Título por defecto';
    const appId = this.getAttribute('steam_appid') || 'Descripción por defecto';
    const imageUrl = this.getAttribute('image-url') || 'https://via.placeholder.com/150';
    const price = this.getAttribute('price') || '';


        // Estructura y Estilos encapsulados
        this.shadowRoot.innerHTML = `
                        <style>
                            /* Hacer que cada elemento ocupe el ancho del contenedor para lista vertical */
                                            :host { display: block; margin: 6px 0; }
                                            .card {
                                                width: 100%;
                                                max-width: var(--product-card-width, 820px);
                                                height: var(--product-card-height, 180px); /* altura uniforme */
                                                margin: 0; /* alinear a la izquierda del contenedor */
                                                background: rgba(255,255,255,0.03);
                                                border-radius: 8px;
                                                overflow: hidden;
                                                transition: transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms, filter 260ms;
                                                cursor: pointer;
                                                box-shadow: 0 4px 12px rgba(2,6,23,0.25);
                                                text-align: left;
                                                display: flex;
                                                gap: 18px;
                                                align-items: center;
                                                padding: 12px;
                                            }
                                            .left{ display:flex; flex-direction:column; gap:8px; align-items:center; justify-content:center; }
                                            /* Imagen definida por variable; mantener proporción sin recortar */
                                            .card img{ width: var(--product-image-width, 260px); height: calc(var(--product-card-height,180px) - 36px); object-fit: contain; border-radius:6px; display:block; }
                                            .card h3{ margin: 0; font-size: 18px; color: #e6eef8; text-align: left; }
                                            .card .meta{ padding: 6px 0 10px 0; display:flex; flex-direction:column; }
                                            .card .price{ margin-top:8px; font-size:16px; color:#9be5e2; font-weight:700; }
                                            .right{ display:flex; align-items:center; }
                            .card .meta{ flex: 1 1 auto; }
                            /* Hover / focus: brillo sutil y elevación */
                            .card:hover, .card:focus-visible {
                                transform: translateY(-6px) scale(1.005);
                                box-shadow: 0 20px 40px rgba(2,6,23,0.45), 0 0 18px rgba(108,211,208,0.12);
                                filter: drop-shadow(0 6px 18px rgba(108,211,208,0.06));
                            }
                            .card:active, .card.active{
                                transform: translateY(-8px) scale(1.02);
                                box-shadow: 0 18px 30px rgba(2,6,23,0.45);
                            }
                            a { color: inherit; text-decoration: none; display:block; width:100%; }
                        </style>

            <div class="card" tabindex="0">
                <div class="left">
                    <a href="../pages/game.html?appId=${appId}">
                        <img src="${imageUrl}" alt="${title}" />
                    </a>
                </div>
                <div class="right">
                    <div class="meta">
                        <h3>${title}</h3>
                        <div class="price">${price}</div>
                    </div>
                </div>
            </div>
        `;

        // Añadir comportamiento: al hacer click, aplicar una clase active que produce movimiento
        const card = this.shadowRoot.querySelector('.card');
        // Ocultar precio si no se pasó (evitar mostrar un div vacío)
        try {
            const priceEl = this.shadowRoot.querySelector('.price');
            if (!price || !price.trim()) {
                if (priceEl) priceEl.style.display = 'none';
            }
        } catch (e) {}
        // Permitir también activar con teclado (Enter)
        card.addEventListener('click', (e) => {
            // animación visual breve
            card.classList.add('active');
            setTimeout(() => card.classList.remove('active'), 300);
            // Dejar que el enlace maneje la navegación
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                card.classList.add('active');
                setTimeout(() => card.classList.remove('active'), 300);
                // Simular click en el enlace interno
                const anchor = this.shadowRoot.querySelector('a');
                if (anchor) anchor.click();
            }
        });
    }

    // Opcional: Si quieres reaccionar a cambios en atributos específicos
    static get observedAttributes() {
        return ['titulo'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'titulo' && oldValue !== newValue) {
            this.render(); // Volver a renderizar si el título cambia
        }
    }
}

// 4. Registrar el elemento personalizado con el navegador
// El nombre de la etiqueta DEBE contener un guion (-).
customElements.define('mi-game', MiGame);

/**
 * Importa los detalles de un juego de Steam usando su AppID.
 * @param {number} appId - El ID único de la aplicación (juego) de Steam.
 * @returns {Promise<object|null>} Una promesa que se resuelve con los datos del juego o null si falla.
 */


async function mostrarJuegos() {
    const gameList = await fetch('../data/gameList.json').then(res => res.json());
    const productList = document.getElementById('product-list');
    const steamDB = new steamDataBase();

    // Iterar sobre cada juego en la lista y crear un componente personalizado para cada uno
    for (const idgame of gameList) {
        const gameData = await steamDB.importarJuego(idgame.id);
        const priceText = gameData.is_free ? 'Gratis' : (gameData.price_overview ? `$${(gameData.price_overview.final/100).toFixed(2)}` : 'Precio no disponible');
        productList.innerHTML += `<mi-game
            title = "${gameData.name}"
            steam_appid = "${gameData.steam_appid}"
            image-url = "${gameData.capsule_image}"
            price = "${priceText}"
        >
        </mi-game>`;
    }
}

mostrarJuegos();