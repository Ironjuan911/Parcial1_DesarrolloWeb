

class headerComponent {
    constructor() {
        console.log("Inicializando header...");
        const linkTemplate = document.getElementById('link-template');
        const navMenu = document.querySelector('.nav-menu__list');

        const elementos = [
            { text: 'Inicio', href: '../index.html' },
            { text: 'Productos', href: '../Pages/productos.html' },
        ]

        for (const elem of elementos) {
            const clone = linkTemplate.content.cloneNode(true);
            const link = clone.querySelector('a');
            link.textContent = elem.text;
            link.href = elem.href;
            link.className = 'nav-menu__item';


            navMenu.appendChild(clone);

        }

    }
}

