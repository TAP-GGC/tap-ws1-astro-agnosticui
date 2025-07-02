<template>
    <section class="mbe40">
        <div class="d-flex flex-column align-center gap2 mbe20 vw-100">
            <Input
                v-model="searchQuery"
                placeholder="Search by tech name"
                class="vw-100"
            />

            <div class="d-flex flex-wrap justify-center gap1">
                <Button
                v-for="option in sortOptions"
                :key="option.value"
                kind="default"
                class="sort-button"
                :class="{ 'is-active': sortBy === option.value }"
                @click="sortBy = option.value"
                >
                {{ option.label }}
                </Button>

                <Button kind="danger" @click="resetFilters">Reset</Button>
            </div>
        </div>

        <div class="tech-card-container">
        <TechCard
            v-for="item in filteredAndSortedTechs"
            :key="item.tech.id"
            :tech="item.tech"
            :projectCount="item.projectCount"
        />
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TechCard from './TechCard.vue'
import "agnostic-vue/dist/index.css";
import { Input, Button } from 'agnostic-vue'

const props = defineProps({
    techList: {
        type: Array,
        required: true
    }
})

const searchQuery = ref("")
const sortBy = ref("name-asc")

const sortOptions = [
    { value: 'name-asc', label: 'Name A–Z' },
    { value: 'name-desc', label: 'Name Z–A' },
    { value: 'count-desc', label: 'Most Projects' },
    { value: 'count-asc', label: 'Least Projects' }
]

const filteredAndSortedTechs = computed(() => {
    let result = [...props.techList]

    // Filter by tech name
    if (searchQuery.value.trim() !== "") {
        result = result.filter(t =>
        t.tech.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    // Sort based on selection
    switch (sortBy.value) {
        case "name-asc":
        result.sort((a, b) => a.tech.name.localeCompare(b.tech.name))
        break
        case "name-desc":
        result.sort((a, b) => b.tech.name.localeCompare(a.tech.name))
        break
        case "count-asc":
        result.sort((a, b) => a.projectCount - b.projectCount)
        break
        case "count-desc":
        result.sort((a, b) => b.projectCount - a.projectCount)
        break
    }

    return result
})

const resetFilters = () => {
    searchQuery.value = ""
    sortBy.value = "name-asc"
}
</script>

<style scoped>
.tech-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.sort-button {
    margin: 8px;
    background-color: #44e449;
    color: white;
    border: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.sort-button:hover {
    background-color: #45a049;
}

.sort-button.is-active {
    background-color: #388e3c;
}
</style>