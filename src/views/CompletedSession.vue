<template>
  <div v-if="Object.keys(session).length" class="page completedSession">
    <router-link :to="{ name: 'Home' }">
      <div class="page__backToHome"><i class="icon">chevron_left</i>Home</div>
    </router-link>
    <h1 class="completedSession__heading">
      <span>{{ session.name }}</span>
    </h1>
    <div v-if="isGamemaker" class="completedSession__role">You were the Gamemaker of this session</div>
    <div class="completedSession__bets">
      <BetBlock
        v-for="bet in bets"
        :key="bet.id"
        :isGamemaker="false"
        :bet="bet"
        :user="user"
        :sessionId="sessionId"
        :readOnly="bettingClosed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BetBlock } from '@/components';
import { useSession } from '@/composables';

const { session, bets, isGamemaker, user, sessionId } = useSession();

const bettingClosed = computed(() => !!session.value.bettingClosedAt);
</script>

<style lang="scss">
.completedSession {
  display: flex;
  flex-direction: column;

  &__heading {
    display: flex;
    gap: var(--xl);
  }

  &__role {
    color: var(--gray);
    font-size: var(--font-size);
    font-weight: var(--font-weight-normal);
  }

  &__bets {
    margin-top: var(--xl);
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--lg);
  }
}
</style>
