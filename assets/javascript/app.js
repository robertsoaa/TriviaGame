//JavaScript Document
$(document).ready(function () {
	// Create a function that creates the start button and initial screen

	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Enter Game of Thrones Quiz</a></p>";
		$(".mainArea").html(startScreen);

	}


initialScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();
	var audio = new Audio("assets/music/got.mp3");
	audio.play();
	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

//  Generate a loss due to timeout
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wronganswer.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 6000);  //  6000 is the wait time
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  4000 is the wait time
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You know nothing John Snow. The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wronganswer.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 6000); //  4000 is the wait time
}


function wait() {
	var totalQuestionQty = questionArray.length-1;
	console.log(totalQuestionQty);
	if (questionCounter < totalQuestionQty) {
	questionCounter++;
	console.log(questionCounter);
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}	

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
	"How did Daenerys Targaryen eventually hatch her dragon eggs?",
	"Which U.S. city was one of 8 international locations visited by the 2015 'Game of Thrones' Exhibition?",
	"The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
	"American actor Peter Dinklage, who plays Tyrion Lannister, also had a starring role in this fantasy franchise:",
	"What is the only thing that can put out volatile Wildfire?",
	"Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
	"How many times has Beric Dondarrion been brought back to life?",
	"'Game of Thrones' star Ania Bukstein is not only a famous Israeli actress, but also a:",
	"Which Stark family direwolf was killed in retaliation for an attack on Prince Joffrey?",
	"Arya's punishment for stealing from the Many-Face God is:",
	"'It's nothing' were the last words of this infamous character:",
	"The name of King Tommen's favorite cat is:",
	"What was the name of Ned Stark's greatsword?",
	"Who shoots the flaming arrow that subsequently destroy's Stannis' fleet in Blackwater Bay?",
	"Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:",
	"The Night King was created using a dagger made of:",
	"How many arrows does Ramsay Bolton let loose at Rickon Stark?",
	"Who created the secret tunnel in the sewers under Casterly Rock?",
	"What is Sansa Stark's favorite treat?",
	"Dead creatures revived by White Walkers are known as:",
	"What is the name of the military order which holds and guards the immense ice structure known as the wall?",
	"What is Hodor's original name?",
	"What is the name of the most famous sword in Westeros",
	"What is the name of the sword that John Snow carries?",
	"Longclaw is a Valyrian steel sword that was the ancestral weapon of which house?",
	"What fate befell the Valyrian steel greatsword known as Ice?",
	"What sits at the pommel of Longclaw?"];
var answerArray = [
	["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
	["Chicago", "New York City", "San Diego", "Boston"],
	["Valar Dohaeris or 'all men must serve'", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'", "Morghulis Valar or 'then die all we shall'"],
	["Lord of the Rings", "Highlander", "The Chronicles of Narnia", "The Legend of Zelda"],
	["Sand", "Water", "Dragon's Breadth", "Dragon's Blood"],
	["Weirwood", "Wildfire", "Valyrian Steel", "Valyrian Glass"],
	["Three times", "Five times", "Six times", "Seven times"],
	["Ballet dancer", "Watercolor artist", "Singer and songwriter", "Synchronized swimming instructor"],
	["Ghost", "Lady", "Nymeria", "Summer"],
	["Death", "Memory Loss", "Blindness", "Prison"],
	["Renly Baratheon", "Tywin Lannister", "Robb Stark", "King Joffrey"],
	["Battle Pus", "Little Lion", "Ser Pounce", "Prince Fuzzy"],
	["Ice", "Oathkeeker", "Widow's Wail", "Northguard"],
	["Tyrion Lannister", "King Joffrey", "Jaime Lannister", "Bronn"],
	["Pride in drawing blood first", "Knowledge of poisons", "Nighttime attacks", "Ruby-colored armor"],
	["Valyrian Steel", "Blue Ice", "Dragon Glass", "Obsidian"],
	["Three", "Five", "Two", "Four"],
	["Tyrion Lannister", "Lord Baelish", "Jaime Lannister", "Varys"],
	["Apple cranberry crisp", "Strawberry rhubarb pie", "Lemon cakes", "Honey cakes"],
	["Walkers", "Wights", "Zombie", "Claws"],
	["Nights Watch", "Red Watch", "Red Keep", "Red Watch"],
	["Edward", "Wylis", "Gared", "Kristian"],
	["Dawn", "Lightbringer", "Sword of the morning", "Longclaw"],
	["Dawn", "Lightbringer", "Sword of the morning", "Longclaw"],
	["House Stark", "House Snow", "House Mormont", "House Lanister"],
	["Melted down to form two new swords", "Captured by the Knight's King", "Broken when it was thrust into a women's heart", "A dragon ate it"],
	["The Night's King", "The Iron Throne", "A Direwolf", "A Bear"]];
var imageArray = [
	"<img class='center-block img-right' src='assets/images/pyre.jpg'>",
	"<img class='center-block img-right' src='assets/images/gotsd.jpg' height=400px>",
	"<img class='center-block img-right' src='assets/images/vmvd.jpe'>",
	"<img class='center-block img-right' src='assets/images/narnia.jpg'>",
	"<img class='center-block img-right' src='assets/images/wildfire.gif' height=350px>",
	"<img class='center-block img-right' src='assets/images/snowkillsww.gif'>",
	"<img class='center-block img-right' src='assets/images/sixtimes.gif' height=400px>",
	"<img class='center-block img-right' src='assets/images/kinvara.jpg' height=400px>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif' height=400px>",
	"<img class='center-block img-right' src='assets/images/ariablind.gif'>",
	"<img class='center-block img-right' src='assets/images/joffrydies.gif'>",
	"<img class='center-block img-right' src='assets/images/sirpounce.jpg'>",
	"<img class='center-block img-right' src='assets/images/icesword.jpg'>",
	"<img class='center-block img-right' src='assets/images/bronnarrow.jpg'>",
	"<img class='center-block img-right' src='assets/images/oberyn.png'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>",
	"<img class='center-block img-right' src='assets/images/ladychain.gif'>"
];
var correctAnswers = [
	"B. In a funeral pyre",
	"C. San Diego",
	"A. Valar Dohaeris or 'all men must serve'",
	"C. The Chronicles of Narnia", "A. Sand",
	"C. Valyrian Steel",
	"C. Six times",
	"C. Singer and songwriter",
	"B. Lady",
	"C. Blindness",
	"D. King Joffrey",
	"C. Ser Pounce",
	"A. Ice",
	"D. Bronn",
	"B. Knowledge of poisons",
	"C. Dragon Glass",
	"D. Four",
	"A. Tyrion Lannister",
	"C. Lemon cakes",
	"B. Wights",
	"A. Nights Watch",
	"B. Wylis",
	"A. Dawn",
	"D. Longclaw",
	"C. House Mormont",
	"A. Melted down to form two new swords",
	"C. A Direwolf"];


var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/music/button-16.mp3");

//At the end of Season 1, Daenerys Targaryen placed her three dragon eggs on the funeral pyre of her late husband. She then walked into the flames and emerged from the ashes the next morning holding three newly hatched dragons.
//The 2015 San Diego Comic-Con played host to the 'Game of Thrones' Exhibition in the U.S. Over the next 12 months, the exhibit also visited Spain, Israel, France, England, Germany and Sweden.
//The Season 2 finale was named "Valar Morghulis" while the Season 3 premiere was named "Valar Dohaeris." In 2014, the Brewery Ommegang created a beer called "Valar Morghulis," with each cork fire-branded with the response.
//So unstable that even strong sunlight can set it ablaze, Wildfire is an extremely volatile substance that can only be extinguished with copious amounts of sand.
//Valyrian Steel is not only exceptionally sharp, strong and free of maintenance, but is also capable of taking down an immortal White Walker. The metal is easily identified by its distinctive rippled pattern.
//Beric Dondarrion has been resurrected by the God of Light a total of six times. His constant cheating of death comes with a price: each time, he explains, he loses some of his memories and is less himself.
//After the direwolf Nymeria flees into the woods following a defensive attack against Prince Joffrey, Queen Cersei Lannister orders the execution of her pack sister, Lady. Now, two of the four remaining Stark family direwolves are in places unknown.
//The tyrant King Joffrey uttered these rather unremarkable last words after being poisoned on his wedding day. Joffrey was killed by a potion called 'The Strangler,' which causes the throat to immediately swell shut.
//In Season 4, Ser Pounce is introduced. Its appearance caused something of a stir on the Internet, with fans demanding that Ser Pounce be featured in future episodes. According to one writer, that likely won't happen. "I will say that cat was a nightmare to work with."
//Ice was the official sword of the Lord of Winterfell, forged from Valyrian steel and handed down over the ages. After being used to behead Ned Stark at the end of Season 1, it was subsequently melted down to forge two new swords – the Oathkeeper and Widow's Wail.
//After a signal from Tyrion, Bronn shoots a flaming arrow into a floating trap of wildfire around Stannis Baratheon's fleet. The explosion that follows destroys dozens of ships and effectively wins the battle for King Joffrey.
//Oberyn Martell is skilled not only in combat, but also in the use of deadly potions. In the battle against Ser Gregor Clegane that ultimately cost him his life, Martell managed to severely wound 'the mountain' with a spear tip coated in poisonous Manticore venom.
//In season six, it's revealed that the Children of the Forest created the White Walkers during a war with the First Men. During a vision, Bran sees one of the children force a Dragonglass dagger into the chest of a captive First Man. He then transforms into the Night King.
//At the beginning of "The Battle of the Bastards," Ramsay Bolton tells Rickon Stark to run across the battlefield towards Jon Snow. In a cruel twist, he then begins shooting arrows at the young man. Despite Rickon's best efforts, the fourth arrow finds its mark and ends his life.
//Speaking with Varys in season 2, Tyrion explains how when he came of age, his father placed him in charge of "all the drains and cisterns in Casterly Rock." In season 7, Tyrion reveals that he added a secret entrance in the sewers that Daenerys' army later uses to take the fortress.
//As author George R.R. Martin explains, lemons do not grow in the North, so having access to the traditional Lannister dish would be a treat. "They would occasionally in the summers get fruit, lemons, that they would makes cakes out of, but it would not be an everyday thing, he said, "It would be special and exciting.
//Wights compose the undead army of the White Walkers and include humans, giants, horses, snow bears, and one very large dragon. They are extremely susceptible to fire and dragonglass. More importantly, if the White Walker that revived it dies, the wight too will perish.
//The Nights Watch is a military order that guards the wall at Castle Black and the East Watch.
//Hodor's true name was wylis before he was accidentally brain damaged by Bran in a failed worg attempt.
//Dawn is the name of the sword that is said to be the most famous in Westoros. It is said to have been forged from a falling star.
//John Snow carried the sword known as Longclaw. It was given to him by Jeor Mormount during his time at the Night's Watch.
//Jeor Mormont gave Longclaw to Jon Snow as a reward for saving his life from a wight. Before giving it to Jon he had the pommel remade, replacing the bear with a direwolf, the sigil of House Stark.

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
	
}