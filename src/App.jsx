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
import WrongGuesses from './assets/components/WrongGuesses';


function useArrayRef() {
  const refs = []
  return [refs, el => el && refs.push(el)];
}

function App() {

  const [word, setWord] = useState(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

  const [wrongGuesses, setWrongGuesses] = useState([]);

  const [isGameOver, setIsGameOver] = useState(false);

  const [spacesInWord, setSpacesInWord] = useState(0);

  const [countCorrectGuess, setCountCorrectGuess] = useState(0);

  const [prevGuess, setPrevGuess] = useState([]);

  const guessesLeft = useRef(10);


  const [correctLetterRef, setCorrectLetterRef] = useArrayRef();

  const canvasRef = useRef();

  const guessInputRef = useRef();

  const inputErrorRef = useRef();

  const clearCanvasRef = useRef(false);

  let guess = "";



  const winCheck = () => {

    //*account for multiple words, seperated with space.   
    if (countCorrectGuess === word.length - spacesInWord) {
      setIsGameOver(true);
      guessInputRef.current.disabled = true;
    }

  }

  const resetGame = (event) => {

    event.preventDefault();

    correctLetterRef.forEach(ref => ref.innerHTML = "");

    setWord(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

    setWrongGuesses([]);

    setIsGameOver(false);

    setCountCorrectGuess(0);

    setPrevGuess([]);

    guessesLeft.current = 10;

    guessInputRef.current.focus();

    guessInputRef.current.disabled = false;

    // clearCanvasRef.current = true;

    clearCanvas();

    

  }

  const handleGuess = () => {

    //store the value of the guess input field
    guess = guessInputRef.current.value;

    if (guess.length !== 1) {
      inputErrorRef.current.textContent = "Only one letter at a time";
    }
    else {
      inputErrorRef.current.textContent = "";
    }

    for (let i = 0; i < word.length; i++) {

      if (word[i] === guess && !prevGuess.includes(guess)) {

        correctLetterRef[i].innerHTML = guess;

        guessInputRef.current.value = "";

        setCountCorrectGuess(currentValue => { return currentValue + 1 });

        setPrevGuess(prev => [...prev, guess]);
      }

    }

    /*Check the selected word for the guessed value. 
    If not the guessed value is present in the selected word, the value of checkWrongGuess will be -1*/

    let checkWrongGuess = word.indexOf(guess);

    if (checkWrongGuess === -1) {

      //Setting the usestate array. It is not possible to use .push when working with useStates
      setWrongGuesses(current => [...current, guess]);

      guessInputRef.current.value = "";

      guessesLeft.current -= 1;

      draw();
    }
  }

  const handleUserInput = (event) => {

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      handleGuess();
    }
  }

  const draw = () => {
    drawArray[guessesLeft.current](canvasRef.current.getContext('2d'));

  }


  useEffect(() => {

    winCheck();

    if (guessesLeft.current <= 0) {
      setIsGameOver(true);

      guessInputRef.current.disabled = true;
    }

  }, [countCorrectGuess, guessesLeft.current])


  useEffect(() => {

    guessInputRef.current.focus();

    setSpacesInWord(word.split(' ').length - 1);


  }, [correctLetterRef]);



  return (
    <Container fluid="lg" className="mainContainer">

      <Description />

      {/* Game container  */}
      <Container fluid="md" className="gameContainer">

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
        />

        {/* Wrong guesses */}
        <WrongGuesses wrongGuesses={wrongGuesses} />

      </Container>

    </Container>
  )
}

export default App
