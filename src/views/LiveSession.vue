<template>
  <div class="page home">
    <h1 class="home__title">Over / Under</h1>
    <p class="home__instruction">Enter a term or phrase to create a new counter.</p>
    <div class="home__termInput">
      <input v-model="text" @keyup.enter="addTerm" placeholder="Enter a term or phrase" />
      <button @click="addTerm" :disabled="!text">Add Term</button>
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
import { TermBlock } from '@/components';
import { mapState, mapActions } from 'pinia';
import { useTermStore } from '@/stores';

export default defineComponent({
  name: 'Home',
  components: {
    TermBlock
  },
  data: () => ({
    text: ''
  }),
  computed: {
    ...mapState(useTermStore, ['terms'])
  },
  methods: {
    ...mapActions(useTermStore, ['createNewTerm']),
    addTerm(): void {
      this.createNewTerm(this.text);
      this.text = '';
    }
  }
});
</script>

<style lang="scss">
.home {
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
