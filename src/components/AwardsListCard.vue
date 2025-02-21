<template>
    
        <Card
            isStacked
            isShadow
            isAnimated
            class=card-main
            style=" background-image: url('./images/list-cards/tap-awards-board.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div class="overlay">
                <div class="h4 p16 card-title">
                    TAP Awards
                </div>
                <div>
                    <ul> <!-- order recent projects by date? -->
                        <li v-for="award in awards">
                            <a :href="`${base}/awards/${award.data.year}/${award.data.semester}/${award.data.id}`">{{ award.data.title }}</a> &nbsp;
                            {{ award.data.students.toString() }}
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
  const projects = await getCollection('awards');
  // Remove single slash as it causes double slashes in card
  const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;
  </script>
  
  <style scoped>
  </style>
  