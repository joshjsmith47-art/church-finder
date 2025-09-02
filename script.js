// Initialize map
let map = L.map('map').setView([39.8283, -98.5795], 4); // Center of USA

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value.trim();
  let radius = parseInt(document.getElementById('radius-input').value) || 5;
  if (!location) return alert("Please enter a city or zip code.");

  console.log("Searching for:", location, "Radius:", radius);

  // Use Nominatim to get coordinates
  fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) return alert("Location not found.");
      const lat = data[0].lat;
      const lon = data[0].lon;
      map.setView([lat, lon], 12);
      fetchChurches(lat, lon, radius * 1000); // Convert km to meters
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
    // Clear old markers
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

      // Add marker to map
      const marker = L.marker([church.lat, church.lon])
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
      document.getElementById('list').appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error fetching churches:", err);
    alert("Error fetching churches. Try again later.");
  });
}
