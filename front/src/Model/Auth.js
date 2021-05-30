import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';
import readonly from '@/utils/readonly';

// noinspection JSUnusedGlobalSymbols,DuplicatedCode
export default class Auth {
  @readonly
  LOCAL_STORAGE_TOKEN = 'token';
  @readonly
  LOCAL_STORAGE_TOKEN_EXPIRATION_DATE = 'tokenExpirationDate';

  loggedIn = false;
  token = null;
  tokenExpirationDate = null;

  /**
   * Create Auth object
   * Autologin if valid JWT token is present in localStorage
   */
  constructor () {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.tokenExpirationDate = Date.parse(localStorage.getItem(this.LOCAL_STORAGE_TOKEN_EXPIRATION_DATE));

      if (new Date() < this.tokenExpirationDate) {
        this.loggedIn = true;
      } else {
        localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_EXPIRATION_DATE);
      }
    }
  }

  /**
   * Login to api (retrieve JWT token)
   * Token is stored in localStorage
   * @param {string} email
   * @param {string} password
   */
  login (email, password) {
    let data = {
      email: email,
      password: password
    };

    let that = this;
    Api.post(function (data) {
      let tokenExpirationDate = new Date();
      tokenExpirationDate.setTime(tokenExpirationDate.getTime() + data['expires_in'] * 1000);

      localStorage.setItem(that.LOCAL_STORAGE_TOKEN, data['access_token']);
      localStorage.setItem(that.LOCAL_STORAGE_TOKEN_EXPIRATION_DATE, tokenExpirationDate.toUTCString());

      that.loggedIn = true;
      that.tokenExpirationDate = tokenExpirationDate;
    }, ApiUrls.auth.base + ApiUrls.auth.login, data);
  }

  /**
   * Get JWT token as bearer string
   * Returns empty string if token not found
   * @return string
   */
  static getBearerToken () {
    let token = localStorage.getItem('token');
    return (token !== null) ? 'bearer ' + token : '';
  }
}
