<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";
import { Card } from "agnostic-vue";
import { formatIDtoName } from './astro/formatNames';

// Remove single slash as it causes double slashes in card
const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

const eventProp = defineProps({
        item: Object
    });

// Logos
const eventPhoto = eventProp.item.data.imageEvent;
const eventPhotoBU = eventProp.item.data.images?.[0]?.src || 'public/images/placeholder.png';
const finalEventPhoto = eventPhoto? eventPhoto : eventPhotoBU;

// Truncate description to a fixed number of characters
const maxDescriptionLength = 100; // Adjust the length as needed
const truncatedDescription = computed(() => {
  const desc = eventProp.item.data.desc || '';
  return desc.length > maxDescriptionLength
    ? desc.substring(0, maxDescriptionLength) + '...'
    : desc;
});

const date_options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
</script>

<template>
    
    <Card css="eventCard" isShadow>
      <a :href="`/posts/${item.data.year}/${item.data.semester}/${item.data.id}`" class="card-link" isShadow></a>
       <div class="eventText">                        

          <img :src="finalEventPhoto" alt="event Image" class="eventImage imageLight">
    
        <div class="card-header">
          <h4 class="eventTitle">{{ item.data.title }}</h4>

          <p class="dateStamp">
            {{ item.data.semester.charAt(0).toUpperCase() + item.data.semester.slice(1) }} {{ item.data.year }} <br />
            Updated {{ item.data.eventDate.toLocaleDateString(undefined, date_options) }}
          </p> 
        </div>
              


            <!-- Display Techs as Tags -->
            <!-- <p><em>Techs:</em></p>
            <div class="tag-container">
                <a v-for="(tech, index) in item.data.techs" :key="index" :href="`/techs/${tech}`" class="tag" >{{ tech }}</a>
            </div> -->

            <p class="description">{{ truncatedDescription }}</p>

            <!-- Display students as Tags (disable for now) -->
            <div class="tag-container">
                <a v-for="(student, index) in item.data.students" :key="index" :href="`/students/${student}`"> {{ formatIDtoName(student) }}</a>
                <a v-for="(instructor, index) in item.data.instructors" :key="index" :href="`/instructors/${instructor}`"> {{ formatIDtoName(instructor) }}</a>

            </div>
        


        </div>
    </Card>
    
</template>


<style scoped>

.eventImage {
    --event-logo-width: 14em;
    float: left;
    margin-right: 1em;
    width: var(--event-logo-width);
}

.eventText {
    text-align: left; /* or justify? */
    width: calc(100% ); /* - var(--event-logo-width) - 1em  */
}

.eventText p {
    margin-top: 1em;
}

.eventTitle {
    text-align: left;
}

.eventCard {
  min-width: 30rem !important;
  max-width: 35rem;
  margin: 0.5em;
  padding: 1em 1em 1em;
  /*flex: 1; since .card-link  is now the flex component */
  background-color: var(--agnostic-gray-mid);
  transition: transform 0.2s ease-in;
}

.eventCard:hover{
    transform: translateY(-3px);

}

.eventCard h4 {
    margin-bottom: 0.5em;
}

/* Tag Styling */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.tag {
  display: inline-block;
  padding: 0.25em 0.75em;
  font-size: 0.875em;
  /* background-color: var(--agnostic-primary); */
  color: var(--agnostic-btn-primary-color, var(--agnostic-light));
  border-radius: var(--agnostic-btn-radius, var(--agnostic-radius, .25rem));
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* Remove underline from links */
  z-index: 1; /* needed to take precedence over the card link */
}

/* Save this until we can have links for each tag */
.tag:hover {
  /* background-color: var(--agnostic-btn-primary-color); */
  color: var(--agnostic-btn-hover-color, white); /* Change color on hover */

}

/* Ensure the card link covers the entire card and removes default anchor styling */
.eventCard .card-link {
  text-decoration: none;
  color: inherit;
  pointer-events: auto; /* Allow the card itself to be clickable */
  display: block;
}

/* expands the clickable area of the main link 
  to fill the parent container, because it's the nearest
  ancestor with "position:relative" */
.eventCard .card-link::before {
  content: '';
  position: absolute;
  inset: 0; 
}

/* .eventCard {
  pointer-events: auto; 
} */

/* Date shown to the right and small */
.dateStamp {
  text-align: left;
  font-style: italic;
  font-size: small;
  height: 0;
  margin: 0;
  float: right;
}
</style>

// Export the Card components for each event
export { Card };
