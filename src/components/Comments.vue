<template>
  <McvLoading v-if="isLoading" />
  <McvErrorMessage v-if="error" />
  <div
    v-if="emptyCommets"
    :style="{ margin: '2rem auto', width: '500px', 'text-align': 'center' }"
  >
    Здесь пока нет комментариев
  </div>

  <div v-if="!emptyCommets">
    <div
      class="article-preview"
      v-for="(comment, index) in comments"
      :key="index"
    >
      {{ comment }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/comments.js";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
export default {
  name: "McvComments",
  props: {
    isAuthor: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.comments.isLoading,
      comments: (state) => state.comments.data,
      error: (state) => state.comments.error,
    }),
    emptyCommets() {
      return this.comments && this.comments.length === 0;
    },
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$store.dispatch(actionTypes.getComments, {
        slug: this.$route.params.slug,
      });
    },
  },
};
</script>
