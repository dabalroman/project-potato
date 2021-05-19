import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Item {
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
     * Create new object
     * @param name
     * @param price
     * @param amount
     * @param state
     * @param description
     * @param source
     * @param category
     * @return Item
     */


    create(name, price, amount, state, description, source, category) {
        return (new Item()).populate(null, name, price, amount, state, description, source, category);
    }

    /**
     * Populate object with data
     * @param id
     * @param name
     * @param price
     * @param amount
     * @param state
     * @param description
     * @param source
     * @param category
     * @param last_edit_by
     * @param created_at
     * @param updated_at
     * @return Item
     */
    populate(id, name, price, amount, state, description, source, category,
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
     * @return Category[]
     */
    static getAll() {
        let items = [];

        Api.get(function (responseData) {
            responseData.forEach(data => {
                items.push(
                    (new Item()).populate(
                        data.id,
                        data.name,
                        data.price,
                        data.amount,
                        data.state,
                        data.description,
                        data.source,
                        data.category,
                        data.last_edit_by,
                        data.created_at,
                        data.updated_at
                    )
                );
            });
        }, ApiUrls.items);

        return items;
    }

    /**
     * Get one category from DB by id
     * This is async task, data won't be available immediately
     * @param id
     * @return Item
     */
    static getById(id) {
        let item = new Item();

        Api.get(function (responseData) {
            item.populate(
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
        }, ApiUrls.items, id);

        return item;
    }

    /**
     * Save object to DB
     */
    save() {
        let data = {
            'name': this.name
        };

        if (this.id !== null) {
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
