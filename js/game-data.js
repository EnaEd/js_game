import GameMath from "./gameMath.js";

export default class GameData {
  static score = 0;
  static gameIntervalId = null;

  static get isLoose() {
    return this.score < 0;
  }

  static get isWin() {
    return this.score > 3;
  }

  static killMole() {
    this.score++;
    this.updateScoreDisplay();
  }

  static missed() {
    this.score--;
    this.updateScoreDisplay();
  }

  static updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = this.score.toString();
    }
  }
  static showMole() {
    let index = GameMath.moleInHole()
    const mole = document.getElementById(`mole-${index}`);

    mole.classList.add('come-out');

    setTimeout(() => {
      mole.classList.remove('come-out');
    }, 750);
  }
  static checkState() {
    if (this.isLoose) {
      this.stopGame();
      const restart = confirm("You loose! \n Continue?");
      if (restart) {
        this.resetAndStart();
      }
      return true;
    }
    if (this.isWin) {
      this.stopGame();
      const restart = confirm("You win!\n Continue?");
      if (restart) {
        this.resetAndStart();
      }
      return true;
    }
    return false;
  }

  static stopGame() {
    clearInterval(this.gameIntervalId);
  }

  static resetAndStart() {
    this.score = 0;
    this.updateScoreDisplay();
    this.gameLoop();
  }

  static gameLoop() {
    this.stopGame();

    this.gameIntervalId = setInterval(() => {
      if (this.checkState()) {
        return;
      }
      this.showMole();
    }, 750);
  }


}
