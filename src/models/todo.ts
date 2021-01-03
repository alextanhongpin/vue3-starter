import TodoStatus from "./todo-status";

export interface Todo {
  id: number;
  name: string;
  createdAt: Date;
  startedAt: Date;
  completedAt: Date;
  status: TodoStatus;
  elapsedMs: number;
  note: string;
}

export default class TodoModel {
  static new(name) {
    return {
      id: Date.now(),
      name,
      note: "",
      createdAt: new Date(),
      status: TodoStatus.Idle,
      startedAt: null,
      completedAt: null,
      elapsedMs: 0,
    };
  }

  static start(todo: Todo) {
    return {
      ...todo,
      status: TodoStatus.InProgress,
      startedAt: new Date(),
      completedAt: null,
    };
  }

  static pause(todo: Todo) {
    const elapsedMs = Date.now() - todo.startedAt.getTime();
    return {
      ...todo,
      status: TodoStatus.Idle,
      startedAt: new Date(),
      elapsedMs: todo.elapsedMs + (elapsedMs - (elapsedMs % 1000)),
    };
  }

  static stop(todo: Todo) {
    const completedAt = new Date();
    const elapsedMs = new Date(completedAt - todo.startedAt).getTime();
    return {
      ...todo,
      status: TodoStatus.Completed,
      completedAt,
      elapsedMs: todo.elapsedMs + (elapsedMs - (elapsedMs % 1000)),
    };
  }

  static parse(json) {
    const todo = TodoModel.new(json.name);
    todo.id = json.id;
    todo.status = json.status as TodoStatus;
    todo.note = json.note;
    todo.elapsedMs = json.elapsedMs || 0;
    todo.createdAt = json.createdAt ? new Date(json.createdAt) : null;
    todo.startedAt = json.startedAt ? new Date(json.startedAt) : null;
    todo.completedAt = json.completedAt ? new Date(json.completedAt) : null;
    return todo;
  }

  static updateNote(todo: Todo, note: string) {
    return {
      ...todo,
      note,
    };
  }
}
