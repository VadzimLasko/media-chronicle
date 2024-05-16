<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "McvValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.entries(this.validationErrors).map(
        ([fieldName, fieldErrors]) => {
          const messages = fieldErrors.join(", ");
          return `${fieldName}: ${messages}`;
        }
      );
    },
  },
};
</script>
