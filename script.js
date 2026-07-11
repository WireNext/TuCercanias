// ─── CONFIG ────────────────────────────────────────────

const PROXY = '/api/proxy?url=';



// ─── TODAS LAS ESTACIONES RENFE (1070) ────────────────
let RENFE_STATIONS = [];

// Función para cargar las estaciones desde el JSON
async function loadStations() {
  try {
    const response = await fetch('estaciones.json'); // Ruta a tu archivo JSON
    if (!response.ok) throw new Error('Error al cargar el archivo de estaciones');
    
    RENFE_STATIONS = await response.json();
    
    // Una vez cargadas, renderizamos los marcadores
    renderStationMarkers();
  } catch (error) {
    console.error("No se pudieron cargar las estaciones:", error);
  }
}

// ─── STATE ─────────────────────────────────────────────
const state = {
  stops: {},
  stopTimes: {},
  trips: {},
  routes: {},
  realtimeDelays: {},
  vehicles: [],
  markers: {},
  stationMarkers: {},
  renfeStations: [],
  stopsByName: {},
  activeFilter: 'cercanias', // DEFAULT: cercanias selected
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
  document.getElementById('loading-fill').style.width = p + '%';
  if (msg) document.getElementById('loading-text').textContent = msg;
}

const URLS = {
  vehiclesCercanias: PROXY + 'https://gtfsrt.renfe.com/vehicle_positions.json',
  tripUpdatesCercanias: PROXY + 'https://gtfsrt.renfe.com/trip_updates.json',
  vehiclesLD: PROXY + 'https://gtfsrt.renfe.com/vehicle_positions_LD.json',
  tripUpdatesLD: PROXY + 'https://gtfsrt.renfe.com/trip_updates_LD.json',
  alerts: PROXY + 'https://gtfsrt.renfe.com/alerts.json',
  stopsCercanias:  'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stops.csv',
  stopTimescercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stop_times.csv',
  tripsCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/trips.csv',
  routesCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/routes.csv',
  stopsLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/stops.csv',
  stopTimesLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/stop_times.csv',
  tripsLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/trips.csv',
  routesLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/routes.csv',
};

// ─── LOAD STATIC DATA ──────────────────────────────────
async function loadStaticData() {
  setProgress(5, 'Cargando paradas de Cercanías…');
  const [stopsCercanias, stopsLD] = await Promise.all([
    fetchCSV(URLS.stopsCercanias),
    fetchCSV(URLS.stopsLD),
  ]);
  stopsCercanias.forEach(s => {
    state.stops[s.stop_id] = { name: s.stop_name, lat: parseFloat(s.stop_lat), lon: parseFloat(s.stop_lon), type: 'cercanias' };
  });
  stopsLD.forEach(s => {
    if (!state.stops[s.stop_id])
      state.stops[s.stop_id] = { name: s.stop_name, lat: parseFloat(s.stop_lat), lon: parseFloat(s.stop_lon), type: 'ld' };
  });

  setProgress(25, 'Cargando rutas…');
  const [routesCercanias, routesLD] = await Promise.all([
    fetchCSV(URLS.routesCercanias),
    fetchCSV(URLS.routesLD),
  ]);
  routesCercanias.forEach(r => {
    state.routes[r.route_id] = { shortName: r.route_short_name, longName: r.route_long_name, color: r.route_color, type: 'cercanias' };
  });
  routesLD.forEach(r => {
    state.routes[r.route_id] = { shortName: r.route_short_name, longName: r.route_long_name, color: r.route_color, type: 'ld' };
  });

  setProgress(45, 'Cargando viajes…');
  const [tripsCercanias, tripsLD] = await Promise.all([
    fetchCSV(URLS.tripsCercanias),
    fetchCSV(URLS.tripsLD),
  ]);
  tripsCercanias.forEach(t => {
    state.trips[t.trip_id] = { routeId: t.route_id, headsign: t.trip_headsign, type: 'cercanias' };
  });
  tripsLD.forEach(t => {
    state.trips[t.trip_id] = { routeId: t.route_id, headsign: t.trip_headsign, type: 'ld' };
  });

  setProgress(60, 'Cargando horarios…');
  try {
    const [stCercanias, stLD] = await Promise.all([
      fetchCSV(URLS.stopTimescercanias),
      fetchCSV(URLS.stopTimesLD),
    ]);
    stCercanias.forEach(st => {
      if (!state.stopTimes[st.trip_id]) state.stopTimes[st.trip_id] = [];
      state.stopTimes[st.trip_id].push({ stopId: st.stop_id, arrival: st.arrival_time, departure: st.departure_time, seq: parseInt(st.stop_sequence) || 0 });
    });
    stLD.forEach(st => {
      if (!state.stopTimes[st.trip_id]) state.stopTimes[st.trip_id] = [];
      state.stopTimes[st.trip_id].push({ stopId: st.stop_id, arrival: st.arrival_time, departure: st.departure_time, seq: parseInt(st.stop_sequence) || 0 });
    });
    Object.keys(state.stopTimes).forEach(tid => {
      state.stopTimes[tid].sort((a, b) => a.seq - b.seq);
    });
  } catch(e) {
    console.warn('stop_times load error:', e);
  }

  setProgress(85, 'Conectando tiempo real…');
  renderStationMarkers();
}

// ─── LOAD REALTIME ─────────────────────────────────────
async function loadRealtime() {
  try {
    const [vcJson, tuJson, vldJson, tuldJson, alertJson] = await Promise.all([
      fetchJSON(URLS.vehiclesCercanias),
      fetchJSON(URLS.tripUpdatesCercanias),
      fetchJSON(URLS.vehiclesLD),
      fetchJSON(URLS.tripUpdatesLD),
      fetchJSON(URLS.alerts).catch(() => ({ entity: [] })),
    ]);

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

    // Update counts
    const cCount = newVehicles.filter(v => v.type === 'cercanias').length;
    const ldCount = newVehicles.filter(v => v.type === 'ld').length;
    document.getElementById('count-cercanias').textContent = cCount || '0';
    document.getElementById('count-ld').textContent = ldCount || '0';

    // Alerts
    const alerts = alertJson.entity || [];
    const activeAlerts = alerts.filter(a => a.alert?.headerText);
    if (activeAlerts.length > 0) {
      const banner = document.getElementById('alert-banner');
      const a = activeAlerts[0].alert;
      const txt = a.headerText?.translation?.[0]?.text || 'Incidencias activas en la red';
      document.getElementById('alert-text').textContent = `${activeAlerts.length} incidencia${activeAlerts.length > 1 ? 's' : ''}: ${txt.slice(0, 80)}${txt.length > 80 ? '…' : ''}`;
      banner.classList.add('visible');
      setTimeout(() => banner.classList.remove('visible'), 8000);
    }

    updateStatus('ok', `${newVehicles.length} trenes · ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`);
    renderMarkers();
  } catch(err) {
    console.error('Realtime error:', err);
    updateStatus('error', 'Error al conectar — reintentando…');
  }
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

// Función auxiliar para generar el polígono SVG estilo Material 3 con el texto integrado
// Función para generar un polígono minimalista con silueta de tren (Estilo M3)
function createTrainSvgIcon(label, type) {
  let strokeColor = "var(--md-sys-color-outline-variant, #44444e)";
  
  // Dibujamos un polígono geométrico limpio que representa el frontal/cabina de un tren moderno
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" class="m3-train-svg">
      <path d="M6,6 C6,4.5 7.5,4 9,4 L23,4 C24.5,4 26,4.5 26,6 L26,24 C26,27 24,28 16,28 C8,28 6,27 6,24 Z" 
            class="m3-train-poly ${type}" 
            stroke="${strokeColor}" 
            stroke-width="1.5" 
            stroke-linejoin="round"/>
      
      <path d="M9,7 L23,7 C24,7 24,8 24,9 L24,12 C24,13 23,13.5 22,13.5 L10,13.5 C9,13.5 8,13 8,12 L8,9 C8,8 8,7 9,7 Z" 
            fill="rgba(255, 255, 255, 0.25)" />
      
      <circle cx="10" cy="24" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="22" cy="24" r="1.5" fill="rgba(255,255,255,0.6)" />

      <text x="50%" y="60%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            class="m3-train-text">
        ${label}
      </text>
    </svg>
  `;
}

function renderMarkers() {
  const shown = new Set();
  state.vehicles.forEach(v => {
    if (v.type !== state.activeFilter) return;
    if (!v.lat || !v.lon || isNaN(v.lat) || isNaN(v.lon)) return;

    shown.add(v.id);
    const label = getRouteLabel(v.tripId, v.type);

    if (state.markers[v.id]) {
      // Actualizar posición
      state.markers[v.id].setLatLng([v.lat, v.lon]);
      
      // CORRECCIÓN CLAVE: Usamos innerHTML para actualizar la etiqueta sin destruir el tren SVG
      const el = state.markers[v.id].getElement();
      if (el) {
        el.innerHTML = createTrainSvgIcon(label, v.type);
      }
    } else {
      // Crear marcador por primera vez con el polígono del tren
      const icon = L.divIcon({
        className: 'm3-train-marker-wrapper',
        html: createTrainSvgIcon(label, v.type),
        iconSize: [32, 32],
        iconAnchor: [16, 16]
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
      marker.on('mousedown', (e) => { e.originalEvent?.stopPropagation?.(); });
      marker.on('touchstart', (e) => { e.originalEvent?.stopPropagation?.(); });

      state.markers[v.id] = marker;
    }
  });

  // Eliminar marcadores ocultos
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

  if (!RENFE_STATIONS || RENFE_STATIONS.length === 0) return;

  RENFE_STATIONS.forEach(st => {
    // ⚠️ CAMBIO: Ahora usamos 'LATITUD' y 'LONGITUD' en vez de 'la' y 'lo'
    let lat = parseFloat(String(st.LATITUD || '').replace(',', '.'));
    let lon = parseFloat(String(st.LONGITUD || '').replace(',', '.'));
    if (isNaN(lat) || isNaN(lon)) return;

    // ⚠️ CAMBIO: Ahora usamos 'DESCRIPCION' en vez de 'n'
    const stName = st.DESCRIPCION || 'Estación';
    const stIcon = L.divIcon({
      className: 'custom-station-icon',
      html: `<div style="width:10px;height:10px;background:#3b70a3;border:2px solid rgba(255,255,255,0.75);border-radius:50%;box-shadow:0 0 4px rgba(59,112,163,0.5);"></div>`,
      iconSize: [10, 10], iconAnchor: [5, 5]
    });

    const marker = L.marker([lat, lon], { icon: stIcon });
    
    // Al hacer click, pasamos todo el objeto modificado al panel
    marker.on('click', () => { openStationPanel(st); });
    
    marker.bindTooltip(stName, {
      permanent: false, direction: 'top',
      className: 'station-tooltip', offset: [0, -5]
     });

    window.stationLayer.addLayer(marker);
  });
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

// ─── TRAIN PANEL ───────────────────────────────────────
function openTrainPanel(vehicleId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  if (!v) return;
  state.selectedVehicle = vehicleId;

  const trip = state.trips[v.tripId] || {};
  const route = state.routes[trip.routeId] || {};
  const delay = state.realtimeDelays[v.tripId];
  const delaySecs = delay?.delay || 0;

  const badge = document.getElementById('panel-badge');
  badge.textContent = v.type === 'ld' ? 'Larga Distancia' : 'Cercanías';
  badge.className = 'train-badge ' + (v.type === 'ld' ? 'badge-ld' : 'badge-cercanias');

  const sn = route.shortName || '';
  const headsign = trip.headsign || '';
  document.getElementById('panel-name').textContent = [sn, headsign].filter(Boolean).join(' · ') || v.label || v.id;

  const curStop = state.stops[v.stopId];
  document.getElementById('panel-sub').textContent = curStop ? `En: ${curStop.name}` : `ID: ${v.tripId || v.id}`;

  const delayChip = document.getElementById('panel-delay');
  const delayStr = formatDelay(delaySecs);
  if (!delayStr) {
    delayChip.textContent = 'A tiempo'; delayChip.className = 'delay-chip delay-ok';
  } else if (delaySecs < 0) {
    delayChip.textContent = delayStr + ' adelanto'; delayChip.className = 'delay-chip delay-ok';
  } else if (delaySecs < 300) {
    delayChip.textContent = delayStr; delayChip.className = 'delay-chip delay-warn';
  } else {
    delayChip.textContent = delayStr; delayChip.className = 'delay-chip delay-bad';
  }

  buildStopsTimeline(v, delaySecs);
  document.getElementById('train-panel').classList.add('open');
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
  const filterRow = document.getElementById('filter-row');
  const statusBar = document.getElementById('status-bar');
  const alertBanner = document.getElementById('alert-banner');

  const safeInset = parseFloat(getComputedStyle(document.body).paddingTop || 0);
  const totalHeaderH = document.getElementById('header').offsetHeight;
  const filterH = filterRow.offsetHeight;

  filterRow.style.top = totalHeaderH + 'px';
  statusBar.style.top = (totalHeaderH + filterH + 10) + 'px';
  alertBanner.style.top = (totalHeaderH + filterH + 40) + 'px';
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
      loading.classList.add('fade');
      setTimeout(() => loading.remove(), 400);
    }, 300);
  } catch(err) {
    console.error(err);
    document.getElementById('loading-text').textContent = 'Error al cargar datos. Reintentando…';
    setTimeout(main, 3000);
    return;
  }

  setInterval(loadRealtime, 30000);
}

main();