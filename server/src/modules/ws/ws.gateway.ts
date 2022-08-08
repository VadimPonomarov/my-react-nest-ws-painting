import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {MessageBodyDto} from "./dto/message-body.dto";

@WebSocketGateway()
export class WsGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage("join")
    handleJoin(@MessageBody() message: MessageBodyDto, @ConnectedSocket() client: Socket): void {
        const {data: {method, sessionId, userName, figure}} = message;
        client.join(sessionId);
        this.server.to(sessionId).emit("joined", message);

    }

    @SubscribeMessage("draw")
    handleMessage(@MessageBody() message: MessageBodyDto, @ConnectedSocket() client: Socket): void {
        client.broadcast.emit("draw", message);
    }
}
