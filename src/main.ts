import { createApp, markRaw } from 'vue';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';
import vfmPlugin from 'vue-final-modal';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/stores';
import './styles/styles.scss';

// Create the app.
const app = createApp(App);

// Use the Firebase plugin from vuefire.
app.use(firestorePlugin);
// Vue final modal plugin.
app.use(vfmPlugin);

// Use the Pinia store.
const pinia = createPinia();
// Expose the router to the store.
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
// Setup watcher for firebase auth state change.
useAuthStore().bindUser();

// Use the router.
app.use(router);

// Mount the app to the DOM.
app.mount('#app');
