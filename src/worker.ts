import Fuse from 'fuse.js';

import {
  InitializeRequestMessage,
  InitializeResponseMessage,
  RequestMessage,
  ResponseMessage,
  SearchRequestMessage,
  SearchResponseMessage,
} from './types';

let fuse: Fuse<any> | null = null;

global.onmessage = (event: MessageEvent<RequestMessage<any>>): void => {
  global.postMessage(reply(event.data));
};

const reply = <T>(message: RequestMessage<T>): ResponseMessage<T> => {
  switch (message.type) {
    case 'initialize-request':
      return replyInitialize(message);

    case 'search-request':
      return replySearch(message);

    default:
      throw new Error(`"${JSON.stringify(message)}" - message handler not found`);
  }
};

const replyInitialize = <T>(message: InitializeRequestMessage<T>): InitializeResponseMessage => {
  if (fuse !== null) {
    throw new Error('Fuse has already been initialized!');
  }

  fuse = new Fuse<T>(message.payload.list, message.payload.options, message.payload.index);

  return {
    id: message.id,
    type: 'initialize-response',
  };
};

const replySearch = <T>(message: SearchRequestMessage): SearchResponseMessage<T> => {
  if (fuse === null) {
    throw new Error('Fuse has not been initialized!');
  }

  const result = fuse.search(message.payload.pattern, message.payload.options);
  const payload = (result as any) as Fuse.FuseResult<T>;

  return {
    id: message.id,
    type: 'search-response',
    payload,
  };
};
