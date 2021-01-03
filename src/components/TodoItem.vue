<template>
  <div class="todo-item">
    <Calendar v-if="!!todo.createdAt" :value="todo.createdAt"></Calendar>

    <div>
      <span :class="{ stop }">
        {{ todo.name }}
      </span>
      <Timer
        :start="todo.startedAt"
        :end="todo.completedAt"
        :play="play"
        :offset="todo.elapsedMs"
      />
      <div class="tag-container">Created {{ createdAt }}</div>
      <textarea
        class="note"
        placeholder="Add notes"
        v-model="note"
        @blur="onBlur"
      >
      </textarea>
    </div>

    <div class="todo-item-footer">
      <PlayIcon
        v-if="!stop"
        :paused="inProgress"
        @click="$emit(idle ? 'todo:start' : 'todo:pause', todo.id)"
      ></PlayIcon>
      <button
        class="icon"
        title="Done"
        @click="$emit('todo:stop', todo.id)"
        v-if="started"
      >
        ✓
      </button>
      <button
        class="icon"
        title="Delete"
        @click="$emit('todo:delete', todo.id)"
      >
        ✗
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from "vue";

// Models.
import { formatDate } from "../models/date";
import type { Todo } from "../models/todo";
import TodoStatus from "../models/todo-status";

// Components.
import Timer from "./Timer.vue";
import Calendar from "./Calendar.vue";
import PlayIcon from "./PlayIcon.vue";

export default defineComponent({
  name: "TodoItem",
  components: {
    Calendar,
    PlayIcon,
    Timer,
  },
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  emits: [
    "todo:start",
    "todo:stop",
    "todo:pause",
    "todo:delete",
    "todo:updateNote",
  ],
  setup(props, { emit }) {
    const note = ref(props.todo.note);

    // Computed statuses.
    const stop = computed(() => props.todo.status === TodoStatus.Completed);
    const idle = computed(() => props.todo.status === TodoStatus.Idle);
    const inProgress = computed(
      () => props.todo.status === TodoStatus.InProgress
    );
    const started = computed(
      () => !!props.todo.startedAt && props.todo.status !== TodoStatus.Completed
    );

    const play = computed(
      () =>
        !!props.todo.startedAt && props.todo.status === TodoStatus.InProgress
    );
    const createdAt = computed(() => formatDate(props.todo.createdAt));

    const onBlur = () => {
      emit("todo:updateNote", props.todo.id, note.value);
    };

    return {
      stop,
      idle,
      inProgress,
      play,
      started,
      createdAt,
      note,
      onBlur,
    };
  },
});
</script>

<style scoped>
.todo-item {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-column-gap: 1rem;
  align-items: flex-start;
}

.stop {
  text-decoration: line-through;
}

.icon {
  appearance: none;
  background: transparent;
  min-width: 2rem;
  min-height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
}

.todo-item-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.5rem;
  align-items: center;
}

.tag-container {
  font-size: small;
  font-family: "Courier New";
  color: #666;
}

.note {
  width: 100%;
  appearance: none;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0.5rem;
}
</style>
