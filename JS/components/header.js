

class headerComponent {
    constructor() {
        console.log("Inicializando header...");


        const firstElements = [
            { text: 'Inicio', href: '../index.html' },
            { text: 'Productos', href: '../pages/productos.html' },
        ]

        const lastElements = [
            { text: 'Ajustes', href: '../pages/settings.html' },
        ]

        let allElements = firstElements;

        if (localStorage.getItem('usuarioLogueado')) {
            const header_actions = document.querySelector('.header__actions');
            const userTemplate = document.getElementById('user-template');
            header_actions.innerHTML = "";

            const clone = userTemplate.content.cloneNode(true);
            clone.querySelector('.user').innerHTML = `Hola, ${JSON.parse(localStorage.getItem('usuarioLogueado')).nombre}`;
            header_actions.appendChild(clone);

            allElements.push({ text: 'Biblioteca', href: '../pages/biblioteca.html' });
        }

        allElements.push(...lastElements);

        for (const elem of allElements) {
            this.addItem(elem);

        }

    }
    addItem(elem) {
        const linkTemplate = document.getElementById('link-template');
        const navMenu = document.querySelector('.nav-menu__list');

        const clone = linkTemplate.content.cloneNode(true);
        const link = clone.querySelector('a');
        link.textContent = elem.text;
        link.href = elem.href;
        link.className = 'nav-menu__item';


        navMenu.appendChild(clone);
    }
}

