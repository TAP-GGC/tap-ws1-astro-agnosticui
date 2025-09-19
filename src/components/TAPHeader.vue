<script setup>
// Import AgnosticUI global common & component CSS
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";
import { Header, HeaderNav, HeaderNavItem, Menu } from "agnostic-vue";

const base = import.meta.env.BASE_URL;
</script>

<template>  
  <Header isHeaderContentStart css="header">
    <template v-slot:logoleft >      
      <a  style="padding:0 20px;" :href="base" >
        <img :src="`${base == '/' ? '' : base}/images/tap-logo-dark.png`" width="100px" class="imageDark">
        <img :src="`${base == '/' ? '' : base}/images/tap-logo-light.png`" width="100px" class="imageLight">
      </a>
      <div class="flex-fill"></div>
    </template>

    <template v-slot:headernav>
      <HeaderNav css="header-mbe16">
        <HeaderNavItem>
          <a :href="`${base == '/' ? '' : base}/projects`">Projects</a>
        </HeaderNavItem>
        
        <HeaderNavItem>
          <a href="https://forum.tapggc.org" target="_blank">Forum</a>
        </HeaderNavItem>
      
        <HeaderNavItem>
          <Menu id="menu-More" menuTitle="More" :disabledItems="['menuitem-disabled']" :isBordered="true" type="simple" :isItemsRight="true">
            <!--template #menuitem-disabled><a :href="`${base == '/' ? '' : base}/about`">About</a></template-->
            <template #menuitem-about><a :href="`${base == '/' ? '' : base}/about`">About</a></template>
            <template #menuitem-instructors><a :href="`${base == '/' ? '' : base}/instructors`">Instructors</a></template>
            <template #menuitem-students><a :href="`${base == '/' ? '' : base}/students`">Students</a></template>
            <template #menuitem-techs><a :href="`${base == '/' ? '' : base}/techs`">Technologies</a></template>
            <template #menuitem-add-prj><a :href="`${base == '/' ? '' : base}/template`">Add project</a></template>
            <template #menuitem-apply>
              <a href="https://ggc.edu/academics/school-of-science-and-technology/research-internships-service-learning/technology-ambassador-program"
                 target="_blank">Student application</a></template>
            <template #menuitem-alum>
              <a href="https://www.linkedin.com/groups/4866341/"
                 target="_blank">Alumni LinkedIn</a></template>
            <template #icon>&#9662;</template>
          </Menu>
        </HeaderNavItem>
      </HeaderNav>
    </template>
  </Header>
   
</template>

<style scoped>

</style>