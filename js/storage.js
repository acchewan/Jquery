// Storage key
const STORAGE_KEY = "inventory";

// Get inventory from sessionStorage
export function getInventory() {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? $.parseJSON(data) : [];
}

// Save inventory to sessionStorage
export function saveInventory(inventory) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
}

// Clear all inventory from sessionStorage
export function clearInventory() {
    sessionStorage.removeItem(STORAGE_KEY);
}