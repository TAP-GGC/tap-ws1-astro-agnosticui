<template>    
      <Card
      isStacked
      isShadow
      isAnimated
      class="card-main"
      style=" background-image: url('./images/list-cards/tap-papers-board.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <div class="overlay">
          <div class="h4 p16 card-title"> TAP Publications </div>
          <div>
            <ul>
              <li v-for="paperPostEntry in paperEntries">
                <a :href="`${base}/publications/${paperPostEntry.slug}`">{{ paperPostEntry.data.title.substring(0, 30) + (paperPostEntry.data.title.length > 30 ? '...' : '') }}</a> &nbsp;
                <time datetime={{ paperPostEntry.data.postDate.toISOString() }}> {{ paperPostEntry.data.postDate.toDateString() }}
                </time>
              </li>
              <li>
                <a :href="`${base}/publications/`">More Papers . . .</a>
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

// load paper content: news, etc.
import { getCollection } from 'astro:content';
const paperEntries = (await getCollection('publications')).sort((p1,p2) => p2.data.postDate - p1.data.postDate);
// Remove single slash as it causes double slashes in card
const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;
</script>

<style scoped>
</style>
