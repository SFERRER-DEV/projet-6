import Photographer from "./../models/photographer.js";

let instance;

class PhotograherApi {
  /**
   *
   * @param {string} url le chemin du fichier json contenant les données
   */
  constructor(url) {
    /** @type {string} le chemin du fichier json contenant les données */
    this._url = url;
    /** @type {Photographe[]} une liste d'objets de type Photographe */
    this._data = [];

    if (instance) {
      throw new Error(
        "You can only create one instance of PhotograherApi class !"
      );
    }
    instance = this;
  }

  /**
   * Obtenir le tableau des objets stockés en mémoire
   * Ce tableau est rempli lors de l'instanciation du Singleton
   *
   * @returns {Array<Photographer>} une liste de photographe
   */
  getData() {
    return this._data;
  }

  /**
   * Obtenir un objet photographe stocké dans le tableau en mémoire
   *
   * @param {number} targetID les éléments du tableau doivent avoir un propriété id
   * @returns {Photographer} retourne le photographe trouvé
   */
  getDataByID(targetID) {
    return this._data.find((el) => el.id == targetID);
  }

  /**
   * Renseigner les datas
   *
   * @param {Array} data les données d'un objet json
   */
  setData(data) {
    data.forEach((obj) => {
      let p = new Photographer(
        obj.id,
        obj.name,
        obj.city,
        obj.country,
        obj.tagline,
        obj.price,
        obj.portrait
      );
      this._data.push(p);
    });
  }

  /**
   *
   * @returns
   */
  getInstance() {
    return this;
  }

  /**
   *  Faire une première fois un appel au serveur pour obtenir
   *  la liste des photographes au format JSON
   *  Sinon retourner les photographes obtenus précédement.
   *
   * @returns {*} une liste d'objets json de photographes
   */
  async get() {
    if (Array.isArray(this._data) && !this._data.length) {
      return fetch(this._url)
        .then((res) => res.json())
        .then((res) => res.photographers)
        .catch((err) => console.log("an error occurs", err));
    } else {
      return this.getData();
    }
  }

  /**
   * Rechercher les données d'un photographe à partir de son id
   * par un appel à l'API pour obtenir ce photographe
   * depuis le fichier JSON.
   *
   * @param {number} targetID l'identifiant d'un photographe
   * @returns {*} un objet json contenant un photographe
   */
  async getById(targetID) {
    // Appel API  pour obtenir le photgraphe
    let photographer = fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.photographers)
      .then((res) =>
        res.filter(function (el) {
          return el.id == targetID;
        })
      )
      .then((res) => res[0]) // Array
      .catch((err) => console.log("an error occurs", err));

    return photographer;
  }
}

/** @type {PhotograherApi} Singleton API Photographe pour lire le fichier JSON */
const singletonPhotograherApi = new PhotograherApi("data/photographers.json");
// Renseigner le tableau en mémoire dans le singleton avec les photographes du fichier JSON
singletonPhotograherApi.setData(await singletonPhotograherApi.get());
// Geler le singleton
Object.freeze(singletonPhotograherApi);

export default singletonPhotograherApi;
