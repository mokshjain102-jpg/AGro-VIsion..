const input = document.getElementById("imageInput");

input.addEventListener("change", function(e){
  const file = e.target.files[0];
  if(!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.style.width = "150px";

  const upload = document.querySelector(".upload");
  upload.innerHTML = "";
  upload.appendChild(img);

  runAI();
});

const data = [
  {crop:"Wheat",disease:"Rust",cure:"Use fungicide",precaution:"Avoid moisture"},
  {crop:"Rice",disease:"Blast",cure:"Spray Tricyclazole",precaution:"Control water"},
  {crop:"Tomato",disease:"Blight",cure:"Copper spray",precaution:"Crop rotation"}
];

function runAI(){
  setTimeout(()=>{
    let d=data[Math.floor(Math.random()*data.length)];

    document.getElementById("crop").innerText=d.crop;
    document.getElementById("disease").innerText=d.disease;
    document.getElementById("cure").innerText=d.cure;

    document.getElementById("insights").innerHTML=`
      <li>Health: Moderate</li>
      <li>Disease: ${d.disease}</li>
      <li>Precaution: ${d.precaution}</li>
    `;

    let li=document.createElement("li");
    li.innerText=d.crop+" - "+d.disease;
    document.getElementById("history").appendChild(li);

  },1500);
}

/* WEATHER API (FREE) */
fetch("https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true")
.then(res=>res.json())
.then(data=>{
  document.getElementById("weatherText").innerText =
    data.current_weather.temperature + "°C";
});

/* CHATBOT */
function sendMessage(){
  let input=document.getElementById("chatInput");
  let msg=input.value;

  let box=document.getElementById("chatMessages");
  box.innerHTML+=`<p>👤 ${msg}</p>`;

  let reply="🌱 Maintain irrigation and monitor crops.";

  if(msg.includes("disease")) reply="Use fungicide and remove infected leaves.";
  if(msg.includes("water")) reply="Avoid overwatering crops.";

  box.innerHTML+=`<p>🤖 ${reply}</p>`;
  input.value="";
}
