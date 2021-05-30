import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';
import readonly from '@/utils/readonly';

// noinspection JSUnusedGlobalSymbols,DuplicatedCode
export default class User {
  @readonly
  static ROLE_ADMIN = 0;
  @readonly
  static ROLE_MERE_MORTAL = 1;

  id;
  name;
  email;
  password;
  created_at;
  updated_at;

  ready = false;

  /**
   * Create new object
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {number} role
   * @return User
   */
  static create (name, email, password, role) {
    return (new User()).populate(null, name, email, password, role);
  }

  /**
   * Populate object with data
   * @param {?number} id
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {number} role
   * @param {?string} created_at
   * @param {?string} updated_at
   * @return User
   */
  populate (id, name, email, password, role, created_at = null, updated_at = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.ready = true;
    return this;
  }

  /**
   * Get all categories from DB
   * This is async task, data won't be available immediately
   * @param {function} callback
   * @return User[]
   */
  static getAll (callback = null) {
    let users = [];

    Api.get(function (responseData) {
      responseData.forEach(data => {
        users.push(
          (new User()).populate(
            data.id,
            data.name,
            data.email,
            data.password,
            data.role,
            data.created_at,
            data.updated_at
          )
        );
      });

      if (callback) {
        callback(responseData.length);
      }
    }, ApiUrls.users);

    return users;
  }

  /**
   * Get one category from DB by id
   * This is async task, data won't be available immediately
   * @param {number} id
   * @param {?function} callback
   * @return User
   */
  static getById (id, callback = null) {
    let user = new User();

    Api.get(function (responseData) {
      user.populate(
        responseData.id,
        responseData.name,
        responseData.email,
        responseData.password,
        responseData.role,
        responseData.created_at,
        responseData.updated_at
      );
    }, ApiUrls.users, id);

    if (callback) {
      callback();
    }

    return user;
  }

  /**
   * Save object to DB
   */
  save () {
    let data = {
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'role': this.role
    };

    if (this.id == null) {
      Api.post(null, ApiUrls.users, data);
    } else {
      Api.put(null, ApiUrls.users, this.id, data);
    }
  }

  /**
   * Delete object from DB if no any foreign-key dependencies
   * Does not delete this instance
   */
  delete () {
    Api.delete(null, ApiUrls.users, this.id);
  }
}
