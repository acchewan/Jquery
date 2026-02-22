import Inventory from "./inventory.js";
import UI from "./ui.js";

// Initialize
const inventory = new Inventory();
const ui = new UI($("#item-list")); // jQuery object

const $form = $("#item-form");
const $nameInput = $("#item-name");
const $qtyInput = $("#item-qty");

// Helper to re-render
const render = () => ui.renderItems(inventory.items);

// Initial render
render();

// Add new item
$form.on("submit", function(e) {
    e.preventDefault();

    const itemName = $nameInput.val().trim();
    const quantity = parseInt($qtyInput.val());

    inventory.add(itemName, quantity);
    render();
    $form[0].reset(); // reset native form
});

// Handle list clicks (delete, edit, save, cancel, checkbox)
$("#item-list").on("click", "button, .item-checkbox", function(e) {
    const $target = $(e.target);
    const id = parseInt($target.data("id")); // jQuery .data() for data-id
    const item = inventory.findById(id);

    // Delete
    if ($target.hasClass("delete-btn")) {
        inventory.delete(id);
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
        const { name, quantity } = ui.getEditValues($li);

        if (name && quantity) {
            inventory.update(id, name, quantity);
            render();
        }
    }

    // Cancel
    if ($target.hasClass("cancel-btn")) {
        render();
    }

    // Checkbox toggle
    if ($target.hasClass("item-checkbox")) {
        inventory.toggleChecked(id);
        render();
    }
});