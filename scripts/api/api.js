class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
    this._data = [];
  }

  /**
   *
   * @param {Array} data - les éléments du tableau doivent avoir un propriété id
   */
  setData(data) {
    this._data = data;
  }

  /**
   * Obtenir le tableau des objets stockés en mémoire
   * Ce tableau est rempli lors de l'instanciation du Singleton
   * @returns Array
   */
  getData() {
    return this._data;
  }

  /**
   * Obtenir un objet stocké dans le tableau en mémoire
   * @param {Number} targetID - les éléments du tableau doivent avoir un propriété id
   * @returns
   */
  getDataByID(targetID) {
    return this._data.find((el) => el.id == targetID);
  }
}
export default Api;
