<template>
  <div class="checkbox">
    <div class="checkbox__field" @click="toggle">
      <i v-if="modelValue" class="icon">check</i>
    </div>
    <label v-if="label" @click="toggle">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
};
</script>

<style lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: var(--sm);
  margin-bottom: var(--sm);

  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &__field {
    height: var(--lg);
    width: var(--lg);
    border-radius: var(--xs);
    color: var(--accent);
    border: var(--border);
    cursor: pointer;
  }

  & label {
    flex: 1 0 auto;
    cursor: pointer;
    font-size: var(--font-size-small);
  }
}
</style>
