import readonly from '@/utils/readonly';
import Item from '@/Model/Item';
import Source from '@/Model/Source';
import Category from '@/Model/Category';
import User from '@/Model/User';

export default class DataContainer {
  @readonly
  static TYPE_ITEM = 'item';
  @readonly
  static TYPE_SOURCE = 'source';
  @readonly
  static TYPE_USER = 'user';
  @readonly
  static TYPE_CATEGORY = 'category';

  /** @type {?string} */
  type = null;
  /** @type {*[]} */
  data = [];
  /** @type {boolean} */
  ready = false;
  /** @type {Object} */
  classObj = null;

  constructor (type) {
    try {
      this.type = type;
      this.classObj = DataContainer.#getClass(type);
    } catch (error) {
      console.warn(error.message);
    }
  }

  load (callback = null) {
    this.data = this.classObj.getAll(this.onLoad.bind(this, callback));
  }

  onLoad (callback, dataAmount) {
    if (this.data.length === dataAmount) {
      this.ready = true;
      console.log(`Loaded ${dataAmount} objects of ${this.type} type.`);

      if (callback) {
        callback();
      }
    }
  }

  /**
   * @param {string }type
   * @return {Item|User|Source|Category}
   * @throws Error
   */
  static #getClass (type) {
    switch (type) {
      case DataContainer.TYPE_ITEM:
        return Item;
      case DataContainer.TYPE_SOURCE:
        return Source;
      case DataContainer.TYPE_CATEGORY:
        return Category;
      case DataContainer.TYPE_USER:
        return User;
      default:
        throw Error(`Class ${type} don't exists.`);
    }
  }
}
