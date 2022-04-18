import { defineStore } from 'pinia';
import { Session } from '@/interfaces';
import { db } from '@/firebase';

export const useSessionStore = defineStore('session', {
  /*************************************
   * STATE
   *************************************/

  state: () => ({
    loadingLiveSessions: false,
    liveSessions: [] as Session[],
    unsubLiveSessions: null as Function | null,
    loadingCompletedSessions: false,
    completedSessions: [] as Session[],
    unsubCompletedSessions: null as Function | null
  }),

  /*************************************
   * ACTIONS
   *************************************/

  actions: {
    subscribeToLiveSessions() {
      db.collection('sessions').where('completedAt', '==', 'null');
    },
    subscribeToCompletedSessions() {},
    unsubscribe() {
      this.unsubLiveSessions ? this.unsubLiveSessions() : undefined;
      this.unsubCompletedSessions ? this.unsubCompletedSessions() : undefined;
    }
  }
});
