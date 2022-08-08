import canvasState from '../store/canvasState';
import Tool from "./Tool";

class Undo extends Tool {
    constructor(canvas/*, socket, sessionId*/) {
        super(canvas/*, socket, sessionId*/);
        this.handleUndo();
    }

    handleUndo() {
        canvasState.undo();
    }
}

export {Undo};