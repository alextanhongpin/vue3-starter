import TodoModel from "./todo";

export default class TodoStore {
  get todos() {
    try {
      const todosJson = window.localStorage.todos;
      const todos = JSON.parse(todosJson).map(TodoModel.parse);
      return todos;
    } catch (error) {
      window.localStorage.todos = JSON.stringify([]);
      return [];
    }
  }

  set todos(value = []) {
    const sortedTodos = value.sort(
      (l, r) =>
        new Date(r.createdAt).getTime() - new Date(l.createdAt).getTime()
    );
    window.localStorage.todos = JSON.stringify(sortedTodos);
  }
}
