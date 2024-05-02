<template>
  <span>
    <router-link
      :to="{
        name: 'userProfile',
        params: { slug: data.author.username },
      }"
    >
      <img :src="data.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{
          name: 'userProfile',
          params: { slug: data.author.username },
        }"
      >
        {{ data.author.username }}
      </router-link>

      <span class="date">{{ dateTransform(data.createdAt) }}</span>
    </div>
  </span>
</template>

<script>
import { format } from "date-fns";
import { ru } from "date-fns/locale";
export default {
  name: "McvArticleProfile",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateTransform(date) {
      const formattedDate = format(new Date(date), "dd.MM.yyyy HH:mm:ss", {
        locale: ru,
      });
      return formattedDate;
    },
  },
};
</script>
