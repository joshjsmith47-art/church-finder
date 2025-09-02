let map = L.map('map').setView([39.8283, -98.5795], 4); // Center of USA

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value;
  if (!location) return alert("Please enter a city or zip code.");
  
  // Use Nominatim to geocode the location
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) return alert("Location not found.");
      
      const lat = data[0].lat;
      const lon = data[0].lon;
      map.setView([lat, lon], 12);

      // Remove old markers
      if (window.markers) window.markers.forEach(m => map.removeLayer(m));
      window.markers = [];

      // For demo purposes: add a few sample churches nearby
      const sampleChurches = [
        { name: "St. Mary's Church", lat: lat*1 + 0.01, lon: lon*1 + 0.01 },
        { name: "First Baptist Church", lat: lat*1 - 0.01, lon: lon*1 - 0.01 },
        { name: "Community Church", lat: lat*1 + 0.015, lon: lon*1 - 0.015 }
      ];

      sampleChurches.forEach(church => {
        const marker = L.marker([church.lat, church.lon]).addTo(map)
          .bindPopup(`<b>${church.name}</b>`);
        window.markers.push(marker);
      });
    })
    .catch(err => alert("Error finding location: " + err));
});
