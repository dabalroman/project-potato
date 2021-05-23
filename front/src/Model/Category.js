import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Category {
  id;
  name;
  created_at;
  updated_at;
  items;

  ready = false;

  /**
   * Create new object
   * @param {string} name
   * @return Category
   */
  static create (name) {
    return (new Category()).populate(null, name);
  }

  /**
   * Populate object with data
   * @param {?number} id
   * @param {string} name
   * @param {number[]} items
   * @param {?string} created_at
   * @param {?string} updated_at
   * @return Category
   */
  populate (id, name, items = [], created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.ready = true;
    return this;
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @param {?function} callback
   * @return Category[]
   */
  static getAll (callback = null) {
    let categories = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        categories.push(
          (new Category()).populate(
            data.id,
            data.name,
            data.items,
            data.created_at,
            data.updated_at
          )
        );
      });

      if (callback) {
        callback(responseData.length);
      }
    }, ApiUrls.categories);

    return categories;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param {number} id
   * @param {?function} callback
   * @return Category
   */
  static getById (id, callback = null) {
    let category = new Category();

    Api.get(function (responseData) {
      category.populate(
        responseData.id,
        responseData.name,
        responseData.items,
        responseData.created_at,
        responseData.updated_at
      );
    }, ApiUrls.categories, id);

    if (callback) {
      callback();
    }

    return category;
  }

  /**
   * Save object to DB
   */
  save () {
    let data = {
      'name': this.name
    };

    if (this.id == null) {
      Api.post(null, ApiUrls.categories, data);
    } else {
      Api.put(null, ApiUrls.categories, this.id, data);
    }
  }

  /**
   * Delete object from DB if no any foreign-key dependencies
   * Does not delete this instance
   */
  delete () {
    Api.delete(null, ApiUrls.categories, this.id);
  }
}
