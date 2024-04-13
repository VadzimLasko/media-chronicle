<template>
  <div>
    <McvTopBar />
    <router-view />
    <!-- Важно -->
  </div>
</template>

<script>
  import McvTopBar from "@/components/TopBar";
  import { actionTypes } from "@/store/modules/auth";
  export default {
    name: "McvApp",
    components: { McvTopBar },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser);
      console.log("dispatch(actionTypes.getCurrentUser)");
    },
  };
</script>
