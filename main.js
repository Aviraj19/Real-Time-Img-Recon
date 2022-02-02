previousresults=""
function setup() {
  canvas = createCanvas(450,500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet",modeloaded);
}
function modeloaded() {
  console.log("model is loaded")
}
function draw() {
  image(video ,0,0,450,500);
  classifier.classify(video,gotresult);
}
function gotresult(error,results) {
  if(error) {
    console.error(error);
  }
  else {
    if ((results[0].confidence>0.5) && (previousresults!= results[0].label)) {
      console.log(results);
      previousresults=results[0].label;
      var synth=window.speechSynthesis;
      speakdata="object detected is "+results[0].label;
      var utter=new SpeechSynthesisUtterance(speakdata);
      synth.speak(utter);
      document.getElementById("Object").innerHTML=results[0].label;
      document.getElementById("Accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}