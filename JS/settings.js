const buttonCerrarSesion = document.getElementById('cerrar-sesion');
const buttonReestablecer = document.getElementById('restablecer-datos');

const dataMgr = new dataManager();

buttonCerrarSesion.addEventListener('click', function () {
    if(confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        dataMgr.closeSession();
        window.location.href = "../index.html";
    }
})

buttonReestablecer.addEventListener('click', function () {
    if (confirm("¿Estás seguro de que deseas restablecer los datos? Se eliminarán todos los usuarios y se cargarán los datos predeterminados.")) {
        dataMgr.setDefaultCredentials();
        window.location.href = "../index.html";
    }
})