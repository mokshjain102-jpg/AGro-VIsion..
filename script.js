const imageInput = document.getElementById("imageInput");

// SOUND EFFECT (OPTIONAL)
function clickSound() {
  let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
  audio.play();
}

// BUTTON CLICK FEEDBACK
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound();
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 150);
  });
});

// IMAGE UPLOAD + PREVIEW
imageInput.addEventListener("change", function(e){
  let file = e.target.files[0];

  if (!file) return;

  // preview image
  let img = document.createElement("img");
  img.id = "preview";
  img.src = URL.createObjectURL(file);

  let uploadBox = document.querySelector(".upload");
  uploadBox.innerHTML = "";
  uploadBox.appendChild(img);

  simulateAI();
});

// DRAG DROP
const upload = document.querySelector(".upload");

upload.addEventListener("dragover", (e) => {
  e.preventDefault();
  upload.style.background = "rgba(0,255,204,0.2)";
});

upload.addEventListener("dragleave", () => {
  upload.style.background = "transparent";
});

upload.addEventListener("drop", (e) => {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  imageInput.files = e.dataTransfer.files;

  let img = document.createElement("img");
  img.id = "preview";
  img.src = URL.createObjectURL(file);

  upload.innerHTML = "";
  upload.appendChild(img);

  simulateAI();
});

// FAKE AI SIMULATION (REAL FEEL)
function simulateAI() {

  document.getElementById("crop").innerText = "🔍 Scanning...";
  document.getElementById("disease").innerText = "🧠 AI analyzing...";
  document.getElementById("cure").innerText = "⚙ Processing...";

  setTimeout(() => {

    let crops = ["Wheat", "Rice", "Tomato", "Corn"];
    let diseases = ["Leaf Rust", "Blight", "Powdery Mildew", "Healthy"];
    let cures = [
      "Apply fungicide spray",
      "Improve irrigation",
      "Use organic treatment",
      "No action needed"
    ];

    let c = crops[Math.floor(Math.random()*crops.length)];
    let d = diseases[Math.floor(Math.random()*diseases.length)];
    let cure = cures[Math.floor(Math.random()*cures.length)];

    document.getElementById("crop").innerText = c;
    document.getElementById("disease").innerText = d;
    document.getElementById("cure").innerText = cure;

    addHistory(c, d);
    addInsights(d);

  }, 2000);
}

// HISTORY
function addHistory(crop, disease){
  let li = document.createElement("li");
  li.innerText = crop + " - " + disease;
  document.getElementById("history").appendChild(li);
}

// INSIGHTS
function addInsights(disease){
  let insights = document.getElementById("insights");

  insights.innerHTML = `
    <li>🌱 Crop Health: Moderate</li>
    <li>🦠 Risk: ${disease}</li>
    <li>📊 Yield Impact: 10-20%</li>
    <li>💡 Suggestion: Monitor regularly</li>
  `;
}
