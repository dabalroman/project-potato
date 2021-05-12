import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';

export default class Auth {
  loggedIn = false;
  token = null;
  tokenExpirationDate = null;

  constructor () {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.tokenExpirationDate = Date.parse(localStorage.getItem('tokenExpirationDate'));

      if (new Date() < this.tokenExpirationDate) {
        this.loggedIn = true;
      }
    }
  }

  login (email, password) {
    let data = {
      email: email,
      password: password
    };

    let that = this;
    Api.post(function (data) {
      let tokenExpirationDate = new Date();
      tokenExpirationDate.setTime(tokenExpirationDate.getTime() + data.expires_in * 1000);

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('tokenExpirationDate', tokenExpirationDate.toUTCString());

      that.loggedIn = true;
      that.tokenExpirationDate = tokenExpirationDate;
    }, ApiUrls.auth.base + ApiUrls.auth.login, data);
  }

  static getToken () {
    let token = localStorage.getItem('token');
    return (token !== null) ? 'bearer ' + token : '';
  }
}
