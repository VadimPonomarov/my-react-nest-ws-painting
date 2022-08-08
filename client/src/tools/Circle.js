import Tool from './Tool';
import {handleFinaliseDraw, wsEmit} from "../services";
import canvasState from "../store/canvasState";

class Circle extends Tool {
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
        const canvasData = this.canvas.toDataURL();
        this.ctx.beginPath();
        canvasState.undoList.push(this.canvas.toDataURL())
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = canvasData;
    }

    mouseUpHandler() {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const currentX = e.pageX - e.target.offsetLeft;
            const currentY = e.pageY - e.target.offsetTop;
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            const radius = Math.sqrt(width ** 2 + height ** 2);
            const drawData = {
                startX: this.startX,
                startY: this.startY,
                r: radius
            };

            wsEmit('circle', drawData);

            const {startX, startY, r} = {...drawData};
            this.drawLocal(startX, startY, r);
        }
    }

    drawLocal(x, y, r) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        handleFinaliseDraw();
    }

    static draw(ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

export {Circle};