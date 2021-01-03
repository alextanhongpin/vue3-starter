<template>
  <button
    class="icon-play"
    :class="{ paused }"
    :title="paused ? 'Paused' : 'Play'"
    @click="$emit('click', event)"
  ></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayIcon",
  props: {
    paused: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.icon-play {
  border: 0;
  background: transparent;
  box-sizing: border-box;
  width: 0;
  height: 1rem;

  border-color: transparent transparent transparent #202020;
  transition: 100ms all ease;
  cursor: pointer;

  border-style: solid;
  border-width: 0.5rem 0 0.5rem 1rem;
}
.icon-play.paused {
  border-style: double;
  border-width: 0px 0 0px 1rem;
}
.icon-play:hover {
  border-color: transparent transparent transparent #404040;
}
</style>
