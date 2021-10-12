class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
   /**
   * Display phrase on game board
   */
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');

       for (let i = 0; i < this.phrase.length; i++) {
           let li = document.createElement('li');
           li.innerHTML = `${this.phrase[i]}`;
           if ( this.phrase[i] === ' ' ) {
               li.className = "space";
           } else {
               li.className += `hide letter ${this.phrase[i]}`;
           }

           ul.appendChild(li);
       }	
   }
    /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }
    /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
    showMatchedLetter(letter) {
        let li = document.querySelector('#phrase ul').children;
        for (let i = 0; i < li.length; i++) {
            if(li[i].innerText == letter) {
                li[i].classList.remove('hide');
                li[i].classList.add('show');
            }
        }

    }
}