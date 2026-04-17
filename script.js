/* INIT ANIMATIONS */
AOS.init({ duration: 800, once: true });

/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({ behavior: "smooth" });
}

/* WEATHER */
async function getWeather(){

  try{
    let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
    let data = await res.json();

    let weatherText = `🌦 ${data.weather[0].main} | 🌡 ${data.main.temp}°C`;

    document.getElementById("weather").innerText = weatherText;
    document.getElementById("weatherMini").innerText = weatherText;

  }catch{
    document.getElementById("weather").innerText = "Weather unavailable";
  }
}

getWeather();

/* AI ANALYZE FLOW */
async function analyze(){

  let fileInput = document.getElementById("fileInput");
  let output = document.getElementById("output");

  let file = fileInput.files[0];

  if(!file){
    alert("Please upload an image first");
    return;
  }

  /* STEP 1: LOADING UI */
  output.innerHTML = `
    <p>🔍 Analyzing image...</p>
    <p style="opacity:0.7;">Processing with AI model</p>
  `;

  /* STEP 2: FAKE PROGRESS FEEL */
  await delay(800);
  output.innerHTML = "🧠 Detecting disease pattern...";

  await delay(800);
  output.innerHTML = "📊 Calculating severity...";

  await delay(800);

  /* STEP 3: BACKEND CALL */
  let formData = new FormData();
  formData.append("file", file);

  try{

    let res = await fetch("http://127.0.0.1:5000/analyze",{
      method:"POST",
      body:formData
    });

    let data = await res.json();

    /* STEP 4: RESULT UI */
    output.innerHTML = `
      <h3>🌿 ${data.disease}</h3>
      <p>📊 Confidence: ${data.confidence}%</p>
      <p>💊 ${data.advice}</p>
    `;

    saveHistory(data, file);

  }catch{

    output.innerHTML = "❌ Error connecting to AI server";

  }
}

/* DELAY FUNCTION */
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* HISTORY SAVE */
function saveHistory(data, file){

  let history = JSON.parse(localStorage.getItem("scanHistory")) || [];

  let item = {
    disease: data.disease,
    confidence: data.confidence,
    date: new Date().toLocaleString()
  };

  history.unshift(item);
  localStorage.setItem("scanHistory", JSON.stringify(history));

  renderHistory();
}

/* HISTORY RENDER */
function renderHistory(){

  let box = document.querySelector(".history-box");

  let history = JSON.parse(localStorage.getItem("scanHistory")) || [];

  if(history.length === 0){
    box.innerHTML = "No scans yet";
    return;
  }

  box.innerHTML = history.slice(0,5).map(item => `
    <div style="margin-bottom:10px;">
      🌿 ${item.disease} (${item.confidence}%)
      <br><small>${item.date}</small>
    </div>
  `).join("");
}

renderHistory();

/* EXTRA: SMOOTH SCROLL ACTIVE LINK */
document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click",()=>{
    document.querySelectorAll("nav a").forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
  });
});
