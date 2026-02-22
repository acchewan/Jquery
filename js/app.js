import TodoList from "./todolist.js";
import UI from "./ui.js";

// Initialize
const todoList = new TodoList();
const ui = new UI($("#item-list")); // jQuery object

const $form = $("#item-form");
const $nameInput = $("#item-name");
const $dateInput = $("#item-date");

// Helper to re-render
const render = () => {
  ui.renderItems(todoList.items);
  const stats = todoList.getStats();
  ui.updateStats(stats.total, stats.completed, stats.percentage);
};

// Initial render
render();

// Add new item
$form.on("submit", function (e) {
  e.preventDefault();

  const taskTitle = $nameInput.val().trim();
  const dueDate = $dateInput.val();

  todoList.add(taskTitle, dueDate);
  render();
  $form[0].reset(); // reset native form
});

// Handle list clicks (delete, edit, save, cancel, checkbox)
$("#item-list").on("click", "button, .item-checkbox", function (e) {
  const $target = $(e.target);
  const id = parseInt($target.data("id")); // jQuery .data() for data-id
  const item = todoList.findById(id);

  // Delete
  if ($target.hasClass("delete-btn")) {
    todoList.delete(id);
    render();
  }

  // Edit
  if ($target.hasClass("edit-btn")) {
    const $li = $target.parent();
    ui.showEditForm($li, item); // Pass jQuery object
  }

  // Save
  if ($target.hasClass("save-btn")) {
    const $li = $target.parent();
    const { title, date } = ui.getEditValues($li);

    if (title && date) {
      todoList.update(id, title, date);
      render();
    }
  }

  // Cancel
  if ($target.hasClass("cancel-btn")) {
    render();
  }

  // Checkbox toggle
  if ($target.hasClass("item-checkbox")) {
    todoList.toggleCompleted(id);
    render();
  }
});
