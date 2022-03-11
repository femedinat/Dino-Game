const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const defeat = document.getElementById('game-over');
let isJumping = false;
let isRunning = false;
let position = 0;
let pontos = 0;

function setPontos() {
  const htmlPontos = document.getElementById("pontos");
  htmlPontos.innerHTML = 'Pontos: ' + pontos;
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
    if (!isRunning) {
        show(defeat, 'none')
        pontos = 0;
        setPontos();
      createCactus();
    }
  }
}

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
    }

    dino.style.bottom = position + "px";
  }, 20);
}

function createCactus() {
  isRunning = true;

  const cactus = document.createElement("div");
  let cactusPosition = 1100;
  let randomTime = Math.random() * 8000;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);
  
  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      pontos++;
      setPontos();
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftInterval);
      clearTimeout(myTimeout);
      clearCactus();
      isRunning = false;
      
      show(defeat);

    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  var myTimeout = setTimeout(createCactus, randomTime);
}

function clearCactus(){
    var cactus = document.querySelectorAll('.cactus');
    cactus.forEach(el => el.remove());
}

function show (elements, specifiedDisplay) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
      elements[index].style.display = specifiedDisplay || '';
    }
  }

document.addEventListener("keyup", handleKeyUp);
