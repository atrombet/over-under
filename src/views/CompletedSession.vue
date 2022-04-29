<template>
  <div v-if="Object.keys(session).length" class="page completedSession">
    <router-link :to="{ name: 'Home' }">
      <div class="page__backToHome"><i class="icon">chevron_left</i>Home</div>
    </router-link>
    <h1 class="completedSession__heading">
      <span>{{ session.name }}</span>
      <span v-if="isGamemaker">You were the Gamemaker of this session</span>
    </h1>
    <div class="completedSession__bets">
      <div v-for="bet in bets" :key="bet.id">{{ bet }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSession } from '@/composables';

const { session, bets, isGamemaker } = useSession();
</script>

<style lang="scss">
.completedSession {
  display: flex;
  flex-direction: column;

  &__heading {
    display: flex;
    gap: var(--xl);
  }
}
</style>
