import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './assets/scss/App.scss'

import Container from 'react-bootstrap/Container';

import { useEffect, useState, useRef } from 'react';

import { wordsToGuess } from './assets/WordsToGuess';
import { drawArray, clearCanvas } from './assets/DrawFunctions';

import Canvas from './assets/components/Canvas';
import Description from './assets/components/Description';
import UserInput from './assets/components/UserInput';
import Word from './assets/components/Word';
import Notification from './assets/components/Notification';


function useArrayRef() {
  const refs = []
  return [refs, el => el && refs.push(el)];
}

function App() {

  // Selected word
  const [word, setWord] = useState(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

  // Array of wrong guesses
  const [wrongGuesses, setWrongGuesses] = useState([]);

  // Check if game is over
  const [isGameOver, setIsGameOver] = useState(false);

  // number of spaces in a word - used to handle correctguesses if word has spaces
  const [spacesInWord, setSpacesInWord] = useState(0);

  // Player score
  const [playerScore, setPlayerScore] = useState(0);

  // Array of previous guesses. Player get not get points or lose extra lifes if guess is the same as previous
  const [prevGuess, setPrevGuess] = useState([]);

  const [gameOverText, setGameOverText] = useState("")

  // Player lives
  const playerLives = useRef(10);

  // A ref to the every correct letter shown above the '-'
  const [correctLetterRef, setCorrectLetterRef] = useArrayRef();

  // A ref to the canvas
  const canvasRef = useRef();

  // A ref to the context
  const context = useRef();

  // A ref to the input field where users type their guess
  const guessInputRef = useRef();

  // A ref to the FormText containing any error message
  const inputErrorRef = useRef();

  // A boolean checking the canvas should clear (when gameover)
  const clearCanvasRef = useRef(false);

  const notificationRef = useRef();

  // Storing the current guess / value of input field.
  let guess = "";


  const winCheck = () => {

    //*account for multiple words, seperated with space.   
    if (playerScore === word.length - spacesInWord) {
      setIsGameOver(true);
      guessInputRef.current.disabled = true;
      setGameOverText("<span>you rock</span><br><br>Click <span>'Play again'</span> to start new game")
    }

  }

  const resetGame = (event) => {

    event.preventDefault();

    correctLetterRef.forEach(ref => ref.innerHTML = "");

    setWord(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

    setWrongGuesses([]);

    setIsGameOver(false);

    setPlayerScore(0);

    setPrevGuess([]);

    playerLives.current = 10;

    guessInputRef.current.focus();

    guessInputRef.current.disabled = false;

    clearCanvas();



  }

  // Handle what happens when a guess has been made
  const handleGuess = () => {

    //store the value of the guess input field
    guess = guessInputRef.current.value.toLowerCase();

    // Error check
    if (guess.length > 1) {
      inputErrorRef.current.textContent = "Only one letter at a time";
      return;
    }
    else if (guess.length === 0 || guess === " ") {
      inputErrorRef.current.textContent = "You have to type a letter between a-z";
      return;
    }


    // Loop though the selected word
    for (let i = 0; i < word.length; i++) {

      // If the guessed letter matched at least one letter of the selected word 
      // and the guess hasn't previous been made
      if (word[i] === guess && !prevGuess.includes(guess)) {

        correctLetterRef[i].innerHTML = guess;

        guessInputRef.current.value = "";

        setPlayerScore(currentValue => { return currentValue + 1 });

        setPrevGuess(prev => [...prev, guess]);
      }

    }

    /*Check the selected word for the guessed value. 
    If not the guessed value is present in the selected word, the value of checkWrongGuess will be -1*/
    let checkWrongGuess = word.indexOf(guess);

    // Adding the ' ' to this check since the empty string is added to the guess on line 159
    if (checkWrongGuess === -1 && !wrongGuesses.includes(' ' + guess)) {

      //Setting the usestate array. It is not possible to use .push when working with useStates
      setWrongGuesses(current => [...current, ' ' +  guess]);

      guessInputRef.current.value = "";

      playerLives.current -= 1;

      draw();
    }
    else if (wrongGuesses.includes(' ' + guess)) {
      inputErrorRef.current.textContent = "You already guessed that letter";
    }


  }

  // Check if key="enter" or the submit button has been pressed.
  const handleUserInput = (event) => {

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      handleGuess();
    }
  }

  // Call the draw functions depending on lives left.
  const draw = () => {
    drawArray[playerLives.current](canvasRef.current.getContext('2d'));
  }

  // Draw the wrong letter to the canvas
  const drawWrongGuesses = () => {

    const upperCaseArray = wrongGuesses.map(w => w.toUpperCase());      

    context.current.fillText(upperCaseArray, 10, 70);
  }

  // Update this every time state playerscore and/or playerLives.current changes
  useEffect(() => {
    let wrongGuessesText = "Wrong guesses: ";
    context.current = canvasRef.current.getContext('2d');
    context.current.fillStyle = "white";

    context.current.font = "30px Source Code Pro, sans-serif";
    context.current.fillText(wrongGuessesText, 10, 25);

    winCheck();

    if (playerLives.current <= 0) {
      setIsGameOver(true);
      setGameOverText("<span>you lost</span><br><br>Click <span>'Play again'</span> to start new game")

      guessInputRef.current.disabled = true;
    }

    drawWrongGuesses();

  }, [playerScore, playerLives.current])

  //Update this every time the refArray correctLetterRef changes. 
  useEffect(() => {

    guessInputRef.current.focus();

    setSpacesInWord(word.split(' ').length - 1);


  }, [correctLetterRef]);



  return (
    <Container fluid="lg" className="mainContainer">

      <Description />

      {/* Game container  */}
      <Container fluid="md" className="gameContainer px-0 px-md-3">

        <UserInput
          isGameOver={isGameOver}
          handleUserInput={handleUserInput}
          guessInputRef={guessInputRef}
          inputErrorRef={inputErrorRef}
          resetGame={resetGame}
        />

        {/* Guesses */}
        {/* making the guess lines / wordholder plus the letters on top of the lines */}
        <Word
          word={word}
          setCorrectLetterRef={setCorrectLetterRef}
        />

        <Canvas
          canvasRef={canvasRef}
          clearCanvasRef={clearCanvasRef}
          wrongGuesses={wrongGuesses}
        />

        <Notification message={gameOverText} notificationRef={notificationRef} />

      </Container>

    </Container>
  )
}

export default App
