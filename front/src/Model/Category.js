import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Category {
  id;
  name;
  created_at;
  updated_at;

  /**
   * Crate category object
   * @param name
   * @param id
   * @param created_at
   * @param updated_at
   */
  constructor (name, id = null, created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @return {Category[]}
   */
  static getAll () {
    let categories = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        categories.push(new Category(data.name, data.id, data.created_at, data.updated_at));
      });
    }, ApiUrls.categories);

    return categories;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param id
   * @return {Category}
   */
  static getById (id) {
    let category = new Category();

    Api.get(function (responseData) {
      category = new Category(responseData.name, responseData.id, responseData.created_at, responseData.updated_at);
    }, ApiUrls.categories, id);

    return category;
  }

  /**
   * Save object to DB
   */
  save () {
    let data = {
      'name': this.name
    };

    if(this.id !== null){
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
