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
  `${data.weather[0].main} | ${data.main.temp}°C`;
}
getWeather();

/* ANALYZE */
async function analyze(){

  let file = document.getElementById("fileInput").files[0];
  if(!file){
    alert("Upload image first");
    return;
  }

  let formData = new FormData();
  formData.append("file",file);

  let res = await fetch("http://127.0.0.1:5000/analyze",{
    method:"POST",
    body:formData
  });

  let data = await res.json();

  document.getElementById("output").innerHTML =
  `🌿 ${data.disease}<br>📊 ${data.confidence}%<br>💊 ${data.advice}`;
}

/* CHART */
new Chart(document.getElementById("chart"),{
  type:"doughnut",
  data:{
    labels:["Healthy","Disease"],
    datasets:[{
      data:[60,40]
    }]
  }
});

/* CHAT */
async function sendMsg(){

  let msg = document.getElementById("msg").value;

  let res = await fetch("http://127.0.0.1:5000/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });

  let data = await res.json();

  document.getElementById("chat-body").innerHTML +=
  `<p>🧑 ${msg}</p><p>🤖 ${data.reply}</p>`;
}

/* PARTICLES */
particlesJS("particles-js",{
  particles:{
    number:{value:60},
    size:{value:3}
  }
});
