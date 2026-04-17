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

let map;
let trainMarkers = []; // Marcadores para trenes
let stopMarkers = [];  // Marcadores para estaciones

// ── MOTOR DE CARGA (fj para JSON, fc para CSV) ──────────────────────────────

// Función para JSON con Proxy (CORS FIX para Renfe)
async function fj(url) {
  // PLAN A: AllOrigins (muy fiable para JSON)
  const proxy1 = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(proxy1, { cache: 'no-store' });
    if (!response.ok) throw new Error('Proxy 1 falló');
    const data = await response.json();
    return typeof data.contents === 'string' ? JSON.parse(data.contents) : data.contents;
  } catch (err) {
    console.warn("Proxy 1 falló, intentando Proxy 2 (CorsProxy)...");
    
    // PLAN B: CorsProxy.io
    try {
      const proxy2 = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response2 = await fetch(proxy2);
      return await response2.json();
    } catch (err2) {
      console.error("Fallo total en proxies", err2);
      return null;
    }
  }
}

async function fc(url) {
  try {
    const r = await fetch(url, { cache: 'no-store' });
    const txt = await r.text();
    return parseCSV(txt);
  } catch (e) { console.error("Error en CSV:", e); return []; }
}

function parseCSV(txt) {
  const lines = txt.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    // Manejo simple de comas dentro de comillas
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] || '').replace(/"/g, '').trim()]));
  });
}

// ── CARGADORES Y RENDERIZADO ──────────────────────────────────────────────────

async function loadStaticData() {
  console.log("Cargando base de datos CSV...");
  S.routes = await fc(URLS.ROUTES);
  S.stops = await fc(URLS.STOPS);
  console.log(`Cargadas ${S.routes.length} rutas y ${S.stops.length} estaciones.`);
  
  // Dibujamos las estaciones UNA SOLA VEZ
  updateStopMarkers();
  renderRoutesList(); // Llenamos el modal de líneas
}

async function loadRealTime() {
  console.log("Sincronizando tiempo real...");
  
  // 1. Alertas
  const alertsData = await fj(URLS.ALERTS);
  if (alertsData) {
    S.alerts = (alertsData.entity || []).map(e => ({
      texto: e.alert.header_text?.translation?.[0]?.text || "Sin descripción",
      routes: (e.alert.informed_entity || []).map(ie => ie.route_id).filter(Boolean)
    }));
    updateAlertsUI();
  }

  // 2. Posiciones de trenes
  const vehicleData = await fj(URLS.VEHICLES);
  if (vehicleData) {
    S.vehicles = (vehicleData.entity || []).map(e => {
      const v = e.vehicle;
      const rutaInfo = S.routes.find(r => r.route_id === v.trip.route_id);
      return {
        id: e.id,
        lat: v.position.latitude,
        lon: v.position.longitude,
        linea: rutaInfo ? rutaInfo.route_short_name : '?',
        color: rutaInfo ? rutaInfo.route_color : '4fc3f7'
      };
    });
    updateTrainMarkers();
    renderVehiclesList(); // Llenamos el modal de trenes
  }
}

// ── INTERFAZ (UI) Y MAPA ─────────────────────────────────────────────────────

function initMap() {
  // Leaflet init (Madrid por defecto)
  map = L.map('map', { zoomControl: false }).setView([40.4168, -3.7038], 11);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);
}

// DIBUJAR ESTACIONES CON EMOJI 🚉
function updateStopMarkers() {
  // Icono para la estación
  const stopIcon = L.divIcon({
    html: '🚉',
    className: 'stop-icon', // Clase para CSS si quieres escalarlo
    iconSize: [20, 20],
    iconAnchor: [10, 10] // Centrado
  });

  S.stops.forEach(s => {
    if (s.stop_lat && s.stop_lon) {
      L.marker([s.stop_lat, s.stop_lon], { icon: stopIcon })
       .addTo(map)
       .bindPopup(`<b>Estación:</b><br>${s.stop_name}`);
    }
  });
}

// DIBUJAR TRENES CON EMOJI 🚂 Y COLOR DE LÍNEA
function updateTrainMarkers() {
  // Limpiar trenes viejos
  trainMarkers.forEach(m => map.removeLayer(m));
  trainMarkers = [];

  S.vehicles.forEach(v => {
    // Creamos un icono HTML personalizado: Emoji + Etiqueta de línea
    const trainIcon = L.divIcon({
      html: `
        <div class="train-marker" style="background-color: #${v.color}">
          <span class="train-emoji">🚂</span>
          <span class="train-label">${v.linea}</span>
        </div>
      `,
      className: '', // Vaciamos la clase por defecto
      iconSize: [30, 30],
      iconAnchor: [15, 15] // Centrado
    });

    const m = L.marker([v.lat, v.lon], { icon: trainIcon })
               .addTo(map)
               .bindPopup(`<b>Tren de la Línea ${v.linea}</b>`);
    
    trainMarkers.push(m);
  });
}

// Llenar la lista de trenes (Modal)
function renderVehiclesList() {
  const container = document.getElementById('vehiclesList');
  if (S.vehicles.length === 0) {
    container.innerHTML = '<p>No hay trenes en circulación actualmente.</p>';
    return;
  }
  container.innerHTML = S.vehicles.map(v => `
    <div class="trip-item" onclick="flyTo(${v.lat}, ${v.lon})">
      <div class="line-badge" style="background-color: #${v.color}">${v.linea}</div>
      <div>Tren en movimiento</div>
      <div class="delay-tag delay-ok">EN VIVO</div>
    </div>
  `).join('');
}

// Llenar la lista de líneas (Modal)
function renderRoutesList() {
  const container = document.getElementById('routesList');
  // Ordenar líneas por nombre (C1, C2...)
  const sortedRoutes = S.routes.sort((a,b) => a.route_short_name.localeCompare(b.route_short_name));
  
  container.innerHTML = sortedRoutes.map(r => `
    <div class="trip-item">
      <div class="line-badge" style="background-color: #${r.route_color}">${r.route_short_name}</div>
      <div>${r.route_long_name}</div>
    </div>
  `).join('');
}

// Actualizar Alertas (Home)
function updateAlertsUI() {
  const container = document.getElementById('alertsHome');
  const badge = document.getElementById('abadge');
  
  if (S.alerts.length > 0) {
    badge.innerText = S.alerts.length;
    badge.style.display = 'block';
    container.innerHTML = S.alerts.slice(0, 2).map(a => `
      <div class="card">
        <div class="card-title">⚠️ AVISO</div>
        <p>${a.texto}</p>
      </div>
    `).join('');
  } else {
    badge.style.display = 'none';
    container.innerHTML = '';
  }
}

// Navegación
function showSection(name) {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  
  if (name !== 'home') {
    document.getElementById(`modal-${name}`).classList.add('active');
    // Marcar botón activo
    const btnIndex = name === 'routes' ? 1 : name === 'trains' ? 2 : 3;
    document.querySelectorAll('.nav-item')[btnIndex].classList.add('active');
  } else {
    document.querySelectorAll('.nav-item')[0].classList.add('active');
  }
}

// Función para ir a un tren en el mapa
function flyTo(lat, lon) {
  showSection('home');
  map.flyTo([lat, lon], 14);
}

// ── INICIO ───────────────────────────────────────────────────────────────────

window.addEventListener('load', async () => {
  initMap(); 
  // 1. Cargar CSV primero
  await loadStaticData();
  // 2. Cargar Tiempo Real inmediatamente
  await loadRealTime();
  // 3. Actualizar cada 30 segundos
  setInterval(loadRealTime, 30000);
});