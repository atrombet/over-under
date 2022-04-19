<template>
  <div class="sat">
    <template v-if="modelValue">
      <span>You are the</span>
      <span class="sat__tag gamemaker">Gamemaker</span>
    </template>
    <template v-else>
      <span>You are a</span>
      <span class="sat__tag participant">Participant</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SessionAccessTag',
  props: {
    modelValue: Boolean
  }
});
</script>

<style lang="scss">
.sat {
  display: inline-flex;
  align-items: center;
  gap: var(--sm);
  font-size: var(--font-size);
  font-weight: var(--font-weight-normal);

  &__tag {
    padding: var(--xs) var(--md);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    font-size: var(--font-size-small);
    border-radius: 20px;

    &.gamemaker {
      border: 1px solid var(--push-color);
      color: var(--push-color);
      background-color: var(--push-color-trans);
    }

    &.participant {
      border: 1px solid var(--participant-color);
      color: var(--participant-color);
      background-color: var(--participant-color-trans);
    }
  }
}
</style>
