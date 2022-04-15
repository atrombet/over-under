<template>
  <div class="login__wrapper">
    <div class="login">
      <h1>Login</h1>
      <p>Please login to continue</p>
      <p class="login__error" v-if="error?.json?.error_description">{{ error.json.error_description }}</p>
      <input v-model="email" type="email" name="email" placeholder="email" />
      <input v-model="password" type="password" name="password" placeholder="password" />
      <Checkbox disabled v-model="remember" label="Remember me?" />
      <button @click="login(email, password, remember)" :disabled="!canLogin">login</button>
      <div class="login__goTo">
        <p>Not registered?</p>
        <router-link :to="{ name: 'Register' }">Click here to register.</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores';
import { Checkbox } from '@/components';

export default defineComponent({
  name: 'Login',
  components: {
    Checkbox
  },
  data: () => ({
    email: '',
    password: '',
    remember: false
  }),
  computed: {
    ...mapState(useAuthStore, ['error']),
    canLogin(): boolean {
      return !!this.email && !!this.password;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login'])
  }
});
</script>
