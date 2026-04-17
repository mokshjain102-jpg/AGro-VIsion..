function uploadImage() {
  let file = document.getElementById("imageInput").files[0];

  if (!file) {
    alert("Upload image first!");
    return;
  }

  // preview
  document.getElementById("preview").src = URL.createObjectURL(file);

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
  })
  .catch(err => console.log(err));
}
