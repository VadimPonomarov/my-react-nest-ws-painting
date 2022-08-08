import canvasState from "../store/canvasState";

export default class Tool {

    constructor() {
        this.canvas = canvasState.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.socket = canvasState.socket;
        this.sessionId = canvasState.sessionId;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }

    set fillStyle(color) {
        this.ctx.fillStyle = color;
    }

    set strokeStyle(color) {
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }
}