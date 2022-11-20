import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WrongGuesses = ({ wrongGuesses }) => {
    return (
        <Row>
            <Col>
                <label id="wrongGuessesLabel">Wrong guesses: </label>
                <p id="wrongGuesses">

                    {wrongGuesses.map(char => char + " ")}

                </p>
            </Col>

        </Row>
    );

}
export default WrongGuesses;