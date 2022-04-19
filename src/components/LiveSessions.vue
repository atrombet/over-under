<template>
  <div class="liveSessions">
    <h2 class="liveSessions__heading">
      Live Now <button flat @click="openGoLiveDialog"><i class="icon">podcasts</i>Go live</button>
    </h2>
    <div v-if="!liveSessions.length" class="liveSessions__none">Nothing live right now.</div>
    <div v-else class="liveSessions__list">
      <SessionCard
        v-for="session in liveSessions"
        :key="session.id"
        :session="session"
        @click="goToSession(session.id)"
      />
    </div>
  </div>
  <GoLiveDialog ref="goLiveDialog" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Session } from '@/interfaces';
import { db } from '@/firebase';
import { useAuthStore } from '@/stores';
import { mapState } from 'pinia';
import SessionCard from './SessionCard.vue';
import GoLiveDialog from './GoLiveDialog.vue';

export default defineComponent({
  name: 'LiveSessions',
  components: {
    SessionCard,
    GoLiveDialog
  },
  data: () => ({
    loadingLiveSessions: false,
    liveSessions: [] as Session[]
  }),
  firestore() {
    return {
      liveSessions: db.collection('sessions').where('completedAt', '==', null)
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user'])
  },
  methods: {
    async openGoLiveDialog() {
      const sessionName = await (this.$refs.goLiveDialog as typeof GoLiveDialog).open();
      sessionName ? this.startLiveSession(sessionName) : undefined;
    },
    async startLiveSession(name: string) {
      await db.collection('sessions').add({
        owner: this.user?.uid,
        participants: [this.user?.uid],
        name,
        startedAt: Date.now(),
        completedAt: null,
        bettingClosedAt: null
      });
    },
    goToSession(id: string) {
      this.$router.push({ name: 'LiveSession', params: { sessionId: id } });
    }
  }
});
</script>

<style lang="scss">
.liveSessions {
  &__heading {
    display: flex;
    align-items: center;
    gap: var(--xl);
  }

  &__none {
    font-style: italic;
    color: var(--gray);
    padding: var(--md);
  }

  &__list {
    display: flex;
    gap: var(--lg);
    flex-wrap: wrap;
  }
}
</style>
