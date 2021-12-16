<template>
  <div class="term">
    <h3 class="term__word">"{{ term.term }}"</h3>
    <div class="term__counter">
      <i class="icon" :disabled="term.count === 0" @click="decrement">remove</i>
      {{ term.count }}/<input v-model="overUnder" />
      <i class="icon" @click="increment">add</i>
    </div>
    <div class="term__result">
      <div v-if="term.count < overUnder" class="term__under">under</div>
      <div v-if="term.count > overUnder" class="term__over">over</div>
    </div>
    <div class="term__delete">
      <i class="icon" @click="deleteTerm">clear</i>
    </div>
  </div>
</template>

<script>
import { ACTIONS } from '@/resources';

export default {
  name: 'Term',
  emits: ['delete'],
  props: {
    term: Object
  },
  computed: {
    overUnder: {
      get() {
        return this.term.overUnder;
      },
      set(val) {
        this.$store.dispatch(ACTIONS.SET_OVER_UNDER, { id: this.term.id, overUnder: val });
      }
    }
  },
  methods: {
    increment() {
      this.$store.dispatch(ACTIONS.INCREMENT, this.term.id);
    },
    decrement() {
      this.$store.dispatch(ACTIONS.DECREMENT, this.term.id);
    },
    deleteTerm() {
      this.$store.dispatch(ACTIONS.DELETE_TERM, this.term.id);
    }
  }
};
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
    font-weight: bold;
  }

  &__counter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--md);

    & input {
      width: var(--xl);
      font-weight: bold;
      text-align: center;
      font-size: var(--font-size-default);
      padding: var(--xs);
    }
  }

  &__result {
    margin-top: var(--xl);
  }

  &__under,
  &__over {
    text-transform: uppercase;
    padding: var(--sm);
    border-radius: var(--xs);
    font-weight: bold;
  }

  &__under {
    background-color: var(--under-color-trans);
    border: 2px solid var(--under-color);
    color: var(--under-color);
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
