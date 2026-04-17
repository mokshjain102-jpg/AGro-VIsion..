AOS.init();

/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({behavior:"smooth"});
}

/* WEATHER */
async function getWeather(){
  let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
  let data = await res.json();

  document.getElementById("weather").innerHTML =
  data.main.temp + "°C";

  document.getElementById("weatherMini").innerText =
  data.main.temp + "°C";
}
getWeather();

/* PARTICLES */
particlesJS("particles-js",{
  particles:{
    number:{value:60},
    size:{value:3}
  }
});

/* ANALYZE */
async function analyze(){
  let file = document.getElementById("fileInput").files[0];
  if(!file) return alert("Upload image first");
}
