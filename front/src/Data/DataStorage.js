import DataContainer from '@/Data/DataContainer';
import Item from '@/Model/Item';

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
        this.users = new DataContainer(DataContainer.TYPE_USER);
    }

    loadData () {
        this.items.load(this.onDataAvailable.bind(this));
        this.sources.load(this.onDataAvailable.bind(this));
        this.categories.load(this.onDataAvailable.bind(this));
        this.users.load(this.onDataAvailable.bind(this));
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
        return this.items.ready
            && this.sources.ready
            && this.categories.ready
            && this.users.ready;
    }

    /**
     * @return {?Category[]}
     */
    getCategories () {
        return this.categories.data;
    }

    /**
     * @return {{text: string, value: number}[]}
     */
    getCategorySelectData () {
        return this.categories.data.map(category => {return {value: category.id, text: category.name}});
    }

    /**
     * @return {?Source[]}
     */
    getSources () {
        return this.sources.data;
    }

    /**
     * @return {{text: string, value: number}[]}
     */
    getSourcesSelectData () {
        return this.sources.data.map(category => {return {value: category.id, text: category.name}});
    }

    /**
     * @return {?Item[]}
     */
    getItems () {
        return this.items.data;
    }

    /**
     * @param {?Item} item
     * @return {
     * [{icon: string, text: string, value: number, class: string}]
     * |{icon: string, text: string, value: number, class: string}
     * }
     */
    getItemStateSelectData (item = null) {
        return Item.getItemStateData(item);
    }

    /**
     * @return {?User[]}
     */
    getUsers () {
        return this.users.data;
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
     * @param {number} id
     * @return {User|undefined}
     */
    getUser (id) {
        return this.users.data.find(user => user.id === id);
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
