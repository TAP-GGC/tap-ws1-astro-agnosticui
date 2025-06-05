<template>
  <div>
    <section class="project-cards-flex flex flex-wrap">
      <slot name="item" v-for="(item, index) in paginatedItems" :item="item" :index="index" :key="index" />
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



const props = defineProps<{
  items: unknown[];
  itemsPerPage?: number;
}>();
const currentPage = ref(1);
const itemsPerPage = props.itemsPerPage || 4;


const totalPages = computed(() =>
  Math.ceil(props.items.length / itemsPerPage)
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.items.slice(start, start + itemsPerPage);
});

function goToPage(page: number) {
  currentPage.value = page;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
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
