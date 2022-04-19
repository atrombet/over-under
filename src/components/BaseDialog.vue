<template>
  <teleport to="#app">
    <vue-final-modal v-bind="$attrs" classes="dialog__container" content-class="dialog">
      <span class="dialog__title">
        <slot name="title"></slot>
      </span>
      <div class="dialog__content">
        <slot name="content"></slot>
      </div>
      <div class="dialog__actions">
        <slot name="actions"></slot>
      </div>
    </vue-final-modal>
  </teleport>
</template>

<script>
export default {
  name: 'BaseDialog',
  inheritAttrs: false
};
</script>

<style lang="scss">
.dialog__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  position: relative;
  min-width: 350px;
  padding: var(--xl);
  overflow: auto;
  background-color: #fff;
  border-radius: var(--xs);
  border: 1px rgb(250, 250, 250) solid;
  box-shadow: var(--elevation-dialog);

  &__title {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--xl);
  }

  &__content {
    margin-bottom: var(--xl);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--md);
  }
}
</style>
