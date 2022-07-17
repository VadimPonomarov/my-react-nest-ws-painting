import { makeAutoObservable } from 'mobx';

class ToolState {
    tool = {};

    constructor() {
        makeAutoObservable( this );
    }

    setTool( tool ) {
        this.tool = tool;
    }

    setFillStyle( color ) {
        this.tool.fillStyle = color;
    }

    setStrokeStyle( color ) {
        this.tool.strokeStyle = color;
    }

    setLineWidth( width ) {
        this.tool.lineWidth = width;
    }
}

export default new ToolState();