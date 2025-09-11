// ---------- Helpers ----------
function pad(n){ return n.toString().padStart(2,'0'); }

function formatDateTime(){
  const now = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const hours = now.getHours();
  const mins = now.getMinutes();
  const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
  const hr12 = hours % 12 || 12;

  return {
    date: `${day}, ${month} ${year}`,
    time: `${pad(hr12)}:${pad(mins)} ${ampm}`
  }
}

function updateClock(){
  const {date, time} = formatDateTime();
  document.getElementById('dateText').textContent = date;
  document.getElementById('timeText').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// ---------- Seed Data ----------
const notices = [
  { title: "Training Schedule Updated", date: "Aug 20, 2025" },
  { title: "New Equipment Arrival", date: "Aug 19, 2025" },
  { title: "Match Result Posted", date: "Aug 18, 2025" },
];

const upcoming = [
  { icon: "ri-football-line", title: "vs Manchester FC", date: "Aug 25, 2025 • 3:00 PM" },
  { icon: "ri-heart-pulse-line", title: "Training Session", date: "Aug 22, 2025 • 5:00 PM" },
];

const inventory = [
  { icon: "ri-t-shirt-line", name: "Bips", stock: 45 },
  { icon: "ri-football-line", name: "Footballs", stock: 12 },
  { icon: "ri-boot-line", name: "Boots", stock: 3 },
  { icon: "ri-flag-2-line", name: "Markers", stock: 3 },
  { icon: "ri-checkbox-blank-circle-line", name: "Cones", stock: 3 },
  { icon: "ri-infinity-line", name: "Resistant band", stock: 3 },
  { icon: "ri-cup-line", name: "Bottles", stock: 3 },
  { icon: "ri-cup-line", name: "Bottles", stock: 3 },
];

// ---------- Renderers ----------
function renderList(){
  const noticeList = document.getElementById('noticeList');
  notices.forEach(n => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${n.title}</span><span class="meta">${n.date}</span>`;
    noticeList.appendChild(li);
  });

  const upcomingList = document.getElementById('upcomingList');
  upcoming.forEach(u => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="tag"><i class="${u.icon}"></i>${u.title}</span><a class="meta" href="#" title="Open"><i class="ri-external-link-line"></i></a>`;
    const right = document.createElement('span');
    right.className = 'meta';
    right.textContent = u.date;
    li.insertBefore(right, li.lastChild);
    upcomingList.appendChild(li);
  });

  const invList = document.getElementById('inventoryList');
  inventory.forEach(item => {
    const li = document.createElement('li');
    const status = item.stock === 0 ? 'out' : (item.stock <= 10 ? 'low' : 'ok');
    li.innerHTML = `
      <div class="inv-item"><i class="${item.icon}"></i><span>${item.name}</span></div>
      <span class="stock ${status}">${item.stock} in stock</span>
    `;
    invList.appendChild(li);
  });
}
renderList();

// ---------- Add buttons (demo) ----------
document.getElementById('addNotice').addEventListener('click', () => {
  const title = prompt('Notice title:');
  if(!title) return;
  const today = new Date().toLocaleDateString('en-US', {month:'short', day:'2-digit', year:'numeric'});
  const li = document.createElement('li');
  li.innerHTML = `<span>${title}</span><span class="meta">${today}</span>`;
  document.getElementById('noticeList').prepend(li);
});

document.getElementById('addUpcoming').addEventListener('click', () => {
  const what = prompt('Event title:');
  const when = prompt('Date & time (e.g., Aug 28, 2025 • 3:00 PM):');
  if(!what || !when) return;
  const li = document.createElement('li');
  li.innerHTML = `<span class="tag"><i class="ri-calendar-event-line"></i>${what}</span><span class="meta">${when}</span><a class="meta" href="#"><i class="ri-external-link-line"></i></a>`;
  document.getElementById('upcomingList').prepend(li);
});
