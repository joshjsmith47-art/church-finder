// Initialize map
let map = L.map('map').setView([39.8283, -98.5795], 4);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom church icon
const churchIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', // modern church icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Search button click
document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value.trim();
  const radius = parseInt(document.getElementById('radius-input').value) || 5;
  if (!location) return alert("Please enter a city or zip code.");

  fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) return alert("Location not found.");
      const lat = data[0].lat;
      const lon = data[0].lon;
      map.setView([lat, lon], 12);
      fetchChurches(lat, lon, radius * 1000);
    })
    .catch(err => {
      console.error("Error fetching location:", err);
      alert("Error finding location. Try again.");
    });
});

function fetchChurches(lat, lon, radius) {
  const query = `
    [out:json];
    node
      ["amenity"="place_of_worship"]
      (around:${radius},${lat},${lon});
    out;
  `;

  fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })
  .then(res => res.json())
  .then(data => {
    if (window.markers) window.markers.forEach(m => map.removeLayer(m));
    window.markers = [];
    document.getElementById('list').innerHTML = '';

    if (!data.elements || data.elements.length === 0) {
      alert("No churches found in this area.");
      return;
    }

    data.elements.forEach(church => {
      const name = church.tags.name || "Unnamed Church";
      const type = church.tags.religion || "Unknown type";

      // Add custom marker
      const marker = L.marker([church.lat, church.lon], { icon: churchIcon })
        .addTo(map)
        .bindPopup(`<b>${name}</b><br>Type: ${type}`);
      window.markers.push(marker);

      // Add to list
      const li = document.createElement('li');
      li.textContent = `${name} (${type})`;
      li.addEventListener('click', () => {
        map.setView([church.lat, church.lon], 15);
        marker.openPopup();
      });
      li.addEventListener('mouseover', () => marker.openPopup());
      li.addEventListener('mouseout',
