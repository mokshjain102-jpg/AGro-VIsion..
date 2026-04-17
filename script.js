/* INIT AOS */
AOS.init();

/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({behavior:"smooth"});
}

/* CURSOR EFFECT */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

/* PARALLAX SCROLL */
window.addEventListener("scroll",()=>{
  let scroll = window.scrollY;
  let hero = document.querySelector(".hero");
  if(hero){
    hero.style.transform = `translateY(${scroll * 0.3}px)`;
  }
});

/* SEARCH AI */
async function handleSearch(){

  let query = document.getElementById("searchInput").value;
  let box = document.getElementById("searchResult");

  if(!query){
    box.innerHTML = "⚠️ Enter something";
    return;
  }

  box.innerHTML = "🔍 Searching...";

  try{
    let res = await fetch("http://127.0.0.1:5000/search",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({query})
    });

    let data = await res.json();

    box.innerHTML = `
      🌿 <b>Result:</b> ${data.result}<br>
      💊 <b>Advice:</b> ${data.advice}<br>
      📊 <b>Confidence:</b> ${data.confidence}%
    `;

  }catch(e){
    box.innerHTML = "⚠️ AI search not connected";
  }
}

/* WEATHER */
async function getWeather(){

  try{
    let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
    let data = await res.json();

    let humidity = data.main.humidity;
    let risk = humidity > 70 ? "⚠️ High Risk" : "✅ Low Risk";

    document.getElementById("weather").innerHTML =
      `${data.main.temp}°C | Humidity ${humidity}% <br>${risk}`;

    /* TOP PANEL WEATHER */
    document.getElementById("weatherMini").innerText =
      `${data.main.temp}°C`;

  }catch{
    document.getElementById("weather").innerHTML = "Weather error";
  }
}

getWeather();

/* FLOATING PARTICLES */
for(let i=0;i<30;i++){

  let p = document.createElement("div");
  p.className = "particle";

  p.style.left = Math.random()*100 + "vw";
  p.style.animationDuration = (5 + Math.random()*10) + "s";

  document.body.appendChild(p);
}

/* PARTICLES JS BACKGROUND */
particlesJS("particles-js",{
  particles:{
    number:{value:60},
    size:{value:3},
    move:{speed:2}
  }
});

/* ANALYZE IMAGE */
async function analyze(){

  let file = document.getElementById("fileInput").files[0];
  if(!file){
    alert("Upload image first");
    return;
  }

  let formData = new FormData();
  formData.append("file",file);

  try{
    let res = await fetch("http://127.0.0.1:5000/analyze",{
      method:"POST",
      body:formData
    });

    let data = await res.json();

    document.getElementById("output").innerHTML =
      `🌿 ${data.disease}<br>📊 ${data.confidence}%<br>💊 ${data.advice}`;

  }catch{
    document.getElementById("output").innerHTML = "⚠️ Backend not connected";
  }
}
