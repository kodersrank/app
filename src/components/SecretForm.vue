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
        :rules="[rules.required, rules.naturalNumber]"
        type="number"
      />
      <v-btn
        color="primary"
        :disabled="!formIsValid"
        type="submit"
      > Submit </v-btn>
      <v-alert v-if="secretHash" type="success">
        Secret created! Save this code (hash) and only share with whoever needs to see it: {{ secretHash }}
        <br>
        You can view your secret message <router-link :to="`/secret/${secretHash}`">here</router-link>.
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
    naturalNumber: (v: number) => v >= 0 || 'Must not be negative',
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

<style scoped lang="scss">
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.v-form {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-alert {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
}
</style>
