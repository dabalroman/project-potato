import DataContainer from '@/Data/DataContainer';

export default class DataStorage {
  /** @type {DataContainer} */
  items;
  /** @type {DataContainer} */
  sources;
  /** @type {DataContainer} */
  users;
  /** @type {DataContainer} */
  categories;

  /** @type {Boolean} */
  ready = false;

  constructor () {
    this.items = new DataContainer(DataContainer.TYPE_ITEM);
    this.sources = new DataContainer(DataContainer.TYPE_SOURCE);
    this.categories = new DataContainer(DataContainer.TYPE_CATEGORY);
  }

  loadData () {
    this.items.load(this.onDataAvailable.bind(this));
    this.sources.load(this.onDataAvailable.bind(this));
    this.categories.load(this.onDataAvailable.bind(this));
  }

  onDataAvailable () {
    this.ready = this.isReady();

    if (this.ready) {
      console.log('Data storage ready.');
    }
  }

  /**
   * @return {boolean}
   */
  isReady () {
    return this.items.ready && this.sources.ready && this.categories.ready;
  }

  /**
   * @return {?Category[]}
   */
  getCategories () {
    return this.categories.data;
  }

  /**
   * @return {?Source[]}
   */
  getSources () {
    return this.sources.data;
  }

  /**
   * @return {?Item[]}
   */
  getItems () {
    return this.items.data;
  }

  /**
   * @param {Category} category
   * @return {Item[]}
   */
  getArrayOfItemsFromCategory (category) {
    return this.items.data.filter(item => category.items.includes(item.id));
  }

  /**
   * @param {number} id
   * @return {Item|undefined}
   */
  getItem (id) {
    return this.items.data.find(item => item.id === id);
  }

  /**
   * @param {Item} item
   * @return {Source|undefined}
   */
  getSourceForItem (item) {
    return this.sources.data.find(source => source.id === item.source);
  }

  /**
   * @param {Item} item
   * @return {Source|undefined}
   */
  getCategoryForItem (item) {
    return this.categories.data.find(category => category.id === item.category);
  }
}
