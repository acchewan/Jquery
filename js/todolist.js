import { getTodoList, saveTodoList } from "./storage.js";

class TodoList {
  constructor() {
    this._items = $.extend(true, [], getTodoList());
  }

  get items() {
    return this._items;
  }

  add(title, date) {
    const newItem = {
      _id: Date.now(),
      _title: title,
      _date: date,
      _completed: false,
    };
    this._items.push(newItem);
    this._save();
    return newItem;
  }

  delete(id) {
    this._items = $.grep(this._items, function (item) {
      return item._id !== id;
    });
    this._save();
  }

  update(id, title, date) {
    const item = this.findById(id);
    if (item) {
      item._title = title;
      item._date = date;
      this._save();
    }
    return item;
  }

  findById(id) {
    return $.grep(this._items, function (item) {
      return item._id === id;
    })[0];
  }

  toggleCompleted(id) {
    const item = this.findById(id);
    if (item) {
      item._completed = !item._completed;
      this._save();
    }
    return item;
  }

  getStats() {
    const total = this._items.length;
    const completed = $.grep(this._items, function (item) {
      return item._completed;
    }).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  }

  _save() {
    saveTodoList(this._items);
  }
}

export default TodoList;
