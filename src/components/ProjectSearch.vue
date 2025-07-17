<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select, Disclose } from "agnostic-vue";
import { Button, ButtonGroup } from 'agnostic-vue';



// Component Imports
import ProjectPagination from "./vue/ProjectPagination.vue";

// load content from props
const props = defineProps({
        projectList: Object,
        filter: Object
    });
const projects = props.projectList;
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
    const advancedTerms = advancedSearch.value.toLowerCase().split(/\s+/).filter(Boolean);
    
    if (advancedTerms.length === 0) return true; 
    
    return advancedTerms.every((term) =>
        project.data.techs?.some(t => t.toLowerCase().includes(term)) ||
        project.data.levels?.some(l => l.toLowerCase().includes(term)) ||
        project.data.difficulty?.some(d =>d.toLowerCase().includes(term))
    );
}

// Combined function that uses both search functions
function matches(project) {
    return matchesGeneralSearch(project) && matchesAdvancedSearch(project);
}

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

const base = import.meta.env.BASE_URL;

</script>

<template>
    <div>
    
    <section class="mbe40">

        <Input id="7" is-underlined is-underlined-with-background placeholder="Enter project name, student, technology…"
            label="Search for projects" type="text" v-model="search_text" />
        
        <Disclose :is-open="showAdvanced" title="🔍 Advanced Search">
            <Input v-model="advancedSearch" label="Search by Technology, Difficulty, Level" placeholder="Type tech, level, difficulty keyword here" class="mb-2"/>
        </Disclose>
        
        <div class="d-flex align-items-center mt-3 mb-3">
            <label class="me-2">Sort by:</label>
            <select v-model="sortField" class="form-select me-2" style="width: auto;">
                <option value="publishedDate">Published Date</option>
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
        <ProjectPagination client:load :projects="filteredAndSortedProjectsList" :itemsPerPage="10" />
    </section>


    </div>
</template>  
  
<style scoped>
.project-filter-container {
    justify-content: space-around;
    display: flex;
    flex-flow: row wrap;
    /* align-items: flex-start; */ 
    justify-content: center;
    align-items: center;
}
.project-filter-dropdown {
    /* apply grid and flex here */
    min-width: 10rem !important;
    max-width: 20em;
    margin: 0 auto;
    padding: 1em;
    flex: 1;
}

</style>  