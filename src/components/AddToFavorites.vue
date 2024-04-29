<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart"></i>
    <span v-if="message" class="ng-binding ng-scope"> {{ message }} </span>
    <span v-if="message"> ({{ favoritesCountOptimistic }})</span>
    <span v-else> {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/addToFavorites.js";
export default {
  name: "McvAddToFavorites",
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      });
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1;
      } else {
        this.favoritesCountOptimistic += 1;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>
