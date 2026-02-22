class UI {
  constructor($listElement) {
    this._list = $listElement;
  }

  renderItems(items) {
    this._list.empty();

    if (items.length === 0) {
      this._list.html(
        `<div id="empty-message">No todos yet. Add one to get started!</div>`,
      );
      return;
    }

    items.forEach((item) => {
      const $li = $("<li>");

      if (item._completed) {
        $li.addClass("checked");
      }

      const formattedDate = this._formatDate(item._date);

      $li.html(`
        <input type="checkbox" class="item-checkbox" data-id="${item._id}" ${item._completed ? "checked" : ""}>
        <span class="item-name">${this._escapeHtml(item._title)}</span>
        <span class="item-date">${formattedDate}</span>
        <button class="edit-btn" data-id="${item._id}">Edit</button>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
      `);

      this._list.append($li);
    });
  }

  showEditForm($li, item) {
    $li.html(`
      <input class="edit-name" type="text" value="${this._escapeHtml(item._title)}" />
      <input class="edit-date" type="date" value="${item._date}" />
      <button class="save-btn" data-id="${item._id}">Save</button>
      <button class="cancel-btn" data-id="${item._id}">Cancel</button>
    `);
  }

  getEditValues($li) {
    const title = $li.find(".edit-name").val().trim();
    const date = $li.find(".edit-date").val();
    return { title, date };
  }

  updateStats(total, completed, percentage) {
    $("#total-count").text(total);
    $("#completed-count").text(completed);
    $("#percentage-count").text(percentage);
  }

  _formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  }

  _escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  }
}

export default UI;
