import Tool from './Tool';
import {handleFinaliseDraw, wsEmit} from "../services";
import canvasState from "../store/canvasState";


class Rect extends Tool {
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
        canvasState.undoList.push(this.canvas.toDataURL())
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
    }

    mouseUpHandler() {
        this.mouseDown = false;
        this.ctx.beginPath();
        const drawData = {
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height
        };

        const {x, y, width, height} = {...drawData};
        this.drawLocal(x, y, width, height);

        wsEmit('rect', drawData);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
        }
    }

    drawLocal(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();

        handleFinaliseDraw();
    }

    static draw(ctx, x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
    }
}

export {Rect};