let map;
let markers = [];
let infoPanel = document.getElementById("church-info");

const churches = [
  {
    name: "Grace Church",
    address: "123 Main St, City, State",
    phone: "(555) 123-4567",
    website: "https://gracechurch.com",
    lat: 40.7128,
    lng: -74.0060
  },
  {
    name: "Faith Community",
    address: "456 Oak Ave, City, State",
    phone: "(555) 987-6543",
    website: "https://faithcommunity.org",
    lat: 40.7228,
    lng: -74.0160
  },
  // Add more churches here
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 }, // default center
    zoom: 12
  });
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function showChurchInfo(church) {
  document.getElementById("church-name").textContent = church.name;
  document.getElementById("church-address").textContent = church.address;
  document.getElementById("church-phone").textContent = church.phone;
  document.getElementById("church-website").innerHTML = `<a href="${church.website}" target="_blank">${church.website}</a>`;
  infoPanel.style.display = "block";
}

document.getElementById("close-info").addEventListener("click", () => {
  infoPanel.style.display = "none";
});

document.getElementById("search-btn").addEventListener("click", () => {
  const locationInput = document.getElementById("location-input").value;
  const radius = parseInt(document.getElementById("radius-input").value) || 10;

  if (!locationInput) return alert("Please enter a city or ZIP code.");

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: locationInput }, (results, status) => {
    if (status === "OK") {
      const userLocation = results[0].geometry.location;
      map.setCenter(userLocation);
      map.setZoom(12);
      
      clearMarkers();

      churches.forEach(church => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          userLocation,
          new google.maps.LatLng(church.lat, church.lng)
        ) / 1609.34; // meters to miles

        if (distance <= radius) {
          const marker = new google.maps.Marker({
            position: { lat: church.lat, lng: church.lng },
            map: map,
            title: church.name
          });

          marker.addListener("click", () => showChurchInfo(church));
          markers.push(marker);
        }
      });

    } else {
      alert("Location not found: " + status);
    }
  });
});

window.onload = initMap;
