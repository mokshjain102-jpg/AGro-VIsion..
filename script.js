// ==========================
// 📦 STORAGE
// ==========================
let historyData = JSON.parse(localStorage.getItem("data")) || [];


// ==========================
// 📸 IMAGE PREVIEW
// ==========================
document.getElementById("fileInput").onchange = function(e){
  let file = e.target.files[0];
  if(file){
    document.getElementById("preview").src = URL.createObjectURL(file);
  }
};


// ==========================
// 🤖 ANALYZE FUNCTION (ML READY)
// ==========================
async function analyze(){

  let file = document.getElementById("fileInput").files[0];

  if(!file){
    alert("Please select an image");
    return;
  }

  // 🔄 Loading state
  document.getElementById("output").innerText = "🔍 Analyzing image...";

  try {

    // ==========================
    // 🚀 FUTURE ML API (COMMENTED)
    // ==========================
    /*
    let formData = new FormData();
    formData.append("file", file);

    let res = await fetch("YOUR_API_URL", {
      method: "POST",
      body: formData
    });

    let data = await res.json();

    let result = data.disease;
    let confidence = data.confidence;
    */

    // ==========================
    // ⚡ TEMP FAKE RESULT
    // ==========================
    let diseases = ["Early Blight", "Leaf Spot", "Healthy"];
    let result = diseases[Math.floor(Math.random()*diseases.length)];
    let confidence = Math.floor(Math.random()*20) + 80;


    // ==========================
    // 🎯 RESULT UI
    // ==========================
    document.getElementById("output").innerHTML = `
      <h3>🌿 Disease: ${result}</h3>
      <p>📊 Confidence: ${confidence}%</p>
      <p>💊 Treatment: Use fungicide weekly</p>
      <p>🌱 Prevention: Avoid overwatering</p>
    `;

    // ==========================
    // 💾 SAVE HISTORY
    // ==========================
    let text = `${result} (${confidence}%)`;

    historyData.push(text);
    localStorage.setItem("data", JSON.stringify(historyData));

    updateDashboard();

  } catch (error){
    document.getElementById("output").innerText = "❌ Error analyzing image";
  }
}


// ==========================
// 📊 DASHBOARD UPDATE
// ==========================
function updateDashboard(){

  let total = historyData.length;
  let disease = historyData.filter(x => !x.includes("Healthy")).length;
  let healthy = total - disease;

  document.getElementById("total").innerText = total + " Scans";
  document.getElementById("disease").innerText = disease + " Diseases";
  document.getElementById("healthy").innerText = healthy + " Healthy";

  let list = document.getElementById("history");
  list.innerHTML = "";

  historyData.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}


// ==========================
// 🔐 LOGIN
// ==========================
function openLogin(){
  document.getElementById("loginBox").style.display = "block";
}

function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u && p){
    alert("Login Success");
    document.getElementById("loginBox").style.display = "none";
  } else {
    alert("Enter details");
  }
}


// ==========================
// 🔽 SMOOTH SCROLL
// ==========================
function scrollToSec(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}


// ==========================
// 💬 CHATBOT (TEXT)
// ==========================
function handleKey(e){
  if(e.key === "Enter"){
    let input = document.getElementById("chat-input");
    handleBot(input.value);
    input.value = "";
  }
}


// ==========================
// 🤖 BOT LOGIC + VOICE OUTPUT
// ==========================
function handleBot(msg){

  msg = msg.toLowerCase();
  addMsg("You: " + msg);

  let reply = "Kripya image upload karein.";

  if(msg.includes("blight")){
    reply = "Aapki fasal mein blight hai. Fungicide ka use karein.";
  }
  else if(msg.includes("yellow")){
    reply = "Patte peele hain. Nitrogen fertilizer use karein.";
  }
  else if(msg.includes("leaf")){
    reply = "Infected leaves hata dein aur neem oil spray karein.";
  }
  else if(msg.includes("treatment")){
    reply = "Sahi pesticide aur regular monitoring karein.";
  }
  else if(msg.includes("prevent")){
    reply = "Zyada paani se bachein aur crop rotation karein.";
  }
  else if(msg.includes("weather")){
    reply = "Humidity zyada hone se disease risk badhta hai.";
  }

  addMsg("Bot: " + reply);

  // 🔊 Voice Output (Hindi)
  let speech = new SpeechSynthesisUtterance(reply);
  speech.lang = "hi-IN";
  speechSynthesis.speak(speech);
}


// ==========================
// 🎤 VOICE INPUT (MIC)
// ==========================
function startVoice(){

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = "hi-IN";
  recognition.start();

  recognition.onresult = function(e){
    let text = e.results[0][0].transcript;
    handleBot(text);
  };
}


// ==========================
// 💬 CHAT UI
// ==========================
function addMsg(text){
  let box = document.getElementById("chat-box");
  let div = document.createElement("div");
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}


// ==========================
// 🚀 INIT
// ==========================
updateDashboard();
