<template>
 <section class="slide-gallery">
    <div>
            <!-- Images display using slot -->
		<div>
        	<slot></slot>
      	</div>

            <!-- caption overlay -->
        <div v-if="photos" class="gallery-text-overlay">
            <h4 v-if="photos[cIndex].photoTitle" class="gallery-text-overlay">{{photos[cIndex].photoTitle}}</h4>
            <p v-if="photos[cIndex].caption" class="caption">{{photos[cIndex].caption}}</p>
            <!-- navigation -->
            <a @click="prev()" class="prev">&#10094;</a>
            <a @click="next()" class="next">&#10095;</a>
        </div>
    </div>		
 </section>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import '/src/styles/global.css';


    interface PhotoProps{
        src: string;
        alt: string;
        photoTitle?: string;
        caption?: string;
    }

    interface Props{
        photos: PhotoProps[];
    }

    const props = defineProps<Props>();

    const { photos } = props;

	let cIndex = ref(0);
	
	function updateVisiblePhoto() {
      // Get all photo items
      const photoItems = document.querySelectorAll('.photo-item');
      
      photoItems.forEach((item, index) => {
        (item as HTMLElement).style.display = 'none';
        console.log('Hiding photo item', index);
      });
      
      // Show only the current photo
      const currentPhoto = document.querySelector(`.photo-item[data-index="${cIndex.value}"]`);
      if (currentPhoto) {
        (currentPhoto as HTMLElement).style.display = 'block';
      } else {
        console.log('Could not find current photo with index:', cIndex.value);
      }
    }
  

    function prev() {
     cIndex.value = cIndex.value == 0 ? photos.length - 1 : cIndex.value - 1;
	 updateVisiblePhoto();
    }

    function next() {
        cIndex.value = cIndex.value == photos.length - 1 ? 0 : cIndex.value + 1;
		updateVisiblePhoto();
    }

</script>

<style scoped>
	section.slide-gallery {
		display: block;
		position: relative;
		max-width: 1240px; 
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 2rem;
	}

	.gallery-text-overlay h4 {
		font-family: 'Gagalin', Helvetica, Arial, sans-serif;
		padding-bottom: 10rem;
		padding-left: 3rem;
	} 

	.gallery-text-overlay p {
		/* margin: 0; */
		padding-bottom: 8.5rem;
		padding-left: 5rem;	
	}

	.gallery-text-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		line-height: 1;
		text-decoration: left;
		color: var(--agnostic-font-color);
		/* background: rgba(0, 0, 0, 0.5); */
	}

	.gallery-text-overlay .prev,
	.gallery-text-overlay .next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		/*padding: 1.5rem;*/
		margin-top: -350px;
		color: var(--agnostic-font-color);
		font-weight: bold;
		font-size: 84px;
		border-radius: 0 3px 3px 0;
		/* user-select: none; */
		/* -webkit-user-select: none; */
	}

	/* Position the "next button" to the right */
	.next {
	right: 0;
	border-radius: 3px 0 0 3px;
	}

	/* On hover, add a black background color with a little bit see-through */
	.prev:hover,
	.next:hover {
	text-decoration: none;
	}
	.prev:disabled,
	.next:disabled {
	cursor: not-allowed;
	text-decoration: none;
	color: #2f2c2c
	}

</style>