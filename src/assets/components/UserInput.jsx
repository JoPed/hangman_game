import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormGroup from 'react-bootstrap/FormGroup';
import FormText from 'react-bootstrap/FormText';

const UserInput = ({ isGameOver, handleUserInput, guessInputRef, inputErrorRef, resetGame }) => {

    return (
        <form>
            <FormGroup>
                <Row className="mb-3">
                    <Col>
                        <label id="labelGuess">Guess (only one letter at a time)</label>
                        <Row>
                            <Col className="d-flex flex-row justify-content-center">
                                <input type="text" id="inputGuess" ref={guessInputRef} onKeyDown={handleUserInput} onChange={() => inputErrorRef.current.textContent = ""} />

                                {
                                    isGameOver ? <button id="playAgain" onClick={resetGame}>Play Again</button>
                                        : <button onClick={handleUserInput} id="btnSubmit">Submit</button>

                                }

                            </Col>

                        </Row>

                        {/* text content get updated in handleGuess */}
                        <FormText ref={inputErrorRef} id="errorText">

                        </FormText>

                    </Col>
                </Row>
            </FormGroup>

        </form>
    );

}
export default UserInput;