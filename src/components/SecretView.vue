<template>
  <v-container>
    <go-back-btn />
    <v-card
      v-if="secret"
      class="secret-card"
      :class="{
        'pulsating-outline': showExpiryDate && msLeft,
        'expired-outline': showExpiryDate && !msLeft,
      }"
    >
      <v-card-title>Secret</v-card-title>
      <v-card-subtitle>{{ secret.secretText }}</v-card-subtitle>
      <v-card-text>
        <p>Remaining Views: {{ secret.remainingViews }}</p>
        <p v-if="showExpiryDate">
          Expires At: {{ expiryDate }}
        </p>
        <p
          v-if="showExpiryDate && remainingTime"
          class="pa-6 text-center text-overline"
        >
          {{ remainingTime }}
        </p>
      </v-card-text>
    </v-card>
    <v-alert v-else-if="errorMessage" class="error-alert" type="error">
      {{ errorMessage }}
      <router-link to="/secret">
        <v-btn class="float-right">
          Create a new secret
        </v-btn>
      </router-link>
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { isAxiosError } from 'axios';
  import { ExtendedSecret } from '@/types/extended-secret.interface';
  import apiService from '@/services/api-service';

  interface Props {
    hash: string;
  }

  const props = defineProps<Props>();

  const secret = ref<ExtendedSecret|null>(null);
  const errorMessage = ref('');

  const fetchSecret = async (hash: string) => {
    try {
      const response = await apiService(`/api/secret/${hash}`);
      secret.value = response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 410) {
          errorMessage.value = 'Secret has expired or is no longer available.';
        } else if (error.response?.status === 404) {
          errorMessage.value = 'Requested secret was not found.';
        } else {
          errorMessage.value = 'Error fetching secret.';
        }
      }
    }
  };

  const showExpiryDate = computed<boolean>(() => !!secret.value?.expiresAt);

  const expiryDate = computed<string>(() => new Date(secret.value?.expiresAt as string).toLocaleString());

  const msLeft = ref<number|null>(0);

  const remainingTime = computed<string|null>(() => {
    if (secret.value && msLeft.value !== null) {
      if (!msLeft.value) return "Uh-oh! Time's up. If you refresh this page, the secret will be gone.";

      const days = Math.floor(msLeft.value / (1000 * 60 * 60 * 24));
      const hours = Math.floor((msLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft.value % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msLeft.value % (1000 * 60)) / 1000);
      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    } else return null;
  });

  onMounted(async () => {
    await fetchSecret(props.hash);

    if (showExpiryDate.value && secret.value) {
      const interval = setInterval(() => {
        const expiry = new Date(secret.value?.expiresAt as string);
        const diff = +expiry - Date.now();
        if (diff > 0) {
          msLeft.value = diff;
        } else {
          msLeft.value = 0;
          clearInterval(interval);
        }
      }, 1000);
    }
  });
</script>

<style scoped lang="scss">
$spacing-small: 0.5rem;
$spacing-medium: 1rem;
$border-radius: 8px;
$box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
$font-size-small: 0.875rem;

.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0;
}

.secret-card {
  width: 100%;
  max-width: 600px;
  padding: $spacing-medium;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  position: relative;
  overflow: hidden;

  &.pulsating-outline {
    outline: 2px solid rgba(var(--v-theme-primary), 0.5);
    animation: pulse 1s infinite;
  }

  &.expired-outline {
    outline: 2px solid rgb(var(--v-theme-error));
  }
}

.error-alert {
  position: fixed;
  bottom: $spacing-medium;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  padding: $spacing-small $spacing-medium;
  border-radius: $border-radius;
  background-color: #f44336;
  color: white;
  box-shadow: $box-shadow;
  font-size: $font-size-small;
}

.v-card-title, .v-card-subtitle, .v-card-text {
  margin-bottom: $spacing-small;
}

@keyframes pulse {
  0% {
    outline-color: rgba(var(--v-theme-primary), 0.3);
  }
  50% {
    outline-color: rgba(var(--v-theme-primary), 0.6);
  }
  100% {
    outline-color: rgba(var(--v-theme-primary), 0.3);
  }
}
</style>
