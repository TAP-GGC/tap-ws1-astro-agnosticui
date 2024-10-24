<script setup>
import { computed, ref } from "vue";
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";
import { Card } from "agnostic-vue";

// Remove single slash as it causes double slashes in card
const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

const studentProp = defineProps({
        item: Object
    });

const imageSrc = computed(() => studentProp.item.data.image || 'path/to/default-image.jpg');
const studentTitle = computed(() => studentProp.item.data.title || 'Unknown Student');


// Truncate description to a fixed number of characters
const maxDescriptionLength = 100; // Adjust the length as needed
const truncatedDescription = computed(() => {
  const desc = studentProp.item.data.desc || '';
  return desc.length > maxDescriptionLength
    ? desc.substring(0, maxDescriptionLength) + '...'
    : desc;
});
</script>

<template>
    <Card css="studentCard" isShadow>
        <a :href="`/students/${item.data.id}`" class="card-link" isShadow></a>
        <div class="studentText">   
            <img :src="imageSrc" alt="Student Image" class="studentImage">
            <h4 class="studentTitle">{{ studentTitle}}</h4>
            <p class="description">{{ truncatedDescription }}</p>
            <div class="tag-container">
                <!-- Check if the link exists before rendering it -->
                <a v-if="item.data.website" :href="item.data.website" class="tag">Website</a>
                <a v-if="item.data.github" :href="item.data.github" class="tag">GitHub</a>
                <a v-if="item.data.linkedin" :href="item.data.linkedin" class="tag">LinkedIn</a>
            </div>
        </div> 
    </Card>
</template>

<style scoped>
.studentImage {
    --project-logo-width: 14em;
    float: left;
    margin-right: 1em;
    width: var(--project-logo-width);
}

.studentText {
    text-align: left;
    width: calc(100% );
}


.studentText p {
    margin-top: 1em;
}

.studentTitle {
    text-align: center;
}

.studentCard {
  min-width: 30rem !important;
  max-width: 40rem;
  margin: 0.5em;
  padding: 1em 1em 1em;
  background-color: var(--agnostic-gray-mid);
  transition: transform 0.2s ease-in;
}


.studentCard:hover{
    transform: translateY(-3px);

}

.studentCard h4 {
    margin-bottom: 0.5em;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}
.tag {
  display: inline-block;
  padding: 0.25em 0.75em;
  font-size: 0.875em;
  background-color: var(--agnostic-primary);
  color: var(--agnostic-btn-primary-color, var(--agnostic-light));
  border-radius: var(--agnostic-btn-radius, var(--agnostic-radius, .25rem));
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* Remove underline from links */
  z-index: 1; /* needed to take precedence over the card link */
}

.tag:hover {
  background-color: #0056b3;
  color: var(--agnostic-btn-hover-color, white); /* Change color on hover */

}

/* Ensure the card link covers the entire card and removes default anchor styling */
.studentCard .card-link {
  text-decoration: none;
  color: inherit;
  pointer-events: auto; /* Allow the card itself to be clickable */
  display: block;
}

/* expands the clickable area of the main link 
  to fill the parent container, because it's the nearest
  ancestor with "position:relative" */
.studentCard .card-link::before {
  content: '';
  position: absolute;
  inset: 0; 
}

</style>