import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Canvas = ({canvasRef, clearCanvasRef }) => {    

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // if(clearCanvasRef.current){
        //     context.clearRect(0,0, canvas.width, canvas.height);
        //     clearCanvasRef.current = false;
        // }

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