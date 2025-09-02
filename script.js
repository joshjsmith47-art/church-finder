let map = L.map('map').setView([39.8283, -98.5795], 4); // Center of USA

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value;
  if (!location) return alert("Please enter a city or zip code.");

  // Use Nominatim to get coordinates of location
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) return alert("Location not found.");

      const lat = data[0].lat;
      const lon = data[0].lon;
      map.setView([lat, lon], 12);

      // Fetch real churches nearby
      fetchChurches(lat, lon);
    })
    .catch(err => alert("Error finding location: " + err));
});

function fetchChurches(lat, lon) {
  const query = `
    [out:json];
    node
      ["amenity"="place_of_worship"]
      (around:5000,${lat},${lon});
    out;
  `;

  fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })
  .then(res => res.json())
  .then(data => {
    // Remove old markers
    if (window.markers) window.markers.forEach(m => map.removeLayer(m));
    window.markers = [];

    // Add new markers
    data.elements.forEach(church => {
      const name = church.tags.name || "Unnamed Church";
      const marker = L.marker([church.lat, church.lon])
        .addTo(map)
        .bindPopup(`<b>${name}</b>`);
      window.markers.push(marker);
    });

    if (data.elements.length === 0) {
      alert("No churches found within 5km.");
    }
  })
  .catch(err => alert("Error fetching churches: " + err));
}
