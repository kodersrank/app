<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <div class="content d-flex justify-center">

      <section class="flex-grow-1 d-flex ga-2 flex-column">
        <v-text-field
          v-model="hashInput"
          hide-details="auto"
          label="View Secret"
          placeholder="Enter hash"
        />
        <router-link
          v-if="hashInput"
          class="align-center justify-center"
          :to="`/secret/${hashInput}`"
        >
          <v-btn color="primary">
            View Secret
          </v-btn>
        </router-link>
      </section>
      <div class="pa-6 d-flex flex-column justify-center">
        <strong class="text-uppercase">
          or
        </strong>
      </div>
      <section class="flex-grow-1 d-flex align-center justify-start">
        <router-link class="d-flex justify-start" to="/secret">
          <v-btn color="secondary">
            Create a New Secret
          </v-btn>
        </router-link>
      </section>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const hashInput = ref('');
</script>

<style scoped lang="scss">
.content {
  width: fit-content;

  > section {
    min-width: 400px;

    .v-btn {
      width: 400px;
    }
  }
}
</style>
