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
        const description = this.getAttribute('description') || 'Descripción por defecto';
        const imageUrl = this.getAttribute('image-url') || 'https://via.placeholder.com/150';


        // Estructura y Estilos encapsulados
        this.shadowRoot.innerHTML = `

            <div>
            <img src="${imageUrl}" alt="${title}" />
            <h3>${title}</h3>
            <p>${description}</p>

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
async function importarJuegoDeSteam(appId) {
    if (!appId) {
        console.error("Error: Se requiere un AppID.");
        return null;
    }

    const url = `https://api.allorigins.win/raw?url=https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es`;

    console.log(`Consultando API para AppID: ${appId}`);

    try {
        // 2. Realizar la solicitud HTTP
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            // Manejar errores de red (ej. 404, 500)
            console.error(`Error de solicitud HTTP: ${respuesta.status} ${respuesta.statusText}`);
            return null;
        }

        const datosJSON = await respuesta.json();

        // 3. Procesar la respuesta JSON
        // La respuesta contiene el AppID como clave principal, e.g., {"440": {...}}
        const resultado = datosJSON[appId];

        if (resultado && resultado.success) {
            // Éxito: devolver el objeto 'data' con todos los detalles del juego
            console.log(`Datos del juego ${appId} importados con éxito.`);
            return resultado.data;
        } else {
            // Fallo en la API (ej. el AppID no existe o no es un juego)
            console.error(`La API de Steam no devolvió datos exitosos para el AppID ${appId}.`);
            return null;
        }

    } catch (error) {
        // Manejar errores de conexión o parsing
        console.error("Error al importar el juego:", error);
        return null;
    }
}

async function mostrarJuegos() {
    const gameList = await fetch('../data/gameList.json').then(res => res.json());
    const productList = document.getElementById('product-list');

    // Iterar sobre cada juego en la lista y crear un componente personalizado para cada uno
    for (const idgame of gameList) {
        const gameData = await importarJuegoDeSteam(idgame.id);
        productList.innerHTML += `<mi-game
            title = "${gameData.name}"
            description = "${gameData.short_description}"
            image-url = "${gameData.header_image}"
        >
    </mi-game>`;
    }
}

mostrarJuegos();