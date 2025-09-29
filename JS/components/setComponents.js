async function cargarComponente(id, url,callback) {
    const resp = await fetch(url); // Solicitamos el archivo HTML
    const html = await resp.text(); // Obtenemos el contenido como texto
    document.getElementById(id).innerHTML = html; // Insertamos el HTML en el elemento con el ID especificado
    if (callback) callback(); // Ejecuta el callback después de cargar el HTML
}



cargarComponente('header', '../components/header.html',() => new headerComponent());
cargarComponente('footer', '../components/footer.html');
