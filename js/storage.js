// Storage key
const STORAGE_KEY = "todolist";

// Get todo list from sessionStorage
export function getTodoList() {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? $.parseJSON(data) : [];
}

// Save todo list to sessionStorage
export function saveTodoList(todolist) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todolist));
}

// Clear all todos from sessionStorage
export function clearTodoList() {
  sessionStorage.removeItem(STORAGE_KEY);
}
