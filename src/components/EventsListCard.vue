<template>
    
    <div class= card-main >
        <Card
            isStacked
            isShadow
            isAnimated
            class=card-main
            style=" background-image: url('./images/list-cards/tap-events-board.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div class="overlay">
              <div class="h4 p16 card-title">
                Recent Events
              </div>
            <ul> <!-- order recent projects by date? -->
              <li v-for="event in events">
              <!-- <a :href="`${base}/events/${event.data.year}/${event.data.month}/${event.data.day}`">{{ event.data.title }}</a> &nbsp; -->
              <p> {{ event.name }}</p>
              <p> {{ event.date.toDateString().slice(4) }}</p>
              <!-- {{ event.data.date.toString() }} -->Hi
              </li>
            </ul>
        </Card>
    </div>
    
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  // Components CSS
  import "agnostic-vue/dist/index.css";
  import { Card } from "agnostic-vue";
  
  // load blog content: news, etc.
  import { getCollection } from 'astro:content';
  const events = [
    {name: "FakeEvent", date: "05/24/24",},
    {name: "anotherFake", date:"02/22/20"},
    {name: "stillFaake", date:"02/22/21"}
]
  // Remove single slash as it causes double slashes in card
  const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;


// Where we get info: 


//Call some api   => go link => get event information

//Add new event



  </script>
  
  <style scoped>
  </style>
  