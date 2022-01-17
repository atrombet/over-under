import { createStore } from 'vuex';
import { auth, term } from './modules';
import { RootState } from '@/interfaces';

export default createStore<RootState>({
  modules: {
    auth,
    term
  }
});
