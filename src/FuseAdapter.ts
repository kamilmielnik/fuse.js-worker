// TODO: if (!window.Worker)

import FuseWorker from 'worker-loader!./FuseWorker';
import { IdGenerator, poll } from './lib';
import {
  FuseAdapterOptions,
  InitializeRequestMessage,
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
  private worker: Worker = new FuseWorker();

  constructor(options?: FuseAdapterOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.worker.onmessage = (event: MessageEvent<ResponseMessage<T>>) => {
      this.resolvedPromises.set(event.data.id, event.data);
    };
  }

  public async initialize(
    list: InitializeRequestMessage<T>['payload']['list'],
    options?: InitializeRequestMessage<T>['payload']['options'],
    index?: InitializeRequestMessage<T>['payload']['index'],
  ): Promise<void> {
    this.postMessage({
      id: this.idGenerator.next().value,
      type: 'initialize-request',
      payload: { index, list, options },
    });
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
      poll(() => {
        if (!this.resolvedPromises.has(id)) {
          return true;
        }

        const data = this.resolvedPromises.get(id)! as SearchResponseMessage<T>;
        this.resolvedPromises.delete(id);
        resolve(data.payload);

        return false;
      }, this.options.pollingTime);
    });

    return promise;
  }

  // TODO: consider implementing a variant where every search() terminates whatever is there
  public terminate(): void {
    this.worker.terminate();
  }

  private postMessage(message: RequestMessage<T>): void {
    this.worker.postMessage(message);
  }
}

export default FuseAdapter;
