async function cargarComponente(id, url,callback) {
    const resp = await fetch(url);
    const html = await resp.text();
    document.getElementById(id).innerHTML = html;
    if (callback) callback();
}



cargarComponente('header', '../components/header.html',() => new headerComponent());
cargarComponente('footer', '../components/footer.html');
