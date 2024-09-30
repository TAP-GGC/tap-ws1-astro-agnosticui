<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select, Tag } from "agnostic-vue";
import { Button, ButtonGroup } from 'agnostic-vue';



// Component Imports
import ProjectCard from "./ProjectCard.vue";

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
const year =  props.filter?.year ? ref([props.filter.year]) : ref(['Any']);
const semester =  props.filter?.semester ? ref([props.filter.semester]) : ref(['Any']);
const tech = props.filter?.tech ? ref([props.filter.tech]) : ref(['Any']);
const duration = ref(['Any']);
const difficulty = props.filter?.difficulty ? ref([props.filter.difficulty]) : ref(['Any']);

//Step 1 => get list of instructors in a set to avoid duplication
//Step 2 => place them in an object {value = ?, label = ?} to feed into a select option
//Insert into three select/dropdown menus
//Add onclick listener to each dropdown
//Instructor selected, search through the list of only instructors

// Semester list constant
const semesterList = ref([{value:'Any', label:'Any'},{value: 'fall', label:'Fall'}, {value: 'spring', label:'Spring'}, {value: 'summer', label:'Summer'}]);

function createOptions(projects, x) {
    let optionSet = new Set();
    //Add default option
    optionSet.add("Any");
    projects.forEach(arrayContainer =>{
        if(Array.isArray(arrayContainer.data[x])){
            arrayContainer.data[x].forEach(element =>{
            optionSet.add(element);
        });
        }else{
            optionSet.add(arrayContainer.data[x]);
        }
        
    });
    return Array.from(optionSet).map(option =>({value:option, label:option}));
}

const yearOptions = createOptions(projects, "year");
const levelOptions = createOptions(projects, "levels");
const techOptions = createOptions(projects, "techs");
const durationOptions = createOptions(projects, "durationMins");
const difficultyOptions = createOptions(projects, "difficulty");

function matches(project) {
    //semester: consider this as ref variable 
    let isMatch = false;
    if(search_text.value || semester.value!='Any' || level.value!='Any' || tech!== 'Any' || duration.value != 'Any' || difficulty.value !== 'Any'){   //If Fall semester

        //check filters (dropdown menus)
        //if dropdown value does not match with project data, it fails match immediately
        if(year.value != 'Any' && !year.value.includes(project.data.year.toString())){
            return false;
        }
        if(semester.value != 'Any' && !semester.value.includes(project.data.semester)){
            return false;
        }
        if(level.value != 'Any' && !level.value.some(level => project.data.levels.includes(level))){
            return false;
        }
        if(tech.value != 'Any' && !tech.value.some(tech => project.data.techs.includes(tech))){
            return false;
        }
        //duration.value is an array contains String values. project.data.durationMins contains Number values
        if(duration.value != 'Any' && !duration.value.some(durationString => project.data.durationMins.some(durationNumber => durationString == String(durationNumber)))){
            return false;
        }
        if(difficulty.value != 'Any' && !difficulty.value.some(diff => project.data.difficulty.includes(diff))){
            return false;
        }
        let searchText = search_text.value.toLowerCase();
        
        //if no search Text, then return true;
        
        //actual filtering
        //Now if it passes the search filter, it passes immediately
        if(searchText == ''){
            return true;
        }else
        if(
            project.data.shortTitle.toLowerCase().includes(searchText) ||
            project.data.title.toLowerCase().includes(searchText) ||
            project.data.levels.some(level => level.includes(searchText)) ||
            project.data.semester == searchText ||
            `${project.data.year}`.includes(searchText) ||
            project.data.techs.some(tech => tech.includes(searchText))||
            project.data.instructors.some(inst => inst.toLowerCase().includes(searchText))||
            project.data.students.some(stu => stu.toLowerCase().includes(searchText))||
            project.data.curator.some(stu => stu.toLowerCase().includes(searchText))
            ){
            return true;
        }else{
            return false;
        }
    }
    //otherwise, always return true
    return true;  
}

const filteredProjects = computed(() => {
  return projects.filter((project) => matches(project));
})

const base = import.meta.env.BASE_URL;


const searchTerm = ref("");  // Model for the search input field
const searchTags = ref([]);  // Array to store all search terms (tech, projectID, etc.)

// This list can contain predefined search suggestions (optional)
const searchList = ref([]);

// Function to add a new search term as a tag
function addTag(term) {
    term = term.toLowerCase(); // Convert to lowercase
  if (term != ''&& !searchTags.value.includes(term)) {
    searchTags.value.push(term);  // Add the search term to the tag list
    searchTerm.value = '';        // Clear the input field
  }
}

// Function to remove a tag
function removeTag(searchTags,index) {
  searchTags.value.splice(index, 1);  // Remove the tag by index
}
</script>

<template>
    <div>
    
    <section class="mbe40">

        <!-- <Input id="7" is-underlined is-underlined-with-background placeholder="Enter project name, student, technology…"
            label="Search for projects" type="text" v-model="search_text" /> -->

        <div>
            <Input id="7" is-underlined is-underlined-with-background placeholder="Enter project name, student, technology…"
            label="Search for projects" 
            type="text" 
            v-model="search_text" 
            list="searchData"
            @keydown.enter.stop.prevent="addTag(search_text.value)"
            @keydown.delete="searchTerm.length=== 0 && removeTag(searchTags, searchTags.length - 1)"
            />
            <datalist id="searchData"><option v-for="term in searchList" :value="term" :key="term">{{ term }}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in searchTags" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag(searchTags,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
        </div>
        
        <div class="project-filter-container">            
            <div class="project-filter-dropdown">
                <label>Tech:</label>
                <Select unique-id="tec" :options="techOptions" :is-multiple="true" :multiple-size="3" @selected="(value) => { tech = value }">
                </Select>

            </div>
            <div class="project-filter-dropdown">
                <label>Levels:</label>
                <Select unique-id="lev" :options="levelOptions" :is-multiple="true" :multiple-size="3" @selected="(value) => { level = value }">
                </Select>
            </div>

            <div class="project-filter-dropdown">
                <label>Difficulty:</label>
                <Select unique-id="dif" :options="difficultyOptions" :is-multiple="true" :multiple-size="3"  @selected="(value) => { difficulty = value }">
                </Select>
            </div>

            <div class="project-filter-dropdown">
                <label>Duration:</label>
                <Select unique-id="dur" :options="durationOptions" :is-multiple="true" :multiple-size="3" @selected="(value) => { duration = value }">
                </Select>
            </div>
            <!-- <div class="project-filter-dropdown">
                <label>Semester</label>
                <Select name="semester" unique-id="sem" @selected="(value) => { semester = value }" 
                    label-copy="Select a semester to filter results" 
                    :options="semesterList" :is-multiple="true" :multiple-size="3"></Select>
            </div>
            <div class="project-filter-dropdown">
                <label>Year</label>
                <Select name="year" unique-id="year" @selected="(value) => { year = value }" 
                    label-copy="Select a year to filter results" 
                    :options="yearOptions" :is-multiple="true" :multiple-size="3"></Select>
            </div> -->
            <div class="project-filter-dropdown">
                <a :href="`${base == '/' ? '' : base}/projects`">
			<Button mode="primary" isRounded>Reset</button>
			</a>
            </div>
        </div>        

    </section>

    <h3> {{ ((search_text || !semester.includes('Any') || !year.includes('Any') || !level.includes('Any') || 
              !tech.includes('Any') || !duration.includes('Any') || !difficulty.includes('Any')) ? 
            `Selected projects` : 'All Projects') }} ({{ filteredProjects.length }})</h3>

    <section class="mbe40 project-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
        <template v-for="project in filteredProjects" :key="project.data.id">
            <ProjectCard :item = "project" />
        </template>
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

.tagList {
    list-style: none;
    display:flex;
    flex-wrap:wrap;
    align-items: center;
    gap:7px;
    margin:0;
    padding:0;
}
.tag{
    background: rgb(250,104,104);
    padding: 5px;
    border-radius: 4px;
    color:white;
    white-space: nowrap;
    transition: 0.1s ease backgroung;
}
.delete{
    color:white;
    background:none;
    outline:none;
    border:none;
    cursor: pointer;
}

</style>  