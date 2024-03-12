<script setup>
import { computed, ref} from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select, Tag } from "agnostic-vue";


// load blog content: news, etc.
import { getCollection } from 'astro:content';
const projects = await getCollection('projects');  //list of projects
function createOptions(projects, x) {
    let optionSet = new Set();
    projects.forEach(arrayContainer =>{
        if(Array.isArray(arrayContainer.data[x])){
            arrayContainer.data[x].forEach(element =>{
            optionSet.add(element);
        });
        }else{
            optionSet.add(arrayContainer.data[x]);
        }
        
    });
    return Array.from(optionSet);
}

let projectName = ref('');
let projectDescrip = ref('');
let github = ref('');

//student related
let selectedStudents = ref([]);
let studentTerm = ref('');
const studentList = createOptions(projects, "students");

//instructors related
let instructorTerm = ref('');
let selectedInstructors = ref([]);
const instructorList = createOptions(projects, "instructors");

//Tech related
let techTerm = ref('');
let selectedTech = ref('');
const techList = createOptions(projects, "techs");

//video url
let vidUrl = ref('');

//Semester related
let selectedSemester = ref('');
let semesters =[{value:'Any', label:'Any'},{value: 'fall', label:'Fall'}, {value: 'spring', label:'Spring'}, {value: 'summer', label:'Summer'}];

//tag related
const techTags = ref([]);
const newTag = ref('');

//event related
let eventTerm = ref('');
let selectedEvents = ref([]);
const eventList = createOptions(projects, "events");

//year related
let date = new Date();
let year = date.getFullYear();
let selectedYear = ref('');

//level related
let levelTerm = ref('');
let selectedLevels = ref([]);
const levelList = createOptions(projects,"levels");

//difficulty related
let diffTerm = ref('');
let selectedDiffs = ref([]);
const diffList = createOptions(projects, "difficulty");

//Duration related
let durationTerm = ref('');
let selectedDurations = ref([]);
const durationList = createOptions(projects, "durationMins");

//failed reusable method
const addItem = (inputField, category)=>{
    switch(category){
        case 'student':
            selectedStudents.value.push(inputField);
            break;
        case 'event':

    }
    console.log(inputField);
    console.log(typeof inputField);
    console.log(category);
    console.log(typeof category);
    if(inputField!= ''){
        console.log(category);
        inputField ='';
        
        category.value.push(inputField);
        inputField="hello";
    }
    
}
//Add terms for input with options {levels, events, student, ||duration, difficulty, tech}
function addTerm(termRef, inputField){
    let category;
    switch(termRef){
        case "levelTerm":
            category = selectedLevels;
            break;
        case "eventTerm":
            category = selectedEvents;
            break;
        case "studentTerm":
            category = selectedStudents;
            break;
        case "diffTerm":
            category = selectedDiffs;
            break;
        case "durationTerm":
            category = selectedDurations;
            break;
        case "instructorTerm":
            category = selectedInstructors;
            break;
    }
    if(inputField != ''){
        console.log(inputField);
        category.value.push(inputField);
        this[termRef] = '';
    }
}

function removeTag2(arrayRef, index){
    arrayRef.splice(index, 1);
}

// const addTerm = (arrayRef, termRef) =>{
//     return (item) => {
//         if(item != ''){
//             arrayRef.value.push(termRef);
//             console.log(arrayRef.value);
//             termRef.value ='';
//         }
//     };
// };

//Setters

//const addLevel = addItem2(levelTerm, selectedLevels);

const addStudent = (student) =>{
    if(student != ''){
        selectedStudents.value.push(student);
        studentTerm.value = '';
    }
}
const addEvent = (event) =>{
    if(event != '' && !selectedEvents.value.includes(event)){
        selectedEvents.value.push(event);
        eventTerm.value='';
    }
}
const addTag = (tag) =>{
    if(tag != ''){
        techTags.value.push(tag);
        techTerm.value= '';
    }
    techTerm.value='';

}
const removeTag = (index) =>{
    techTags.value.splice(index, 1);
}
const searchTech = computed(() =>{
    if(techTerm == ''){
        return [];
    }

    // we need to find matches 
    let matches = 0;
    console.log(techList);
    let optionsList = techList.filter(tech =>{
        if(tech.toLowerCase().includes(techTerm.value.toLowerCase()) && matches < 10){
            matches++;
            return tech;
        }

    });
    return optionsList.map(val => ({value:val, label:val}));
    //filter
    //matches to 10
    //populates the options with that

});

</script>
<template>
    <section class="mbe40">
        <div>
            <Input id="4" size="" v-model="projectName" label="Enter Project Name" placeholder="Example: Atomic Force Microscopy" type="text"></Input>
        </div>
        <div>
            <Input size="medium" v-model="projectDescrip" label="Enter Project Description" type="text"></Input>
        </div>
        <div>
            <Input type="text" id="tech" list="techData" label="Enter Tech" placeholder="Type tech" v-model="techTerm"
             @keydown.enter="addTag(techTerm)" @keydown.delete="techTerm.length||removeTag(techTags.length-1)">
            </Input>
            <datalist id="techData">
                <option v-for="tech of techList" :value="tech">{{ tech }}</option>
            </datalist>
            <ul class="tagList">
                <!-- <li v-for="(tag, index) in techTags" :key="tag" class="tag">{{ tag }}
                <button @click="removeTag(index)" class="delete">x</button>
                </li> -->
                    <Tag v-for="(tag, index) in techTags" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag(index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
            
        </div>
        <div>
            <Input type="text" label="Enter Github page" v-model="github"/>
        </div>
        <div>
            <Input type="text" list="instructorData" label="Enter Instructors" v-model="instructorTerm" @keydown.enter.stop="addTerm('instructorTerm',instructorTerm )"/>
            <datalist id="instructorData"><option v-for="instructor in instructorList" :value="instructor">{{ instructor }}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedInstructors" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedInstructors,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
        <div>
            <Input type="text" list="studentData" label="Enter Student" v-model="studentTerm" @keydown.enter.stop="addTerm('studentTerm',studentTerm )"/>
            <datalist id="studentData"><option v-for="student in studentList" :value="student">{{ student }}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedStudents" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedStudents,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
         <div> <!--Enter the videos. Once clicked, it should be pushed into an array-->
            <Input type="text" label="Enter video url" v-model="vidUrl"/>
         </div>
         <div> <!--events-->
            <Input type="text" list="eventData" label="Enter Events" v-model="eventTerm" @keydown.enter="addTerm('eventTerm',eventTerm)"/>
            <datalist id="eventData"><option v-for="event in eventList" :value="event">{{ event }}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedEvents" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedEvents,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
         <br>
         <div>
            <Select default-option-label="Choose Semester" :options="semesters" @selected="(value) => { selectedSemester = value }">
            </Select>
         </div>
         <div> <!--levels-->
            <Input type="text" list="levelData" label="Enter Level" v-model="levelTerm" @keydown.enter.stop="addTerm('levelTerm',levelTerm)"/>
            <datalist id="levelData"><option v-for="level in levelList" :value="level">{{ level }}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedLevels" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedLevels,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
         <div> <!--difficulty-->
            <Input type="text" list="difficultyData" label="Enter Difficulty" v-model="diffTerm" @keydown.enter.stop="addTerm('diffTerm',diffTerm)"/>
            <datalist id="difficultyData"><option v-for="diff in diffList" :value="diff">{{ diff}}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedDiffs" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedDiffs,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
         <div> <!--duration-->
            <Input type="text" list="durationData" label="Enter Duration" v-model="durationTerm" @keydown.enter.stop="addTerm('durationTerm',durationTerm)"/>
            <datalist id="durationData"><option v-for="dur in durationList" :value="dur">{{ dur}}</option></datalist>
            <ul class="tagList">
                <Tag v-for="(tag, index) in selectedDurations" :key="tag" class="mie6" shape="round" type="info" is-uppercase>{{tag}}
                    <button @click="removeTag2(selectedDurations,index)" class="delete">&#x2718;</button>
                </Tag>
            </ul>
         </div>
         <div>
            <Input type="text" label="Enter Published Date" v-model="selectedYear"/>
         </div>
         <br>
         <h4>Resulting Markdown File:</h4>
         <p>---</p>
         <p>Project Name: {{ projectName }}</p>
         <!--Propose a id, User can write id, use a placeholder-->
         <p>Project Id: {{ projectName.trim() }}</p>
         <p>Project Description : {{ projectDescrip }}</p>
         <p>Project Github Page: {{ github }}</p>
         <p>Project Student: {{ selectedStudents }}</p>
         <p>Project Instructors: {{ selectedInstructors }} </p>
         <p>Project Tech: {{ techTags }}</p>
         <p>Project video url: {{ vidUrl }}</p>
         <!-- <p>Project tags: </p> -->
         <p>Project events: {{selectedEvents}}</p>
         <p>Project Semester: {{ selectedSemester }}</p>
         <p>Project year: {{ selectedYear? selectedYear : year }}</p>
         <p>Project levels: {{ selectedLevels }} </p>
         <p>Project difficulty: {{ selectedDiffs }} </p>
         <p>Project Duration: {{ selectedDurations }}</p>
         <p>Project Published Date: {{ year }}</p>
         <!--Input Dropdown, Value: id, label: project title-->
         <p>Project Related Ids: </p>

        


        <!--To get the students from dropdown menu or to manually enter the students by email-->
        
        <!--Autocomplete input form to show students available-->
        <div>
            
        </div>
        <!--published date : optional text input, javascript data function-->
        
    
        


    </section>

</template>
  
  
  
<style scoped>
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
  