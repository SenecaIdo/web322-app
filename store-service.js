const fs = require("fs");

const items = [];
const categories = [];





function getAllItems() {
    return new Promise((resolve, reject) => {
      if (items.length === 0) {
        reject("No results returned");
        return;
      }
  
      resolve(items);
    });
  }
  
  function getPublishedItems() {
    return new Promise((resolve, reject) => {
      const publishedItems = items.filter(item => item.published === true);
  
      if (publishedItems.length === 0) {
        reject("No results returned");
        return;
      }
  
      resolve(publishedItems);
    });
  }
  
  function getCategories() {
    return new Promise((resolve, reject) => {
      if (categories.length === 0) {
        reject("No results returned");
        return;
      }
  
      resolve(categories);
    });
  }







function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/items.json', 'utf8', (err, itemsData) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const itemsArray = JSON.parse(itemsData);
        items.push(...itemsArray);

        fs.readFile('./data/categories.json', 'utf8', (err, categoriesData) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            const categoriesArray = JSON.parse(categoriesData);
            categories.push(...categoriesArray);

            resolve();
          } catch (err) {
            reject(err);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = {
    getAllItems,
    getPublishedItems,
    getCategories,
    initialize
  };
