<template>
  <div>
    <section class="project-cards-flex flex flex-wrap">
      <ProjectCard
        v-for="(project, index) in paginatedProjects"
        :key="index"
        :item="projectIds[project.data.id]"
      />
    </section>

    <section>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage()">Previous</button>

      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button @click="nextPage()" :disabled="currentPage === totalPages">Next</button>
    </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from '../ProjectCard.vue';
import projectIds from '../astro/ProjectIds';

const {projects} = defineProps<{projects: any[]}>();

const itemsPerPage = 4;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(projects.length / itemsPerPage)
);

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return projects.slice(start, start + itemsPerPage);
});

function goToPage(page: number) {
  console.log(page);
  currentPage.value = page;
}

function prevPage() {
  console.log("clicked");
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  console.log("clicked");
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

button.active {
  background-color: limegreen;
  color: yellow;
}
</style>
