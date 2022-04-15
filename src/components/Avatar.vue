<template>
  <div v-if="user" class="avatar" @click="toggleMenu">
    <div class="avatar__name">{{ user.displayName || user.email }}</div>
    <div class="avatar__image">
      <img v-if="user.photoUrl" :src="user.photoUrl" />
      <div v-else><i class="icon">person</i></div>
    </div>
    <div v-if="showMenu" class="avatar__menu">
      <router-link :to="{ name: 'UserProfile' }">
        <div class="avatar__menuItem"><i class="icon">person</i>User Profile</div>
      </router-link>
      <div class="avatar__menuItem" @click="logout"><i class="icon">logout</i>Log out</div>
    </div>
    <div v-if="showHint && noDisplayName && notProfile" class="avatar__hint">
      <div>Click here to access your User Profile and set your display name.</div>
      <i class="icon" @click="showHint = false">close</i>
      <div class="avatar__hintArrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'Avatar',
  data: () => ({
    showMenu: false,
    showHint: true
  }),
  computed: {
    ...mapState(useAuthStore, ['user']),
    noDisplayName() {
      return !this.user?.displayName;
    },
    notProfile() {
      return this.$route.name !== 'UserProfile';
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    openMenu() {
      this.showMenu = true;
    },
    closeMenu() {
      this.showMenu = false;
    },
    clickListener(event: any) {
      if (this.showMenu && !event?.target?.classList?.contains('avatar')) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.clickListener);
  },
  unmounted() {
    document.body.removeEventListener('click', this.clickListener);
  }
});
</script>

<style lang="scss">
.avatar {
  position: absolute;
  right: var(--lg);
  top: var(--lg);
  display: flex;
  align-items: center;
  gap: var(--sm);
  cursor: pointer;

  &__name,
  &__image {
    pointer-events: none;
  }

  &__name {
    color: var(--gray);
  }

  &__image {
    height: 40px;
    width: 40px;
    border-radius: 22px;
    border: 2px white solid;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), inset 0 0 14px 0 rgba(0, 0, 0, 0.6);
    background-color: var(--gray);
    color: var(--text-white);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__menu {
    position: absolute;
    right: 0;
    top: 44px;
    z-index: 3;
    width: 160px;
    border-radius: var(--xs);
    border: 1px solid var(--gray-lightest);
    box-shadow: var(--elevation-dialog);
    background-color: var(--white);
  }

  &__menuItem {
    display: flex;
    align-items: center;
    gap: var(--sm);
    padding: var(--sm) var(--md);
    cursor: pointer;
    transition: 0.1s linear;

    &:hover {
      background-color: var(--gray-lighter);
      transition: 0.1s linear;
    }
  }

  &__hint {
    position: absolute;
    right: var(--md);
    top: 50px;
    z-index: 2;
    background: var(--accent-gradient);
    padding: var(--md);
    color: var(--text-white);
    border-radius: var(--xs);
    box-shadow: var(--elevation-md);
    width: 310px;
    display: flex;
    justify-content: space-between;
    gap: var(--md);
  }

  &__hintArrow {
    position: absolute;
    top: -12px;
    right: 72px;
    height: 0;
    width: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid rgb(79, 9, 158);
  }
}
</style>
