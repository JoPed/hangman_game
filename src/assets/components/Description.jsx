import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Description = () => {

    return (
        <>
            <Row>
                <Col><h1>Hangman</h1></Col>
            </Row>

            {/* Game description */}
            <Row>
                <Col>
                    <p id="game_description">Game can be played as a one or two player game. <br /> Player has 10 lives. Minus 1 life for every wrong guess. <br /> Every word is related to webdevelopment.<br /> Press Enter or "Submit" to make guess.
                    </p>
                </Col>
            </Row>
        </>

    );

}
export default Description;