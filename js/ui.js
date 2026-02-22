class UI {
  constructor($listElement) {
    this._list = $listElement; // jQuery object
  }

  renderItems(items) {
    this._list.empty(); // clear the list

    items.forEach(item => {
      const $li = $("<li>");

      if (item._checked) {
        $li.addClass("checked");
      }

      $li.html(`
        <input type="checkbox" class="item-checkbox" data-id="${item._id}" ${item._checked ? "checked" : ""}>
        <span class="item-name">${item._name}</span>
        <span class="item-qty">(${item._quantity})</span>
        <button class="edit-btn" data-id="${item._id}">Edit</button>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
      `);

      this._list.append($li);
    });
  }

  showEditForm($li, item) {
    // $li is a jQuery object
    $li.html(`
      <input class="edit-name" type="text" value="${item._name}" />
      <input class="edit-qty" type="number" value="${item._quantity}" min="1" />
      <button class="save-btn" data-id="${item._id}">Save</button>
      <button class="cancel-btn" data-id="${item._id}">Cancel</button>
    `);
  }

  getEditValues($li) {
    const name = $li.find(".edit-name").val().trim();
    const quantity = parseInt($li.find(".edit-qty").val());
    return { name, quantity };
  }
}

export default UI;