<template>
  <div>
    <McvTopBar />
    <router-view />
    <!-- Важно -->
  </div>
</template>

<script>
  import McvTopBar from "@/components/TopBar.vue";
  import { actionTypes } from "@/store/modules/auth.js";
  export default {
    name: "McvApp",
    components: { McvTopBar },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser);
      console.log("dispatch(actionTypes.getCurrentUser)");
    },
  };
</script>
