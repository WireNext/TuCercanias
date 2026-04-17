// ── CONFIGURACIÓN DE ENLACES ─────────────────────────────────────────────────
const URLS = {
  // Tiempo Real (JSON)
  ALERTS: 'https://gtfsrt.renfe.com/alerts.json',
  VEHICLES: 'https://gtfsrt.renfe.com/vehicle_positions.json',
  TRIPS_RT: 'https://gtfsrt.renfe.com/trip_updates.json',
  
  // Datos Estáticos (CSV de tu GitHub)
  ROUTES: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/routes.csv',
  STOPS: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stops.csv',
  TRIPS: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/trips.csv',
  AGENCY: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/agency.csv'
};

// ── ESTADO DE LA APP ─────────────────────────────────────────────────────────
let S = {
  routes: [],
  stops: [],
  alerts: [],
  vehicles: [],
  tripsRT: []
};

// ── MOTOR DE CARGA (fj para JSON, fc para CSV) ──────────────────────────────

// Función para JSON con Proxy (CORS FIX para Renfe)
async function fj(url) {
  // Intentamos primero con AllOrigins (Proxy 1)
  const proxy1 = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(proxy1, { cache: 'no-store' });
    if (!response.ok) throw new Error('Proxy 1 falló');
    const data = await response.json();
    // AllOrigins devuelve el JSON dentro de "contents"
    return typeof data.contents === 'string' ? JSON.parse(data.contents) : data.contents;
  } catch (err) {
    console.warn("Proxy 1 falló, intentando Proxy 2 (CorsProxy)...");
    
    // Si falla el primero, intentamos con CorsProxy.io (Proxy 2)
    try {
      const proxy2 = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response2 = await fetch(proxy2);
      return await response2.json();
    } catch (err2) {
      console.error("Ambos proxies fallaron. Revisa la conexión o la URL de Renfe.");
      return null;
    }
  }
}
// Función para CSV (GitHub)
async function fc(url) {
  try {
    const r = await fetch(url, { cache: 'no-store' });
    const txt = await r.text();
    return parseCSV(txt);
  } catch (e) { console.error("Error en CSV:", e); return []; }
}

// Procesador de CSV a Objeto
function parseCSV(txt) {
  const lines = txt.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] || '']));
  });
}

// ── CARGADORES DE DATOS ──────────────────────────────────────────────────────

async function loadStaticData() {
  console.log("Cargando base de datos CSV...");
  S.routes = await fc(URLS.ROUTES);
  S.stops = await fc(URLS.STOPS);
  console.log(`Cargadas ${S.routes.length} rutas y ${S.stops.length} estaciones.`);
}

async function loadRealTime() {
  console.log("Sincronizando tiempo real...");
  
  // 1. Alertas
  const alertsData = await fj(URLS.ALERTS);
  if (alertsData) {
    S.alerts = (alertsData.entity || []).map(e => ({
      id: e.id,
      texto: e.alert.header_text?.translation?.[0]?.text || "Sin descripción",
      severidad: e.alert.severity_level
    }));
    updateAlertsUI();
  }

  // 2. Posiciones de trenes
  const vehicleData = await fj(URLS.VEHICLES);
  if (vehicleData) {
    S.vehicles = (vehicleData.entity || []).map(e => {
      const v = e.vehicle;
      // Buscamos info de la ruta en nuestros CSV
      const rutaInfo = S.routes.find(r => r.route_id === v.trip.route_id);
      return {
        id: e.id,
        lat: v.position.latitude,
        lon: v.position.longitude,
        linea: rutaInfo ? rutaInfo.route_short_name : '?',
        color: rutaInfo ? rutaInfo.route_color : '444444'
      };
    });
    updateMapMarkers();
  }
}

// ── INTERFAZ (UI) ───────────────────────────────────────────────────────────

function updateAlertsUI() {
  const container = document.getElementById('alertsHome');
  const badge = document.getElementById('abadge');
  
  if (S.alerts.length > 0) {
    badge.innerText = S.alerts.length;
    badge.style.display = 'block';
    container.innerHTML = S.alerts.slice(0, 2).map(a => `
      <div class="card alert-card">
        <div class="card-title">⚠️ AVISO DE SERVICIO</div>
        <p>${a.texto}</p>
      </div>
    `).join('');
  } else {
    badge.style.display = 'none';
    container.innerHTML = '';
  }
}

function showSection(name) {
  // Ocultar todos los modales
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  // Quitar active de botones nav
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  
  if (name !== 'home') {
    const modal = document.getElementById(`modal-${name}`);
    if (modal) modal.classList.add('active');
  }
}

// ── INICIO ───────────────────────────────────────────────────────────────────

window.addEventListener('load', async () => {
  // 1. Iniciar Mapa
  initMap(); 
  
  // 2. Cargar CSV primero (para tener nombres de estaciones y rutas)
  await loadStaticData();
  
  // 3. Cargar Tiempo Real
  await loadRealTime();
  
  // 4. Actualizar cada 30 segundos
  setInterval(loadRealTime, 30000);
});

function initMap() {
  // Leaflet init (Madrid por defecto)
  map = L.map('map', { zoomControl: false }).setView([40.4168, -3.7038], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

function updateMapMarkers() {
  // Limpiar marcadores viejos y poner los nuevos basados en S.vehicles
  markers.forEach(m => map.removeLayer(m));
  markers = S.vehicles.map(v => {
    return L.circleMarker([v.lat, v.lon], {
      radius: 8,
      fillColor: '#' + v.color,
      color: "#fff",
      weight: 2,
      fillOpacity: 1
    }).addTo(map).bindPopup(`Línea ${v.linea}`);
  });
}