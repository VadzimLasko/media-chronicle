<template>
  <div class="banner color-change-5x">
    <div class="container">
      <h1>Media chronicle</h1>
      <p>A place to share interesting things</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "McvBanner",
};
</script>

<style scoped>
.color-change-5x {
  -webkit-animation: color-change 20s linear infinite alternate both;
  animation: color-change 20s linear infinite alternate both;
}

@-webkit-keyframes color-change {
  0% {
    background: #b22cff;
  }
  25% {
    background: #19dcea;
  }
  50% {
    background: #f54571;
  }
  75% {
    background: #f5be10;
  }
  100% {
    background: #3bd80d;
  }
}
@keyframes color-change {
  0% {
    background: #b22cff;
  }
  25% {
    background: #19dcea;
  }
  50% {
    background: #f54571;
  }
  75% {
    background: #f5be10;
  }
  100% {
    background: #3bd80d;
  }
}
</style>
