<template>
  <div class="completedSessions">
    <h2>Completed</h2>
    <div class="completedSessions__none" v-if="!completedSessions.length">No completed sessions yet.</div>
    <div v-else class="completedSessions__list">
      <SessionCard v-for="session in completedSessions" :key="session.id" :session="session" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Session } from '@/interfaces';
import { db } from '@/firebase';
import SessionCard from './SessionCard.vue';

export default defineComponent({
  name: 'CompletedSessions',
  components: {
    SessionCard
  },
  data: () => ({
    completedSessions: [] as Session[]
  }),
  firestore() {
    return {
      completedSessions: db.collection('sessions').where('completedAt', '!=', null)
    };
  }
});
</script>

<style lang="scss">
.completedSessions {
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
