<template>
  <v-btn class="go-back-btn" variant="tonal" @click="goHome">
    ⬅ Go Back
  </v-btn>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };
</script>

<style scoped lang="scss">
.go-back-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  color: white;
  z-index: 1000;
}
</style>
