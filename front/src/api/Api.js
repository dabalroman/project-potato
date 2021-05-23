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
   * @param callback Function to call after successful request
   */
  static makeRequest (method, url, headers, body, callback) {
    let params = {
      method: method,
      headers: headers
    };

    if (body !== null) {
      params.body = JSON.stringify(body);
    }

    fetch(url, params)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(response => {
        if (callback !== null) {
          callback(response);
        }
      })
      .catch(error => {
        console.warn(error);
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
   */
  static post (callback, url, data) {
    this.makeRequest('POST', url, this.getHeaders(), data, callback);
  }

  /**
   * Make PUT request
   * @param callback
   * @param url
   * @param id
   * @param data
   */
  static put (callback, url, id, data) {
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

  static handleErrors(response){
    if (!response.ok) {
      throw Error('Request failed with ' + response.status + ': ' + response.statusText);
    }

    return response;
  }
}
