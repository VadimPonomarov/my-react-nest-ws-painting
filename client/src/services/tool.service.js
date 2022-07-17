import canvasState from '../store/canvasState';

import {Brush, Circle, Eraser, Line, Rect} from '../tools';
import toolState from '../store/toolState';
import {axiosService} from './axios.service';


export const handleFinaliseDraw = () => {
    canvasState.socket.emit('draw', {
        figure: {
            type: 'finish'
        }
    });

    axiosService.postImg(canvasState.sessionId, {
        img: canvasState.canvas.toDataURL()
    })
        .catch(err => {
            console.log(err);
        });
};

export const drawHandler = (canvasRef, data) => {
    const figure = data.figure;
    const ctx = canvasState.canvas.getContext('2d');
    switch (figure.type) {
        case 'brush':
            return Brush.draw(ctx, figure.x, figure.y);
        case 'rect':
            return Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height);
        case 'circle':
            return Circle.draw(ctx, figure.startX, figure.startY, figure.r);
        case 'eraser':
            return Eraser.draw(ctx, figure.x, figure.y);
        case 'line':
            return Line.draw(ctx, figure.currentX, figure.currentY, figure.x, figure.y);
        case 'finish':
            return ctx.beginPath();
        case 'fillStyle':
            document.getElementById(data.refId)
                .value = `${figure.value}`;
            return toolState.setFillStyle(figure.value);
        case 'strokeStyle':
            document.getElementById(data.refId)
                .value = `${figure.value}`;
            return toolState.setStrokeStyle(figure.value);
        case 'lineWidth':
            document.getElementById(data.refId)
                .value = `${figure.value}`;
            return toolState.setLineWidth(figure.value);
        default:
            return;
    }
};

export const handleStyle = (e, type) => {
    canvasState.socket.emit('draw', {
        method: 'draw',
        sessionId: canvasState.sessionId,
        figure: {
            type,
            value: e.target.value
        },
        refId: e.target.id
    });
};

export const handleSave = (e, canvasState) => {
    const saveData = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = saveData;
    a.download = canvasState.sessionId + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
