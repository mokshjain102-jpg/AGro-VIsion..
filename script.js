const crops = [
  {
    name: "Wheat",
    diseases: [
      {
        name: "Leaf Rust",
        cure: "Apply fungicide like Propiconazole",
        precaution: "Avoid excess moisture"
      },
      {
        name: "Powdery Mildew",
        cure: "Use sulfur-based spray",
        precaution: "Ensure proper air circulation"
      }
    ]
  },
  {
    name: "Rice",
    diseases: [
      {
        name: "Blast Disease",
        cure: "Use Tricyclazole fungicide",
        precaution: "Avoid overwatering"
      },
      {
        name: "Brown Spot",
        cure: "Apply balanced fertilizer",
        precaution: "Maintain soil nutrients"
      }
    ]
  },
  {
    name: "Tomato",
    diseases: [
      {
        name: "Early Blight",
        cure: "Use copper fungicide",
        precaution: "Rotate crops regularly"
      },
      {
        name: "Late Blight",
        cure: "Apply Mancozeb spray",
        precaution: "Avoid wet leaves"
      }
    ]
  }
];

document.getElementById("imageInput").addEventListener("change", function(e){
  let file = e.target.files[0];

  document.getElementById("preview").src = URL.createObjectURL(file);

  simulateAI();
});

function simulateAI() {

  // loading animation
  document.getElementById("crop").innerText = "Analyzing...";
  document.getElementById("disease").innerText = "Scanning...";
  document.getElementById("cure").innerText = "Processing...";

  setTimeout(() => {

    let crop = crops[Math.floor(Math.random() * crops.length)];
    let disease = crop.diseases[Math.floor(Math.random() * crop.diseases.length)];

    document.getElementById("crop").innerText = crop.name;
    document.getElementById("disease").innerText = disease.name;
    document.getElementById("cure").innerText = disease.cure;

    addInsights(crop, disease);
    addHistory(crop, disease);

  }, 2000);
}

function addInsights(crop, disease) {
  let insights = document.getElementById("insights");

  insights.innerHTML = `
    <div class="box">🌱 Crop Health: Moderate</div>
    <div class="box">🦠 Risk Level: Medium</div>
    <div class="box">💊 Suggestion: ${disease.precaution}</div>
    <div class="box">📈 Yield Impact: 15-25%</div>
  `;
}

function addHistory(crop, disease) {
  let li = document.createElement("li");
  li.innerText = `${crop.name} - ${disease.name}`;
  document.getElementById("history").appendChild(li);
}
