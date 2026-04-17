AOS.init();

/* SCROLL */
function scrollToScan(){
  document.getElementById("scan").scrollIntoView({behavior:"smooth"});
}

/* PARALLAX EFFECT */
window.addEventListener("scroll",()=>{
  let scroll = window.pageYOffset;
  document.querySelector(".parallax").style.backgroundPositionY = scroll*0.5+"px";
});

/* WEATHER */
async function getWeather(){
  let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
  let data = await res.json();

  let humidity = data.main.humidity;
  let risk = humidity > 70 ? "High Risk ⚠️" : "Low Risk";

  document.getElementById("weather").innerHTML =
  `${data.main.temp}°C | Humidity ${humidity}% <br> ${risk}`;
}
getWeather();

/* ANALYZE (backend connect) */
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
  `Disease: ${data.disease} <br> Confidence: ${data.confidence}% <br> ${data.advice}`;
}

/* CHART */
new Chart(document.getElementById("chart"),{
  type:"doughnut",
  data:{
    labels:["Healthy","Disease"],
    datasets:[{data:[60,40]}]
  }
});

/* CHAT */
async function sendMessage(){
  let input = document.getElementById("userInput");
  let msg = input.value;

  let chat = document.getElementById("chatMessages");
  chat.innerHTML += `<p>🧑 ${msg}</p>`;

  let res = await fetch("http://127.0.0.1:5000/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });

  let data = await res.json();

  chat.innerHTML += `<p>🤖 ${data.reply}</p>`;
  speak(data.reply);

  input.value="";
}

/* VOICE */
function startVoice(){
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang="hi-IN";
  rec.start();

  rec.onresult = e=>{
    document.getElementById("userInput").value = e.results[0][0].transcript;
    sendMessage();
  }
}

function speak(text){
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang="hi-IN";
  speechSynthesis.speak(speech);
}
