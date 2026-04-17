/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({behavior:"smooth"});
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
