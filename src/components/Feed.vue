<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <mcv-article-profile :data="article" />
          <div class="pull-xs-right">
            <mcv-add-to-favorites
              v-if="currentUser"
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <McvTags :article="article" />
        </router-link>
      </div>
      <McvPagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import queryString from "query-string";
import { mapState, mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth.js";
import { actionTypes } from "@/store/modules/feed.js";
import { limit } from "@/helpers/vars.js";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvArticleProfile from "@/components/ArticleProfile.vue";
import McvTags from "@/components/Tags.vue";
import McvAddToFavorites from "@/components/AddToFavorites.vue";
import McvPagination from "@/components/Pagination.vue";
export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTags,
    McvAddToFavorites,
    McvArticleProfile,
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    currentPage() {
      return +this.$route.query.page || 1;
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  watch: {
    apiUrl: "fetchFeed",
    currentPage: "fetchFeed",
  },
  created() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const stringifiedParams = queryString.stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>
