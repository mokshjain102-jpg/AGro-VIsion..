AOS.init();

/* SCROLL */
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

/* WEATHER */
async function getWeather(){
try{
let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric");
let data = await res.json();

document.getElementById("weatherBox").innerHTML =
`🌦 ${data.weather[0].main}<br>🌡 ${data.main.temp}°C`;

}catch{
document.getElementById("weatherBox").innerText="Weather error";
}
}
getWeather();

/* ANALYZE */
async function analyze(){

let file = document.getElementById("fileInput").files[0];

if(!file){
alert("Upload image");
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
`🌿 ${data.disease}<br>
📊 ${data.confidence}%<br>
💊 ${data.advice}`;
}

/* CHART */
new Chart(document.getElementById("chart"),{
type:"doughnut",
data:{
labels:["Healthy","Disease"],
datasets:[{
data:[70,30],
backgroundColor:["#22c55e","#ef4444"]
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

let chat = document.getElementById("chat-body");

chat.innerHTML += `<p>🧑 ${msg}</p>`;
chat.innerHTML += `<p>🤖 ${data.reply}</p>`;

chat.scrollTop = chat.scrollHeight;
}
