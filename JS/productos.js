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


        // Estructura y Estilos encapsulados
        this.shadowRoot.innerHTML = `

            <div>
                <a href="../Pages/game.html?appId=${appId}">
                    <img src="${imageUrl}" alt="${title}" />
                    <h3>${title}</h3>
                <a>
            </div>
        `;
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
        productList.innerHTML += `<mi-game
            title = "${gameData.name}"
            steam_appid = "${gameData.steam_appid}"
            image-url = "${gameData.capsule_image}"
        >
        </mi-game>`;
    }
}

mostrarJuegos();