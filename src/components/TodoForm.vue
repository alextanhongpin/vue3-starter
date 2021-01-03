<template>
  <form class="container" @submit.prevent>
    <input
      class="input"
      type="text"
      placeholder="What do you want to do?"
      v-model="name"
    />
    <button class="button" @click="onSubmit">Submit</button>
  </form>
  <small class="footer">Press `Enter` to add</small>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Calendar",

  emits: ["form:submit"],

  setup(props, { emit }) {
    const name = ref("");

    const onSubmit = () => {
      if (!name.value.trim().length) {
        return;
      }
      emit("form:submit", { name: name.value });
      name.value = "";
    };

    return {
      name,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-column-gap: 1rem;
  align-items: center;
}
.input {
  appearance: none;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 2rem;
}
.button {
  font-weight: bold;
  text-transform: uppercase;
  appearance: none;
  border-radius: 3px;
  border: none;
  background: #333;
  color: white;
  padding: 1rem 2rem;
}
.footer {
  color: #888;
}
</style>
