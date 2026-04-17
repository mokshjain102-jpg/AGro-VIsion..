document.getElementById("imageInput").addEventListener("change", function(e){
  let file = e.target.files[0];

  let formData = new FormData();
  formData.append("file", file);

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData
  })
  .then(res=>res.json())
  .then(data=>{
    document.getElementById("crop").innerText=data.crop;
    document.getElementById("disease").innerText=data.disease;
    document.getElementById("cure").innerText=data.cure;

    let li=document.createElement("li");
    li.innerText=data.crop;
    document.getElementById("history").appendChild(li);
  });
});
