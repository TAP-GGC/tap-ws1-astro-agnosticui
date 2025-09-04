<template>
  <div class="pagination-container">
    <nav class="pagination">
      <button
        v-if="currentPage > 1"
        @click="$emit('update:currentPage', currentPage - 1)"
        class="pagination-link prev"
      >
        Previous
      </button>

      <button
        v-for="pageNum in pages"
        :key="pageNum"
        @click="$emit('update:currentPage', pageNum)"
        :class="['pagination-number', { active: currentPage === pageNum }]"
      >
        {{ pageNum }}
      </button>

      <button
        v-if="currentPage < totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
        class="pagination-link next"
      >
        Next
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  currentPage: Number,
  totalItems: Number,
  pageSize: Number,
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

const pages = computed(() => {
  const tp = totalPages.value;
  if (!tp) return [];
  const windowSize = Math.min(5, tp);
  const half = Math.floor(windowSize / 2);

  let start = props.currentPage - half;
  start = Math.max(1, start);
  start = Math.min(start, tp - windowSize + 1);

  return Array.from({ length: windowSize }, (_, i) => start + i);
});
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.pagination {
  display: flex;
  gap: 0.5rem;
}
.pagination-number,
.pagination-link {
  padding: 0.5rem 1rem;
  border: 1px solid var(--agnostic-primary);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.pagination-link:hover, 
.pagination-number:not(.active):hover {
  background-color: var(--agnostic-gray-light);
}
.pagination-number.active {
  background-color: var(--agnostic-primary);
  color: white;
  border-color: var(--agnostic-primary);
}
</style>
