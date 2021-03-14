import {persistence} from 'mobx-persist-store';
import {asyncStorageAdapter} from './adapters/async-storage';

export const persistStore = (store, {name, properties, delay = 200}) =>
  persistence({
    name,
    properties,
    adapter: asyncStorageAdapter,
    reactionOptions: {
      delay,
    },
  })(store);
