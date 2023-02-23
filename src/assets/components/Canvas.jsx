import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import context from "react-bootstrap/esm/AccordionContext";

const Canvas = ({ canvasRef, clearCanvasRef }) => {

    const setUpCanvas = (canvas) => {

        const { width, height } = canvas.getBoundingClientRect();

        const scale = window.devicePixelRatio;

        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);

    }

    useEffect(() => {

        const canvas = canvasRef.current;

        setUpCanvas(canvas);

    }, [clearCanvasRef]);



    return (
        <Row>
            <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }} className="px-0">
                <canvas ref={canvasRef} id="game" />
            </Col>
        </Row>
    )


}
export default Canvas;