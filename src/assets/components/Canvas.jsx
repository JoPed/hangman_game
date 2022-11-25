import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Canvas = ({canvasRef, clearCanvasRef }) => {    

    useEffect(() => {

        const canvas = canvasRef.current;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;        

    }, [clearCanvasRef]);



    return (
        <Row>
            <Col>
                <canvas ref={canvasRef} id="game" />
            </Col>
        </Row>
    )


}
export default Canvas;