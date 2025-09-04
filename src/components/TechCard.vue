<template>
  <a :href="`/techs/${tech.id}`" class="card-link">
    <Card class="techCard" isShadow>
      <div class="techCardContent">
        <img v-if="tech.image" class="techCardImage" :src="tech.image.src || tech.image" :alt="tech.name" />
        <div class="techCardInfo">
          <h3 class="techCardName">{{ tech.name }}</h3>
          <p>{{ projectCount }} related projects</p>
          <p class="techCardDescription" v-if="tech.description">{{ tech.description }}</p>
        </div>
      </div>
    </Card>
  </a>
</template>

<script setup>
import { Card } from 'agnostic-vue';

defineProps({
  tech: {
    type: Object,
    required: true
  },
  projectCount: {
    type: Number,
    default: 0 
  }
});
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  max-width: 420px;
  width: 100%;
}

.techCard {
  background-color: #4b8d1c;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.techCard:hover {
  transform: translateY(-4px);
}

.techCardContent {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.techCardImage {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  object-fit: cover;
  background: #fff;
}

.techCardInfo {
  flex: 1;
}

.techCardName {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.techCardDescription {
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
}
</style>
