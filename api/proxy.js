export default async function handler(request, response) {
  // 1. Inyectamos las cabeceras CORS necesarias para que tu mapa pueda leer los datos
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Si el navegador hace una comprobación inicial (petición OPTIONS), respondemos OK rápido
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // 2. Capturamos la URL que le enviaremos desde el archivo HTML (?url=...)
  const { url } = request.query;

  if (!url) {
    return response.status(400).json({ error: 'Falta el parámetro url en la petición' });
  }

  try {
    // 3. El servidor hace la petición directa a Renfe
    const renfeResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!renfeResponse.ok) {
      return response.status(renfeResponse.status).send(`Error en el origen: ${renfeResponse.statusText}`);
    }

    // 4. Leemos el contenido como texto plano (JSON en este caso)
    const data = await renfeResponse.text();
    
    // Forzamos al navegador a interpretar que lo que le llega es un JSON válido
    response.setHeader('Content-Type', 'application/json');
    return response.status(200).send(data);

  } catch (error) {
    return response.status(500).json({ error: 'Error interno en el proxy', detalle: error.message });
  }
}