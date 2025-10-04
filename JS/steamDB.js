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



    async importarJuegoP(appId, urlProxy, text) {
        const urlSteam = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es`;
        let url = urlProxy + urlSteam;


        const respuesta = await fetch(url);

        if (!respuesta.ok) {

            console.error(`Error de solicitud HTTP: ${respuesta.status} ${respuesta.statusText}`);
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const datosJSON = await respuesta.json();


        const resultado = datosJSON[appId];

        if (resultado && resultado.success) {

            console.log(`Datos del juego ${appId} importados con éxito. (${text})`);
            return resultado.data;
        } else {

            console.error(`La API de Steam no devolvió datos exitosos para el AppID ${appId}.`);
            return null;
        }


    }

}