<template>
  <div class="page">
    <router-link :to="{ name: 'Home' }">
      <div class="page__backToHome"><i class="icon">chevron_left</i>Home</div>
    </router-link>
    <h1>User Profile</h1>
    <div v-if="user" class="userProfile">
      <div>
        <label>Email</label>
        <div>{{ user.email }}</div>
      </div>
      <div>
        <label>User Id</label>
        <div>{{ user.uid }}</div>
      </div>
      <div>
        <label>Display Name</label>
        <input v-model="displayName" type="text" placeholder="Display Name" />
      </div>
      <div>
        <label>Photo <span class="userProfile__comingSoon">(Coming soon)</span></label>
        <input disabled type="file" accept="image/png, image/jpeg" />
      </div>
      <span>
        <button @click="save" :disabled="!canSave">Save</button>
        <span class="userProfile__result">{{ result }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'UserProfile',
  data: () => ({
    newDisplayName: '',
    result: ''
  }),
  computed: {
    ...mapState(useAuthStore, ['user']),
    displayName: {
      get() {
        return this.newDisplayName || this.user?.displayName;
      },
      set(value: string) {
        this.newDisplayName = value;
      }
    },
    canSave() {
      return !!this.newDisplayName;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['updateUser']),
    async save() {
      this.result = await this.updateUser(this.newDisplayName);
      this.newDisplayName = '';
      setTimeout(() => {
        this.result = '';
      }, 5000);
    }
  }
});
</script>

<style lang="scss">
.userProfile {
  display: flex;
  flex-direction: column;
  gap: var(--lg);

  & input {
    width: fit-content;
  }

  &__result {
    color: var(--accent-dark);
    margin-left: var(--md);
  }

  &__comingSoon {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-normal);
    color: var(--gray);
  }
}
</style>
