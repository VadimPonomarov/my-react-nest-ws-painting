import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

import canvasState from '../../store/canvasState';
import toolState from "../../store/toolState";
import css from './canvas.module.scss';
import {axiosService, newTool} from "../../services";
import {drawHandler} from '../../services';
import {CANVAS_CONSTANTS} from '../../constants';

const Canvas = observer(() => {
    const canvasRef = useRef();
    const params = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        const ctx = canvasState.canvas.getContext('2d');
        axiosService.getImg(canvasState.sessionId)
            .then(response => {
                if (response.data.img) {
                    const img = new Image();
                    img.src = response.data.img;
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    };
                }
            });
        toolState.setTool(newTool('Brush', canvasRef.current));
        canvasState.socket.on('draw', (data) => {
            drawHandler(canvasRef, data);
        });

    }, [params]);

    return (
        <div className={css.canvas}>
            <canvas
                className="border"
                ref={canvasRef}
                width={CANVAS_CONSTANTS.width}
                height={CANVAS_CONSTANTS.height}/>
        </div>
    );
});

export default Canvas;