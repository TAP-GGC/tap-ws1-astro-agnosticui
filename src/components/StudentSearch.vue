<script setup>
import { computed, ref, watchEffect, watch } from "vue";
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Select, Button } from "agnostic-vue";
import Pagination from "./Pagination.vue";

import StudentCard from "./StudentCard.vue";

// Load props
const props = defineProps({
    studentList: Object, 
    filter: Object
});

const students = props.studentList;
const search_text = ref("");
const name = props.filter?.name ? ref([props.filter.name]) : ref(['Any']);
const graduationYear = props.filter?.graduationYear ? ref([props.filter.graduationYear]) : ref(['Any']);
const projects = props.filter?.projects ? ref([props.filter.projects]) : ref(['Any']);

//Student pagination
const currentPage = ref(1);
const pageSize = ref(12);

// Create options for dropdowns
function createOptions(students, x) {
    let optionSet = new Set();
    optionSet.add("Any");
    students.forEach(arrayContainer => {
        if (Array.isArray(arrayContainer.data[x])) {
            arrayContainer.data[x].forEach(element => {
                optionSet.add(element);
            });
        } else {
            optionSet.add(arrayContainer.data[x]);
        }
    });
    return Array.from(optionSet).map(option => ({ value: option, label: option }));
}

// Generate options for dropdowns
const yearOptions = createOptions(students, "graduationYear"); 
const nameOptions = createOptions(students, "name"); 
const projectOptions = createOptions(students, "projects"); // Use relatedProjectIds for projects

// Matches function to filter students based on search criteria
function matches(student) {
    let isMatch = false;

    // Check if any filter is active (search text or dropdowns)
    if (search_text.value || graduationYear.value != 'Any' || projects.value != 'Any' || name.value != 'any') {

        // Check filters (dropdown menus)
        // If dropdown value does not match student data, return false immediately
        if (student.data?.name && name.value != 'Any' && !name.value.includes(student.data.name)) {
            return false;
        }
        if (student.data?.graduationYear && graduationYear.value != 'Any' && !graduationYear.value.includes(student.data.graduationYear.toString())) {
            return false;
        }
        if (student.data?.projects && projects.value != 'Any' && !projects.value.some(project => student.data.projects.includes(project))) {
            return false;
        }

        let searchText = search_text.value.toLowerCase();
        
        // If no search text is provided, pass the filtering based on dropdown values
        if (searchText == '') {
            return true;
        } else {
            // Check if student matches the search text (by name, projects, etc.)
            if (
                (student.data?.name && student.data.name.toLowerCase().includes(searchText))||
                (student.data?.desc && student.data.desc.toLowerCase().includes(searchText))||
                (student.data?.graduationYear && student.data.graduationYear.toString().includes(searchText)) ||
                (student.data?.projects && student.data.projects.some(project => project.toLowerCase().includes(searchText)))
            ) {
                return true;
            } else {
                return false;
            }
        }
    }

    // If no filters are active, return true
    return true;
}

// Compute filtered students based on matching criteria
const filteredStudents = computed(() => {
    return students.filter((student) => matches(student));
});

const paginatedStudents = ref([]);

watchEffect(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  paginatedStudents.value = filteredStudents.value.slice(start, end);
});

// Clamp current page when result size or pageSize changes
watch([filteredStudents, pageSize], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil((filteredStudents.value.length || 0) / (pageSize.value || 1)))
);

const base = import.meta.env.BASE_URL;
</script>

<template>
    <div>
        <section class="mbe40">

            <!-- Input for searching students -->
            <Input id="7" is-underlined is-underlined-with-background 
                placeholder="Enter student name, graduation year or related projects" 
                label="Search for students" 
                type="text" 
                v-model="search_text" />

            <!-- Filter dropdowns -->
            <div class="student-filter-container">
                
                <!-- Name Filter -->
                <div class="student-filter-dropdown">
                    <label>Student Name:</label>
                    <Select 
                        unique-id="name" 
                        :options="nameOptions" 
                        :is-multiple="true" 
                        :multiple-size="3" 
                        @selected="(value) => { name = value }">
                    </Select>
                </div>

                <!-- Graduation Year Filter -->
                <div class="student-filter-dropdown">
                    <label>Graduation Year:</label>
                    <Select 
                        unique-id="grad-year" 
                        :options="yearOptions" 
                        :is-multiple="true" 
                        :multiple-size="3" 
                        @selected="(value) => { graduationYear = value }">
                    </Select>
                </div>

                <!-- Project Filter -->
                <div class="student-filter-dropdown">
                    <label>Related Projects:</label>
                    <Select 
                        unique-id="projects" 
                        :options="projectOptions" 
                        :is-multiple="true" 
                        :multiple-size="3" 
                        @selected="(value) => { projects = value }">
                    </Select>
                </div>

                <!-- Reset Button -->
                <div class="student-filter-dropdown">
                    <a :href="`${base == '/' ? '' : base}/students`">
                        <Button mode="primary" isRounded>Reset</Button>
                    </a>
                </div>
            </div>

        </section>

        <!-- Display selected or all students -->
        <h3>{{ ((search_text || !name.includes('Any') || !graduationYear.includes('Any') || !projects.includes('Any')) ? 
            `Filtered students` : 'All Students') }} ({{ filteredStudents.length }})</h3>

        <!-- Display Student Cards for filtered students -->
        <section class="mbe40 project-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
            <template v-for="student in paginatedStudents" :key="student.data.id">
                <StudentCard :item="student" />
            </template>
        </section>

        <Pagination
            v-model:currentPage="currentPage"
            :totalItems="filteredStudents.length"
            :pageSize="pageSize"
        />
    </div>
</template>



<style scoped>
.student-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Adjust gap between cards */
}

.student-filter-container {
    justify-content: space-around;
    display: flex;
    flex-flow: row wrap;
    /* align-items: flex-start; */ 
    justify-content: center;
    align-items: center;
}
.student-filter-dropdown {
    /* apply grid and flex here */
    min-width: 10rem !important;
    max-width: 15em;
    padding: 1em;
    flex: 1;
}
</style>
