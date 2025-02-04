<template>
 <section class="slide-gallery">
    <div>
            <!-- Images 4 display -->
		<img :src="photos[cIndex].src" :alt="photos[cIndex].alt" />

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
  
	// const homeBanner = document.getElementById('slide-gallery');
	// const photoTitle = document.getElementById('photoTitle');
	// const caption = document.getElementById('caption');
	// const prevArrow = document.getElementById('prev');
	// const nxtArrow = document.getElementById('next');
  
	// function updateGallery(index) {
	//   const photo = photos[index]; 
	//   homeBanner.src = photo.file;
	//   photoTitle.textContent = photo.photoTitle;
	//   caption.textContent = photo.caption;
  
    function prev() {
     cIndex.value = cIndex.value == 0 ? photos.length - 1 : cIndex.value - 1;
    }

    function next() {
        cIndex.value = cIndex.value == photos.length - 1 ? 0 : cIndex.value + 1;
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