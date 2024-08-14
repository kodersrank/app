<template>
  <img class="bg-underlay" src="@/assets/main-bg.jpg">
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped lang="scss">
.bg-underlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  filter: blur(1px) brightness(50%);
  mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%);
  -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%);
  z-index: 0;
}
</style>
