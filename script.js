const imageInput = document.getElementById("imageInput");

imageInput.addEventListener("change", function(e){
  let file = e.target.files[0];

  if (!file) return;

  let img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.style.width = "200px";

  let upload = document.querySelector(".upload");
  upload.innerHTML = "";
  upload.appendChild(img);

  simulateAI();
});

// DATA (IMPORTANT)
const data = [
  {
    crop: "Wheat",
    disease: "Leaf Rust",
    cure: "Apply fungicide (Propiconazole)",
    precaution: "Avoid excessive moisture"
  },
  {
    crop: "Rice",
    disease: "Blast Disease",
    cure: "Use Tricyclazole spray",
    precaution: "Control irrigation"
  },
  {
    crop: "Tomato",
    disease: "Early Blight",
    cure: "Use Copper Fungicide",
    precaution: "Rotate crops"
  }
];

function simulateAI(){

  document.getElementById("crop").innerText = "Analyzing...";
  document.getElementById("disease").innerText = "Scanning...";
  document.getElementById("cure").innerText = "Processing...";

  setTimeout(() => {

    let item = data[Math.floor(Math.random()*data.length)];

    document.getElementById("crop").innerText = item.crop;
    document.getElementById("disease").innerText = item.disease;
    document.getElementById("cure").innerText = item.cure;

    addInsights(item);
    addHistory(item);

  }, 2000);
}

// INSIGHTS BACK
function addInsights(item){
  let insights = document.getElementById("insights");

  insights.innerHTML = `
    <li>🌱 Crop Health: Moderate</li>
    <li>🦠 Disease: ${item.disease}</li>
    <li>⚠ Precaution: ${item.precaution}</li>
    <li>📈 Yield Impact: 10-20%</li>
  `;
}

// HISTORY BACK
function addHistory(item){
  let li = document.createElement("li");
  li.innerText = `${item.crop} - ${item.disease}`;
  document.getElementById("history").appendChild(li);
}
