<template>
  <div class="container">
    <TodoItem
      class="todo-item"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @todo:start="$emit('todo:start', todo.id)"
      @todo:stop="$emit('todo:stop', todo.id)"
      @todo:pause="$emit('todo:pause', todo.id)"
      @todo:delete="$emit('todo:delete', todo.id)"
      @todo:updateNote="updateNote"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "./TodoItem.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    todos: Array,
  },
  emits: [
    "todo:start",
    "todo:stop",
    "todo:pause",
    "todo:delete",
    "todo:updateNote",
  ],
  setup(props, { emit }) {
    const updateNote = (todoId: string, note: string) => {
      emit("todo:updateNote", todoId, note);
    };
    return { updateNote };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
}
.todo-item:not(:last-child) {
  border-bottom: 1px solid #ddd;
  padding: 0 0 1rem 0;
}
</style>
