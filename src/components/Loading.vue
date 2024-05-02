<template>
  <div class="container">
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "McvLoading",
};
</script>

<style scoped>
.container {
  width: 50px;
  margin: 10% auto;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #818a91;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
