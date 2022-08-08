import canvasState from "../store/canvasState";

export const handleOnSubmit = (data, setModalVisible, setAlertText, setAlertVisible) => {
    canvasState.setUserName(data.name);
    canvasState.setSessionId(data.session);

    canvasState.socket.emit("join", {
        data: {
            method: "join",
            sessionId: data.session,
            userName: data.name
        }
    });

    canvasState.socket.on("joined", (message) => {
        setAlertText(`
            Hello ${message.data.userName} !!!.
            Now you can draw the same canvas as your friends, 
            with the same sessionId: ${message.data.sessionId} !!! 
            `);
        setModalVisible(false);
        setAlertVisible(true);
    });
};