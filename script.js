if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", afterLoaded);
} else {
  afterLoaded();
}

function afterLoaded() {
  const pianoSvg = document.querySelectorAll(".piano");
  const hiColor = '#85D2FF';
  let e = document.getElementById("key-scale");
  let keyStart;
  selectKey();

  function selectKey() {
    switch (e.value) {
      case "C Major":
        keyStart = 0;
        majKeyHighlight();
        break;
      case "C# Major":
        keyStart = 1;
        majKeyHighlight();
        break;
      case "D Major":
        keyStart = 2;
        majKeyHighlight();
        break;
      case "D# Major":
        keyStart = 3;
        majKeyHighlight();
        break;
      case "E Major":
        keyStart = 4;
        majKeyHighlight();
        break;
      case "F Major":
        keyStart = 5;
        majKeyHighlight();
        break;
      case "F# Major":
        keyStart = 6;
        majKeyHighlight();
        break;
      case "G Major":
        keyStart = 7;
        majKeyHighlight();
        break;
      case "G# Major":
        keyStart = 8;
        majKeyHighlight();
        break;
      case "A Major":
        keyStart = 9;
        majKeyHighlight();
        break;
      case "A# Major":
        keyStart = 10;
        majKeyHighlight();
        break;
      case "B Major":
        keyStart = 11;
        majKeyHighlight();
        break;
    }

    function majKeyHighlight() {
      let keyFirst;
      for (let i = 0; i < pianoSvg.length; i++) {
        if (pianoSvg[i].dataset.keyNum == keyStart) {
          pianoSvg[i].style.fill = hiColor; //color starting key
          keyFirst = parseInt(pianoSvg[i].dataset.keyNum);
        }
      }
      console.log(keyFirst); //4
      console.log(keyFirst + 2); //6

      pianoSvg.forEach(function(x) {
        console.log(x);
      });

      pianoSvg.forEach(function(x) {
        if (x.dataset.keyNum == (keyFirst + 2) % 12) {
          x.style.fill = hiColor;
        }
        if (x.dataset.keyNum == (keyFirst + 4) % 12) {
          x.style.fill = hiColor;
          console.log(x);
        }
        if (x.dataset.keyNum == (keyFirst + 5) % 12) {
          x.style.fill = hiColor;
        }
        if (x.dataset.keyNum == (keyFirst + 7) % 12) {
          x.style.fill = hiColor;
        }
        if (x.dataset.keyNum == (keyFirst + 9) % 12) {
          x.style.fill = hiColor;
        }
        if (x.dataset.keyNum == (keyFirst + 11) % 12) {
          x.style.fill = hiColor;
        }
      });
    }
    console.log("yes");
    console.log(pianoSvg);
  }
}
