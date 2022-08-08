import canvasState from '../store/canvasState';
import Tool from "./Tool";

class Redo extends Tool {
    constructor(canvas/*, socket, sessionId*/) {
        super(canvas/*, socket, sessionId*/);
        this.handleRedo();
    }

    handleRedo() {
        canvasState.redo();
    }
}

export {Redo};

