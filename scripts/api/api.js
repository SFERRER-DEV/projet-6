class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    /** @type {string} le chemin du fichier json contenant les données*/
    this._url = url;
    /** @type {string} le chemin du fichier json contenant les données*/
    this._data = [];
  }

  /**
   * Renseigner les datas
   *
   * @param {Array} data - les éléments de ce tableau doivent avoir une propriété id
   */
  setData(data) {
    this._data = data;
  }

  /**
   * Obtenir le tableau des objets stockés en mémoire
   * Ce tableau est rempli lors de l'instanciation du Singleton
   *
   * @returns Array
   */
  getData() {
    return this._data;
  }

  /**
   * Obtenir un objet stocké dans le tableau en mémoire
   *
   * @param {Number} targetID - les éléments du tableau doivent avoir un propriété id
   * @returns
   */
  getDataByID(targetID) {
    return this._data.find((el) => el.id == targetID);
  }
}
export default Api;
