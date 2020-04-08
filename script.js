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

let btn = document.querySelector("#randoNote");
btn.addEventListener("click", function () {
  randomInvl();
  document.querySelector("#randoNote").innerHTML = "Stop Game";
});

function randomInvl() {
  const invl = [
    { name: "majSev", val: 11 },
    { name: "minSev", val: 10 },
    { name: "majFifth", val: 7}
  ];

  let pianoObjArrMidi = pianoObjArr.sort((a, b) => a.midi - b.midi);
  let rand = Math.floor(Math.random() * Math.floor(pianoObjArrMidi.length));
  let randInvl = invl[Math.floor(Math.random() * Math.floor(invl.length))];
  let secVal = randInvl.val;

  let sec;

  let firstNote = pianoObjArrMidi[rand];

  if (rand + secVal > pianoObjArrMidi.length - 1) {
    sec = rand - (12 - secVal);
  } else {
    sec = rand + secVal;
  }

  let secNote = pianoObjArrMidi[sec];
  document.querySelector("#interval").innerHTML = `this is ${randInvl.name}`;

  firstNote.svg.style.fill = "red";
  secNote.svg.style.fill = "green";

  firstNote.audio.currentTime = 0.05;
  firstNote.audio.play();
  secNote.audio.currentTime = 0.05;
  secNote.audio.play();

  setTimeout(function () {
    majKeyHighlight();
  }, 200);
}
