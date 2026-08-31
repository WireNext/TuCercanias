// ─── CONFIG ────────────────────────────────────────────

const PROXY = '/api/proxy?url=';



// ─── TODAS LAS ESTACIONES RENFE (1070) ────────────────
// Definimos la variable global que contendrá las estaciones
let RENFE_STATIONS = [];

async function loadStations() {
  const archivosJson = [
    'estaciones.json'
  ];

  try {
    // 1. Descarga e inspección de respuestas en paralelo
    const respuestas = await Promise.all(
      archivosJson.map(archivo => fetch(archivo))
    );

    const respuestaFallida = respuestas.find(res => !res.ok);
    if (respuestaFallida) {
      throw new Error(`Error ${respuestaFallida.status} al solicitar ${respuestaFallida.url}`);
    }

    // 2. Conversión a JSON en paralelo
    const datosJson = await Promise.all(respuestas.map(res => res.json()));

    // 3. Aplanado de arrays
    const listaCompleta = datosJson.flat();

    // 4. (Opcional) Desduplicado por código/ID de estación si fuera necesario
    // RENFE_STATIONS = Array.from(new Map(listaCompleta.map(est => [est.id, est])).values());

    RENFE_STATIONS = listaCompleta;

    console.log(`Cargadas ${RENFE_STATIONS.length} estaciones desde ${archivosJson.length} archivo(s).`);

    // 5. Renderizado en el mapa
    renderStationMarkers();

  } catch (error) {
    console.error("Error al cargar las estaciones:", error);
  }
}

// ─── STATE ─────────────────────────────────────────────
const state = {
  stops: {},
  stopTimes: {},
  shapes: {},
  trips: {},
  routes: {},
  state: {},
  realtimeDelays: {},
  vehicles: [],
  markers: {},
  stationMarkers: {},
  renfeStations: [],
  stopsByName: {},
  selectedVehicle: null,
  loading: true,
};

// ─── THEME ─────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('tutren-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  const meta = document.getElementById('meta-theme');
  if (meta) meta.content = theme === 'dark' ? '#121218' : '#f3eff7';
  // Update Leaflet tiles if map is initialized
  if (window.map && window._tileLayers) {
    const isDark = theme === 'dark';
    window._tileLayers.dark.setOpacity(isDark ? 1 : 0);
    window._tileLayers.light.setOpacity(isDark ? 0 : 1);
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tutren-theme', next);
  updateThemeIcon(next);
});

// ─── CSV PARSER ────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === ',' && !inQ) { values.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    values.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (values[i] || '').replace(/^"|"$/g, ''); });
    return obj;
  });
}

// ─── FETCH HELPERS ─────────────────────────────────────
async function fetchJSON(url) {
  const r = await fetch(url, { cache: 'no-cache' });
  return r.json();
}
async function fetchCSV(url) {
  const r = await fetch(url, { cache: 'force-cache' });
  return parseCSV(await r.text());
}

// ─── TIME HELPERS ──────────────────────────────────────
function gtfsTimeToday(gtfsTime) {
  if (!gtfsTime) return null;
  const [h, m, s] = gtfsTime.split(':').map(Number);
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h % 24, m, s || 0);
  return d;
}
function formatTime(date) {
  if (!date) return '--:--';
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
function formatDelay(seconds) {
  if (!seconds || Math.abs(seconds) < 30) return null;
  const mins = Math.round(seconds / 60);
  if (mins > 0) return `+${mins} min`;
  return `${mins} min`;
}

// ─── LOAD PROGRESS ─────────────────────────────────────
let loadProgress = 0;
function setProgress(p, msg) {
  loadProgress = p;
  
  // Con el operador "?." se evita el error si el elemento no existe en el DOM
  document.getElementById('loading-fill')?.style.setProperty('width', p + '%');
  if (msg) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.textContent = msg;
  }
}

const URLS = {
  vehiclesCercanias: PROXY + 'https://gtfsrt.renfe.com/vehicle_positions.json',
  tripUpdatesCercanias: PROXY + 'https://gtfsrt.renfe.com/trip_updates.json',
  alerts: PROXY + 'https://gtfsrt.renfe.com/alerts.json',
  stopsCercanias:  'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stops.csv',
  stopTimescercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stop_times.csv',
  tripsCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/trips.csv',
  routesCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/routes.csv',
  shapesCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/shapes.csv'
};

// ─── LOAD STATIC DATA ──────────────────────────────────
async function loadStaticData() {
  // 1. Cargamos las paradas/estaciones GTFS y el JSON local en paralelo
  setProgress(10, 'Cargando estaciones de Renfe…');
  try {
    const [stopsCercanias, resJson] = await Promise.all([
      fetchCSV(URLS.stopsCercanias),
      fetch('estaciones.json')
    ]);

    // Mapeamos las paradas del GTFS a state.stops
    stopsCercanias.forEach(s => {
      state.stops[s.stop_id] = { 
        name: s.stop_name, 
        lat: parseFloat(s.stop_lat), 
        lon: parseFloat(s.stop_lon), 
        type: 'cercanias' 
      };
    });

    // Guardamos las estaciones en la variable global para el mapa
    if (resJson.ok) {
      RENFE_STATIONS = await resJson.json();
      
      // Aseguramos que las estaciones del JSON también pueblen state.stops si no existían
      RENFE_STATIONS.forEach(estacion => {
        const id = estacion.codigo || estacion.stop_id || estacion.id;
        if (id && !state.stops[id]) {
          state.stops[id] = {
            name: estacion.nombre || estacion.stop_name || estacion.DESCRIPCION,
            lat: parseFloat(estacion.lat || estacion.stop_lat || estacion.la || estacion.LATITUD),
            lon: parseFloat(estacion.lon || estacion.lng || estacion.stop_lon || estacion.lo || estacion.LONGITUD),
            type: 'cercanias'
          };
        }
      });
    }
  } catch (error) {
    console.error('Error cargando las paradas/estaciones:', error);
  }
// ─── CARGA DE SHAPES (NUEVO) ──────────────────────────
  setProgress(25, 'Cargando trazados del mapa (shapes)…');
  try {
    const rawShapes = await fetchCSV(URLS.shapesCercanias);
    rawShapes.forEach(sp => {
      const shapeId = sp.shape_id;
      if (!state.shapes[shapeId]) state.shapes[shapeId] = [];
      
      state.shapes[shapeId].push({
        lat: parseFloat(sp.shape_pt_lat),
        lon: parseFloat(sp.shape_pt_lon),
        seq: parseInt(sp.shape_pt_sequence) || 0
      });
    });

    // Ordenar los puntos de cada trazado por su secuencia
    Object.keys(state.shapes).forEach(id => {
      state.shapes[id].sort((a, b) => a.seq - b.seq);
    });
  } catch (error) {
    console.warn('Error cargando shapes:', error);
  }

  // Cargamos rutas GTFS
  setProgress(45, 'Cargando rutas…');
  try {
    const routesCercanias = await fetchCSV(URLS.routesCercanias);
    routesCercanias.forEach(r => {
      state.routes[r.route_id] = { 
        shortName: r.route_short_name, 
        longName: r.route_long_name, 
        color: r.route_color, 
        type: 'cercanias' 
      };
    });
  } catch (error) {
    console.warn('Error cargando routes:', error);
  }

  // Cargamos viajes GTFS (Guardamos también el shape_id de cada viaje)
  setProgress(65, 'Cargando viajes…');
  try {
    const tripsCercanias = await fetchCSV(URLS.tripsCercanias);
    tripsCercanias.forEach(t => {
      state.trips[t.trip_id] = { 
        routeId: t.route_id, 
        headsign: t.trip_headsign, 
        shapeId: t.shape_id, // 👈 Guardamos la referencia al trazado
        type: 'cercanias' 
      };
    });
  } catch (error) {
    console.warn('Error cargando trips:', error);
  }

  // Cargamos los horarios por parada GTFS
  setProgress(85, 'Cargando horarios…');
  try {
    const stCercanias = await fetchCSV(URLS.stopTimescercanias);
    stCercanias.forEach(st => {
      if (!state.stopTimes[st.trip_id]) state.stopTimes[st.trip_id] = [];
      state.stopTimes[st.trip_id].push({ 
        stopId: st.stop_id, 
        arrival: st.arrival_time, 
        departure: st.departure_time, 
        seq: parseInt(st.stop_sequence) || 0 
      });
    });

    Object.keys(state.stopTimes).forEach(tid => {
      state.stopTimes[tid].sort((a, b) => a.seq - b.seq);
    });
  } catch (e) {
    console.warn('Error cargando stop_times:', e);
  }

  setProgress(100, 'Carga completa.');
  renderStationMarkers();
}
// ─── LOAD REALTIME ─────────────────────────────────────
async function loadRealtime() {
  try {
    // 🛡️ Capturamos los errores de fetch individuales por si una URL responde HTML o da 404
    const [vcJson, tuJson, vldJson, tuldJson, alertJson] = await Promise.all([
      fetchJSON(URLS.vehiclesCercanias).catch(() => ({ entity: [] })),
      fetchJSON(URLS.tripUpdatesCercanias).catch(() => ({ entity: [] })),
      fetchJSON(URLS.vehiclesLD).catch(() => ({ entity: [] })),
      fetchJSON(URLS.tripUpdatesLD).catch(() => ({ entity: [] })),
      fetchJSON(URLS.alerts).catch(() => []),
    ]);

    // Si todos han fallado o devuelto vacíos por culpa de un fallo del servidor, salimos sin romper nada
    if (!vcJson.entity && !vldJson.entity) {
      console.warn("Las APIs de tiempo real no han devuelto datos válidos (posible mantenimiento).");
      return;
    }

    // 1. PROCESAR RETRASOS (TRIP UPDATES)
    state.realtimeDelays = {};
    [...(tuJson.entity || []), ...(tuldJson.entity || [])].forEach(e => {
      if (e.tripUpdate) {
        const tu = e.tripUpdate;
        const tid = tu.trip?.tripId;
        if (tid) {
          const upd = tu.stopTimeUpdate?.[0];
          state.realtimeDelays[tid] = {
            delay: tu.delay || upd?.arrival?.delay || 0,
            stopId: upd?.stopId,
            updatedTime: upd?.arrival?.time,
          };
        }
      }
    });

    // 2. PROCESAR VEHÍCULOS
    const newVehicles = [];
    (vcJson.entity || []).forEach(e => {
      if (e.vehicle?.position) {
        const v = e.vehicle;
        newVehicles.push({
          id: e.id, tripId: v.trip?.tripId,
          lat: v.position.latitude, lon: v.position.longitude,
          label: v.vehicle?.label || e.id, stopId: v.stopId,
          status: v.currentStatus, type: 'cercanias',
        });
      }
    });
    (vldJson.entity || []).forEach(e => {
      if (e.vehicle?.position) {
        const v = e.vehicle;
        newVehicles.push({
          id: e.id, tripId: v.trip?.tripId,
          lat: v.position.latitude, lon: v.position.longitude,
          label: v.vehicle?.label || e.id, stopId: v.stopId,
          status: v.currentStatus, type: 'ld',
        });
      }
    });
    state.vehicles = newVehicles;

    // Actualizar contadores del DOM
    const cCount = newVehicles.filter(v => v.type === 'cercanias').length;
    const ldCount = newVehicles.filter(v => v.type === 'ld').length;
    
    const elCountCercanias = document.getElementById('count-cercanias');
    const elCountLd = document.getElementById('count-ld');
    if (elCountCercanias) elCountCercanias.textContent = cCount || '0';
    if (elCountLd) elCountLd.textContent = ldCount || '0';

    // 3. PROCESAR ALERTAS / INCIDENCIAS
    // Soportamos tanto si el JSON viene como un array directo o envuelto en .entity
    const rawAlerts = Array.isArray(alertJson) ? alertJson : (alertJson.entity || []);
    state.alerts = rawAlerts.map(e => e.alert || e).filter(Boolean);

    // Banner superior
    const banner = document.getElementById('alert-banner');
    if (state.alerts.length > 0 && banner) {
      const a = state.alerts[0];
      const txt = a.headerText?.translation?.[0]?.text || 
                  a.descriptionText?.translation?.[0]?.text || 
                  'Incidencias activas en la red';
      
      const elAlertText = document.getElementById('alert-text');
      if (elAlertText) {
        elAlertText.textContent = `${state.alerts.length} incidencia${state.alerts.length > 1 ? 's' : ''}: ${txt.slice(0, 80)}${txt.length > 80 ? '…' : ''}`;
      }
      banner.classList.add('visible');
      setTimeout(() => banner.classList.remove('visible'), 8000);
    }

    updateStatus('ok', `${newVehicles.length} trenes · ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`);
    renderMarkers();

  } catch(err) {
    console.error('Realtime error controlado:', err);
    updateStatus('error', 'Error al conectar — reintentando…');
  }
}

function getAlertsForEntity({ routeId, stopId, tripId }) {
  if (!state.alerts || state.alerts.length === 0) return [];

  return state.alerts.filter(alert => {
    if (!alert.informedEntity || !Array.isArray(alert.informedEntity)) return false;

    return alert.informedEntity.some(entity => {
      if (routeId && entity.routeId === routeId) return true;
      if (stopId && String(entity.stopId) === String(stopId)) return true;
      if (tripId && entity.tripId === tripId) return true;
      return false;
    });
  });
}

function calculateBearing(lat1, lon1, lat2, lon2) {
  const toRad = deg => (deg * Math.PI) / 180;
  const toDeg = rad => (rad * 180) / Math.PI;

  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
            Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// Obtener la dirección exacta utilizando las coordenadas del trazado
function getTrainBearing(vehicle) {
  if (typeof vehicle?.bearing === 'number' && vehicle.bearing !== 0) {
    return vehicle.bearing;
  }

  const trip = state.trips?.[vehicle?.tripId];
  const shapeId = trip?.shapeId;

  if (!state.shapes || !shapeId || !state.shapes[shapeId]) {
    return 0;
  }

  const shapePoints = state.shapes[shapeId];
  if (!Array.isArray(shapePoints) || shapePoints.length < 2) return 0;

  let closestIdx = 0;
  let minDistance = Infinity;

  shapePoints.forEach((pt, index) => {
    const dist = Math.hypot(pt.lat - vehicle.lat, pt.lon - vehicle.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closestIdx = index;
    }
  });

  const p1 = shapePoints[closestIdx];
  const p2 = shapePoints[closestIdx + 1] || shapePoints[closestIdx];

  if (!p1 || !p2 || (p1.lat === p2.lat && p1.lon === p2.lon)) return 0;

  // 🔄 Sumamos 180 grados y aplicamos el módulo % 360 para invertir la flecha
  const baseBearing = calculateBearing(p1.lat, p1.lon, p2.lat, p2.lon);
  return (baseBearing + 180) % 360;
}

// ─── STATUS ────────────────────────────────────────────
function updateStatus(type, msg) {
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-text');
  dot.className = 'status-dot ' + type;
  txt.textContent = msg;
}

// ─── MAP INIT ──────────────────────────────────────────
let map;
function initMap() {
  map = L.map('map', {
    center: [40.416775, -3.703790],
    zoom: 6,
    zoomControl: true,
    attributionControl: false,
    zoomAnimation: false,
    fadeAnimation: false,
    markerZoomAnimation: false,
  });

  map.setMaxBounds(null);
  map.off('popupopen');

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', opacity: isDark ? 1 : 0,
  }).addTo(map);

  const lightTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', opacity: isDark ? 0 : 1,
  }).addTo(map);

  L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  window._tileLayers = { dark: darkTile, light: lightTile };
  window.map = map;

  map.on('click', () => { closePanel(); closeStationPanel(); });
}

// ─── MARKERS ───────────────────────────────────────────
function getRouteLabel(tripId, type) {
  const trip = state.trips[tripId];
  if (!trip) return type === 'ld' ? 'LD' : 'C?';
  const route = state.routes[trip.routeId];
  if (!route) return type === 'ld' ? 'LD' : 'C?';
  const sn = route.shortName || '';
  return sn.slice(0, 3) || (type === 'ld' ? 'LD' : 'C?');
}

// Función para generar un icono en forma de Flecha/Puntero
function createTrainSvgIcon(label, type, bearing = 0) {
  let strokeColor = "var(--md-sys-color-outline-variant, #ffffff)";

  // Diseñamos una flecha estilizada tipo navegación GPS con el texto centrado
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" 
         class="m3-train-svg" 
         style="transform: rotate(${bearing}deg); transition: transform 0.4s ease;">
      <!-- Sombra de la flecha -->
      <path d="M18 2 L32 30 L18 23 L4 30 Z" 
            fill="rgba(0,0,0,0.25)" 
            transform="translate(0, 2)" />
      
      <!-- Cuerpo principal de la flecha -->
      <path d="M18 2 L32 30 L18 23 L4 30 Z" 
            class="m3-train-poly ${type}" 
            fill="#3b70a3"
            stroke="${strokeColor}" 
            stroke-width="2" 
            stroke-linejoin="round"/>
      
      <!-- Contenedor del texto (se mantiene horizontal o adaptado dentro del cuerpo) -->
      <text x="18" y="19" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            fill="#ffffff"
            font-size="9"
            font-weight="bold"
            style="transform-origin: center; transform: rotate(${-bearing}deg);" 
            class="m3-train-text">
        ${label}
      </text>
    </svg>
  `;
}

function renderMarkers() {
  const shown = new Set();
  state.vehicles.forEach(v => {
    if (!v.lat || !v.lon || isNaN(v.lat) || isNaN(v.lon)) return;

    shown.add(v.id);
    const label = getRouteLabel(v.tripId, v.type);
    
    // 🎯 Calculamos e inferimos el rumbo dinámicamente
    const bearing = getTrainBearing(v);

    if (state.markers[v.id]) {
      state.markers[v.id].setLatLng([v.lat, v.lon]);
      
      const newIcon = L.divIcon({
        className: 'm3-train-marker-wrapper',
        html: createTrainSvgIcon(label, v.type, bearing),
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      state.markers[v.id].setIcon(newIcon);

    } else {
      const icon = L.divIcon({
        className: 'm3-train-marker-wrapper',
        html: createTrainSvgIcon(label, v.type, bearing),
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([v.lat, v.lon], {
        icon,
        zIndexOffset: 100,
        draggable: false,
        keyboard: false
      }).addTo(map);

      marker.on('click', (e) => {
        e.originalEvent?.stopPropagation?.();
        openTrainPanel(v.id);
      });

      state.markers[v.id] = marker;
    }
  });

  // Limpieza de marcadores inactivos
  Object.keys(state.markers).forEach(id => {
    if (!shown.has(id)) {
      map.removeLayer(state.markers[id]);
      delete state.markers[id];
    }
  });
}

// ─── STATION MARKERS ───────────────────────────────────
function renderStationMarkers() {
  if (window.stationLayer) {
    window.stationLayer.clearLayers();
  } else {
    window.stationLayer = L.layerGroup().addTo(map);
  }

  // Si aún no ha cargado el JSON, salimos para evitar errores
  if (!RENFE_STATIONS || RENFE_STATIONS.length === 0) {
    console.warn("RENFE_STATIONS está vacío o no ha cargado aún.");
    return;
  }

  RENFE_STATIONS.forEach(st => {
    // Extraemos el valor directamente (venga como número o como texto)
    let rawLat = st.la !== undefined ? st.la : st.LATITUD;
    let rawLon = st.lo !== undefined ? st.lo : st.LONGITUD;

    // Lo convertimos a número de forma segura gestionando las comas por si acaso
    let lat = typeof rawLat === 'number' ? rawLat : parseFloat(String(rawLat || '').replace(',', '.'));
    let lon = typeof rawLon === 'number' ? rawLon : parseFloat(String(rawLon || '').replace(',', '.'));

    // Si no es un número válido, saltamos esta estación
    if (isNaN(lat) || isNaN(lon)) return;

    const stName = st.n || st.DESCRIPCION || 'Estación';
    
    // Icono con forma de Gota (Pin Drop SVG)
    const stIcon = L.divIcon({
      className: 'custom-station-icon',
      html: `
        <div style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="26" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="#3b70a3" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="11" r="4.5" fill="#ffffff"/>
          </svg>
        </div>
      `,
      iconSize: [20, 26],
      iconAnchor: [10, 26], // Anclaje centrado abajo en la punta de la gota
      popupAnchor: [0, -26]
    });

    const marker = L.marker([lat, lon], { icon: stIcon });
    marker.on('click', () => { openStationPanel(st); });
    marker.bindTooltip(stName, {
      permanent: false, 
      direction: 'top',
      className: 'station-tooltip', 
      offset: [0, -24]
    });

    window.stationLayer.addLayer(marker);
  });
  
  console.log(`¡Se han renderizado ${RENFE_STATIONS.length} estaciones con éxito!`);
}

// ─── HELPERS ───────────────────────────────────────────
function fixUtf8String(str) {
  if (!str) return '';
  try { return decodeURIComponent(escape(str)); } catch (e) { return str; }
}

function normalizeName(name) {
  return (name || '').toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9\s]/g, '').trim();
}

function findStopIdsForStation(renfeStation) {
  const codigoMapa = renfeStation.CODIGO || renfeStation.c || '';
  if (!codigoMapa) return [];
  const codigoMapaNorm = String(codigoMapa).trim().replace(/^0+/, '');
  const matches = new Set();
  Object.keys(state.stops).forEach(stopId => {
    const stopIdNorm = String(stopId).trim().replace(/^0+/, '');
    if (stopIdNorm === codigoMapaNorm) matches.add(stopId);
  });
  return [...matches];
}

// ─── STATION PANEL ─────────────────────────────────────
function openStationPanel(renfeStation) {
  document.getElementById('train-panel').classList.remove('open');
  state.selectedVehicle = null;

  const stName = renfeStation.n || renfeStation.DESCRIPCION || '';
  const stCe = renfeStation.ce || renfeStation.CERCANIAS || 'NO';
  const stFe = renfeStation.fe || renfeStation.FEVE || 'NO';
  const stPo = renfeStation.po || renfeStation.POBLACION || '';
  const stPr = renfeStation.pr || renfeStation.PROVINCIA || '';

  document.getElementById('station-panel-name').textContent = stName;
  const badge = document.getElementById('station-panel-badge');
  if (stCe === 'SI') {
    badge.textContent = 'Cercanías'; badge.className = 'train-badge badge-cercanias';
  } else if (stFe === 'SI') {
    badge.textContent = 'FEVE'; badge.className = 'train-badge badge-cercanias';
  } else {
    badge.textContent = 'Estación'; badge.className = 'train-badge badge-ld';
  }
  document.getElementById('station-panel-sub').textContent = `${stPo} · ${stPr}`;

  let stopIds = findStopIdsForStation(renfeStation) || [];
  stopIds = stopIds.map(id => String(id).trim());

  const now = new Date();
  const upcoming = [];

  const stopId = st.codigo || st.stop_id || st.id;
const alerts = getAlertsForEntity({ stopId });

const stationAlertsEl = document.getElementById('station-panel-alerts');
if (stationAlertsEl) {
  if (alerts.length > 0) {
    stationAlertsEl.innerHTML = alerts.map(a => {
      const text = a.descriptionText?.translation?.[0]?.text || 
                  a.headerText?.translation?.[0]?.text || 
                  'Incidencia en la estación';
      return `<div class="alert-box alert-station">ℹ️ ${text}</div>`;
    }).join('');
    stationAlertsEl.style.display = 'block';
  } else {
    stationAlertsEl.innerHTML = '';
    stationAlertsEl.style.display = 'none';
  }
}

  if (stopIds.length > 0) {
    Object.entries(state.stopTimes).forEach(([rawTripId, stops]) => {
      const tripId = String(rawTripId).trim();
      stops.forEach(st => {
        if (!stopIds.includes(String(st.stopId).trim())) return;
        const arr = gtfsTimeToday(st.arrival);
        if (!arr) return;
        const delayInfo = state.realtimeDelays[tripId] || { delay: 0 };
        const delaySecs = delayInfo.delay || 0;
        const arrUpdated = new Date(arr.getTime() + delaySecs * 1000);
        const diffMins = (arrUpdated - now) / 60000;
        if (diffMins < -2 || diffMins > 180) return;
        let trip = state.trips[tripId];
        if (!trip) { const cleanId = tripId.split('-')[0].split('_')[0].trim(); trip = state.trips[cleanId]; }
        const finalTrip = trip || {};
        const route = state.routes[finalTrip.routeId] || {};
        upcoming.push({ tripId, st, arr, arrUpdated, delaySecs, trip: finalTrip, route });
      });
    });
  }

  upcoming.sort((a, b) => a.arrUpdated - b.arrUpdated);

  const seenRows = new Set();
  const uniqueUpcoming = upcoming.filter(item => {
    const type = (item.trip.type || 'ld');
    const routeLabel = (item.route.shortName || '').slice(0, 4) || (type === 'ld' ? 'LD' : 'C');
    const dest = fixUtf8String(item.trip.headsign || item.route.longName || item.tripId);
    const rowKey = `${routeLabel}-${dest}-${formatTime(item.arr)}`;
    if (seenRows.has(rowKey)) return false;
    seenRows.add(rowKey);
    return true;
  });

  const list = document.getElementById('station-trains-list');
  if (!list) return;
  list.innerHTML = '';

  if (uniqueUpcoming.length === 0) {
    list.innerHTML = `<div class="station-empty">
      ${stopIds.length === 0
        ? 'Esta estación no se encontró en los datos GTFS.<br><small style="opacity:0.6">Puede que opere solo trenes de larga distancia.</small>'
        : 'No hay trenes próximos en las próximas 3 horas.'}
    </div>`;
  } else {
    let html = '';
    uniqueUpcoming.slice(0, 20).forEach(item => {
      const { trip, route, arr, arrUpdated, delaySecs, tripId } = item;
      const type = (trip.type || 'ld');
      const routeLabel = (route.shortName || '').slice(0, 4) || (type === 'ld' ? 'LD' : 'C');
      const dest = fixUtf8String(trip.headsign || route.longName || `Tren ${tripId}`);
      const origTime = formatTime(arr);
      const updTime = Math.abs(delaySecs) >= 30 ? formatTime(arrUpdated) : null;
      const delayStr = formatDelay(delaySecs);
      const diffMins = Math.round((arrUpdated - now) / 60000);
      const inStr = diffMins <= 0 ? 'Ahora' : diffMins === 1 ? 'en 1 min' : `en ${diffMins} min`;
      let delayBadgeHtml = '';
      if (delayStr) {
        const cls = delaySecs > 0 ? 'delay-warn' : 'delay-ok';
        delayBadgeHtml = `<span class="station-delay-badge ${cls}">${delayStr}</span>`;
      }
      html += `<div class="station-train-item">
        <div class="station-route-badge ${type === 'ld' ? 'ld' : 'cercanias'}">${routeLabel}</div>
        <div class="station-train-info">
          <div class="station-train-dest">${dest}</div>
          <div class="station-train-times">
            ${updTime
              ? `<span class="station-train-time-orig">${origTime}</span><span class="station-train-time ${delaySecs > 0 ? 'delayed' : 'early'}">${updTime}</span>`
              : `<span class="station-train-time">${origTime}</span>`}
            <span style="font-size:0.68rem;color:var(--md-sys-color-outline)">${inStr}</span>
          </div>
        </div>
        ${delayBadgeHtml}
      </div>`;
    });
    list.innerHTML = html;
  }

  document.getElementById('station-panel').classList.add('open');

  const lat = renfeStation.la || parseFloat(renfeStation.LATITUD);
  const lon = renfeStation.lo || parseFloat(renfeStation.LONGITUD);
  if (!isNaN(lat) && !isNaN(lon)) {
    map.flyTo([lat, lon], Math.max(map.getZoom(), 12), { duration: 0.8 });
  }
}

function closeStationPanel() {
  document.getElementById('station-panel').classList.remove('open');
}

// Variable global para controlar el trazado activo en el mapa
let activeTripPolyline = null;

// ─── TRAIN PANEL ───────────────────────────────────────
function openTrainPanel(vehicleId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  if (!v) return;
  state.selectedVehicle = vehicleId;

  const trip = state.trips[v.tripId] || {};
  const route = state.routes[trip.routeId] || {};
  const delay = state.realtimeDelays[v.tripId];
  const delaySecs = delay?.delay || 0;

const alerts = getAlertsForEntity({ routeId: trip.routeId, tripId: v.tripId });

const alertsContainer = document.getElementById('panel-alerts');
if (alertsContainer) {
  if (alerts.length > 0) {
    alertsContainer.innerHTML = alerts.map(a => {
      const text = a.descriptionText?.translation?.[0]?.text || 
                  a.headerText?.translation?.[0]?.text || 
                  'Aviso en la línea';
      return `<div class="alert-box alert-warning">⚠️ ${text}</div>`;
    }).join('');
    alertsContainer.style.display = 'block';
  } else {
    alertsContainer.innerHTML = '';
    alertsContainer.style.display = 'none';
  }
}

  // 1. DIBUJAR TRAZADO (SHAPE) EN EL MAPA
  if (activeTripPolyline) {
    map.removeLayer(activeTripPolyline);
    activeTripPolyline = null;
  }

  if (trip.shapeId && state.shapes[trip.shapeId]) {
    const points = state.shapes[trip.shapeId].map(pt => [pt.lat, pt.lon]);
    const rawColor = route?.color ? String(route.color).replace('#', '') : null;
    const routeColor = route.color ? `#${route.color}` : '#3b70a3';

    activeTripPolyline = L.polyline(points, {
      color: routeColor,
      weight: 5,
      opacity: 0.85,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Ajusta la vista para encuadrar todo el recorrido del tren
    map.fitBounds(activeTripPolyline.getBounds(), { padding: [40, 40] });
  }

  // 2. ACTUALIZAR PANEL UI
  const badge = document.getElementById('panel-badge');
  if (badge) {
    badge.textContent = v.type === 'ld' ? 'Larga Distancia' : 'Cercanías';
    badge.className = 'train-badge ' + (v.type === 'ld' ? 'badge-ld' : 'badge-cercanias');
  }

  const sn = route.shortName || '';
  const headsign = trip.headsign || '';
  const nameEl = document.getElementById('panel-name');
  if (nameEl) {
    nameEl.textContent = [sn, headsign].filter(Boolean).join(' · ') || v.label || v.id;
  }

  const curStop = state.stops[v.stopId];
  const subEl = document.getElementById('panel-sub');
  if (subEl) {
    subEl.textContent = curStop ? `En: ${curStop.name}` : `ID: ${v.tripId || v.id}`;
  }

  const delayChip = document.getElementById('panel-delay');
  if (delayChip) {
    const delayStr = formatDelay(delaySecs);
    if (!delayStr) {
      delayChip.textContent = 'A tiempo'; 
      delayChip.className = 'delay-chip delay-ok';
    } else if (delaySecs < 0) {
      delayChip.textContent = delayStr + ' adelanto'; 
      delayChip.className = 'delay-chip delay-ok';
    } else if (delaySecs < 300) {
      delayChip.textContent = delayStr; 
      delayChip.className = 'delay-chip delay-warn';
    } else {
      delayChip.textContent = delayStr; 
      delayChip.className = 'delay-chip delay-bad';
    }
  }

  // 3. RENDERIZAR TIMELINE Y MOSTRAR PANEL
  buildStopsTimeline(v, delaySecs);
  
  const panel = document.getElementById('train-panel');
  if (panel) panel.classList.add('open');
}

function closeTrainPanel() {
  if (activeTripPolyline) {
    map.removeLayer(activeTripPolyline);
    activeTripPolyline = null;
  }
  document.getElementById('train-panel')?.classList.remove('open');
}

function buildStopsTimeline(v, delaySecs) {
  const list = document.getElementById('stops-list');
  list.innerHTML = '';

  const schedule = state.stopTimes[v.tripId];
  if (!schedule || schedule.length === 0) {
    list.innerHTML = '<div style="color:var(--md-sys-color-on-surface-variant);font-size:0.8rem;padding:16px 0;text-align:center">Horario no disponible para este tren</div>';
    return;
  }

  const now = new Date();
  let currentIdx = 0;
  for (let i = 0; i < schedule.length; i++) {
    const st = schedule[i];
    if (v.stopId && st.stopId === v.stopId) { currentIdx = i; break; }
    const arr = gtfsTimeToday(st.arrival);
    if (arr && arr < now) currentIdx = i;
  }

  const pastStops = schedule.slice(Math.max(0, currentIdx - 4), currentIdx);
  const futureStops = schedule.slice(currentIdx);

  if (pastStops.length > 0) {
    list.innerHTML += `<div class="section-label">Paradas anteriores</div>`;
    pastStops.forEach((st, i) => {
      const stop = state.stops[st.stopId] || { name: st.stopId };
      const name = fixUtf8String(stop.name || st.stopId);
      const arr = gtfsTimeToday(st.arrival);
      const isLast = i === pastStops.length - 1;
      list.innerHTML += stopItemHTML(name, st, 'past', arr, 0, isLast ? 'current' : 'past');
    });
  }
  if (futureStops.length > 0) {
    list.innerHTML += `<div class="section-label">Próximas paradas</div>`;
    futureStops.forEach((st, i) => {
      const stop = state.stops[st.stopId] || { name: st.stopId };
      const name = fixUtf8String(stop.name || st.stopId);
      const arr = gtfsTimeToday(st.arrival);
      const isCurrent = i === 0;
      list.innerHTML += stopItemHTML(name, st, isCurrent ? 'current' : 'future', arr, delaySecs, 'future');
    });
  }

  setTimeout(() => {
    const cur = list.querySelector('.stop-dot.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function stopItemHTML(name, st, phase, arrDate, delaySecs, linePhase) {
  const isCurrent = phase === 'current';
  const isPast = phase === 'past';
  const origTime = arrDate ? formatTime(arrDate) : '--:--';
  let updatedTime = '';
  let timeClass = 'stop-time';

  if (!isPast && arrDate && delaySecs) {
    const updated = new Date(arrDate.getTime() + delaySecs * 1000);
    if (Math.abs(delaySecs) >= 30) {
      updatedTime = formatTime(updated);
      timeClass = delaySecs > 0 ? 'stop-time updated' : 'stop-time early';
    }
  }

  const dotClass = `stop-dot ${phase}`;
  const nameClass = `stop-name ${isPast ? 'past' : isCurrent ? 'current' : ''}`;

  return `<div class="stop-item">
    <div class="stop-line-col">
      <div class="${dotClass}"></div>
      <div class="stop-line ${linePhase}"></div>
    </div>
    <div class="stop-info">
      <div class="${nameClass}">${name}</div>
      <div class="stop-times">
        ${updatedTime
          ? `<span class="stop-time-orig">${origTime}</span><span class="${timeClass}">${updatedTime}</span>`
          : `<span class="${timeClass}">${origTime}</span>`}
      </div>
    </div>
  </div>`;
}

function closePanel() {
  document.getElementById('train-panel').classList.remove('open');
  state.selectedVehicle = null;
}

// ─── FILTERS (mutually exclusive) ──────────────────────
function initFilters() {
  document.querySelectorAll('.filter-segment[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      // Only switch if not already active
      if (state.activeFilter === f) return;
      state.activeFilter = f;

      document.querySelectorAll('.filter-segment').forEach(b => {
        const isActive = b.dataset.filter === f;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      renderMarkers();
    });
  });
}

// ─── POSITION UI ELEMENTS ──────────────────────────────
function positionUI() {
  const headerBar = document.querySelector('.top-app-bar');
  const safeTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
  const headerHeight = headerBar.offsetHeight + (parseInt(getComputedStyle(document.documentElement).paddingTop) || 0);
  
  const statusBar = document.getElementById('status-bar');
  const alertBanner = document.getElementById('alert-banner');

  const safeInset = parseFloat(getComputedStyle(document.body).paddingTop || 0);
  const totalHeaderH = document.getElementById('header').offsetHeight;

  if (statusBar) {
    statusBar.style.top = (totalHeaderH + 10) + 'px';
  }
  
  if (alertBanner) {
    alertBanner.style.top = (totalHeaderH + 40) + 'px';
  }
}

// ─── PWA ───────────────────────────────────────────────
let deferredPrompt = null;

function initPWA() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      document.getElementById('pwa-prompt').classList.add('visible');
    }, 5000);
  });

  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
    document.getElementById('pwa-prompt').classList.remove('visible');
  });

  document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
    document.getElementById('pwa-prompt').classList.remove('visible');
  });

  window.addEventListener('appinstalled', () => {
    document.getElementById('pwa-prompt').classList.remove('visible');
    deferredPrompt = null;
  });
}

function injectManifest() {
  const manifest = {
    name: 'TuTren – Trenes en tiempo real',
    short_name: 'TuTren',
    description: 'Rastreo de trenes de Renfe en tiempo real',
    start_url: '.', display: 'standalone',
    background_color: '#121218', theme_color: '#121218',
    orientation: 'portrait',
    icons: [
      { src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%23121218" rx="40"/><text y="140" x="96" text-anchor="middle" font-size="120">🚆</text></svg>', sizes: '192x192', type: 'image/svg+xml' },
    ]
  };
  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  document.getElementById('manifest-link').href = URL.createObjectURL(blob);
}

// ─── EVENT LISTENERS ───────────────────────────────────
document.getElementById('panel-close').addEventListener('click', closePanel);
document.getElementById('station-panel-close').addEventListener('click', closeStationPanel);
document.getElementById('alert-banner').addEventListener('click', () => {
  document.getElementById('alert-banner').classList.remove('visible');
});

document.getElementById('refresh-btn').addEventListener('click', async () => {
  const btn = document.getElementById('refresh-btn');
  btn.classList.add('spinning');
  updateStatus('loading', 'Actualizando…');
  await loadRealtime();
  btn.classList.remove('spinning');
});

// Panel drag to close
function setupPanelDrag(panelId, closeFn) {
  const panel = document.getElementById(panelId);
  let startY = 0;
  panel.addEventListener('touchstart', e => { e.stopPropagation(); startY = e.touches[0].clientY; }, { passive: true });
  panel.addEventListener('touchend', e => {
    e.stopPropagation();
    if (e.changedTouches[0].clientY - startY > 60) closeFn();
  }, { passive: true });
  panel.addEventListener('click', e => { e.stopPropagation(); });
}

// ─── MAIN ──────────────────────────────────────────────
async function main() {
  injectManifest();
  initPWA();
  initMap();
  positionUI();
  window.addEventListener('resize', positionUI);
  initFilters();

  setupPanelDrag('train-panel', closePanel);
  setupPanelDrag('station-panel', closeStationPanel);

  try {
    await loadStaticData();
    setProgress(95, 'Casi listo…');
    await loadRealtime();
    setProgress(100, 'Listo');
    setTimeout(() => {
      const loading = document.getElementById('loading');
      // 🛡️ Añadimos "?." para evitar el error si "loading" es null
      loading?.classList.add('fade');
      setTimeout(() => loading?.remove(), 400);
    }, 300);
  } catch(err) {
    console.error(err);
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.textContent = 'Error al cargar datos. Reintentando…';
    setTimeout(main, 3000);
    return;
  }

  setInterval(loadRealtime, 30000);
}

main();