import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';
import readonly from '@/utils/readonly';

// noinspection JSUnusedGlobalSymbols,DuplicatedCode
export default class Item {
  @readonly
  static STATE_OK = 0;
  @readonly
  static STATE_BORROWED = 1;
  @readonly
  static STATE_BROKEN = 2;

  @readonly
  static NULL_ID = -1;
  @readonly
  static NEW_ITEM_ID = 0;

  id;
  name;
  price;
  amount;
  state;
  description;
  source;
  category;
  last_edit_by;
  created_at;
  updated_at;

  ready = false;

  /**
   * Create new empty object
   * @param {DataStorage} dataStorage
   * @return Item
   */
  static createEmpty (dataStorage) {
    return (new Item()).populate(
      Item.NEW_ITEM_ID,
      '',
      0,
      1,
      this.STATE_OK,
      '',
      dataStorage.sources.data.find(() => true).id,
      dataStorage.categories.data.find(() => true).id,
      dataStorage.getLoggedUser().id
    );
  }

  /**
   * Create new object
   * @param {string} name
   * @param {number} price
   * @param {number} amount
   * @param {number} state
   * @param {string} description
   * @param {number} source
   * @param {number} category
   * @param {number} last_edit_by
   * @return Item
   */
  static create (name, price, amount, state, description, source, category, last_edit_by) {
    return (new Item()).populate(null, name, price, amount, state, description, source, category, last_edit_by);
  }

  /**
   * Populate object with data
   * @param {?number} id
   * @param {string} name
   * @param {number} price
   * @param {number} amount
   * @param {number} state
   * @param {string} description
   * @param {number} source
   * @param {number} category
   * @param {?number} last_edit_by
   * @param {?string} created_at
   * @param {?string} updated_at
   * @return Item
   */
  populate (id, name, price, amount, state, description, source, category,
    last_edit_by = null, created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.state = state;
    this.description = description;
    this.source = source;
    this.category = category;
    this.last_edit_by = last_edit_by;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.ready = true;
    return this;
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @param {?function} callback
   * @return Item[]
   */
  static getAll (callback = null) {
    let items = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        items.push(
          (new Item()).populateWithApiResponse(data)
        );
      });

      if (callback) {
        callback(responseData.length);
      }
    }, ApiUrls.items);

    return items;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param {number} id
   * @param {?function} callback
   * @return Item
   */
  static getById (id, callback = null) {
    let item = new Item();

    Api.get(function (responseData) {
      item.populateWithApiResponse(responseData);
    }, ApiUrls.items, id);

    if (callback) {
      callback();
    }

    return item;
  }

  /**
   * @param responseData
   */
  populateWithApiResponse (responseData) {
    return this.populate(
      responseData.id,
      responseData.name,
      responseData.price,
      responseData.amount,
      responseData.state,
      responseData.description,
      responseData.source,
      responseData.category,
      responseData.last_edit_by,
      responseData.created_at,
      responseData.updated_at
    );
  }

  /**
   * Save object to DB
   * @param {?function} callback
   */
  save (callback = null) {
    let data = {
      'name': this.name,
      'price': this.price,
      'amount': this.amount,
      'state': this.state,
      'description': this.description,
      'source': this.source,
      'category': this.category
    };

    if (this.id === null || this.id === Item.NEW_ITEM_ID) {
      Api.post(response => {
        this.populateWithApiResponse(response);

        if (callback) {
          callback(this);
        }
      }, ApiUrls.items, data);
    } else {
      Api.put(response => {
        this.populateWithApiResponse(response);

        if (callback) {
          callback(this);
        }
      }, ApiUrls.items, this.id, data);
    }
  }

  /**
   * Delete object from DB if no any foreign-key dependencies
   * Does not delete this instance
   * @param {?function} callback
   */
  delete (callback = null) {
    Api.delete(() => {
      if (callback) {
        callback();
      }
    }, ApiUrls.items, this.id);
  }

  /**
   * @param {?Item} item
   * @return {
   * [{icon: string, text: string, value: number, class: string}]
   * |{icon: string, text: string, value: number, class: string}
   * }
   */
  static getItemStateData (item = null) {
    let stateData = [
      {
        value: Item.STATE_OK,
        text: 'OK',
        icon: 'circle-fill',
        class: 'green'
      },
      {
        value: Item.STATE_BORROWED,
        text: 'Pożyczony',
        icon: 'slash-circle-fill',
        class: 'yellow'
      },
      {
        value: Item.STATE_BROKEN,
        text: 'Zepsuty',
        icon: 'x-circle-fill',
        class: 'red'
      },
    ];

    if (item === null) {
      return stateData;
    }

    return stateData.find(state => state.value === item.state);
  }
}
