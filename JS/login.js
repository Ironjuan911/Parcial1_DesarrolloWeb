async function init() {
    const defaultCredentials = await fetch('../data/defaultCredentials.json').then(res => res.json());

    if (localStorage.getItem('usuarios') === null) {
        localStorage.setItem('usuarios', JSON.stringify(defaultCredentials));
    }
}

document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        alert('Correo o contraseña incorrectos');
        return;
    }

    // Guardar usuario logueado (puedes guardar solo el email o el objeto completo)
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    alert('¡Bienvenido, ' + usuario.nombre + '!');
    window.location.href = '../index.html'; // O a la página que desees
});

init();