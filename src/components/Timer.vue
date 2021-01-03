<template>
  <div class="timer">
    {{ elapsed }}
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, watch, onBeforeUnmount } from "vue";

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

    const buildTimer = (run = false) => {
      const ms = run
        ? (props.end ?? Date.now()) - props.start + props.offset
        : props.offset;
      const seconds = (ms / 1000) % 60;
      const minutes = (ms / (60 * 1000)) % 60;
      const hours = (ms / (60 * 60 * 1000)) % 60;
      return [hours, minutes, seconds]
        .map((n) => Math.floor(n).toString().padStart(2, "0"))
        .join(":");
    };
    const elapsed = ref(buildTimer());

    const tick = () => {
      timer.value && window.cancelAnimationFrame(timer.value);
      timer.value = window.requestAnimationFrame(function updateTimer() {
        elapsed.value = buildTimer(props.play);
        if (props.play) {
          window.requestAnimationFrame(updateTimer);
        }
      });
    };

    onMounted(() => {
      tick();
    });

    watch(props, () => {
      tick();
    });

    onBeforeUnmount(() => {
      window.cancelAnimationFrame(timer.value);
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
