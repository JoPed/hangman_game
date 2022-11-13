import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './assets/scss/App.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormGroup from 'react-bootstrap/FormGroup';
import FormText from 'react-bootstrap/FormText';

import { useEffect, useState, useRef } from 'react';
import { wordsToGuess } from './assets/wordsToGuess';

function App() {

  const [word, setWord] = useState();

  const [wrongGuesses, setWrongGuesses] = useState([]);

  const guessInputRef = useRef();

  const correctLetterRef = useRef([]);

  let guess = "";

  let correctLetter = "";

  // += 1 for every correct guessed letter.
  let countCorrectGuess = 0;


  const winCheck = () => {

    if (countCorrectGuess === word.length) {

      console.log("you win");

    }
  }

  const resetGame = (setNewWord) => {

    if (setNewWord) {
      setWord(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);
    }


    countCorrectGuess = 0;
    guessInputRef.current.value = "";


    if (correctLetterRef.current > 0) {
      correctLetterRef.current.forEach(letter => letter.textContent = "");
    }

    setWrongGuesses([]);

  }



  const checkChar = () => {

    //store the value of the guess input field
    guess = guessInputRef.current.value;

    //Store the ref's to the span tag show the letter (if it is correct)
    correctLetter = correctLetterRef.current;


    for (let i = 0; i < word.length; i++) {

      if (word[i] === guess) {
        correctLetterRef.current[i].textContent = guess;

        countCorrectGuess += 1;

        guessInputRef.current.value = "";
      }

    }

    /*Check the selected word for the guessed value. 
    If not the guessed value is present in the selected word, the value of checkWrongGuess will be -1*/

    let checkWrongGuess = word.indexOf(guess);

    if (checkWrongGuess === -1) {

      //Setting the usestate array. It is not possible to use .push when working with useStates
      setWrongGuesses(current => [...current, guess]);
      guessInputRef.current.value = "";
    }
    else {
      winCheck();
    }
  }

  const checkKeyPressed = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
      checkChar();
    }
  }


  useEffect(() => {


    setWord(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

    return () => {
      resetGame(false);
    }

  }, []);

  return (
    <Container fluid="lg" className="mainContainer">

      <Row>
        <Col><h1>Hangman</h1></Col>
      </Row>

      {/* Game description */}
      <Row>
        <Col>
          <p id="game_description">Game can be played as a one or two player game. <br /> Player has 10 guesses. <br /> 1 player: a webdevelopment related word will be chosen.<br />
            2 player: one player will type in a word that the other player has to guess.<br /> Press enter to make guess.
          </p>
        </Col>
      </Row>

      {/* Game container  */}
      <Container fluid="md" className="gameContainer">

        <form>
          <FormGroup>
            <Row>
              <Col>
                <label id="labelGuess">Guess (only one letter at a time)</label>
                <input type="text" id="inputGuess" ref={guessInputRef} onKeyDown={checkKeyPressed} required />
              </Col>
            </Row>
          </FormGroup>

        </form>

        {/* Guesses */}


        {/* making the guess lines / wordholder plus the letters on top of the lines */}
        <Row >
          <Col>

            <div>
              {word ? (word.split("").map((character, index) => (

                <span className={character === " " ? "guessLines hideLine" : "guessLines"} key={`line${index}`}>
                  <span className="correctLetter" ref={ref => (correctLetterRef.current[index] = ref)} data-index={index}></span>
                </span>

              ))) : ""}
            </div>

          </Col>
        </Row>



        {/* <Row>
          <Col>
            <canvas id="game" />
          </Col>
        </Row> */}

        {/* Delete when development is done  */}
        <Row>
          <Col>
            <label id="wrongGuessesLabel">Word to guess: </label>
            <p id="wrongGuesses">{word}</p>
          </Col>
        </Row>

        {/* Wrong guesses */}
        <Row>
          <Col>
            <label id="wrongGuessesLabel">Wrong guesses: </label>
            <p id="wrongGuesses">

              {wrongGuesses.map(char => char + " ")}

            </p>
          </Col>
        </Row>


      </Container>

    </Container>
  )
}

export default App
