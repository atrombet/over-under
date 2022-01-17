import { Store } from 'vuex';
import { RootState } from '@/interfaces';

export * from 'vuex/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
