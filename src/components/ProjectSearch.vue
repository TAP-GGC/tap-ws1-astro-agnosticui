<script setup>
import { computed, ref, watchEffect, watch } from "vue";
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select, Disclose, Tag } from "agnostic-vue";
import { Button, ButtonGroup } from 'agnostic-vue';



import ProjectPagination from "./vue/ProjectPagination.vue";
import Pagination from "./Pagination.vue";

// Props
const props = defineProps({
  projectList: Object,
  filter: Object,
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
});

// Reactive state
const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);

const search_text = ref("");
const student = props.filter?.student ? ref([props.filter.student]) : ref(['Any']);
const instructor = props.filter?.instructor ? ref([props.filter.instructor]) : ref(['Any']);
const level = props.filter?.level ? ref([props.filter.level]) : ref(['Any']);
const tech = props.filter?.tech ? ref([props.filter.tech]) : ref(['Any']);
const duration = ref(['Any']);
const difficulty = props.filter?.difficulty ? ref([props.filter.difficulty]) : ref(['Any']);

//Step 1 => get list of instructors in a set to avoid duplication
//Step 2 => place them in an object {value = ?, label = ?} to feed into a select option
//Insert into three select/dropdown menus
//Add onclick listener to each dropdown
//Instructor selected, search through the list of only instructors

//advance search
const showAdvanced = ref(false);
const advancedSearch = ref("");

const advancedTerm = ref("");
const advancedSearchTags = ref([]);

// General search function - searches in basic project info
function matchesGeneralSearch(project) {
    const general = search_text.value.toLowerCase();
    
    if (!general) return true; 
    
    return (
        project.data.title?.toLowerCase().includes(general) ||
        project.data.shortTitle?.toLowerCase().includes(general) ||
        project.data.students?.some(s => s.toLowerCase().includes(general)) ||
        project.data.instructors?.some(i => i.toLowerCase().includes(general))
    );
}

// Advanced search function - searches in technology, level, difficulty
function matchesAdvancedSearch(project) {
    if (advancedSearchTags.value.length === 0) return true;

    return advancedSearchTags.value.every(term =>
        project.data.techs?.some(t => t.toLowerCase().includes(term)) ||
        project.data.levels?.some(l => l.toLowerCase().includes(term)) ||
        project.data.difficulty?.some(d => d.toLowerCase().includes(term))
    );
}

// Combined function that uses both search functions
function matches(project) {
    return matchesGeneralSearch(project) && matchesAdvancedSearch(project);
}

function addAdvancedTag() {
    const term = advancedTerm.value.trim().toLowerCase();
    if (term !== '' && !advancedSearchTags.value.includes(term)) {
    advancedSearchTags.value.push(term);
    }
    advancedTerm.value = '';
}

function removeAdvancedTag(index) {
    advancedSearchTags.value.splice(index, 1);
}

//Keyword option for advance search
const keywordOptions = computed(() => {
    const techNames = new Set();
    const difficultyLevels = new Set();
    const levels = new Set();

    projects.forEach(project => {
        (project.data.techs || []).forEach(t => techNames.add(t.toLowerCase()));
        (project.data.difficulty || []).forEach(d => difficultyLevels.add(d.toLowerCase()));
        (project.data.levels || []).forEach(l => levels.add(l.toLowerCase()));
    });

    return [...new Set([...techNames, ...difficultyLevels, ...levels])];
});

//sorting
const sortField = ref("publishedDate");
const sortAsc = ref(true);
const filteredAndSortedProjectsList = computed(() => {
    const filtered = projects.filter((project) => matches(project));

    return [...filtered].sort((a, b) => {
        let fieldA = a.data[sortField.value];
        let fieldB = b.data[sortField.value];

        if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
        if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();

        if (fieldA < fieldB) return sortAsc.value ? -1 : 1;
        if (fieldA > fieldB) return sortAsc.value ? 1 : -1;
        return 0;
    });
});

function toggleSortDirection() {
    sortAsc.value = !sortAsc.value;
}

// Filtered and paginated results
const filteredProjects = computed(() => {
  return props.projectList.filter(project => matches(project));
});

const paginatedProjects = ref([]);

watchEffect(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedProjects.value = filteredProjects.value.slice(start, end);
});

// Clamp current page when result size or pageSize changes
watch([filteredProjects, pageSize], () => {
  const tp = Math.max(1, Math.ceil(filteredProjects.value.length / pageSize.value));
  if (currentPage.value > tp) currentPage.value = tp;
});

// reset to page 1 whenever any filter or search changes
watch(
  [() => search_text.value, () => name.value, () => graduationYear.value, () => projects.value],
  () => { currentPage.value = 1; }
);

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize.value));

// URL sync (optional)
watch(currentPage, (newPage) => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", newPage);
  window.history.pushState({}, '', url);
});

// For Reset button
const base = import.meta.env.BASE_URL;
const paginationBaseUrl = `${base === '/' ? '' : base}/projects`;

const projectsStatusText = computed(() => {
  const hasFilters = (
    search_text.value ||
    !semester.value.includes('Any') ||
    !year.value.includes('Any') ||
    !level.value.includes('Any') ||
    !tech.value.includes('Any') ||
    !duration.value.includes('Any') ||
    !difficulty.value.includes('Any')
  );
  return hasFilters ? 'Selected projects' : 'All Projects';
});
</script>

<template>
  <div>
    <section class="mbe40">

        <Input id="7" is-underlined is-underlined-with-background placeholder="Enter project name, student, technology…"
            label="Search for projects" type="text" v-model="search_text" />
        
        <Disclose :is-open="showAdvanced" title="🔍 Advanced Search">
            <Input v-model="advancedTerm" @keydown.enter.prevent="addAdvancedTag" list="keyword-list"
                placeholder="Type keyword or select from the dropdown option, then press Enter to search" class="w-full mb-2"/>
            <datalist id="keyword-list">
                <option v-for="option in keywordOptions" :key="option" :value="option" />
            </datalist>

            <div class="flex flex-wrap gap-2 mt-1">
                <Tag v-for="(tag, index) in advancedSearchTags" :key="index" class="mie6" shape="round" type="success" is-uppercase>
                    {{ tag }}
                    <button @click="removeAdvancedTag(index)" class="delete">&#x2718;</button>
                </Tag>
            </div>
        </Disclose>
        
        <div class="d-flex align-items-center mt-3 mb-3">
            <label class="me-2">Sort by:</label>
            <select v-model="sortField" class="form-select me-2" style="width: auto;">
                <option value="publishedDate">Update Date</option>
                <option value="year">Published Date</option>
                <option value="shortTitle">Title</option>
            </select>
            <Button @click="toggleSortDirection" variant="ghost">
                {{ sortAsc ? "↑ Ascending" : "↓ Descending" }}
            </Button>
        </div> 
    </section>

    <h3> {{ ((search_text || advancedSearch || !level.includes('Any') ||
                !tech.includes('Any') || !duration.includes('Any') || !difficulty.includes('Any')) ?
                `Selected projects` : 'All Projects') }} ({{ filteredAndSortedProjectsList.length }})</h3>

    <section class="mbe40 project-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
      <template v-for="project in paginatedProjects" :key="project.data.id">
        <ProjectCard :item="project" />
      </template>
    </section>

    <Pagination
        v-model:currentPage="currentPage"
        :totalItems="filteredProjects.length"
        :pageSize="pageSize"
    />


  </div>
</template>

<style scoped>
.project-filter-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.project-filter-dropdown {
  min-width: 10rem;
  max-width: 20em;
  margin: 0 auto;
  padding: 1em;
  flex: 1;
}

.project-cards-flex {
  gap: 1.5rem;
}
</style>
