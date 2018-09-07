import { MessageType, IBaseMessage, UUID } from 'shared/interfaces';
import { WebsocketClient } from './WebsocketClient';
import { IClient } from './interfaces';
import makeDebug from 'debug';
const debug = makeDebug('r6db:clienthandler');

interface IMessageListenerMap {
    [type: string]: Array<(data) => any>;
}

/**
 * class to handle realtime clients
 * TODO: currently only supports websockets
 */
export class ClientHandler {
    clients: IClient[] = [];
    listeners: IMessageListenerMap = {};
    constructor() {
        this.handleMessage = this.handleMessage.bind(this);
    }
    handleWebSocket(socket: WebSocket) {
        const client = new WebsocketClient(socket);
        socket.addEventListener('close', () => {
            this.clients.splice(this.clients.indexOf(client), 1);
        });
        client.onMessage(this.handleMessage);
        this.clients.push(client);
        debug('new client', { type: 'websocket', id: client.id });
    }

    on<T extends IBaseMessage>(type: T['type'], callback: (data: T) => any) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    /**
     * emit a message to a specific client
     */
    emit(id: UUID, message: MessageType): boolean {
        const client = this.clients.find(x => x.id === id);
        if (client) {
            client.emit(message);
            return true;
        } else {
            return false;
        }
    }

    /** broadcase a message to all clients */
    broadcast(message: MessageType) {
        this.clients.forEach(client => client.emit(message));
    }

    private handleMessage(message: MessageType) {
        const listeners = this.listeners[message.type];
        if (listeners) {
            listeners.forEach(l => l(message));
        }
    }
}
