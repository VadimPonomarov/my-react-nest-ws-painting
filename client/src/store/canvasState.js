import { makeAutoObservable } from 'mobx';
import socketIOClient from "socket.io-client";

class CanvasState {
    canvas = {};
    userName = null;
    sessionId = null;
    undoList = [];
    redoList = [];
    socket = {};

    constructor() {
        makeAutoObservable( this );
        this.socket = socketIOClient(`ws://localhost:5001/`, {
            transports: ['websocket']
        })
    }

    setCanvas( canvas ) {
        this.canvas = canvas;
    }

    setUserName( name ) {
        this.userName = name;
    }

    setSessionId( id ) {
        this.sessionId = id;
    }

    setSocket( socket ) {
        this.socket = socket;
    }

    pushToUndo( data ) {
        this.undoList.push( data );
    }

    pushToRedo( data ) {
        this.redoList.push( data );
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            const undo_img = new Image()
            undo_img.src = dataUrl
            undo_img.onload =  () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(undo_img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            const redo_img = new Image()
            redo_img.src = dataUrl
            redo_img.onload =  () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(redo_img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState();