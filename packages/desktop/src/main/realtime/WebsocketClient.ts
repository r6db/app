import { IClient } from './interfaces';
import { UUID } from '@r6db/interfaces';
import { UUID as uuid } from '@r6db/utils';

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
