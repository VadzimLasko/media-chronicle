<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/editArticle.js";
import { mapState } from "vuex";
import McvArticleForm from "@/components/ArticleForm.vue";
import McvLoading from "@/components/Loading.vue";

export default {
  name: "McvEditArticle",
  components: {
    McvArticleForm,
    McvLoading,
  },
  computed: {
    ...mapState({
      article: (state) => state.editArticle.article,
      isLoading: (state) => state.editArticle.isLoading,
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, { slug, articleInput })
        .then((article) => {
          if (article) {
            this.$router.push({
              name: "article",
              params: { slug: article.slug },
            });
          }
        });
    },
  },
};
</script>
