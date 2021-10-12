class Game {
    constructor () {
        this.missed = 0;
        this.phrases = [new Phrase("Its just a flesh wound"), new Phrase("Im just one flu away from my goal weight"), new Phrase("I believe you have my stapler"), new Phrase("Its not a man purse"), new Phrase("Sell crazy someplace else")];
        this.activePhrase = null;
    }

   /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
    getRandomPhrase(phrases) {
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }
    /**
   * Begins game by selecting a random phrase and displaying it to user
   */
    startGame(){
        const overlay = document.getElementById("overlay");
        overlay.style.visibility = 'hidden';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }
    /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't
   won
   */
   checkForWin() {
       let hideLi = document.getElementsByClassName('hide');
       if( hideLi.length == 0 ) {
           this.gameOver(true);
           return true;
       } else {
           return false;
       }
   }

   /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
   removeLife() {
       // get all the li that has heart images
       let liLives = document.querySelector('#scoreboard ol').children;
       this.missed += 1;
       // Loops through the li with heart images to find the one that needs to be changed
       for (let i = 0; i < liLives.length; i++) {
           // Selecting image of li
           const heartImg = liLives[i].querySelector('img');
           // if missed is less than 5 AND heartimg.src includes liveHeart.png then replaces image with lostHeart
           if (this.missed < 5 && heartImg.src.includes("liveHeart.png")) {
               heartImg.src = "images/lostHeart.png";
               break;

           } else if (this.missed >= 5){
               // Replaces the last heart image with lostHeart image 
               heartImg.src = "images/lostHeart.png";
               this.gameOver(false);
           }
       }
   }
   /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
   gameOver(gameWon) {
       //display start screen overlay
        const overlay = document.getElementById("overlay");
        overlay.style = 'block';

       if (gameWon) {
           //updates overlay h1 with win message
           //replace overlay 'start' CSS class with 'win' CSS class
           const h1 = document.getElementById("game-over-message");
           h1.textContent = "You won! Great job."
           overlay.classList.remove("start");
           overlay.classList.remove("lose");
           overlay.classList.add("win");
       } else {
           //updates overlay h1 with lose message
           //replace overlay 'start' CSS class with 'lose' CSS class
           const h1 = document.getElementById("game-over-message");
           h1.textContent = "Sorry, you are out of tries."
           overlay.classList.remove("start");
           overlay.classList.remove("win");
           overlay.classList.add("lose");
       }
       this.reset();
   }

   /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
   handleInteraction(button) {
       let clickedButton = button; 
       let letter = button.innerText;
       clickedButton.disabled = true;

       if(!this.activePhrase.checkLetter(letter)) {
           clickedButton.classList.add("wrong");
           this.removeLife();
       } else {
           clickedButton.classList.add("chosen");
           this.activePhrase.showMatchedLetter(letter);
           this.checkForWin();
       }
   }
   
   /*
   * Resets the gameboard between games
   */
   reset() {
       //Remove all li elements from Phrase ul
       const ul = document.querySelector('#phrase ul');
       ul.innerHTML = '';

       //Enable all keyboard buttons
       const keyboardButtons = document.getElementsByClassName("key");
       //Update class to 'key'
       for (let i = 0; i < keyboardButtons.length; i++) {
           keyboardButtons[i].disabled = false;
           keyboardButtons[i].classList.remove("wrong");
           keyboardButtons[i].classList.remove("chosen");
           keyboardButtons[i].classList.add("key");
       }

       //Reset heart images to liveHeart
       const liLives = document.querySelector('#scoreboard ol').children;
       for (let i = 0; i < liLives.length; i++) {
           const heartImg = liLives[i].querySelector('img');
           heartImg.src = "images/liveHeart.png";
       }

   }

}