<template>
  <div class="statusBlock">
    <!-- Start time -->
    <div>
      <strong>Started: </strong>
      <span class="statusBlock__time">
        {{ prettyDate(props.session.startedAt) }} at {{ prettyTime(props.session.startedAt) }}
      </span>
    </div>

    <!-- Betting Status -->
    <div v-if="!props.session.bettingClosedAt">
      <strong>Betting: </strong>
      <span class="statusBlock__time">open</span>
      <button flat v-if="props.isGamemaker" @click="closeBetting">Close Betting</button>
    </div>
    <div v-else>
      <strong>Betting: </strong>
      <span class="statusBlock__time">
        closed on {{ prettyDate(props.session.bettingClosedAt) }} at {{ prettyTime(props.session.bettingClosedAt) }}
      </span>
      <button flat v-if="props.isGamemaker && !props.session.completedAt" @click="openBetting">Reopen</button>
    </div>

    <!-- Session Status -->
    <div v-if="!props.session.completedAt && props.session.bettingClosedAt">
      <button outlined @click="complete">Complete Session</button>
    </div>
    <div v-if="props.session.completedAt">
      <strong>Completed: </strong>
      <span class="statusBlock__time">
        {{ prettyDate(props.session.completedAt) }} at {{ prettyTime(props.session.completedAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Session } from '@/interfaces';
import { prettyDate, prettyTime } from '@/utils';

const props = defineProps<{
  session: Session;
  isGamemaker: boolean;
}>();

/* eslint-disable no-unused-vars */
const emit = defineEmits<{
  (e: 'closeBetting'): void;
  (e: 'openBetting'): void;
  (e: 'complete'): void;
}>();

const closeBetting = () => {
  emit('closeBetting');
};

const openBetting = () => {
  emit('openBetting');
};

const complete = () => {
  emit('complete');
};
</script>

<style lang="scss">
.statusBlock {
  padding: var(--md);
  border-radius: var(--xs);
  background-color: #eeeeee;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--sm);

  &__time {
    font-size: var(--font-size-small);
  }
}
</style>
