import Media from "./../models/media.js";

/** @type {MediumApi} - une instance unique de la classe singleton MediumApi */
let instance;

class MediumApi {
  /**
   *
   * @param {string} url - le chemin vers le fichier json contenant les données des médias
   */
  constructor(url) {
    /** @type {string} le chemin du fichier json contenant les données */
    this._url = url;
    /** @type {Media[]} une liste d'objets de type media  */
    this._data = [];

    if (instance) {
      throw new Error("You can only create one instance of MediumApi class !");
    }
    instance = this;
  }

  /**
   * Trouver l'indice d'un media dans le tableau des médias
   * stocké en mémoire locale.
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @returns {number} - l'indice de l'élément dans le tableau des Medias
   */
  getMediaIndex(mediaId) {
    /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = this._data.map((m) => m.id).indexOf(mediaId);

    return index;
  }

  /**
   * Obtenir l'identifiant du média qui précède dans la liste des médias
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @returns {number} - L'identifiant du média précédent dans le tableau ou -1
   */
  getMediaPreviousId(mediaId) {
    // /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = this.getMediaIndex(mediaId);
    /** @type {Media} - l'objet de type Media ayant l'indice précédent dans le tableau */
    let previous;
    /** @type {number} - l'identifiant du média précédent */
    let previousId;
    previous = this._data[index - 1]; // Le média qui le précède
    if (previous === undefined) {
      previousId = -1;
    } else {
      previousId = previous.id;
    }

    return previousId;
  }

  /**
   *
   * Obtenir l'identifiant du média qui suit dans la liste des médias
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @returns {number} - l'identifiant du média suivant dans le tableau ou -1
   */
  getMediaNextId(mediaId) {
    // /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = this.getMediaIndex(mediaId);
    /** @type {Media} - l'objet de type Media ayant l'indice suivant dans le tableau */
    let next;
    /** @type {number} - l'identifiant du média suivant */
    let nextId;
    next = this._data[index + 1]; // Le média qui le suit
    if (next === undefined) {
      nextId = -1;
    } else {
      nextId = next.id;
    }

    return nextId;
  }

  /**
   * Obtenir le tableau des objets stockés en mémoire
   * Ce tableau est rempli lors de l'instanciation du Singleton
   *
   * @returns {Array<Media>} la liste de tous les medias de tous les photographes
   */
  getData() {
    return this._data;
  }

  /**
   * Obtenir un objet de type Media stocké dans le tableau en mémoire
   *
   * @param {number} targetID les éléments du tableau doivent avoir une propriété id
   * @param {number} photographerId
   * @returns {Media} retourne le media trouvé
   */
  getDataByID(targetID, photographerId) {
    return this._data.find(
      (el) => el.id === targetID && el.photographerId === photographerId
    );
  }

  /**
   * Obtenir la liste de tous les objets Medias stocké dans le tableau en mémoire
   * pour un phototographe spécifique
   *
   * @param {number} targetID les éléments du tableau doivent avoir une propriété photographId
   * @returns {Array<Media>} retourne dans un tableau les medias trouvés pour un photographe spécifique
   */
  getAllDataByID(targetID) {
    /** @type {Array<Media>} - Contiendra les médias trouvés pour le photographe cible */
    const res = [];
    // Parcourir tous les médias stockés en mémoire et ne retenir que ceux du photographe cible
    this._data.forEach(function (m) {
      if (m.photographerId === targetID) res.push(m);
    });
    return res;
  }

  /**
   * Renseigner les datas
   * Remplir le tableau en mémoire avec une liste d'objets de type Media
   *
   * @param {Array} data les données d'un objet json
   */
  setData(data) {
    data.forEach((obj) => {
      /** @type {Media} Un objet de type Media instancier à partir des données json*/
      let m = Media.createMedia(obj);

      this._data.push(m);
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
   *  Faire appel à l'API pour obtenir une première fois
   *  la liste des médias au format JSON
   *  Sinon retourner les medias stockés en mémoire précédement.
   * @returns
   */
  async get() {
    if (Array.isArray(this._data) && !this._data.length) {
      console.log("fetch mediumApi");
      return fetch(this._url)
        .then((res) => res.json())
        .then((res) => res.media)
        .catch((err) => console.log("an error occurs", err));
    } else {
      return this.getData();
    }
  }

  /**
   * Faire appel à l'API pour obtenir un média sépcifique
   * d'un photographe spécifique depuis le fichier JSON.
   *
   * @param {number} targetID l'identifiant d'un média
   * @param {number} photographerId l'identifiant d'un photographe
   * @returns {Object} un objet json contenant un média
   */
  async getById(targetID, photographerId) {
    console.log("fetch mediumApi");
    /** @type {Array<Object>} obj un tableau d'objet json contenant les médias d'un photographe spécifique */
    let obj = fetch(this._url) // Appel API  pour obtenir le media du photgraphe
      .then((res) => res.json())
      .then((res) => res.media)
      .then((res) =>
        res.filter(function (el) {
          return el.id === targetID && el.photographerId === photographerId;
        })
      )
      .catch((err) => console.log("an error occurs", err));

    return obj;
  }

  /**
   * Faire appel à l'API pour obtenir les données de tous les médias
   * d'un photographe spécifique depuis le fichier JSON.
   *
   * @param {number} targetID l'identifiant d'un photographe
   * @returns {Array<Object>} un objet json contenant un table des médias d'un photographe spécifique
   */
  async getAllById(targetID) {
    console.log("fetch mediumApi");
    /** @type {Array<Object>} obj un tableau d'objet json contenant les médias d'un photographe spécifique */
    let obj = fetch(this._url) // Appel API  pour obtenir le photgraphe
      .then((res) => res.json())
      .then((res) => res.media)
      .then((res) =>
        res.filter(function (el) {
          return el.photographerId == targetID;
        })
      )
      .catch((err) => console.log("an error occurs", err));

    return obj;
  }
}

/** @type {MediumApi} - instanciation de l'objet unique MediumApi */
const singletonMediumApi = new MediumApi("data/photographers.json");
// Renseigner le tableau en mémoire dans ce singleton avec tous les médias de tous les photographes du fichier JSON
singletonMediumApi.setData(await singletonMediumApi.get());
// Geler ce singleton
Object.freeze(singletonMediumApi);

export default singletonMediumApi;
