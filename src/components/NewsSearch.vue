<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select } from "agnostic-vue";
import { Button, ButtonGroup } from 'agnostic-vue';



// Component Imports
import EventCard from "./EventCard.vue";

// load content from props
const props = defineProps({
        eventsList: Object,
        filter: Object
    });
const events = props.eventsList;
const search_text = ref("");
const student = props.filter?.student ? ref([props.filter.student]) : ref(['Any']);
const instructor = props.filter?.instructor ? ref([props.filter.instructor]) : ref(['Any']);
const year =  props.filter?.year ? ref([props.filter.year]) : ref(['Any']);
const semester =  props.filter?.semester ? ref([props.filter.semester]) : ref(['Any']);
const tech = props.filter?.tech ? ref([props.filter.tech]) : ref(['Any']);


// Semester list constant
const semesterList = ref([{value:'Any', label:'Any'},{value: 'fall', label:'Fall'}, {value: 'spring', label:'Spring'}, {value: 'summer', label:'Summer'}]);

function createOptions(events, x) {
    let optionSet = new Set();
    //Add default option
    optionSet.add("Any");
    events.forEach(arrayContainer =>{
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

const yearOptions = createOptions(events, "year");
const techOptions = createOptions(events, "techs");

function matches(event) {
    //semester: consider this as ref variable 
    let isMatch = false;
    if(search_text.value || semester.value!='Any' || tech!== 'Any'){   //If Fall semester

        //check filters (dropdown menus)
        //if dropdown value does not match with event data, it fails match immediately
        if(year.value != 'Any' && !year.value.includes(event.data.year.toString())){
            return false;
        }
        if(semester.value != 'Any' && !semester.value.includes(event.data.semester)){
            return false;
        }
        if(tech.value != 'Any' && !tech.value.some(tech => event.data.techs.includes(tech))){
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
            event.data.title?.toLowerCase().includes(searchText) ||
            `${event.data.year}`.includes(searchText) ||
            event.data.techs?.some(tech => tech.includes(searchText))||
            event.data.instructors?.some(inst => inst.toLowerCase().includes(searchText))||
            event.data.students?.some(stu => stu.toLowerCase().includes(searchText))||
            event.data.curator?.some(stu => stu.toLowerCase().includes(searchText))
            ){
            return true;
        }else{
            return false;
        }
    }
    //otherwise, always return true
    return true;  
}

const filteredEvents = computed(() => {
  return events.filter((event) => matches(event));
})

const base = import.meta.env.BASE_URL;

</script>

<template>
    <div>
    
    <section class="mbe40">

        <Input id="7" is-underlined is-underlined-with-background placeholder="Enter event name, student, technology…"
            label="Search for events" type="text" v-model="search_text" />
        
        <div class="event-filter-container">            
            <div class="event-filter-dropdown">
                <label>Tech:</label>
                <Select unique-id="tec" :options="techOptions" :is-multiple="true" :multiple-size="3" @selected="(value) => { tech = value }">
                </Select>
            </div>
            <div class="event-filter-dropdown">
                <label>Semester</label>
                <Select name="semester" unique-id="sem" @selected="(value) => { semester = value }" 
                    label-copy="Select a semester to filter results" 
                    :options="semesterList" :is-multiple="true" :multiple-size="3"></Select>
            </div>
            <div class="event-filter-dropdown">
                <label>Year</label>
                <Select name="year" unique-id="year" @selected="(value) => { year = value }" 
                    label-copy="Select a year to filter results" 
                    :options="yearOptions" :is-multiple="true" :multiple-size="3"></Select>
            </div>
            <div class="event-filter-dropdown">
                <a :href="`${base == '/' ? '' : base}/events`">
			<Button mode="primary" isRounded>Reset</button>
			</a>
            </div>
        </div>        

    </section>

    <h3> {{ ((search_text || !semester.includes('Any') || !year.includes('Any') || !tech.includes('Any')) ? 
            `Selected events` : 'All Events') }} ({{ filteredEvents.length }})</h3>

    <section class="mbe40 event-cards-flex flex flex-row flex-grow-1 flex-shrink-1 flex-wrap flex-fill">
        <template v-for="event in filteredEvents" :key="event.data.id">
            <EventCard :item = "event" />
        </template>
    </section>


    </div>
</template>  
  
<style scoped>
.event-filter-container {
    justify-content: space-around;
    display: flex;
    flex-flow: row wrap;
    /* align-items: flex-start; */ 
    justify-content: center;
    align-items: center;
}
.event-filter-dropdown {
    /* apply grid and flex here */
    min-width: 10rem !important;
    max-width: 20em;
    margin: 0 auto;
    padding: 1em;
    flex: 1;
}

</style>  