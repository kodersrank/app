<template>
  <v-container>
    <v-form
      v-model="formIsValid"
      @submit.prevent="submitForm"
    >
      <v-textarea
        v-model="secret"
        label="Secret"
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="expireAfterViews"
        label="Expire After Views"
        :rules="[rules.required, rules.positiveNumber]"
        type="number"
      />
      <v-text-field
        v-model="expireAfter"
        label="Expire After (minutes)"
        :rules="[rules.required, rules.positiveNumber]"
        type="number"
      />
      <v-btn
        color="primary"
        :disabled="!formIsValid"
        type="submit"
      > Submit </v-btn>
      <v-alert v-if="secretHash" type="success">
        Secret created! Hash: {{ secretHash }}
        <br>
        You can view it <router-link :to="`/secret/${secretHash}`">here</router-link>.
      </v-alert>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import apiService from '@/services/api-service';

  const formIsValid = ref<boolean>(false);
  const secret = ref<string>('');
  const expireAfterViews = ref<number>(3);
  const expireAfter = ref<number>(5);
  const secretHash = ref<string>('');

  const rules = {
    required: (v: string) => !!v || 'This field is required',
    positiveNumber: (v: number) => v > 0 || 'Must be greater than 0',
  };

  const submitForm = async () => {
    try {
      const response = await apiService.post('/api/secret', {
        secret: secret.value,
        expireAfterViews: +expireAfterViews.value,
        expireAfter: +expireAfter.value,
      });
      secretHash.value = response.data.hash;
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
</script>
