

class headerComponent {
    constructor() {
        console.log("Inicializando header...");


        const defaultelements = [
            { text: 'Inicio', href: '../index.html' },
            { text: 'Productos', href: '../pages/productos.html' },
        ]

        for (const elem of defaultelements) {
            this.addItem(elem);

        }

        if (localStorage.getItem('usuarioLogueado')) {
            const header_actions = document.querySelector('.header__actions');
            const userTemplate = document.getElementById('user-template');
            header_actions.innerHTML = "";

            const clone = userTemplate.content.cloneNode(true);
            clone.querySelector('.user').innerHTML = `Hola, ${JSON.parse(localStorage.getItem('usuarioLogueado')).nombre}`;
            header_actions.appendChild(clone);

            this.addItem({ text: 'Mi Biblioteca', href: '../pages/biblioteca.html' });
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

