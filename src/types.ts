import Fuse from 'fuse.js';

export interface FuseAdapterOptions {
  pollingTime: number;
}

interface Message<Type extends string, Payload = never> {
  id: number;
  payload: Payload;
  type: Type;
}

export type ConstructRequestMessage = Message<'construct-request'>;

export type ConstructResponseMessage = Message<'construct-response'>;

export type SearchRequestMessage = Message<
  'search-request',
  {
    options?: Fuse.FuseSearchOptions | undefined;
    pattern: string | Fuse.Expression;
  }
>;

export type SearchResponseMessage<T> = Message<'search-response', Fuse.FuseResult<T>>;

export type RequestMessage = ConstructRequestMessage | SearchRequestMessage;

export type ResponseMessage<T> = ConstructResponseMessage | SearchResponseMessage<T>;
