<template>
  <div class="page home">
    <h1 class="home__title">Over / Under</h1>
    <LiveSessions />
    <CompletedSessions />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LiveSessions, CompletedSessions } from '@/components';

export default defineComponent({
  name: 'Home',
  components: {
    LiveSessions,
    CompletedSessions
  }
});
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: var(--xl);

  &__termInput {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--md);

    & input {
      width: 300px;
    }
  }

  &__terms {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--lg);
  }
}
</style>
