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
		width: 100%;
		max-width: 1240px; 
		margin-left: auto;
		margin-right: auto;
		padding: 0 0 1rem;
		height: auto;
		overflow: hidden;
	}

	.gallery-text-overlay h4 {
		font-family: 'Gagalin', Helvetica, Arial, sans-serif;
		padding-bottom: 3.5rem;
  		padding-left: 1rem;
  		font-size: clamp(0.875rem, 4vw, 1.5rem);
	} 

	.gallery-text-overlay p {
		/* margin: 0; */
		padding-bottom: 0.75rem;
		padding-left: 0.75rem;	
		font-size: clamp(0.75rem, 3vw, 1.125rem);
	}

	.gallery-text-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		line-height: 1;
		text-decoration: left;
		color: #fff;
		text-shadow: 2px 2px 4px #000 !important;
		padding: 1rem;
		/* background: rgba(0, 0, 0, 0.5); */
	}

	.gallery-text-overlay .prev,
	.gallery-text-overlay .next {
		cursor: pointer;
		position: absolute;
		top: 50% !important;
		transform: translateY(-50%);
		padding: 0.5rem;
		margin-top: -250px;
		color: #57af0f !important;
		font-weight: bold;
		font-size: clamp(2rem, 10vw, 4rem); /* Responsive font size */
		border-radius: 3px 0 0 3px;
		z-index: 10;
		height: 2.5rem;
  		width: 2.5rem;
  		display: flex;
  		align-items: center;
  		justify-content: center;
  		line-height: 1;
	}

	/* Position the "next button" to the right */
	.next {
		right: 1rem;
	}
	.prev {
		left: 1rem;
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
	
	@media (max-width: 680px) {
		.gallery-text-overlay .prev,
  		.gallery-text-overlay .next {
    		font-size: 1.5rem;
    		height: 2rem;
    		width: 2rem;
			margin-top: -98px;

  	}
}

</style>