import { getInventory, saveInventory } from "./storage.js";

class Inventory {
  constructor() {
    // Use jQuery $.extend to clone, optional
    this._items = $.extend(true, [], getInventory()); 
  }

  get items() {
    return this._items;
  }

  add(name, quantity) {
    const newItem = {
      _id: Date.now(),
      _name: name,
      _quantity: quantity,
      _checked: false
    };
    this._items.push(newItem);
    this._save();
    return newItem;
  }

  delete(id) {
    this._items = $.grep(this._items, function(item) {
      return item._id !== id;
    });
    this._save();
  }

  update(id, name, quantity) {
    const item = this.findById(id);
    if (item) {
      item._name = name;
      item._quantity = quantity;
      this._save();
    }
    return item;
  }

  findById(id) {
    return $.grep(this._items, function(item){
      return item._id === id;
    })[0]; // grep returns array
  }

  toggleChecked(id) {
    const item = this.findById(id);
    if (item) {
      item._checked = !item._checked;
      this._save();
    }
    return item;
  }

  _save() {
    saveInventory(this._items);
  }
}

export default Inventory;