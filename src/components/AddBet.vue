<template>
  <p>Enter a term or phrase to create a new bet</p>
  <div class="addBet">
    <input v-model="text" @keyup.enter="submit" placeholder="Enter a term or phrase" />
    <button @click="submit" :disabled="!text">Add Bet</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddBet',
  emits: ['addNewBet'],
  data: () => ({
    text: ''
  }),
  methods: {
    submit() {
      this.$emit('addNewBet', this.text);
      this.text = '';
    }
  }
});
</script>

<style lang="scss">
.addBet {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--md);

  & input {
    width: 300px;
  }
}
</style>
