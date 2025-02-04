<template>    
    
  <Card
      isStacked
      isShadow
      isAnimated
      class=card-main
      style=" background-image: url('/images/list-cards/tap-news-board.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; "
    >
    <div class="overlay">
      <div class="h4 p16 card-title">TAP News</div>
      <ul>
        <li v-for="blogPostEntry in blogEntries">
          <a :href="`${base}/posts/${blogPostEntry.data.year}/${blogPostEntry.data.semester}/${blogPostEntry.data.id}`">{{ blogPostEntry.data.title }}</a> &nbsp;
          <time datetime={{ blogPostEntry.data.eventDate.toISOString() }}>
            {{ blogPostEntry.data.eventDate.toLocaleDateString(undefined, date_options) /*.toDateString().slice(4)*/ }}
          </time>
        </li>
      </ul>
    </div>
  </Card>
    
  
</template>

<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import { Card } from "agnostic-vue";

// load blog content: news, etc.
import { getCollection } from 'astro:content';
const blogEntries = await getCollection('events');

// Remove single slash as it causes double slashes in card
const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

const date_options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
</script>

<style scoped>
</style>
