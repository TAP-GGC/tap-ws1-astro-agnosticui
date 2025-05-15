<template>
	<div class="photo-carousel">
		<vueper-slides 
			class="photo-carousel-inner" 
			:bullets="true" 
			:arrows="true" 
			:autoplay="true"
			:pause-on-hover="true" 
			:lazy="true" 
			:touchable="true" 
			:fixed-height="true" 
			:dragging-distance="70"
			:visible-slides="1" 
			:gap="0" 
			:bullets-outside="true">
			<vueper-slide 
				v-for="(photo, index) in photos" 
				:key="index" 
				:title="photo.photoTitle">
				<template v-slot:content>
					<div class="slide-content">
						<img :src="photo.src" :alt="photo.alt || ''" class="full-image" />
						<div v-if="photo.photoTitle" class="slide-title">
							{{ photo.photoTitle }}
						</div>
					</div>
				</template>
			</vueper-slide>
		</vueper-slides>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import '/src/styles/global.css';
import 'vueperslides/dist/vueperslides.css'
import { VueperSlides, VueperSlide } from 'vueperslides'

interface PhotoProps {
	src: string;
	alt: string;
	photoTitle?: string;
	caption?: string;
}

interface Props {
	photos: PhotoProps[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.photo-carousel {
	max-width: 1240px;
	margin: 0 auto;
	padding: 2rem 1rem;
}

/* Set fixed height for the carousel */
:deep(.vueperslides) {
	height: 800px !important;
}
/*
:deep(.vueperslides__inner) {
	height: 100% !important;
}

:deep(.vueperslides__track) {
	height: 100% !important;
}

:deep(.vueperslides__track-inner) {
	height: 100% !important;
}

:deep(.vueperslide) {
	height: 100% !important;
}

:deep(.vueperslide__content-wrapper) {
	height: 100% !important;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
*/

.slide-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.full-image {
	max-width: 100%;
	max-height: 90%;
	object-fit: contain;
	border-radius: 12px;
	background-color: #000;
}

.slide-title {
	margin-top: 10px;
	text-align: center;
	font-weight: bold;
}

/* Ensure bullets are below the image */
:deep(.vueperslides__bullets) {
	margin-top: 10px;
}
</style>