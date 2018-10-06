import { MessageType, UUID } from '@r6db/interfaces';

export interface IClient {
    readonly id: UUID;
    emit(message: MessageType): void;
    onMessage(callback: (message: MessageType) => any);
}
