// Este código se ejecuta en Vercel/Netlify, NO en el navegador
// Es lo que resuelve el problema de CORS
import fetch from 'node-fetch';

export default async function handler(req, res) {
    // 1. Obtener parámetros de la URL (ej: /api/game?appid=440&cc=es)
    const { appid, cc } = req.query;

    if (!appid || !cc) {
        return res.status(400).json({ error: "Missing appid or cc" });
    }

    // 2. Construir la URL de Steam, forzando idioma y región
    const steamUrl = 
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=${cc}&l=es&language=spanish`;

    try {
        // 3. Petición server-to-server a Steam (AQUÍ se evita el error CORS)
        const response = await fetch(steamUrl);
        const data = await response.json();
        
        const gameData = data[appid];

        if (gameData && gameData.success) {
            // 4. Devolver la data (Tu frontend la recibe sin problemas de CORS)
            return res.status(200).json(gameData.data);
        } else {
            return res.status(404).json({ error: "Game not found or API failure." });
        }
    } catch (e) {
        return res.status(500).json({ error: "Internal server error." });
    }
}