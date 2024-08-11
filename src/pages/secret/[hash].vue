<template>
  <SecretView
    v-if="hash"
    :hash="hash"
  />
</template>

<script setup lang="ts">
  const route = useRoute();

  const hash = computed<string>(() => (route.params as { hash: string }).hash);
</script>
