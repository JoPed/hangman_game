import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './assets/scss/App.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormGroup from 'react-bootstrap/FormGroup';
import FormText from 'react-bootstrap/FormText';

import { useEffect, useState, useRef } from 'react';
import { wordsToGuess } from './assets/WordsToGuess';

function useArrayRef() {
  const refs = []
  return [refs, el => el && refs.push(el)];
}

function App() {

  const [word, setWord] = useState(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

  const [wrongGuesses, setWrongGuesses] = useState([]);

  const [isGameOver, setIsGameOver] = useState(false);

  const [spacesInWord, setSpacesInWord] = useState(0);

  const [correctLetterRef, setCorrectLetterRef] = useArrayRef();


  const guessInputRef = useRef();

  let guess = "";

  let countCorrectGuess = 0;

  const winCheck = () => {

    console.log("countCorrectGuess", countCorrectGuess);
    console.log("word length", word.length);

    //*account for multiple words, seperated with space.   
    if (countCorrectGuess === word.length - spacesInWord) {
      setIsGameOver(true);
    }

  }

  const resetGame = () => {

    correctLetterRef.forEach(ref => ref.innerHTML = "");   


    setWord(wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);

    console.log(wordsToGuess);

    setWrongGuesses([]);

    setIsGameOver(false);

    guessInputRef.current.focus();
  }


  const handleGuess = () => {

    //store the value of the guess input field
    guess = guessInputRef.current.value;

    for (let i = 0; i < word.length; i++) {

      if (word[i] === guess) {
        correctLetterRef[i].innerHTML = guess;

        guessInputRef.current.value = "";
        countCorrectGuess += 1;
        winCheck();

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
  }

  const checkKeyPressed = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
      handleGuess();
    }
  }

  useEffect(() => {

    setSpacesInWord(word.split(' ').length - 1);

  }, [correctLetterRef]);

  return (
    <Container fluid="lg" className="mainContainer">

      <Row>
        <Col><h1>Hangman</h1></Col>
      </Row>

      {/* Game description */}
      <Row>
        <Col>
          <p id="game_description">Game can be played as a one or two player game. <br /> Player has 10 guesses. <br /> Every word is related to webdevelopment.<br /> Press enter to make guess.
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
                  <span className="correctLetter" data-index={index} ref={setCorrectLetterRef}></span>
                </span>

              ))) : ""}
            </div>

          </Col>
        </Row>



        <Row>
          <Col>
            <canvas id="game" />
          </Col>
        </Row>

        {/* Delete when development is done  */}
        {
          isGameOver ? (<Row>
            <Col>
              <button id="playAgain" onClick={resetGame}>Play Again</button>
            </Col>
          </Row>) : ""

        }


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
