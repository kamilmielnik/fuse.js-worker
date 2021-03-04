// TODO: if (!window.Worker)

import { IdGenerator } from './lib';
import {
  FuseAdapterOptions,
  RequestMessage,
  ResponseMessage,
  SearchRequestMessage,
  SearchResponseMessage,
} from './types';

const DEFAULT_OPTIONS: FuseAdapterOptions = {
  pollingTime: 10,
};

class FuseAdapter<T> {
  private idGenerator: Generator<number> = IdGenerator();
  private options: FuseAdapterOptions;
  private resolvedPromises: Map<number, ResponseMessage<T>> = new Map();
  private worker: Worker = new global.Worker('worker.js');

  constructor(options?: FuseAdapterOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.worker.onmessage = (event: MessageEvent<ResponseMessage<T>>) => {
      this.resolvedPromises.set(event.data.id, event.data);
    };
  }

  public async search(
    pattern: SearchRequestMessage['payload']['pattern'],
    options: SearchRequestMessage['payload']['options'],
  ): Promise<SearchResponseMessage<T>['payload']> {
    const id = this.idGenerator.next().value;

    this.postMessage({
      id,
      payload: { options, pattern },
      type: 'search-request',
    });

    // TODO: add error handling (reject)
    const promise = new Promise<SearchResponseMessage<T>['payload']>((resolve) => {
      let interval = global.setInterval(() => {
        if (this.resolvedPromises.has(id)) {
          const data = this.resolvedPromises.get(id)!;
          global.clearInterval(interval);
          this.resolvedPromises.delete(id);
          resolve(data.payload);
        }
      }, this.options.pollingTime);
    });

    return promise;
  }

  // TODO: consider implementing a variant where every search() terminates whatever is there
  public terminate(): void {
    this.worker.terminate();
  }

  private postMessage(message: RequestMessage): void {
    this.worker.postMessage(message);
  }
}

export default FuseAdapter;
