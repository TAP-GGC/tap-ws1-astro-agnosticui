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
    return optionSet;
}

let searchTech = ref('');
let techList = createOptions(projects, "techs");

const searchTech = computed(() =>{
    if(searchTech == ''){
        return [];
    }

    // we need to find matches 
    let matches = 0;
    return techList.filter(tech =>{
        if(tech.toLowerCase().includes(searchText.value.toLowerCase()) && matches < 10){
            matches++;
            return tech;
        }

    })

});

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
        <label>Enter Project Name:</label>
        <input type="text" id="tech" placeholder="Type tech" v-model="searchTerm">
        <label>Enter Project Description</label>
        <input>

        <!--To get the students from dropdown menu or to manually enter the students by email-->
        <label>Enter Students name</label>
        <!--Autocomplete input form to show students available-->
        <input>

        


    </section>

</template>
  
  
  
<style scoped></style>
  