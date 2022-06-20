class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
    this._data = [];
  }

  setData(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }
}
export default Api;
