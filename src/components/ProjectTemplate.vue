<script setup>
import { computed, ref } from "vue";
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
let studentList = createOptions(projects, "students");

//instructors related
let selectedInstructors = ref([]);
let InstructorList = createOptions(projects, "instructors");

//Tech related
let techTerm = ref('');
let selectedTech = ref('');
let techList = createOptions(projects, "techs");

//video url
let vidUrl = ref('');

//Semester related
let selectedSemester = ref('');
let semesters =[{value:'Any', label:'Any'},{value: 'fall', label:'Fall'}, {value: 'spring', label:'Spring'}, {value: 'summer', label:'Summer'}];

//tag related
const techTags = ref([]);
const newTag = ref('');

//year related
let date = new Date();
let year = date.getFullYear();
let selectedYear = ref('');

//difficulty related
let difficulty = ref([]);

//Duration related
let duration = ref([]);
let durationList = createOptions(projects, "durationMins").map((val) =>{})

const addItem = (inputField, category)=>{
    if(inputField!= ''){
        console.log(category);
        return inputField ='';
        category.push(inputField);
        inputField="hello";
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
                <li v-for="(tag, index) in techTags" :key="tag" class="tag">{{ tag }}
                <button @click="removeTag(index)" class="delete">x</button>
                </li>
                <Tag v-for="(tag, index) in techTags" :key="tag" class="mie6" shape="round" is-uppercase>{{tag}}</Tag>
            </ul>
            
        </div>
        <div>
            <Input type="text" label="Enter Github page" v-model="github"/>
        </div>
        <div>
            <Input type="text" list="studentData" label="Enter Student" v-model="studentTerm" @keydown.enter.stop="addItem({studentTerm}, {selectedStudents})"/>
            <datalist id="studentData"><option v-for="student in studentList" :value="student">{{ student }}</option></datalist>
         </div>
         <div> <!--Enter the videos. Once clicked, it should be pushed into an array-->
            <Input type="text" label="Enter video url" v-model="vidUrl"/>
         </div>
         <div> <!--events-->
            <Input type="text" label="Enter Events"/>
         </div>
         <div>
            <Select :options="semesters" @selected="(value) => { selectedSemester = value }">
            </Select>
         </div>
         <div> <!--levels-->
            <Input/>
         </div>
         <div> <!--difficulty-->

         </div>
         <p>---</p>
         <p>Project Name: {{ projectName }}</p>
         <!--Propose a id, User can write id, use a placeholder-->
         <p>Project Id: {{ projectName.trim() }}</p>
         <p>Project Description : {{ projectDescrip }}</p>
         <p>Project Github Page: {{ github }}</p>
         <p>Project Student: {{ selectedStudents }}</p>
         <p>Project Instructors: </p>
         <p>Project Tech: {{ techTags }}</p>
         <p>Project video url: {{ vidUrl }}</p>
         <p>Project tags: </p>
         <p>Project events: </p>
         <p>Project Semester: {{ selectedSemester }}</p>
         <p>Project year: {{ selectedYear? selectedYear : year }}</p>
         <p>Project levels: </p>
         <p>Project difficulty: </p>
         <p>Project Duration: {{ duration }}</p>
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
  