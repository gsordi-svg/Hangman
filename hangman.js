const POSSIBLE_WORDS = ["obdurate","verisimilitude","defenestrate","obsequious","dissonant","toady","idempotent"];

var word = "";
var guesses = ""; //this will be all the guesses
var guessCount = "";
const MAX_GUESSES = 6;
var gameFinished = false;

let newGame = function(){       
    //Pick a random word
    guessCount = MAX_GUESSES;
    let randomIndex = parseInt(Math.random()*
    POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses="";

    //show the dashes
    updatePage();
}
let updatePage = function(){

    let clueString ="";
    for(let i =0;i< word.length;i++)
        {
            var currentLetter = word.charAt(i);
            if(guesses.indexOf(currentLetter) >=0){
                clueString+=currentLetter+" ";

            }
            else{
                clueString += "_";
            }
           
        }

    let clue =document.getElementById("clue");
    clue.textContent =clueString;

    let guessArea = document.getElementById("guesses");
    guessArea.textContent = "Guesses: "+guesses;

    let image = document.getElementById("hangmanpic");
    image.src =`images/hangman${guessCount}.gif`;

    gameFinished = false;
    document.getElementById("guess").disabled = false;
    document.querySelector("button[onclick='guessLetter();']").disabled = false
    
    if (guessCount <=0) {
        gameFinished = true;
        clue.textContent = `Game over! The word was:${word}`;
        document.getElementById("guess").disabled = true;
        document.querySelector("button[onclick=`guessLetter();`").disabled = true;

    }

    else if (!clueString.includes("_") && word!==""){
        gameFinished = true;
        clue.textContent = `You win! The word was ${word}`;
        document.getElementById("guess").disabled = true;
        document.querySelector("button[onclick=`guessLetter();").disabled = true;
    }
}


let guessLetter = function(){
    if (word === "" || guessCount <= 0) {
        return;
    }

    let input = document.getElementById("guess");
    let letter = input.value.toLowerCase();

    if (letter === "") {
        return;
    }

    if (word.indexOf(letter) < 0) {
        guessCount--;
    }

    guesses += letter;
    updatePage();
}
