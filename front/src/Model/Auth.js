import Api from '@/api/Api';
import ApiUrls from '@/api/ApiUrls';
import readonly from '@/utils/readonly';

// noinspection JSUnusedGlobalSymbols,DuplicatedCode
export default class Auth {
  @readonly
  LOCAL_STORAGE_USER_ID = 'userId';
  @readonly
  LOCAL_STORAGE_TOKEN = 'token';
  @readonly
  LOCAL_STORAGE_TOKEN_EXPIRATION_DATE = 'tokenExpirationDate';

  loggedIn = false;
  loggedAsId = null;

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
        this.loggedAsId = parseInt(localStorage.getItem(this.LOCAL_STORAGE_USER_ID));
      } else {
        localStorage.removeItem(this.LOCAL_STORAGE_USER_ID);
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

    Api.post((data) => {
        let tokenExpirationDate = new Date();
        tokenExpirationDate.setTime(tokenExpirationDate.getTime() + data['expires_in'] * 1000);

        localStorage.setItem(this.LOCAL_STORAGE_USER_ID, data['user'].id);
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN, data['access_token']);
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN_EXPIRATION_DATE, tokenExpirationDate.toUTCString());

        this.loggedIn = true;
        this.loggedAsId = data['user'].id;
        this.tokenExpirationDate = tokenExpirationDate;
      },
      ApiUrls.auth.base + ApiUrls.auth.login,
      data,
      () => {
        alert('Błędne dane logowania');
      });
  }

  logout () {
    this.loggedIn = false;
    localStorage.removeItem(this.LOCAL_STORAGE_USER_ID);
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_EXPIRATION_DATE);
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
