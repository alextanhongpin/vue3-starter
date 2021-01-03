<template>
  <div class="timer">
    {{ elapsed }}
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, watch } from "vue";

export default defineComponent({
  name: "Timer",
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    play: false,
  },

  setup(props) {
    const timer = ref(-1);
    const elapsed = ref(buildTimer());

    function buildTimer(run = false) {
      const ms = run
        ? (props.end ?? Date.now()) - props.start + props.offset
        : props.offset;
      const seconds = (ms / 1000) % 60;
      const minutes = (ms / (60 * 1000)) % 60;
      const hours = (ms / (60 * 60 * 1000)) % 60;
      return [hours, minutes, seconds]
        .map((n) => Math.floor(n).toString().padStart(2, "0"))
        .join(":");
    }

    function updateTimer() {
      timer.value = window.requestAnimationFrame(updateTimer);
      elapsed.value = buildTimer(true);
    }

    onMounted(() => {
      watch(props, () => {
        window.cancelAnimationFrame(timer.value);
        if (props.play) {
          updateTimer();
        }

        return () => {
          window.cancelAnimationFrame(timer.value);
        };
      });
    });

    return {
      elapsed,
    };
  },
});
</script>

<style scoped>
.timer {
  font-family: "Courier New";
  border: 1px solid #ddd;
  display: inline-block;
  padding: 0.2rem;
  font-size: small;
}
</style>
