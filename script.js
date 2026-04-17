/* ================= script.js ================= */
function fakeAI(){
 document.getElementById("demoResult") && (document.getElementById("demoResult").innerText="Disease: Early Blight (92% confidence)");
 document.getElementById("result") && (document.getElementById("result").innerText="AI Result: Early Blight detected");
 document.getElementById("confidence") && (document.getElementById("confidence").innerText="Confidence: 92%");
 document.getElementById("prevention") && (document.getElementById("prevention").innerText="Prevention: Avoid overwatering, crop rotation");
}

function helpMode(){
 document.getElementById("help").innerText="Emergency Tip: Use fungicide immediately and isolate infected plants.";
}

function scrollToDemo(){
 document.getElementById("demo").scrollIntoView({behavior:'smooth'});
}
