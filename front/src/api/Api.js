import Auth from '@/Model/Auth';

export default class Api {
  static getHeaders () {
    return {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': Auth.getToken()
    };
  }

  static makeRequest (method, url, headers, body, callback) {
    let params = {
      method: method,
      headers: headers
    };

    if (body !== null) {
      params.body = JSON.stringify(body);
    }

    fetch(url, params)
      .then(response => {
        if (!response.ok) {
          console.warn('Request to' + url + ' failed with code ' + response.status);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        if (callback !== null) {
          callback(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  static get (callback, url, id = null) {
    if (id !== null) {
      url += '/' + id;
    }

    this.makeRequest('GET', url, this.getHeaders(), null, callback);
  }

  static post (callback, url, data) {
    this.makeRequest('POST', url, this.getHeaders(), data, callback);
  }

  static put (callback, url, id, data) {
    this.makeRequest('PUT', url, this.getHeaders(), data, callback);
  }

  static delete (callback, url, id) {
    url += '/' + id;

    this.makeRequest('DELETE', url, this.getHeaders(), null, callback);
  }
}
