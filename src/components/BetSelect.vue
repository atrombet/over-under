<template>
  <div class="betSelect">
    <div :class="{ selected: modelValue === 'under' }" @click="select('under')">Under</div>
    <div :class="{ selected: modelValue === 'push' }" @click="select('push')">Push</div>
    <div :class="{ selected: modelValue === 'over' }" @click="select('over')">Over</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BetSelect',
  props: {
    modelValue: {
      type: String,
      default: () => ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    select(choice: 'under' | 'push' | 'under') {
      this.$emit('update:modelValue', choice);
    }
  }
});
</script>

<style lang="scss" scoped>
.betSelect {
  border-radius: var(--xs);
  border: var(--border-light);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: var(--font-size-small);
  cursor: pointer;

  & div {
    padding: var(--xs) var(--sm);
    background-color: var(--white);

    &:nth-child(2) {
      border-left: var(--border-light);
      border-right: var(--border-light);
    }
  }

  & .selected {
    background-color: var(--gray-darker);
    color: var(--white-text);
  }
}
</style>
