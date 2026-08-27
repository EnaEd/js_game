import GameData from "./game-data.js";
import GameMath from "./gameMath.js";

const hammer = document.getElementById('custom-hammer');

window.addEventListener('mousemove', (e) => {
  hammer.style.left = e.clientX + 'px';
  hammer.style.top = e.clientY + 'px';
});

window.addEventListener('mousedown', () => {
  hammer.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
});

window.addEventListener('mouseup', () => {
  hammer.style.transform = 'translate(-50%, -50%) rotate(0deg)';
});



document.getElementById('my-button').addEventListener('click', () => {
  alert(GameMath.moleInHole());
});

const gridMatrix = document.querySelector('.grid-matrix');

if (gridMatrix) {
  gridMatrix.addEventListener('mousedown', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('mole') && clickedElement.classList.contains('come-out')) {
      GameData.killMole();
      clickedElement.classList.remove('come-out');
    }
    else if (clickedElement.classList.contains('hole') || clickedElement.classList.contains('mole')) {
      GameData.missed();
      console.log("Промах! Текущий счет:", GameData.score);
    }
  });
}

GameData.gameLoop();
