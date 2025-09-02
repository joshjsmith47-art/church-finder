// Sample Church Data
const churchesData = [
  {
    name: "Grace Church",
    city: "Cityville",
    address: "123 Main St",
    times: "Sun 10am & 6pm",
    contact: "555-1234",
    website: "https://gracechurch.com"
  },
  {
    name: "Faith Chapel",
    city: "Townsville",
    address: "456 Oak Ave",
    times: "Sun 9am & 5pm",
    contact: "555-5678",
    website: "https://faithchapel.org"
  },
  {
    name: "Hope Ministries",
    city: "Village",
    address: "789 Pine Rd",
    times: "Sat 6pm, Sun 11am",
    contact: "555-9012",
    website: "https://hopeministries.com"
  }
];

// DOM Elements
const churchList = document.getElementById('church-list');
const searchInput = document.getElementById('search');
const sidePanel = document.getElementById('side-panel');
const closeBtn = document.getElementById('close-panel');
const panelName = document.getElementById('panel-name');
const panelAddress = document.getElementById('panel-address');
const panelTimes = document.getElementById('panel-times');
const panelContact = document.getElementById('panel-contact');
const panelWebsite = document.getElementById('panel-website');

// Render Churches
function renderChurches(filter = "") {
  churchList.innerHTML = "";
  const filtered = churchesData.filter(ch => ch.city.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(ch => {
    const li = document.createElement('li');
    li.className = 'church';
    li.textContent = ch.name;
    li.dataset.name = ch.name;
    li.dataset.address = ch.address;
    li.dataset.times = ch.times;
    li.dataset.contact = ch.contact;
    li.dataset.website = ch.website;

    li.addEventListener('click', () => openPanel(ch));
    churchList.appendChild(li);
  });

  if (filtered.length === 0) {
    churchList.innerHTML = "<li style='text-align:center; padding:20px; color:#666;'>No churches found</li>";
  }
}

// Open Side Panel
function openPanel(church) {
  panelName.textContent = church.name;
  panelAddress.textContent = church.address;
  panelTimes.textContent = church.times;
  panelContact.textContent = church.contact;
  panelWebsite.textContent = church.website;
  panelWebsite.href = church.website;

  sidePanel.classList.add('open');
}

// Close Side Panel
closeBtn.addEventListener('click', () => sidePanel.classList.remove('open'));

// Search Filter
searchInput.addEventListener('input', () => renderChurches(searchInput.value));

// Initial Render
renderChurches();
