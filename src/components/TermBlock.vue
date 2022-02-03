<template>
  <div class="term">
    <h3 class="term__word">"{{ term.text }}"</h3>
    <div class="term__counter">
      <i class="icon" :disabled="term.count === 0" @click="decrement(term.id)">remove</i>
      {{ term.count }}/<input v-model="overUnder" />
      <i class="icon" @click="increment(term.id)">add</i>
    </div>
    <div class="term__result">
      <div v-if="term.count < overUnder" class="term__under">under</div>
      <div v-if="term.count == overUnder" class="term__push">push</div>
      <div v-if="term.count > overUnder" class="term__over">over</div>
    </div>
    <div class="term__delete">
      <i class="icon" @click="deleteTerm(term.id)">clear</i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Term } from '@/interfaces';
import { mapActions } from 'pinia';
import { useTermStore } from '../stores';

export default defineComponent({
  name: 'TermBlock',
  props: {
    term: {
      type: Object as PropType<Term>,
      default: () => ({})
    }
  },
  computed: {
    overUnder: {
      get(): number {
        return this.term.overUnder;
      },
      set(val: number): void {
        this.setOverUnder(this.term.id, Number(val));
      }
    }
  },
  methods: {
    ...mapActions(useTermStore, ['increment', 'decrement', 'setOverUnder', 'deleteTerm'])
  }
});
</script>

<style lang="scss">
.term {
  padding: var(--md) var(--xl);
  border: var(--border);
  border-radius: var(--md);
  position: relative;

  & i.icon {
    height: var(--xl);
    width: var(--xl);
    line-height: var(--xl);
    border-radius: 50%;
    transition: 0.2s;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &:hover {
      background-color: #e1e1e1;
      transition: 0.2s;
    }

    &[disabled='true'] {
      pointer-events: none;
      opacity: 0.5;

      &:hover {
        background-color: transparent;
      }
    }
  }

  &__word {
    font-weight: var(--font-weight-bold);
  }

  &__counter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--md);

    & input {
      width: var(--xl);
      font-weight: var(--font-weight-bold);
      text-align: center;
      font-size: var(--font-size-default);
      padding: var(--xs);
    }
  }

  &__result {
    margin-top: var(--xl);
  }

  &__under,
  &__push,
  &__over {
    text-transform: uppercase;
    padding: var(--sm);
    border-radius: var(--xs);
    font-weight: var(--font-weight-bold);
  }

  &__under {
    background-color: var(--under-color-trans);
    border: 2px solid var(--under-color);
    color: var(--under-color);
  }

  &__push {
    background-color: var(--push-color-trans);
    border: 2px solid var(--push-color);
    color: var(--push-color);
  }

  &__over {
    background-color: var(--over-color-trans);
    border: 2px solid var(--over-color);
    color: var(--over-color);
  }

  &__delete {
    position: absolute;
    top: var(--sm);
    right: var(--sm);
    color: #e28680;
  }
}
</style>
