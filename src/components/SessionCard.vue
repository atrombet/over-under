<template>
  <div v-if="session" class="sessionCard">
    <div class="sessionCard__heading">
      <span>{{ session.name }}</span>
      <template v-if="!session.completedAt">
        <span v-if="session.bettingClosedAt" class="sessionCard__bettingClosed">Betting closed</span>
        <span v-else class="sessionCard__bettingOpen">Betting open</span>

      </template>
    </div>
    <div v-if="session.completedAt">
      Completed on {{ prettyDate(session.completedAt) }} at {{ prettyTime(session.completedAt) }}
    </div>
    <div v-else>Started on {{ prettyDate(session.startedAt) }} at {{ prettyTime(session.startedAt) }}</div>
    <div class="sessionCard__light">
      {{ session.participants.length }} particant{{ session.participants.length !== 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Session } from '@/interfaces';
import { prettyDate, prettyTime } from '@/utils';

export default defineComponent({
  name: 'SessionCard',
  data: () => ({
    prettyDate,
    prettyTime
  }),
  props: {
    session: { type: Object as PropType<Session>, required: true }
  }
});
</script>

<style lang="scss">
.sessionCard {
  display: flex;
  flex-direction: column;
  gap: var(--xs);
  padding: var(--md);
  border-radius: var(--xs);
  border: var(--border-subtle);
  background-color: var(--white);
  cursor: pointer;
  transition: 0.15s linear;

  &:hover {
    box-shadow: var(--elevation-md);
    transition: box-shadow 0.15s linear;
  }

  &__heading {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--md);
  }

  &__bettingOpen,
  &__bettingClosed {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-normal);
  }

  &__bettingOpen {
    color: var(--accent);
  }

  &__bettingClosed {
    color: var(--gray);
  }

  &__light {
    font-size: var(--font-size-small);
  }
}
</style>
