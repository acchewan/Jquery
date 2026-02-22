const STORAGE_KEY = "todolist";

export function getTodoList() {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? $.parseJSON(data) : [];
}

export function saveTodoList(todolist) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todolist));
}

export function clearTodoList() {
  sessionStorage.removeItem(STORAGE_KEY);
}
