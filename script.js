
// ================= IMAGE PREVIEW =================
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    uploadImage(file);
  }
});

// ================= DRAG & DROP =================
const hero = document.querySelector(".hero");

hero.addEventListener("dragover", (e) => {
  e.preventDefault();
  hero.style.border = "2px dashed #00ffd5";
});

hero.addEventListener("dragleave", () => {
  hero.style.border = "none";
});

hero.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  preview.src = URL.createObjectURL(file);
  uploadImage(file);
});

// ================= UPLOAD + AI =================
function uploadImage(file) {
  let formData = new FormData();
  formData.append("file", file);

  // loading state
  setLoading();

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      showResult(data);
      saveHistory(data);
      fakeAIResponse(data);
    })
    .catch(err => {
      console.log(err);
      alert("Error connecting AI!");
    });
}

// ================= LOADING =================
function setLoading() {
  document.getElementById("crop").innerText = "Analyzing...";
  document.getElementById("disease").innerText = "Scanning...";
  document.getElementById("cure").innerText = "Processing...";
}

// ================= SHOW RESULT =================
function showResult(data) {
  document.getElementById("crop").innerText = data.crop;
  document.getElementById("disease").innerText = data.disease;
  document.getElementById("cure").innerText = data.cure;
}

// ================= HISTORY =================
function saveHistory(data) {
  let historyList = document.getElementById("history");

  let li = document.createElement("li");
  li.innerText = `${data.crop} - ${data.disease}`;

  historyList.appendChild(li);
}

// ================= FAKE AI ASSISTANT =================
function fakeAIResponse(data) {
  let aiBox = document.createElement("div");
  aiBox.style.marginTop = "20px";
  aiBox.style.padding = "15px";
  aiBox.style.background = "rgba(255,255,255,0.1)";
  aiBox.style.borderRadius = "10px";

  let text = `AI Suggestion: The detected crop is ${data.crop}. 
Disease identified is ${data.disease}. 
Recommended cure: ${data.cure}. 
Ensure proper irrigation and monitoring.`;

  document.body.appendChild(aiBox);

  typeEffect(aiBox, text);
}

// ================= TYPING EFFECT =================
function typeEffect(element, text) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 20);
    }
  }
  typing();
}

// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 300;
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});

// ================= INIT ANIMATION =================
sections.forEach(sec => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "1s";
});

// ================= BUTTON CLICK EFFECT =================
const scanBtn = document.querySelector(".scan-btn");

scanBtn.addEventListener("click", () => {
  scanBtn.style.transform = "scale(0.9)";
  setTimeout(() => {
    scanBtn.style.transform = "scale(1)";
  }, 150);
});

// ================= SMOOTH SCROLL NAV =================
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))?.scrollIntoView({
      behavior: "smooth"
    });
  });
});
