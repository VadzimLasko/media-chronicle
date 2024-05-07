<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in filteredArticles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article },
            }"
          >
            <img :src="image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article },
              }"
            >
              {{ article }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import queryString from "query-string";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/feed.js";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvArticleProfile from "@/components/ArticleProfile.vue";

export default {
  name: "McvFollowedAuthors",

  components: {
    McvLoading,
    McvErrorMessage,
    McvArticleProfile,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    filteredArticles() {
      return this.feed ? this.sortedFeed(this.feed.articles) : [];
    },
  },
  data() {
    return {
      image: "https://api.realworld.io/images/demo-avatar.png",
    };
  },

  created() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl("/articles");
      const stringifiedParams = queryString.stringify({
        limit: 300,
        offset: 0,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
    sortedFeed(articles) {
      const result = [...articles]
        .filter((a) => a.author.following)
        .reduce((acc, item) => {
          if (acc.includes(item.author.username)) {
            return acc;
          }
          return [...acc, item.author.username];
        }, []);
      return result;
    },
  },
};
</script>
