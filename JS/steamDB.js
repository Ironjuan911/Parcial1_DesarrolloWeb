class steamDataBase {
    async importarJuego(appId) {
        if (!appId) {
            console.error("Error: Se requiere un AppID.");
            return null;
        }

        const url = `https://api.allorigins.win/raw?url=https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=es`;

        console.log(`Consultando API para AppID: ${appId}`);

        try {
            // 2. Realizar la solicitud HTTP
            const respuesta = await fetch(url);

            if (!respuesta.ok) {
                // Manejar errores de red (ej. 404, 500)
                console.error(`Error de solicitud HTTP: ${respuesta.status} ${respuesta.statusText}`);
                return null;
            }

            const datosJSON = await respuesta.json();

            // 3. Procesar la respuesta JSON
            // La respuesta contiene el AppID como clave principal, e.g., {"440": {...}}
            const resultado = datosJSON[appId];

            if (resultado && resultado.success) {
                // Éxito: devolver el objeto 'data' con todos los detalles del juego
                console.log(`Datos del juego ${appId} importados con éxito.`);
                return resultado.data;
            } else {
                // Fallo en la API (ej. el AppID no existe o no es un juego)
                console.error(`La API de Steam no devolvió datos exitosos para el AppID ${appId}.`);
                return null;
            }

        } catch (error) {
            // Manejar errores de conexión o parsing
            console.error("Error al importar el juego:", error);
            return null;
        }
    }
}