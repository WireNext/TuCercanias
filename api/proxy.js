export default async function handler(request, response) {
  // 1. Cabeceras CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // 2. Captura y validación de la URL
  const { url } = request.query;

  if (!url) {
    return response.status(400).json({ error: 'Falta el parámetro url en la petición' });
  }

  // Opcional pero recomendado: Validar que la URL apunte realmente a Renfe
  // Si dejas el proxy abierto al 100%, cualquiera podría usar tu servidor para atacar a otras webs
  if (!url.includes('renfe.com')) {
    return response.status(403).json({ error: 'Solo se permiten peticiones al dominio de Renfe' });
  }

  try {
    // 3. Petición a Renfe
    const renfeResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!renfeResponse.ok) {
      return response.status(renfeResponse.status).json({ 
        error: `Error en el origen: ${renfeResponse.statusText}` 
      });
    }

    // 4. Parseamos a JSON directamente y lo devolvemos correctamente estructurado
    const data = await renfeResponse.json();
    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json({ error: 'Error interno en el proxy', detalle: error.message });
  }
}