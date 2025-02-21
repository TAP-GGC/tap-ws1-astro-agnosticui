<template>    
      <Card
      isStacked
      isShadow
      isAnimated
      class="card-main"
      style=" background-image: url('./images/list-cards/tap-papers-board.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <div class="overlay">
          <div class="h4 p16 card-title">
      TAP Publications
          </div>
          <div>
            <ul>
              <li v-for="blogPostEntry in blogEntries">
                <a :href="`${base}/posts/${blogPostEntry.slug}`">{{ blogPostEntry.data.title }}</a> &nbsp;
                <time datetime={{ blogPostEntry.data.eventDate.toISOString() }}> {{ blogPostEntry.data.eventDate.toDateString() }}
                </time>
              </li>
            </ul>
          </div>
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
</script>

<style scoped>
</style>
