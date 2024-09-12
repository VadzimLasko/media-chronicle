<template>
  <button
    @click="handleFollow"
    :class="{
      btn: true,
      'btn-sm': true,
      'action-btn': true,
      'btn-primary': isFollowOptimistic,
      'btn-outline-secondary': !isFollowOptimistic,
    }"
    :style="{ 'margin-right': '1rem' }"
  >
    <i class="ion-heart"></i>
    <span :style="{ color: 'black' }"> Follow {{ profileSlug }} </span>
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/addToFollow.js";
export default {
  name: "McvAddToFollow",
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    profileSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFollowOptimistic: this.isFollowed,
    };
  },

  methods: {
    handleFollow() {
      this.$store.dispatch(actionTypes.addToFollow, {
        slug: this.profileSlug,
        isFollowed: this.isFollowed,
      });
      this.isFollowOptimistic = !this.isFollowOptimistic;
    },
  },
};
</script>
