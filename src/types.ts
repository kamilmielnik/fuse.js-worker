import Fuse from 'fuse.js';

export interface FuseAdapterOptions {
  pollingTime: number;
}

type BaseMessage<Type extends string> = {
  id: number;
  type: Type;
};

type Message<Type extends string, Payload = void> = Payload extends void
  ? BaseMessage<Type>
  : BaseMessage<Type> & { payload: Payload };

export type InitializeRequestMessage<T> = Message<
  'initialize-request',
  {
    index?: Fuse.FuseIndex<T>;
    list: T[];
    options?: Fuse.IFuseOptions<T>;
  }
>;

export type InitializeResponseMessage = Message<'initialize-response'>;

export type SearchRequestMessage = Message<
  'search-request',
  {
    options?: Fuse.FuseSearchOptions | undefined;
    pattern: string | Fuse.Expression;
  }
>;

export type SearchResponseMessage<T> = Message<'search-response', Fuse.FuseResult<T>>;

export type RequestMessage<T> = InitializeRequestMessage<T> | SearchRequestMessage;

export type ResponseMessage<T> = InitializeResponseMessage | SearchResponseMessage<T>;
