<template>
  <v-container>
    <v-card v-if="secret" class="secret-card">
      <v-card-title>Secret</v-card-title>
      <v-card-subtitle>{{ secret.secretText }}</v-card-subtitle>
      <v-card-text>
        <p>Remaining Views: {{ secret.remainingViews }}</p>
        <p v-if="showExpiryDate">
          Expires At: {{ expiryDate }}
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
  import { onMounted, ref } from 'vue';
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

  onMounted(() => {
    fetchSecret(props.hash);
  });
</script>

<style scoped lang="scss">
// TODO: move to variables.scss
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

.secret-card {
  margin-bottom: $spacing-medium;
}

.v-card-title, .v-card-subtitle, .v-card-text {
  margin-bottom: $spacing-small;
}
</style>
