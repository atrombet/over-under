<template>
  <main>
    <Avatar />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Avatar from '@/components/Avatar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Avatar
  }
});
</script>
