<template>
  <div class="home-page">
    <McvBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeedToggler />
          <McvFeed :apiUrl="apiUrl"></McvFeed>
        </div>
        <div class="col-md-3">
          <McvPopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from "@/components/Feed.vue";
import McvPopularTags from "@/components/PopularTags.vue";
import McvBanner from "@/components/Banner.vue";
import McvFeedToggler from "@/components/FeedToggler.vue";

export default {
  name: "McvGlobalFeedView",
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggler,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>
