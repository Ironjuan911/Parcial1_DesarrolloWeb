class dataManager {
    buygame(appid) {
        const users = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (localStorage.getItem('usuarioLogueado')) {
            const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
            if (!usuario.biblioteca.includes(appid)) {
                usuario.biblioteca.push(appid);

                let userid = usuario.id;
                
                for(let user of users) {
                    if (user.id == userid) {
                        user.biblioteca = usuario.biblioteca;
                        localStorage.setItem('usuarios', JSON.stringify(users));
                        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
                        alert("Juego comprado con exito!");
                        break;
                    }
                }



            }
        }

    }
}