// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", afterLoaded);
// } else {
//   afterLoaded();
// }

const pianoSound = document.querySelectorAll(".keysound");
const pianoSvg = document.querySelectorAll(".piano");
let hiColor = "#f0d2a8";
let rootColor = "#84DB90";
let regColor = "#FFFFF7";
let sharpColor = "#4B4B4B";
let clickColor = "#c2c5CC"
//let selector = document.getElementById("key-scale");
let keyStart;

function selectMajKey(key) {
  switch (key.target.value) {
    case "none":
      deHighlight();
      break;
    case "C Major":
      deHighlight();
      keyStart = 0;
      majKeyHighlight();
      break;
    case "C# Major":
      deHighlight();
      keyStart = 1;
      majKeyHighlight();
      break;
    case "D Major":
      deHighlight();
      keyStart = 2;
      majKeyHighlight();
      break;
    case "D# Major":
      deHighlight();
      keyStart = 3;
      majKeyHighlight();
      break;
    case "E Major":
      deHighlight();
      keyStart = 4;
      majKeyHighlight();
      break;
    case "F Major":
      deHighlight();
      keyStart = 5;
      majKeyHighlight();
      break;
    case "F# Major":
      deHighlight();
      keyStart = 6;
      majKeyHighlight();
      break;
    case "G Major":
      deHighlight();
      keyStart = 7;
      majKeyHighlight();
      break;
    case "G# Major":
      deHighlight();
      keyStart = 8;
      majKeyHighlight();
      break;
    case "A Major":
      deHighlight();
      keyStart = 9;
      majKeyHighlight();
      break;
    case "A# Major":
      deHighlight();
      keyStart = 10;
      majKeyHighlight();
      break;
    case "B Major":
      deHighlight();
      keyStart = 11;
      majKeyHighlight();
      break;
  }
}

function deHighlight() {
  pianoSvg.forEach(function(x) {
    if (x.id.includes("#")) {
      x.style.fill = sharpColor;
    } else {
      x.style.fill = regColor;
    }
  });
}

function majKeyHighlight() {
  let keyFirst;
  for (let i = 0; i < pianoSvg.length; i++) {
    if (pianoSvg[i].dataset.keyNum == keyStart) {
      pianoSvg[i].style.fill = rootColor; //color starting key
      keyFirst = parseInt(pianoSvg[i].dataset.keyNum);
    }
  }

  pianoSvg.forEach(function(x) {
    if (x.dataset.keyNum == (keyFirst + 2) % 12) {
      x.style.fill = hiColor;
    } else if (x.dataset.keyNum == (keyFirst + 4) % 12) {
      x.style.fill = hiColor;
    } else if (x.dataset.keyNum == (keyFirst + 5) % 12) {
      x.style.fill = hiColor;
    } else if (x.dataset.keyNum == (keyFirst + 7) % 12) {
      x.style.fill = hiColor;
    } else if (x.dataset.keyNum == (keyFirst + 9) % 12) {
      x.style.fill = hiColor;
    } else if (x.dataset.keyNum == (keyFirst + 11) % 12) {
      x.style.fill = hiColor;
    } else if (x.id.includes("#") && x.dataset.keyNum != keyFirst) {
        x.style.fill = sharpColor;
    } else if (!x.id.includes("#") && x.dataset.keyNum != keyFirst) {
        x.style.fill = regColor;
    }
})
}

console.log(pianoSvg[0].dataset.pianoKey);
console.log(pianoSound[0]);

pianoSvg.forEach(function(x) {
  x.addEventListener("click", function(any) {
    for (let i = 0; i < pianoSound.length; i++) {
      if (any.target.dataset.pianoKey == pianoSound[i].dataset.pianoKey) {
        pianoSound[i].currentTime = 0.05;
        pianoSound[i].play();
        pressDownColor(any);
      }
    }
  });
});

function pressDownColor(param) {
  param.target.style.fill = clickColor;
  setTimeout(function() {
    majKeyHighlight();
  }, 170);
}
