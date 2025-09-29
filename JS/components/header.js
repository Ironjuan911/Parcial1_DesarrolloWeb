// 1. Definir la clase del Web Component
class MiLink extends HTMLElement {
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
        const url = this.getAttribute('href') || '#';
        const class_ = this.getAttribute('class') || "nav-menu__item";
        const text = this.getAttribute('text') || "Enlace";

        // Estructura y Estilos encapsulados
        this.shadowRoot.innerHTML = `

            <div>
                <a class=${class_} href = ${url} >
                    ${text} <slot></slot> 
                </a>

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
customElements.define('mi-link', MiLink);

function inicializarHeader() {
    console.log("Inicializando header...");
    const linkTemplate = document.getElementById('link-template');
    const navMenu = document.querySelector('.nav-menu__list');

    const elementos = [
        { text: 'Inicio', href: '#home' },
        { text: 'Cursos', href: '#courses' },
        { text: 'Acerca', href: '#about' },
        { text: 'Contacto', href: '#contact' }
    ]

    for (const elem of elementos) {
        const clone = linkTemplate.content.cloneNode(true);
        const link = clone.content.querySelector('a');
        link.textContent = elem.text;
        link.href = elem.href;
        link.className = 'nav-menu__item';


        navMenu.appendChild(clone);

    }

}

window.inicializarHeader = inicializarHeader; // Hacer la función globalmente accesible
