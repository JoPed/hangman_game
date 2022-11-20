import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Word = ({ word, setCorrectLetterRef }) => {

  return (
    <Row>

      <Col>
        {word ? (word.split("").map((character, index) => (

          <span className={character === " " ? "guessLines hideLine" : "guessLines"} key={`line${index}`}>
            <span className="correctLetter" data-index={index} ref={setCorrectLetterRef}></span>
          </span>

        ))) : ""}

      </Col>

    </Row>
  )

}
export default Word;