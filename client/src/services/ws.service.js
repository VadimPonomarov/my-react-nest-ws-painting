import socketIOClient from "socket.io-client";

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

export const getSocket = (url) => {
    return socketIOClient(url, {
        transports: ['websocket'],
        reconnection: true,
        autoConnect: true,

    });
};

export const wsEmit = (wsType, drawData, wsEvent = 'draw', wsMethod = 'draw') => {
    canvasState.socket.emit(wsEvent, {
        method: wsMethod,
        sessionId: canvasState.sessionId,
        ctx: canvasState.canvas.ctx,
        config: {
            strokeStyle: toolState.tool.strokeStyle,
            fillStyle: toolState.tool.fillStyle,
            lineWidth: toolState.tool.lineWidth
        },
        figure: {
            type: wsType,
            ...drawData
        }
    });
};