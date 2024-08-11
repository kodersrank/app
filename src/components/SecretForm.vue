<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-textarea v-model="secret" label="Secret" required />
      <v-text-field
        v-model="expireAfterViews"
        label="Expire After Views"
        min="1"
        required
        type="number"
      />
      <v-text-field
        v-model="expireAfter"
        label="Expire After (minutes)"
        min="0"
        required
        type="number"
      />
      <v-btn color="primary" type="submit">Submit</v-btn>
      <v-alert v-if="responseMessage" type="success">{{ responseMessage }}</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import apiService from '@/services/api-service';

  const secret = ref('');
  const expireAfterViews = ref(1);
  const expireAfter = ref(0);
  const responseMessage = ref('');

  const submitForm = async () => {
    try {
      const response = await apiService.post('/api/secret', {
        secret: secret.value,
        expireAfterViews: +expireAfterViews.value,
        expireAfter: +expireAfter.value,
      });
      responseMessage.value = `Secret created! Hash: ${response.data.hash}`;
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
</script>
