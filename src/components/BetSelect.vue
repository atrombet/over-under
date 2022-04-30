<template>
  <div>
    <p>Place your bet</p>
    <div class="betSelect" :class="{ readonly: readOnly }">
      <div :class="{ selected: modelValue === 'under' }" @click="select('under')">Under</div>
      <div :class="{ selected: modelValue === 'push' }" @click="select('push')">Push</div>
      <div :class="{ selected: modelValue === 'over' }" @click="select('over')">Over</div>
    </div>
    <div class="betSelect__list">
      <div>
        <div v-for="bettor in unders" :key="bettor.id">{{ bettor.displayName }}</div>
      </div>
      <div>
        <div v-for="bettor in pushes" :key="bettor.id">{{ bettor.displayName }}</div>
      </div>
      <div>
        <div v-for="bettor in overs" :key="bettor.id">{{ bettor.displayName }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Bettor } from '@/interfaces';

export default defineComponent({
  name: 'BetSelect',
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: () => ''
    },
    bettors: {
      type: Array as PropType<Bettor[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  computed: {
    unders() {
      return this.bettors.filter(b => b.choice === 'under');
    },
    pushes() {
      return this.bettors.filter(b => b.choice === 'push');
    },
    overs() {
      return this.bettors.filter(b => b.choice === 'over');
    }
  },
  methods: {
    select(choice: 'under' | 'push' | 'under') {
      if (!this.readOnly) {
        this.$emit('update:modelValue', choice);
      }
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

  &.readonly {
    cursor: default;
    pointer-events: none;
  }

  & div {
    padding: var(--xs) var(--sm);
    background-color: var(--white);

    &:nth-child(2) {
      border-left: var(--border-light);
      border-right: var(--border-light);
    }
  }

  & .selected {
    background-color: var(--gray);
    color: var(--text-white);
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
