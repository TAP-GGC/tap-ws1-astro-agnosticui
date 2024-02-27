<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select } from "agnostic-vue";


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

//Tech related
let searchTerm = ref('');
let selectedTech = ref('');
let techList = createOptions(projects, "techs");

//Semester related
let selectedSemester = ref('');

//Duration related
let duration = ref([]);
let durationList = createOptions(projects, "durationMins").map((val) =>{})


const searchTech = computed(() =>{
    if(searchTerm == ''){
        return [];
    }

    // we need to find matches 
    let matches = 0;
    console.log(techList);
    let optionsList = techList.filter(tech =>{
        if(tech.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10){
            matches++;
            return tech;
        }

    });
    return optionsList.map(val => ({value:val, label:val}));
    //filter
    //matches to 10
    //populates the options with that

});

const selectTech = (tech) =>{
    selectedTech.value = tech;
    console.log(selectedTech.value);
    searchTerm.value ='';
}

// let markdownFile = 
// "---
// title: {}
// id: {}
// desc: 
// github: []
// students: []
// instructors: [ Anca Doloc-Mihu, Cindy Robertson]
// techs: [sphero]
// videos: []
// tags: []
// events: [CCSC-2023, S3-fall-2023]
// semester: fall
// year: 2023
// levels: [ k-12, college ] 
// difficulty: [ beginner, intermediate ]
// durationMins: [ 30, 60, 90 ]
// publishedDate: 2023-11-05
// related-ids: []
// ---
// "
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
            <Input multiple type="text" id="tech" list="techData" label="Enter Tech" placeholder="Type tech" v-model="searchTerm">
            </Input>
            <datalist id="techData">
                <option v-for="tech of techList">{{ tech }}</option>
            </datalist>
            <ul v-if="searchTech.length">
            <li>Showing {{ searchTech.length }} of {{ techList.length }} results</li>
            <li v-for="tech in searchTech" :key="tech" @click="selectTech(tech)"> {{ tech }}</li>
            </ul>
        </div>
        <div>
            <Input type="text" label="Enter Github page" v-model="github"/>
        </div>
        <div>
            
         </div>

         <p>Project Name: {{ projectName }}</p>
         <p>Project Description : {{ projectDescrip }}</p>
         <p>Project Github Page: {{ github }}</p>
         <p>Project Tech: {{ searchTerm }}</p>
        


        <!--To get the students from dropdown menu or to manually enter the students by email-->
        
        <!--Autocomplete input form to show students available-->
        <div>
            
        </div>
        
    
        


    </section>

</template>
  
  
  
<style scoped></style>
  