import Auth from '@/Model/Auth';

export default class Api {
  /**
   * @return {{Authorization: (string|string), 'Content-type': string, Accept: string, 'Cache-Control': string}}
   */
  static getHeaders () {
    return {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': Auth.getBearerToken()
    };
  }

  /**
   * Make HTTP request
   * @param method
   * @param url
   * @param headers Object with headers as key: value
   * @param body
   * @param {function} callback Function to call after successful request
   * @param {function} errorCallback Function to call after failed request
   */
  static makeRequest (method, url, headers, body, callback, errorCallback = null) {
    let params = {
      method: method,
      headers: headers
    };

    if (body !== null) {
      params.body = JSON.stringify(body);
    }

    fetch(url, params)
      .then(response => this.handleErrors(response, errorCallback))
      .then(response => response.text())
      .then(response => response ? JSON.parse(response) : {})
      .then(response => {
        if (callback !== null) {
          callback(response);
        }
      })
      .catch(error => {
        error = error.toString();
        if (errorCallback) {
          errorCallback(
            parseInt(error.slice(error.indexOf(':') + 2, error.indexOf(':') + 5))
          );
        } else {
          console.warn(error);
        }
      });
  }

  /**
   * Make GET request
   * @param callback
   * @param url
   * @param id
   */
  static get (callback, url, id = null) {
    if (id !== null) {
      url += '/' + id;
    }

    this.makeRequest('GET', url, this.getHeaders(), null, callback);
  }

  /**
   * Make POST request
   * @param callback
   * @param url
   * @param data
   * @param errorCallback
   */
  static post (callback, url, data, errorCallback = null) {
    this.makeRequest('POST', url, this.getHeaders(), data, callback, errorCallback);
  }

  /**
   * Make PUT request
   * @param callback
   * @param url
   * @param id
   * @param data
   */
  static put (callback, url, id, data) {
    url += '/' + id;

    this.makeRequest('PUT', url, this.getHeaders(), data, callback);
  }

  /**
   * Make DELETE request
   * @param callback
   * @param url
   * @param id
   */
  static delete (callback, url, id) {
    url += '/' + id;

    this.makeRequest('DELETE', url, this.getHeaders(), null, callback);
  }

  static handleErrors (response) {
    if (!response.ok) {
      throw Error(response.status + ': Request failed with' + response.statusText);
    }

    return response;
  }
}
