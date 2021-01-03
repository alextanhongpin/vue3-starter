<template>
  <div class="calendar">
    <div class="calendar-header">
      {{ month }}
    </div>

    <div class="calendar-body">
      {{ day }}
      {{ date }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Day, shortDay } from "../models/day";
import { Month, shortMonth } from "../models/month";

export default defineComponent({
  name: "Calendar",
  props: {
    value: {
      type: Date,
      required: true,
    },
  },

  setup(props, { emit }) {
    const date = new Date(props.value);
    return {
      month: shortMonth(date.getMonth() as Month),
      date: date.getDate(),
      day: shortDay(date.getDay() as Day),
    };
  },
});
</script>

<style scoped>
.calendar {
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: small;
  text-align: center;
}

.calendar-header {
  background: #333;
  color: white;
  font-size: 0.6rem;
  font-weight: bold;
  text-transform: uppercase;
}

.calendar-body {
  padding: 0.25rem;
}
</style>
