import { MessageType, UUID } from 'shared/interfaces';

export interface IClient {
    readonly id: UUID;
    emit(message: MessageType): void;
    onMessage(callback: (message: MessageType) => any);
}
