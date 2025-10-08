// Format currency values safely
export const formatCurrency = (num) => {
  if (num == null || isNaN(num)) return "$0.00";
  return `$${Number(num).toFixed(2).toLocaleString()}`;
};

// Calculate total cart value
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0);
};

// Save data to localStorage
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Load data from localStorage
export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from storage", error);
    return null;
  }
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};


