import Tool from './Tool';
import {handleFinaliseDraw, wsEmit} from "../services";
import canvasState from "../store/canvasState";

class Line extends Tool {
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
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx.beginPath();
        canvasState.undoList.push(this.canvas.toDataURL())
        this.ctx.moveTo(this.currentX, this.currentY);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        const drawData = {
            currentX: this.currentX,
            currentY: this.currentY,
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop
        };

        //const {currentX, currentY, x, y} = {...drawData};
        this.drawLocal(drawData.x, drawData.y);

        wsEmit('line', drawData);

        handleFinaliseDraw();
    }


    mouseMoveHandler() {
    }

    drawLocal(x, y) {
        this.ctx.moveTo(this.currentX, this.currentY);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.stroke();
    }

    static draw(ctx, currentX, currentY, x, y) {
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
    }
}

export {Line};