<template>
  <div class="poll-box" v-if="poll">
    <div class="poll-layout">
        
      <!-- LEFT / TOP: big average -->
      <div class="poll-summary" v-if="average > 0">
        <div class="average-score">
          <span class="average-number">{{ average.toFixed(1) }}</span>
          <span class="average-out-of">/ 5</span>
        </div>
        <p class="meta">
          {{ poll.voters }} voter(s)
        </p>
      </div>

      <!-- RIGHT / BOTTOM: detailed distribution -->
      <div class="poll-detail">
        <div
          v-for="opt in poll.options"
          :key="opt.id"
          class="poll-row"
        >
          <span class="label">
            {{ '★'.repeat(opt.stars).padEnd(5, '☆') }}
          </span>

          <div class="bar-wrapper">
            <div class="bar" :style="{ width: opt.percent.toFixed(0) + '%' }"></div>
          </div>

          <span class="percent">
            {{ opt.percent.toFixed(0) }}%
          </span>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="no-poll">No rating poll yet.</p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    poll: {
        type: Object,
        required: false,
        default: null,
    },
})

const average = computed(() => {
    const p = props.poll
    if (!p || !p.voters) return 0

    if (typeof p.average === 'number') return p.average

    const totalScore = p.options.reduce(
        (sum, opt) => sum + opt.stars * opt.votes,
        0
    )
    return p.voters ? totalScore / p.voters : 0
})
</script>

<style scoped>
.poll-box {
    width: 100%;
    max-width: 960px;
    margin: 1.5rem auto;
    padding: 0 1rem;
}

.poll-layout {
    display: flex;
    flex-direction: column;       
    gap: 1.5rem;
}

/* On medium+ screens, switch to side-by-side columns */
@media (min-width: 768px) {
  .poll-layout {
        flex-direction: row;
        align-items: flex-start;
  }

  .poll-summary,
  .poll-detail {
        flex: 1 1 0;
  }
}

/* LEFT / TOP */
.poll-summary {
    display: flex;
    flex-direction: column;
    align-items: center;     
    text-align: center;      
}

.average-score {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
}

.average-number {
    font-size: clamp(6.4rem, 5vw, 3.2rem); 
    font-weight: 700;
}

.average-out-of {
    font-size: 1.1rem;
    opacity: 0.8;
}

.meta {
    font-size: 0.85rem;
    opacity: 0.7;
}

/* RIGHT / BOTTOM */
.poll-detail {
    width: 100%;
}

.poll-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.3rem 0;
}

.label {
    min-width: 3.5rem;
    font-family: system-ui, sans-serif;
    color: #facc15; 
    font-size: 1rem;
}

.bar-wrapper {
    flex: 1;
    height: 0.6rem;
    background: #333;
    border-radius: 999px;
    overflow: hidden;
}

.bar {
    height: 100%;
    background: #22c55e; 
}

.percent {
    min-width: 3rem;
    text-align: right;
}

.no-poll {
    font-size: 0.9rem;
    opacity: 0.7;
    text-align: center;
}
</style>
