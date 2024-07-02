<template>
    <div ref="lightGallery">
      <slot></slot>
    </div>
  </template>
  
  <script>
  
  import lightGallery from 'lightgallery';
  import lgThumbnail from 'lightgallery/plugins/thumbnail';
  import lgZoom from 'lightgallery/plugins/zoom';
  
  export default {
    name: 'LightGallery',
    data() {
      return {
        plugins: [lgThumbnail, lgZoom],
      };
    },
    mounted() {
      lightGallery(this.$refs.lightGallery, {
        speed: 500,
        plugins: this.plugins,
      });
    },
  };
  </script>
  
  <style scoped>
  @import 'lightgallery/css/lightgallery.css';
  @import 'lightgallery/css/lg-thumbnail.css';
  @import 'lightgallery/css/lg-zoom.css';
  </style>
  