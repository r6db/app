import { IClient } from './interfaces';
import { MessageType, UUID } from 'shared/interfaces';
import uuid from 'shared/uuid';

export class WebsocketClient implements IClient {
    id: UUID = uuid();

    constructor(private readonly socket: WebSocket) {}

    emit(message) {
        this.socket.send(JSON.stringify(message));
    }
    onMessage(callback) {
        this.socket.addEventListener('message', event => {
            callback(JSON.stringify(event.data));
        });
    }
}
