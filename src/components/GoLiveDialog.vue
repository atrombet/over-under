<template>
  <BaseDialog v-model="show" v-bind="$attrs" :click-to-close="false">
    <template v-slot:title>Go Live</template>
    <template v-slot:content>
      <p>Add a name to your new live session.</p>
      <input v-model="sessionName" class="goLiveDialog__input" type="text" placeholder="Session name" />
    </template>
    <template v-slot:actions>
      <button flat @click="cancel">Cancel</button>
      <button @click="goLive" :disabled="!sessionName"><i class="icon">podcasts</i>Go Live</button>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseDialog from './BaseDialog.vue';

export default defineComponent({
  name: 'GoLiveDialog',
  components: {
    BaseDialog
  },
  data: () => ({
    show: false,
    sessionName: '',
    // eslint-disable-next-line no-unused-vars
    resolvePromise: undefined as undefined | ((value: unknown) => void)
  }),
  methods: {
    open() {
      this.show = true;
      return new Promise(resolve => {
        this.resolvePromise = resolve;
      });
    },
    goLive() {
      if (this.resolvePromise && this.sessionName) {
        this.show = false;
        this.resolvePromise(this.sessionName);
      }
    },
    cancel() {
      if (this.resolvePromise) {
        this.show = false;
        this.resolvePromise(null);
      }
    }
  }
});
</script>

<style lang="scss">
.goLiveDialog__input {
  width: calc(100% - var(--md));
}
</style>
