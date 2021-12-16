<template>
  <div class="home">
    <h1 class="home__title">Over / Under</h1>
    <p class="home__instruction">Enter a term or phrase to create a new counter.</p>
    <div class="home__termInput">
      <input v-model="newTerm" @keyup.enter="addNewTerm" placeholder="Enter a term or phrase" />
      <button @click="addNewTerm" :disabled="!newTerm">Add Term</button>
    </div>
    <div class="home__terms">
      <template v-if="!!terms.length">
        <Term v-for="(term, i) in terms" :key="i" :term="term" />
      </template>
    </div>
  </div>
</template>

<script>
import { ACTIONS } from '@/resources';
import { Term } from '@/components';

export default {
  name: 'Home',
  components: {
    Term
  },
  data: () => ({
    newTerm: ''
  }),
  computed: {
    terms() {
      return this.$store.getters.allTerms;
    }
  },
  methods: {
    addNewTerm() {
      this.$store.dispatch(ACTIONS.CREATE_NEW_TERM, this.newTerm);
      this.newTerm = '';
    }
  }
};
</script>

<style lang="scss">
.home {
  max-width: 70vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

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
    flex-direction: column;
    gap: var(--lg);
  }
}
</style>
