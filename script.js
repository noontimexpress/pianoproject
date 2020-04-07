// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", afterLoaded);
// } else {
//   afterLoaded();
// }

const pianoSound = document.querySelectorAll(".keysound");
const pianoSvg = document.querySelectorAll(".piano");
const majScale = [2, 4, 5, 7, 9, 11];
let hiColor = "#f0d2a8";
let rootColor = "#84DB90";
let clickColor = "#c2c5CC";
//let selector = document.getElementById("key-scale");
let keyStart;

const pianoObjArr = [];

pianoSvg.forEach((x) => {
  pianoObjArr.push({
    name: x.id,
    key: x.dataset.pianoKey,
    num: x.dataset.keyNum,
    svg: x,
    color: x.style.fill,
    midi: x.dataset.midi,
  });
});

for (let i = 0; i < pianoObjArr.length; i++) {
  for (let j = 0; j < pianoSound.length; j++) {
    if (pianoObjArr[i].midi == pianoSound[j].dataset.midi) {
      pianoObjArr[i].audio = pianoSound[j];
    }
  }
}

console.log(pianoObjArr);

function selectMajKey(key) {
  pianoObjArr.forEach((x) => {
    if (key.target.value == x.key) {
      keyStart = x.num;
      majKeyHighlight();
    } else if (key.target.value == "none") {
      deHighlight();
    }
  });
}

function deHighlight() {
  pianoObjArr.forEach(function (x) {
    x.svg.style.fill = x.color;
  });
}

function majKeyHighlight() {
  deHighlight();

  pianoObjArr.forEach((x) => {
    if (x.num == keyStart) {
      x.svg.style.fill = rootColor;
    }
  });

  majScale.forEach((el) => {
    pianoObjArr.forEach((x) => {
      if (x.num == (+keyStart + +el) % 12) {
        x.svg.style.fill = hiColor;
      } 
    });
  });
}

// pianoSvg.forEach(function (x) {
//   if (x.dataset.keyNum == (keyFirst + 2) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.dataset.keyNum == (keyFirst + 4) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.dataset.keyNum == (keyFirst + 5) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.dataset.keyNum == (keyFirst + 7) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.dataset.keyNum == (keyFirst + 9) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.dataset.keyNum == (keyFirst + 11) % 12) {
//     x.style.fill = hiColor;
//   } else if (x.id.includes("#") && x.dataset.keyNum != keyFirst) {
//     x.style.fill = "#FFFFF7";
//   } else if (!x.id.includes("#") && x.dataset.keyNum != keyFirst) {
//     x.style.fill = "#FFFFF7";
//   }
// });
// }

// console.log(pianoSvg[0].dataset.pianoKey);
// console.log(pianoSound[0]);

pianoSvg.forEach(function (x) {
  x.addEventListener("click", function (any) {
    for (let i = 0; i < pianoSound.length; i++) {
      if (any.target.dataset.pianoKey == pianoSound[i].dataset.pianoKey) {
        pianoSound[i].currentTime = 0.05;
        pianoSound[i].play();
        pressDownColor(any.target);
      }
    }
  });
});

function pressDownColor(param) {
  param.style.fill = clickColor;
  setTimeout(function () {
    majKeyHighlight();
  }, 170);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values())
    input.onmidimessage = highPlayMIDI;
}

function highPlayMIDI(x) {
  if (x.data[2] != 0) {
    let parent = x.data[1];
    pianoSvg.forEach(function (x) {
      if (x.dataset.midi == parent) {
        pressDownColor(x);
      }
    });
    for (let i = 0; i < pianoSound.length; i++) {
      if (parent == pianoSound[i].dataset.midi) {
        pianoSound[i].currentTime = 0.05;
        pianoSound[i].play();
      }
    }
  }
}

let invl = [];

let btn = document.querySelector("#randoNote");
btn.addEventListener("click", function () {
  randomInvl();
  document.querySelector("#randoNote").innerHTML = "Stop Game";
});

function randomInvl() {
  const majSev = 11;
  const minSev = 10;
  invl = [majSev, minSev];

  let randNote = Math.floor(Math.random() * Math.floor(pianoObjArr.length));
  pianoObjArr[randNote].svg.style.fill = "red";
  pianoObjArr[randNote].audio.currentTime = 0.05;
  pianoObjArr[randNote].audio.play();

  setTimeout(function () {
    majKeyHighlight();
  }, 2000);
}
