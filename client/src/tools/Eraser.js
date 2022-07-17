import Tool from './Tool';
import {handleFinaliseDraw, wsEmit} from "../services";
import canvasState from "../store/canvasState";

class Eraser extends Tool {
    constructor(canvas) {
        super(canvas);
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

            wsEmit('eraser', drawData);
        }
    }

    drawLocal(x, y) {
        this.ctx.strokeStyle = "white";
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    static draw(ctx, x, y) {
        ctx.strokeStyle = "white";
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

export {Eraser};