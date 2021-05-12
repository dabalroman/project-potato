import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Category {
  id;
  name;
  created_at;
  updated_at;

  constructor (name, id = null, created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static getAll () {
    let categories = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        categories.push(new Category(data.name, data.id, data.created_at, data.updated_at));
      });
    }, ApiUrls.categories);

    return categories;
  }

  static getById (id) {
    let category = new Category();

    Api.get(function (responseData) {
      category = new Category(responseData.name, responseData.id, responseData.created_at, responseData.updated_at);
    }, ApiUrls.categories, id);

    return category;
  }

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

  delete () {
    Api.delete(null, ApiUrls.categories, this.id);
  }
}
