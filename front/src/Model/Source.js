import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

// noinspection JSUnusedGlobalSymbols,DuplicatedCode
export default class Source {
  id;
  name;
  created_at;
  updated_at;
  items;

  ready = false;

  /**
   * Create new object
   * @param {string} name
   * @return Source
   */
  static create (name) {
    return (new Source()).populate(null, name);
  }

  /**
   * Populate object with data
   * @param {?number} id
   * @param {string} name
   * @param {number[]} items
   * @param {?string} created_at
   * @param {?string} updated_at
   * @return Source
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
   * @param responseData
   */
  populateWithApiResponse (responseData) {
    return this.populate(
      responseData.id,
      responseData.name,
      responseData.items,
      responseData.created_at,
      responseData.updated_at
    );
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @param {?function} callback
   * @return Source[]
   */
  static getAll (callback = null) {
    let sources = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        sources.push(
          (new Source()).populateWithApiResponse(data)
        );
      });

      if (callback) {
        callback(responseData.length);
      }
    }, ApiUrls.sources);

    return sources;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param id
   * @param {function} callback
   * @return Source
   */
  static getById (id, callback = null) {
    let source = new Source();

    Api.get(function (responseData) {
      source.populateWithApiResponse(responseData)
    }, ApiUrls.sources, id);

    if (callback) {
      callback();
    }

    return source;
  }

  /**
   * Save object to DB
   * @param {function} callback
   */
  save (callback = null) {
    let data = {
      'name': this.name
    };

    if (this.id == null) {
      Api.post(response => {
        this.populateWithApiResponse(response);

        if (callback) {
          callback(this);
        }
      }, ApiUrls.sources, data);
    } else {
      Api.put(response => {
        this.populateWithApiResponse(response);

        if (callback) {
          callback(this);
        }
      }, ApiUrls.sources, this.id, data);
    }
  }

  /**
   * Delete object from DB if no any foreign-key dependencies
   * Does not delete this instance
   */
  delete () {
    Api.delete(null, ApiUrls.sources, this.id);
  }
}
