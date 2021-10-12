var game;
const startButton = document.getElementById("btn__reset");
const keys = document.getElementsByClassName("key");


startButton.addEventListener('click', (e) => {
game = new Game();
game.startGame();
});

//loops through the keyboard keys
for(let i = 0; i < keys.length; i++){
	//listens for button clicks on the UI keyboard
	keys[i].addEventListener("click", function(e){
		let target = e.target;
			
		if (target.tagName === "BUTTON") {
			game.handleInteraction(target);
		}
	});
}