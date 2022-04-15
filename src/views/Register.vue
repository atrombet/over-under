<template>
  <div class="login__wrapper">
    <div class="login">
      <h1>Register</h1>
      <p>Please register to use this application</p>
      <p class="login__error" v-if="error?.json?.error_description">{{ error.json.error_description }}</p>
      <input v-model="email" type="email" name="email" placeholder="email" />
      <input v-model="password" type="password" name="password" placeholder="password" />
      <input v-model="confirmPassword" type="password" name="confirmPassword" placeholder="confirm password" />
      <button @click="register(email, password)" :disabled="!canRegister">register</button>
      <div class="login__goTo">
        <p>Already registered?</p>
        <router-link href="" :to="{ name: 'Login' }">Click here to log in.</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  computed: {
    ...mapState(useAuthStore, ['error']),
    passMatch(): boolean {
      return !!this.password && !!this.confirmPassword && this.password === this.confirmPassword;
    },
    canRegister(): boolean {
      return !!this.email && this.passMatch;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register'])
  }
});
</script>
