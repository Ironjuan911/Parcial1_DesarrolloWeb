class steamDataBase {
    async importarJuego(appId) {
        if (!appId) {
            console.error("Error: Se requiere un AppID.");
            return null;
        }
        const urlProxy0 = 'https://api.allorigins.win/get?url=';

        const urlProxy1 = 'https://vercel-proxy-two-beta.vercel.app/api/proxy?url='

        console.log(`Consultando API para AppID: ${appId}`);

        try {
            return this.importarJuegoP(appId, urlProxy1, "Vercel");
        } catch (error) {
            return this.importarJuegoP(appId, urlProxy0, "AllOrigins");
        }


    }

    //https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es

    async importarJuegoP(appId, urlProxy, text) {
        const urlSteam = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es`;
        let url = urlProxy + urlSteam;

        // 2. Realizar la solicitud HTTP
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            // Manejar errores de red (ej. 404, 500)
            console.error(`Error de solicitud HTTP: ${respuesta.status} ${respuesta.statusText}`);
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const datosJSON = await respuesta.json();

        // 3. Procesar la respuesta JSON
        // La respuesta contiene el AppID como clave principal, e.g., {"440": {...}}
        const resultado = datosJSON[appId];

        if (resultado && resultado.success) {
            // Éxito: devolver el objeto 'data' con todos los detalles del juego
            console.log(`Datos del juego ${appId} importados con éxito. (${text})`);
            return resultado.data;
        } else {
            // Fallo en la API (ej. el AppID no existe o no es un juego)
            console.error(`La API de Steam no devolvió datos exitosos para el AppID ${appId}.`);
            return null;
        }


    }

}