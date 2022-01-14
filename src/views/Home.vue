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
        <TermBlock v-for="(term, i) in terms" :key="i" :term="term" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ACTIONS } from '@/resources';
import { TermBlock } from '@/components';
import { Term } from '@/interfaces';

export default defineComponent({
  name: 'Home',
  components: {
    TermBlock
  },
  data: () => ({
    newTerm: ''
  }),
  computed: {
    terms(): Term[] {
      return this.$store.getters.allTerms;
    }
  },
  methods: {
    addNewTerm(): void {
      this.$store.dispatch(ACTIONS.CREATE_NEW_TERM, this.newTerm);
      this.newTerm = '';
    }
  }
});
</script>

<style lang="scss">
.home {
  max-width: 70vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--lg);
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
