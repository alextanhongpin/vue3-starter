<template>
  <div>
    <TodoForm @form:submit="onSubmit" />
  </div>
  <br />

  <TodoList
    :todos="todos"
    @todo:start="onStart"
    @todo:stop="onComplete"
    @todo:pause="onPause"
    @todo:delete="onDelete"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import type { Todo } from "./models/todo";
import TodoModel from "./models/todo";
import TodoStore from "./models/todo-store";
import TodoList from "./components/TodoList.vue";
import TodoForm from "./components/TodoForm.vue";

const store = new TodoStore();

export default defineComponent({
  name: "App",
  components: {
    TodoForm,
    TodoList,
  },
  setup(props, { emit }) {
    const todos = ref(store.todos);

    watchEffect(() => {
      store.todos = todos.value;
    });

    const onSubmit = ({ name }) => {
      const todo = TodoModel.new(name);
      todos.value.unshift(todo);
    };

    const onStart = (todoId) => {
      todos.value = todos.value.map((todo: Todo) =>
        todo.id === todoId ? TodoModel.start(todo) : todo
      );
    };

    const onPause = (todoId) => {
      todos.value = todos.value.map((todo: Todo) =>
        todo.id === todoId ? TodoModel.pause(todo) : todo
      );
    };

    const onComplete = (todoId) => {
      todos.value = todos.value.map((todo: Todo) =>
        todo.id === todoId ? TodoModel.stop(todo) : todo
      );
    };

    const onDelete = (todoId) => {
      const proceed = window.confirm(
        "Are you sure you want to delete this todo? This process is irreversible."
      );
      if (!proceed) return;
      todos.value = todos.value.filter((todo: Todo) => todo.id !== todoId);
    };

    return { todos, onSubmit, onStart, onPause, onComplete, onDelete };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 40rem;
  margin: auto;
  padding: 1rem;
}
</style>
