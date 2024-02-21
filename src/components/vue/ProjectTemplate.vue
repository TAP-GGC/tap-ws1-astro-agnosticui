<script setup>
import { computed, ref } from "vue";
// Components CSS
import "agnostic-vue/dist/index.css";
import "agnostic-vue/dist/common.min.css";
import { Input, Card, Select } from "agnostic-vue";


// load blog content: news, etc.
import { getCollection } from 'astro:content';
// const projects = await getCollection('projects');  //list of projects

</script>
<template>
    <section class="mbe40">
        <label>Enter Project Name:</label>
        <input>
        <label>Enter Project Description</label>
        <input>

        <!--To get the students from dropdown menu or to manually enter the students by email-->
        <label>Enter Students name</label>
        <!--Autocomplete input form to show students available-->
        <input>

        


    </section>

</template>
  
  
  
<style scoped></style>
  