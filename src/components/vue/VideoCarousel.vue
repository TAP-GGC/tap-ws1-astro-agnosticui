<script setup lang="ts">

import { ref } from 'vue'
import '/src/styles/global.css';
import 'vueperslides/dist/vueperslides.css'
import { VueperSlides, VueperSlide } from 'vueperslides'

interface ClipProps {
  src: string;
  caption?: string;
}

interface Props{
  videos: ClipProps[];
  showIframe: boolean;
}

const props = defineProps<Props>(); 

const { videos, showIframe } = props;

</script>

<template>

<div class="video-carousel">
  <vueper-slides
		:bullets-outside="true"
		:dragging-distance="50">
    <vueper-slide
      v-for="(video, i) in videos"
      :key="i"
      :title="video.caption">
      <template v-slot:content>
        <div class="slide-content">
          <iframe
          class="video-section"
          :src="`https://www.youtube.com/embed/${video.src}`"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          ></iframe>
          <div v-if="video.caption" class="slide-title">{{video.caption}}</div>
        </div>
      </template>
    </vueper-slide>
  </vueper-slides>
</div>

</template>

<style scoped>
  .slide-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .slide-title {
    margin-top: 10px;
    text-align: left;
    font-weight: bold;
  }

  .video-carousel {
    /* margin-top: 1rem; */
    max-width: 1450px;
    height: auto;
	  margin: 0 auto;
	  padding: 2rem 1rem;
  }

  .video-section {
    width: 100%;
    max-width: 950px;
    height: 500px;
  }


</style>