<template>
  <v-container>
    <v-card v-if="secret">
      <v-card-title>Secret</v-card-title>
      <v-card-subtitle>{{ secret.secretText }}</v-card-subtitle>
      <v-card-text>
        <p>Remaining Views: {{ secret.remainingViews }}</p>
        <p>Expires At: {{ secret.expiresAt }}</p>
      </v-card-text>
    </v-card>
    <v-alert v-else-if="errorMessage" type="error">
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

  onMounted(() => {
    fetchSecret(props.hash);
  });
</script>
