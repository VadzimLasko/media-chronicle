<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    name: "McvErrorMessage",
    props: {
      message: {
        type: String,
        required: false,
        default: "Something went wrong", // дэфолтный кейс, если пропс непришел
      },
    },
  };
</script>
