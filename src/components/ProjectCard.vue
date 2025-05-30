<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";
import { Card } from "agnostic-vue";

// Remove single slash as it causes double slashes in card
const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

const projectProp = defineProps({
        item: Object
    });

// Logos
let imageLogoLight = computed(() => projectProp.item.data.imageLogoLight?.src);
const imageLogoDark = computed(() => projectProp.item.data.imageLogoDark ? projectProp.item.data.imageLogoDark.src : imageLogoLight);
imageLogoLight = imageLogoLight ? imageLogoLight : imageLogoDark; // in case only dark is provided

// Truncate description to a fixed number of characters
const maxDescriptionLength = 100; // Adjust the length as needed
const truncatedDescription = computed(() => {
  const desc = projectProp.item.data.desc || '';
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
    
    <Card css="projectCard" isShadow>
        <a :href="`/projects/${item.data.year}/${item.data.semester}/${item.data.id}`" class="card-link" isShadow></a>
        <div class="projectText">                        

            <img :src="imageLogoLight" alt="Project Image" class="projectImage imageLight">
            <img :src="imageLogoDark" alt="Project Image" class="projectImage imageDark">

            <h4 class="projectTitle">{{ item.data.shortTitle ? item.data.shortTitle : item.data.title }}</h4>

            <div class="dateStamp">Updated {{ item.data.publishedDate.toLocaleDateString(undefined, date_options) }}</div>

            <!-- Display Techs as Tags -->
            <p><em>Techs:</em></p>
            <div class="tag-container">
                <a v-for="(tech, index) in item.data.techs" :key="index" :href="`/techs/${tech}`" class="tag" >{{ tech }}</a>
            </div>

            <p class="description">{{ truncatedDescription }}</p>

            <!-- Display students as Tags (disable for now)
            <p><em>Students:</em></p>
            <div class="tag-container">
                <a v-for="(student, index) in item.data.students" :key="index" :href="`/students/${student}`" class="tag">{{ student }}</a>
            </div>-->
        
            <!-- <p>{{ item.data.semester.charAt(0).toUpperCase() + item.data.semester.slice(1) }} {{ item.data.year }}</p> -->

            <!-- <p><a href="`${item.data.github}`">Github link</a></p> -->
        </div>
    </Card>
    
</template>


<style scoped>

.projectImage {
    --project-logo-width: 14em;
    float: left;
    margin-right: 1em;
    width: var(--project-logo-width);
}

.projectText {
    text-align: left; /* or justify? */
    width: calc(100% ); /* - var(--project-logo-width) - 1em  */
}

.projectText p {
    margin-top: 1em;
}

.projectTitle {
    text-align: left;
}

.projectCard {
  min-width: 30rem !important;
  max-width: 35rem;
  margin: 0.5em;
  padding: 1em 1em 1em;
  /*flex: 1; since .card-link  is now the flex component */
  background-color: var(--agnostic-gray-mid);
  transition: transform 0.2s ease-in;
}

.projectCard:hover{
    transform: translateY(-3px);

}

.projectCard h4 {
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
  background-color: var(--agnostic-primary);
  color: var(--agnostic-btn-primary-color, var(--agnostic-light));
  border-radius: var(--agnostic-btn-radius, var(--agnostic-radius, .25rem));
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* Remove underline from links */
  z-index: 1; /* needed to take precedence over the card link */
}

/* Save this until we can have links for each tag */
.tag:hover {
  background-color: var(--agnostic-btn-primary-color);
  color: var(--agnostic-btn-hover-color, white); /* Change color on hover */

}

/* Ensure the card link covers the entire card and removes default anchor styling */
.projectCard .card-link {
  text-decoration: none;
  color: inherit;
  pointer-events: auto; /* Allow the card itself to be clickable */
  display: block;
}

/* expands the clickable area of the main link 
  to fill the parent container, because it's the nearest
  ancestor with "position:relative" */
.projectCard .card-link::before {
  content: '';
  position: absolute;
  inset: 0; 
}

/* .projectCard {
  pointer-events: auto; 
} */

/* Date shown to the right and small */
.dateStamp {
  text-align: left;
  font-style: italic;
  font-size: small;
  height: 0;
  margin: 0;
}
</style>

// Export the Card components for each project
export { Card };
