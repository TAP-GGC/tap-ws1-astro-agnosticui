<script setup>
import { computed, ref, watchEffect, watch } from "vue";
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select } from "agnostic-vue";
import { Button } from 'agnostic-vue';

import ProjectCard from "./ProjectCard.vue";
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
const year = props.filter?.year ? ref([props.filter.year]) : ref(['Any']);
const semester = props.filter?.semester ? ref([props.filter.semester]) : ref(['Any']);
const tech = props.filter?.tech ? ref([props.filter.tech]) : ref(['Any']);
const duration = ref(['Any']);
const difficulty = props.filter?.difficulty ? ref([props.filter.difficulty]) : ref(['Any']);

// Static semester list
const semesterList = ref([
  { value: 'Any', label: 'Any' },
  { value: 'fall', label: 'Fall' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' }
]);

// Generate filter options from data
function createOptions(projects, field) {
  let optionSet = new Set(["Any"]);
  projects.forEach(project => {
    const fieldData = project.data[field];
    if (Array.isArray(fieldData)) {
      fieldData.forEach(item => optionSet.add(item));
    } else if (fieldData) {
      optionSet.add(fieldData);
    }
  });
  return Array.from(optionSet).map(option => ({ value: option, label: option }));
}

const yearOptions = createOptions(props.projectList, "year");
const levelOptions = createOptions(props.projectList, "levels");
const techOptions = createOptions(props.projectList, "techs");
const durationOptions = createOptions(props.projectList, "durationMins");
const difficultyOptions = createOptions(props.projectList, "difficulty");

// Filter function
function matches(project) {
  if (year.value != 'Any' && !year.value.includes(project.data.year.toString())) return false;
  if (semester.value != 'Any' && !semester.value.includes(project.data.semester)) return false;
  if (level.value != 'Any' && !level.value.some(l => project.data.levels.includes(l))) return false;
  if (tech.value != 'Any' && !tech.value.some(t => project.data.techs.includes(t))) return false;
  if (difficulty.value != 'Any' && !difficulty.value.some(d => project.data.difficulty.includes(d))) return false;

  if (duration.value != 'Any' &&
    !duration.value.some(dur =>
      project.data.durationMins.some(d => dur == String(d))
    )
  ) return false;

  const searchText = search_text.value.toLowerCase();
  if (!searchText) return true;

  return (
    project.data.shortTitle?.toLowerCase().includes(searchText) ||
    project.data.title?.toLowerCase().includes(searchText) ||
    project.data.levels?.some(l => l.includes(searchText)) ||
    project.data.semester == searchText ||
    `${project.data.year}`.includes(searchText) ||
    project.data.techs?.some(t => t.includes(searchText)) ||
    project.data.instructors?.some(i => i.toLowerCase().includes(searchText)) ||
    project.data.students?.some(s => s.toLowerCase().includes(searchText)) ||
    project.data.curator?.some(c => c.toLowerCase().includes(searchText))
  );
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
      <Input
        id="project-search"
        is-underlined
        is-underlined-with-background
        placeholder="Enter project name, student, technology…"
        label="Search for projects"
        type="text"
        v-model="search_text"
      />

      <div class="project-filter-container">
        <div class="project-filter-dropdown">
          <label>Tech:</label>
          <Select unique-id="tech" :options="techOptions" :is-multiple="true" :multiple-size="3" @selected="value => tech = value" />
        </div>
        <div class="project-filter-dropdown">
          <label>Levels:</label>
          <Select unique-id="level" :options="levelOptions" :is-multiple="true" :multiple-size="3" @selected="value => level = value" />
        </div>
        <div class="project-filter-dropdown">
          <label>Difficulty:</label>
          <Select unique-id="difficulty" :options="difficultyOptions" :is-multiple="true" :multiple-size="3" @selected="value => difficulty = value" />
        </div>
        <div class="project-filter-dropdown">
          <label>Duration:</label>
          <Select unique-id="duration" :options="durationOptions" :is-multiple="true" :multiple-size="3" @selected="value => duration = value" />
        </div>
        <div class="project-filter-dropdown">
          <label>Semester</label>
          <Select unique-id="semester" :options="semesterList" :is-multiple="true" :multiple-size="3" @selected="value => semester = value" />
        </div>
        <div class="project-filter-dropdown">
          <label>Year</label>
          <Select unique-id="year" :options="yearOptions" :is-multiple="true" :multiple-size="3" @selected="value => year = value" />
        </div>
        <div class="project-filter-dropdown">
          <a :href="paginationBaseUrl">
            <Button mode="primary" isRounded>Reset</Button>
          </a>
        </div>
      </div>
    </section>

    <h3>{{ projectsStatusText }} ({{ filteredProjects.length }})</h3>

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
