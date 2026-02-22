import TodoList from "./todolist.js";
import UI from "./ui.js";

const todoList = new TodoList();
const ui = new UI($("#item-list"));

const $form = $("#item-form");
const $nameInput = $("#item-name");
const $dateInput = $("#item-date");

const render = () => {
  ui.renderItems(todoList.items);
  const stats = todoList.getStats();
  ui.updateStats(stats.total, stats.completed, stats.percentage);
};

render();

// Helper function to parse dd/mm/yyyy to YYYY-MM-DD (for edit form text input)
const parseDateInput = (dateStr) => {
  if (!dateStr) return "";
  // If already in YYYY-MM-DD format, return as is
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }
  // Parse dd/mm/yyyy format
  const parts = dateStr.trim().split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return dateStr;
};

$form.on("submit", function (e) {
  e.preventDefault();

  const taskTitle = $nameInput.val().trim();
  const dueDate = $dateInput.val().trim() || "";

  if (!taskTitle) {
    alert("Please enter a task");
    return;
  }

  todoList.add(taskTitle, dueDate);
  render();
  $form[0].reset();
});

// Handle list clicks (delete, edit, save, cancel, checkbox)
$("#item-list").on("click", "button, .item-checkbox", function (e) {
  const $target = $(e.target);
  const id = parseInt($target.data("id"));
  const item = todoList.findById(id);

  // Delete
  if ($target.hasClass("delete-btn")) {
    todoList.delete(id);
    render();
  }

  // Edit
  if ($target.hasClass("edit-btn")) {
    const $li = $target.parent();
    ui.showEditForm($li, item);
  }

  // Save
  if ($target.hasClass("save-btn")) {
    const $li = $target.parent();
    const { title, date } = ui.getEditValues($li);

    if (title) {
      const dueDate = date ? parseDateInput(date) : "";
      todoList.update(id, title, dueDate);
      render();
    }
  }

  // Cancel
  if ($target.hasClass("cancel-btn")) {
    render();
  }

  if ($target.hasClass("item-checkbox")) {
    todoList.toggleCompleted(id);
    render();
  }
});
