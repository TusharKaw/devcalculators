/**
 * Collections Storage Module
 * Uses localStorage for persistent storage of user collections data
 * localStorage is preferable to cookies for this use case as:
 * 1. It offers more storage space (5MB vs 4KB for cookies)
 * 2. Data isn't sent with every HTTP request (better performance)
 * 3. No expiration date (persists until explicitly cleared)
 * 4. Modern browsers support it well
 */

const STORAGE_KEY = "userCollections";
const TOOLS_DATA_KEY = "userToolsData";

/**
 * Save collections data to localStorage
 * @param {Array} collections - The collections data to save
 * @returns {boolean} - Success status
 */
export const saveCollections = (collections) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    return true;
  } catch (error) {
    console.error("Error saving collections to localStorage:", error);
    return false;
  }
};

/**
 * Get collections data from localStorage
 * @returns {Array} - The collections data or empty array if none exists
 */
export const getCollections = () => {
  try {
    const collections = localStorage.getItem(STORAGE_KEY);
    return collections ? JSON.parse(collections) : [];
  } catch (error) {
    console.error("Error retrieving collections from localStorage:", error);
    return [];
  }
};

/**
 * Save tool data to localStorage
 * @param {Object} toolData - The tool data object
 * @returns {boolean} - Success status
 */
export const saveToolsData = (toolData) => {
  try {
    localStorage.setItem(TOOLS_DATA_KEY, JSON.stringify(toolData));
    return true;
  } catch (error) {
    console.error("Error saving tools data to localStorage:", error);
    return false;
  }
};

/**
 * Get tool data from localStorage
 * @returns {Object} - The tool data object or empty object if none exists
 */
export const getToolsData = () => {
  try {
    const toolsData = localStorage.getItem(TOOLS_DATA_KEY);
    return toolsData ? JSON.parse(toolsData) : {};
  } catch (error) {
    console.error("Error retrieving tools data from localStorage:", error);
    return {};
  }
};

/**
 * Add a new collection
 * @param {string} name - Collection name
 * @returns {Object} - The newly created collection
 */
export const addCollection = (name) => {
  try {
    const collections = getCollections();
    const newId = collections.length > 0 
      ? Math.max(...collections.map(c => c.id)) + 1 
      : 1;
    
    const newCollection = {
      id: newId,
      name,
      items: [],
      createdAt: new Date().toISOString()
    };
    
    collections.push(newCollection);
    saveCollections(collections);
    return newCollection;
  } catch (error) {
    console.error("Error adding collection:", error);
    return null;
  }
};

/**
 * Add an item to a collection
 * @param {number} collectionId - The collection ID
 * @param {number} itemId - The item to add
 * @returns {boolean} - Success status
 */
export const addToCollection = (collectionId, itemId) => {
  try {
    const collections = getCollections();
    const collection = collections.find(c => c.id === collectionId);
    
    if (!collection) return false;
    
    // Prevent duplicates
    if (!collection.items.includes(itemId)) {
      collection.items.push(itemId);
      collection.updatedAt = new Date().toISOString();
      saveCollections(collections);
    }
    
    return true;
  } catch (error) {
    console.error("Error adding item to collection:", error);
    return false;
  }
};

/**
 * Remove an item from a collection
 * @param {number} collectionId - The collection ID
 * @param {number} itemId - The item to remove
 * @returns {boolean} - Success status
 */
export const removeFromCollection = (collectionId, itemId) => {
  try {
    const collections = getCollections();
    const collection = collections.find(c => c.id === collectionId);
    
    if (!collection) return false;
    
    collection.items = collection.items.filter(id => id !== itemId);
    collection.updatedAt = new Date().toISOString();
    saveCollections(collections);
    
    return true;
  } catch (error) {
    console.error("Error removing item from collection:", error);
    return false;
  }
};

/**
 * Delete a collection
 * @param {number} collectionId - The collection ID to delete
 * @returns {boolean} - Success status
 */
export const deleteCollection = (collectionId) => {
  try {
    let collections = getCollections();
    collections = collections.filter(c => c.id !== collectionId);
    saveCollections(collections);
    
    return true;
  } catch (error) {
    console.error("Error deleting collection:", error);
    return false;
  }
};

/**
 * Check if browser supports localStorage
 * @returns {boolean} - Whether localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get the total size of data in localStorage (in KB)
 * @returns {number} - Size in KB
 */
export const getStorageSize = () => {
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length;
    }
  }
  return (totalSize / 1024).toFixed(2);
}; 