import { createStore } from 'vuex';
import { auth, term } from './modules';

export default createStore({
  modules: {
    auth,
    term
  }
});
