import Tool from './Tool';
import canvasState from "../store/canvasState";
import {handleFinaliseDraw, wsEmit} from '../services';

class Brush extends Tool {
    constructor() {
        super();
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        canvasState.undoList.push(this.canvas.toDataURL());
        this.ctx.moveTo(e.pageX - e.offsetLeft, e.pageY - e.offsetTop);
    }

    mouseUpHandler() {
        this.mouseDown = false;
        handleFinaliseDraw();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const drawData = {
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop
            };

            const {x, y} = {...drawData};
            this.drawLocal(x, y);

            wsEmit('brush', drawData);
        }
    }

    drawLocal(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    static draw(ctx, x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

export {Brush};