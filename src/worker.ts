import { RequestMessage, ResponseMessage } from './types';

global.onmessage = (event: MessageEvent<RequestMessage>): void => {
  global.postMessage(reply(event.data));
};

const reply = <T>(message: RequestMessage): ResponseMessage<T> => {
  switch (message.type) {
    case 'construct-request':
      // code...
      break;

    case 'search-request':
      // code...
      break;
  }

  throw new Error(`"${message.type}" handler not implemented`);
};
