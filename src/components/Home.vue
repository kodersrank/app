<template>
  <div class="pa-0 fill-height fill-width">
    <header class="h-25 fill-width text-white text-uppercase d-flex align-end justify-center">
      <h1 class="cta-heading mb-6">Unveil the <span class="glow">Enigma</span></h1>
    </header>
    <v-container class="h-75 d-flex align-center justify-center">
      <div class="fill-height content d-flex justify-center">
        <section>
          <v-text-field
            v-model="hashInput"
            class=""
            hide-details="auto"
            label="I have a secret"
            placeholder="Enter your hash"
            @keyup.enter="$router.push(`/secret/${hashInput}`)"
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
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const hashInput = ref('');
</script>

<style scoped lang="scss">
.content {
  width: fit-content;

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

header {
  h1 {
    font-size: 4pc;
    font-weight: 400;

    .glow {
      font-weight: 900;
      animation: pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    text-shadow: 0px 0px 7px white;
  }
  50% {
    opacity: .95;
    text-shadow: 0px 0px 0px white;
  }
}
</style>
