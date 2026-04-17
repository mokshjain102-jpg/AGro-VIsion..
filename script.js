/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({behavior:"smooth"});
}
async function handleSearch(){

  let query = document.getElementById("searchInput").value;
  let box = document.getElementById("searchResult");

  if(!query){
    box.innerHTML = "Please enter something";
    return;
  }

  box.innerHTML = "🔍 Searching...";

  try{

    // OPTION 1: SIMULATED AI RESPONSE (replace later with GPT API)
    let aiResponse = await fetch("http://127.0.0.1:5000/search",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({query})
    });

    let data = await aiResponse.json();

    box.innerHTML = `
      🌿 Result: ${data.result}<br>
      💊 Advice: ${data.advice}<br>
      📊 Confidence: ${data.confidence}%
    `;

  }catch(e){
    box.innerHTML = "⚠️ Search service not connected";
  }
}
/* WEATHER */
async function getWeather(){

  let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
  let data = await res.json();

  let humidity = data.main.humidity;
  let risk = humidity > 70 ? "⚠️ High Risk" : "✅ Low Risk";

  document.getElementById("weather").innerHTML =
  `${data.main.temp}°C | Humidity ${humidity}% <br> ${risk}`;
}
for(let i=0;i<30;i++){

  let p = document.createElement("div");
  p.className = "particle";

  p.style.left = Math.random()*100 + "vw";
  p.style.animationDuration = (5 + Math.random()*10) + "s";

  document.body.appendChild(p);
}
getWeather();

/* ANALYZE */
async function analyze(){

  let file = document.getElementById("fileInput").files[0];
  if(!file) return alert("Upload image");

  let formData = new FormData();
  formData.append("file",file);

  let res = await fetch("http://127.0.0.1:5000/analyze",{
    method:"POST",
    body:formData
  });

  let data = await res.json();

  document.getElementById("output").innerHTML =
  `🌿 ${data.disease} <br> 📊 ${data.confidence}% <br> 💊 ${data.advice}`;
}
