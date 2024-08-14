<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <div class="content d-flex justify-center">
      <section>
        <v-text-field
          v-model="hashInput"
          class=""
          hide-details="auto"
          label="View Secret"
          placeholder="Enter hash"
        />
        <router-link
          v-if="hashInput"
          class="align-center justify-center"
          :to="`/secret/${hashInput}`"
        >
          <v-btn color="primary"> View Secret </v-btn>
        </router-link>
      </section>
      <div class="pa-6 d-flex flex-column justify-center">
        <strong class="text-uppercase"> or </strong>
      </div>
      <section>
        <router-link class="d-flex justify-start" to="/secret">
          <v-btn color="secondary"> Create a New Secret </v-btn>
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
  height: 100%;

  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: outline .6s;
    outline: 3px solid transparent;
    border-radius: 8px;
    height: 100%;
    min-width: 400px;
    padding: 10px;

    --boost: 0%;

    background-image: radial-gradient(
        circle at var(--side),
        var(--color) calc(-100% + var(--boost)),
        rgba(0, 0, 0, 0.4) 100%
      ),
      linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2) 70%),
      radial-gradient(circle, rgba(0, 0, 0, 0.5), transparent);

    &:hover {
      --boost: 100%;
      outline: 4px solid var(--color);
    }

    .v-input {
      max-height: 50px;
    }

    .v-btn {
      width: 400px;
    }

    &:first-child {
      --side: right;
      --color: rgb(var(--v-theme-primary));
    }

    &:last-child {
      --side: left;
      --color: rgb(var(--v-theme-secondary));
    }
  }
}
</style>
