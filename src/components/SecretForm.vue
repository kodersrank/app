<template>
  <v-container>
    <go-back-btn />
    <v-form
      v-model="formIsValid"
      @submit.prevent="submitForm"
    >
      <div class="instructions">
        <p>Fill out the form below to create a new secret. Be sure to specify how long the secret should be visible and how many times it can be viewed before expiring.</p>
      </div>

      <v-textarea
        v-model="secret"
        hint="Enter the secret message you want to hide."
        label="Secret"
        persistent-hint
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="expireAfterViews"
        hint="Specify how many times the secret can be viewed before it expires."
        label="Expire After Views"
        persistent-hint
        :rules="[rules.required, rules.positiveNumber]"
        type="number"
      />
      <v-text-field
        v-model="expireAfter"
        :hint="'Enter the duration (in minutes) for which the secret will be visible before it expires. '
          + 'Entering 0 will make it available indefinitely.'"
        label="Expire After (minutes)"
        persistent-hint
        :rules="[rules.required, rules.naturalNumber]"
        type="number"
      />
      <v-btn
        color="secondary"
        @click="clearForm"
      > Clear </v-btn>
      <v-btn
        class="float-right"
        color="primary"
        :disabled="!formIsValid || loading"
        type="submit"
      > Submit </v-btn>
      <v-progress-linear v-if="loading" indeterminate />
    </v-form>
    <v-alert v-if="secretHash" type="success">
      Secret created! Save this code (hash) and only share with whoever needs to see it: {{ secretHash }}
      <br>
      You can view your secret message <router-link :to="`/secret/${secretHash}`">here</router-link>.
    </v-alert>
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
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
  const errorMessage = ref<string>('');
  const loading = ref<boolean>(false);

  const rules = {
    required: (v: string) => !!v || 'This field is required',
    positiveNumber: (v: number) => v > 0 || 'Must be greater than 0',
    naturalNumber: (v: number) => v >= 0 || 'Must not be negative',
  };

  const clearForm = () => {
    secret.value = '';
    expireAfterViews.value = 3;
    expireAfter.value = 5;
    formIsValid.value = false;
    errorMessage.value = '';
  };

  const submitForm = async () => {
    loading.value = true;
    try {
      const response = await apiService.post('/api/secret', {
        secret: secret.value,
        expireAfterViews: +expireAfterViews.value,
        expireAfter: +expireAfter.value,
      });
      secretHash.value = response.data.hash;
      clearForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage.value = 'Failed to create secret. Please try again.';
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped lang="scss">
$spacing: 1rem;

.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.v-form {
  width: 100%;
  max-width: 600px;
  padding: $spacing;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #0008;
  backdrop-filter: blur(10px);

  .v-textarea,
  .v-text-field,
  .v-btn {
    margin-bottom: $spacing;
  }

  .v-btn {
    margin-top: $spacing;
  }
}

.v-alert {
  position: fixed;
  bottom: $spacing;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
}
</style>
