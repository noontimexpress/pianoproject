if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", afterLoaded);
} else {
  afterLoaded();
}

function afterLoaded() {
  const pianoSvg = document.querySelectorAll(".piano");
  let e = document.getElementById("key-scale");
  let keyStart;
  selectKey();

  function selectKey() {
    switch (e.value) {
      case "C Major":
        keyStart = 0;
        console.log(keyStart);
        keyHighlight();
        break;
      case "D Major":
        keyStart = 2;
        console.log(keyStart);
        keyHighlight();
        break;
      case "E Major":
        keyStart = 4;
        console.log(keyStart);
        keyHighlight();
        break;
      case "F Major":
        keyStart = 5;
        console.log(keyStart);
        keyHighlight();
        break;
      case "G Major":
        keyStart = 7;
        console.log(keyStart);
        keyHighlight();
        break;
      case "A Major":
        keyStart = 9;
        console.log(keyStart);
        keyHighlight();
        break;
      case "B Major":
        keyStart = 11;
        console.log(keyStart);
        keyHighlight();
        break;
    }

    function keyHighlight() {
      let keyFirst;
      for (let i = 0; i < pianoSvg.length; i++) {
        if (pianoSvg[i].dataset.keyNum == keyStart) {
          pianoSvg[i].style.fill = "yellow"; //color starting key
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
          x.style.fill = "yellow";
        }
        if (x.dataset.keyNum == (keyFirst + 4) % 12) {
          x.style.fill = "yellow";
          console.log(x);
        }
        if (x.dataset.keyNum == (keyFirst + 5) % 12) {
          x.style.fill = "yellow";
        }
        if (x.dataset.keyNum == (keyFirst + 7) % 12) {
          x.style.fill = "yellow";
        }
        if (x.dataset.keyNum == (keyFirst + 9) % 12) {
          x.style.fill = "yellow";
        }
        if (x.dataset.keyNum == (keyFirst + 11) % 12) {
          x.style.fill = "yellow";
        }
      });
    }
    console.log("yes");
    console.log(pianoSvg);
  }
}
