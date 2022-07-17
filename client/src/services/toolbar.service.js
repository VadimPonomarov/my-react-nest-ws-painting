import {Brush, Circle, Eraser, Line, Rect, Redo, Save, Undo} from "../tools";

export const newTool = (name) => {
    switch (name) {
        case "Brush":
            return new Brush();
        case "Circle":
            return new Circle();
        case "Line":
            return new Line();
        case "Rect":
            return new Rect();
        case "Eraser":
            return new Eraser();
        case "Save":
            return new Save();
        case "Undo":
            return new Undo();
        case "Redo":
            return new Redo();
        default:
            break;
    }
};