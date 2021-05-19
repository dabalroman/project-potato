import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Source {
  id;
  name;
  created_at;
  updated_at;

  ready = false;

  /**
   * Create new object
   * @param name
   * @return Source
   */
  static create(name) {
    return (new Source()).populate(null, name);
  }

  /**
   * Populate object with data
   * @param id
   * @param name
   * @param created_at
   * @param updated_at
   * @return Source
   */
  populate(id, name, created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.ready = true;
    return this;
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @return Source[]
   */
  static getAll() {
    let sources = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        sources.push(
          (new Source()).populate(
            data.id,
            data.name,
            data.created_at,
            data.updated_at
          )
        );
      });
    }, ApiUrls.items);

    return sources;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param id
   * @return Source
   */
  static getById(id) {
    let source = new Source();

    Api.get(function (responseData) {
      source.populate(
        responseData.id,
        responseData.name,
        responseData.created_at,
        responseData.updated_at
      );
    }, ApiUrls.items, id);

    return source;
  }

  /**
   * Save object to DB
   */
  save() {
    let data = {
      'name': this.name
    };

    if (this.id == null) {
      Api.post(null, ApiUrls.items, data);
    } else {
      Api.put(null, ApiUrls.items, this.id, data);
    }
  }

  /**
   * Delete object from DB if no any foreign-key dependencies
   * Does not delete this instance
   */
  delete() {
    Api.delete(null, ApiUrls.items, this.id);
  }
}
