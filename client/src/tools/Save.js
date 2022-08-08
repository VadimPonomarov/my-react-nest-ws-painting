import Tool from "./Tool";

class Save extends Tool {

    constructor(canvas/*, socket, sessionId*/) {
        super(canvas/*, socket, sessionId*/);
        this.handleSave();
    }

    handleSave() {
        const saveData = this.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = saveData;
        a.download = Date.now().toString() + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

export {Save};