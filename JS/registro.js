document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad')?.value || "0");
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Obtener usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el email ya está registrado
    if (usuarios.some(u => u.email === email)) {
        alert('El correo ya está registrado');
        return;
    }

    let id = 0;

    usuarios.forEach(element => {
        id = id + 1;
    });

    // Crear usuario
    const nuevoUsuario = {
        id,
        nombre,
        edad,
        email,
        password,
        biblioteca: []
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = '../pages/login.html';
});