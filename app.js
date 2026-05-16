const INDIA_BOUNDS = "6.5,68.1,37.6,97.4";

const tokenInput = document.getElementById("tokenInput");
const saveTokenBtn = document.getElementById("saveTokenBtn");
const refreshBtn = document.getElementById("refreshBtn");
const messageEl = document.getElementById("message");
const avgAqiEl = document.getElementById("avgAqi");
const worstAqiEl = document.getElementById("worstAqi");
const overallStatusEl = document.getElementById("overallStatus");
const aqiTableBody = document.getElementById("aqiTableBody");

const savedToken = localStorage.getItem("waqi_token");
if (savedToken) tokenInput.value = savedToken;

saveTokenBtn.addEventListener("click", () => {
  localStorage.setItem("waqi_token", tokenInput.value.trim());
  messageEl.textContent = "Token saved locally in your browser.";
});

refreshBtn.addEventListener("click", loadData);

function aqiCategory(aqi) {
  if (aqi <= 50) return ["Good", "good"];
  if (aqi <= 100) return ["Moderate", "moderate"];
  if (aqi <= 150) return ["Unhealthy for Sensitive Groups", "usg"];
  if (aqi <= 200) return ["Unhealthy", "unhealthy"];
  if (aqi <= 300) return ["Very Unhealthy", "very-unhealthy"];
  return ["Hazardous", "hazardous"];
}

async function loadData() {
  const token = tokenInput.value.trim();
  if (!token) {
    messageEl.textContent = "Please enter a WAQI token first.";
    return;
  }

  messageEl.textContent = "Loading...";
  aqiTableBody.innerHTML = "";

  try {
    const url = `https://api.waqi.info/v2/map/bounds?latlng=${INDIA_BOUNDS}&networks=all&token=${token}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok") {
      throw new Error(data.data || "Could not fetch AQI data.");
    }

    const rows = data.data
      .filter((item) => Number.isFinite(item.aqi))
      .map((item) => ({
        city: item.station?.name || "Unknown",
        aqi: item.aqi
      }))
      .sort((a, b) => b.aqi - a.aqi);

    if (!rows.length) {
      messageEl.textContent = "No AQI values returned for India right now.";
      return;
    }

    const total = rows.reduce((sum, r) => sum + r.aqi, 0);
    const avg = Math.round(total / rows.length);
    const worst = rows[0].aqi;
    const [overallText] = aqiCategory(avg);

    avgAqiEl.textContent = String(avg);
    worstAqiEl.textContent = String(worst);
    overallStatusEl.textContent = overallText;

    rows.forEach((row) => {
      const [label, cls] = aqiCategory(row.aqi);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.city}</td>
        <td>${row.aqi}</td>
        <td><span class="badge ${cls}">${label}</span></td>
      `;
      aqiTableBody.appendChild(tr);
    });

    messageEl.textContent = `Loaded ${rows.length} locations across India.`;
  } catch (error) {
    messageEl.textContent = `Error: ${error.message}`;
  }
}

if (savedToken) loadData();
