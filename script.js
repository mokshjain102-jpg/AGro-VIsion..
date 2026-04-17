const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("click", () => {
  document.getElementById("imageInput").click();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  document.getElementById("imageInput").files = e.dataTransfer.files;
  preview(e.dataTransfer.files[0]);
});

function preview(file) {
  document.getElementById("preview").src = URL.createObjectURL(file);
}

function uploadImage() {
  let file = document.getElementById("imageInput").files[0];

  let formData = new FormData();
  formData.append("file", file);

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("crop").innerText = data.crop;
    document.getElementById("disease").innerText = data.disease;
    document.getElementById("cure").innerText = data.cure;
  });
}
