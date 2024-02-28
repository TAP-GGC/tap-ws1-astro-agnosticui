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

//Tech related
let techTerm = ref('');
let selectedTech = ref('');
let techList = createOptions(projects, "techs");

//Semester related
let selectedSemester = ref('');

//Duration related
let duration = ref([]);
let durationList = createOptions(projects, "durationMins").map((val) =>{})

//tag related
const techTags = ref([]);
const newTag = ref('');

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
            <Input type="text" id="tech" list="techData" label="Enter Tech" placeholder="Type tech" v-model="techTerm"
             @keydown.enter="addTag(techTerm)" @keydown.delete="techTerm.length||removeTag(techTags.length-1)">
            </Input>
            <datalist id="techData">
                <option v-for="tech of techList" :value="tech">{{ tech }}</option>
            </datalist>

            <!--Code for displaying the results from the filtered option-->
            <ul v-if="searchTech.length">
            <li>Showing {{ searchTech.length }} of {{ techList.length }} results</li>
            <li v-for="tech in searchTech" :key="tech" @click="selectTech(tech)"> {{ tech }}</li>
            </ul>
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
            
         </div>

         <p>Project Name: {{ projectName }}</p>
         <p>Project Description : {{ projectDescrip }}</p>
         <p>Project Github Page: {{ github }}</p>
         <p>Project Tech: {{ searchTerm }}</p>
        


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
  