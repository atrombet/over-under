import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { firestoreBind } from 'vuefire';
import { Session, Bet } from '@/interfaces';
import { useAuthStore } from '@/stores';

export const useSession = () => {
  const sessionId = computed(() => useRoute().params.sessionId);
  const betsCollection = computed(() => db.doc(`sessions/${sessionId.value}`).collection('bets'));
  const authStore = useAuthStore();

  const session = ref<Session>({} as Session);
  const bets = ref<Bet[]>([]);

  firestoreBind(session, db.doc(`sessions/${sessionId.value}`));
  firestoreBind(bets, betsCollection.value);

  const user = computed(() => authStore.user);
  const isGamemaker = computed(() => session.value.owner === user?.value?.uid);

  return { sessionId, betsCollection, session, bets, user, isGamemaker };
};
