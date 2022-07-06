import Media from "./../models/media.js";

/** @type {MediumApi} - une instance unique de la classe singleton MediumApi */
let instance;

/**
 *  Classe pour obtenir les données des médias
 *  - Soit en faisant appel à l'API pour chercher les médias dans le fichier JSON
 *  - Soit en cherchant les données dans un tableau en mémoire renséigné un première lors de l'instanciation de ce singleton
 */
export class MediumApi {
  /**
   * Créer un singleton pour obtenir des données de type Media
   * @param {string} url - le chemin vers le fichier json contenant les données des médias
   */
  constructor(url) {
    /** @type {string} le chemin du fichier json contenant les données */
    this._url = url;
    /** @type {Media[]} une liste d'objets de type Media */
    this._data = [];

    if (instance) {
      throw new Error("You can only create one instance of MediumApi class !");
    }
    instance = this;

    console.log(`${Date.now()} - Instanciation singleton MediumApi`);
  }

  /**
   *
   * @returns
   */
  getInstance() {
    return this;
  }

  /**
   * Renseigner les datas
   * Remplir le tableau en mémoire avec une liste d'objets de type Media
   *
   * @param {Object} data - les données au format JSON
   */
  setDataMedium(data) {
    data.forEach((obj) => {
      /** @type {Media} Un objet de type Media instancier à partir des données json*/
      let m = Media.createMedia(obj);
      // Ajouter un objet de type Media au tableau
      this._data.push(m);
    });
  }

  /**
   * Obtenir tous les objets de type Media stockés dans le tableau en mémoire
   * Ce tableau est rempli lors de l'instanciation du Singleton
   *
   * @returns {Array<Media>} la liste de tous les medias de tous les photographes
   */
  getDataMedium() {
    return this._data;
  }

  /**
   * Obtenir la liste de tous les objets Medias pour un phototographe spécifique
   * et stockés dans le tableau en mémoire
   *
   * @param {number} photographerId l'identifiant d'un photographe pour filtrer les données
   * @returns {Array<Media>} retourne dans un tableau les medias trouvés pour un photographe spécifique
   */
  getDataMediumById(photographerId) {
    /** @type {Array<Media>} - Contiendra les médias trouvés pour le photographe cible */
    const res = [];
    // Parcourir tous les médias stockés en mémoire et ne retenir que ceux du photographe cible
    this._data.forEach(function (m) {
      if (m.photographerId === photographerId) {
        res.push(m);
      }
    });

    return res;
  }

  /**
   * Obtenir un objet de type Media stocké dans le tableau en mémoire
   *
   * @param {number} mediaId
   * @param {number} photographerId
   * @returns {Media} retourne le media trouvé
   */
  getDataMediaById(mediaId, photographerId) {
    return this._data.find(
      (el) => el.id === mediaId && el.photographerId === photographerId
    );
  }

  /**
   * Trouver l'indice d'un media dans un tableau de médias
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @param {Array<Media>} medium - un tableau d'objets de type Media
   * @returns {number} l'indice de l'élément dans le tableau des Medias
   */
  static getMediaIndex(mediaId, medium) {
    /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = medium.map((m) => m.id).indexOf(mediaId);

    return index;
  }

  /**
   * Obtenir l'identifiant du média qui précède dans un tableau de médias
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @param {Array<Media>} medium - un tableau d'objets de type Media
   * @returns {number} l'identifiant du média précédent dans le tableau ou -1
   */
  static getMediaPreviousId(mediaId, medium) {
    // /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = MediumApi.getMediaIndex(mediaId, medium);
    /** @type {Media} - l'objet de type Media ayant l'indice précédent dans le tableau */
    let previous;
    /** @type {number} - l'identifiant du média précédent */
    let previousId;
    previous = medium[index - 1]; // Le média qui le précède
    if (previous === undefined) {
      previousId = -1;
    } else {
      previousId = previous.id;
    }

    return previousId;
  }

  /**
   *
   * Obtenir l'identifiant du média qui suit dans un tableau de médias
   *
   * @param {number} mediaId - l'identifiant d'un média
   * @param {Array<Media>} medium - un tableau d'objets de type Media
   * @returns {number} l'identifiant du média suivant dans le tableau ou -1
   */
  static getMediaNextId(mediaId, medium) {
    // /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = MediumApi.getMediaIndex(mediaId, medium);
    /** @type {Media} - l'objet de type Media ayant l'indice suivant dans le tableau */
    let next;
    /** @type {number} - l'identifiant du média suivant */
    let nextId;
    next = medium[index + 1]; // Le média qui le suit
    if (next === undefined) {
      nextId = -1;
    } else {
      nextId = next.id;
    }

    return nextId;
  }

  /**
   *  Faire appel à l'API pour obtenir
   *  la liste des médias au format JSON
   *
   * @returns {Object} une liste d'objets JSON
   */
  async getApiAllMedium() {
    console.log(`${Date.now()} - API Fetch Medium`);
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.media)
      .catch((err) => console.log("an error occurs", err));
  }

  /**
   * Faire appel à l'API pour obtenir les données de tous les médias
   * d'un photographe spécifique depuis le fichier JSON.
   *
   * @param {number} targetID l'identifiant d'un photographe
   * @returns {Array<Object>} un objet json contenant un table des médias d'un photographe spécifique
   */
  async getApiAllMediumById(targetID) {
    console.log(`${Date.now()} - API Fetch Medium`);
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

  /**
   * Faire appel à l'API pour obtenir un média
   * d'un photographe spécifique depuis le fichier JSON.
   *
   * @param {number} mediaId l'identifiant d'un média
   * @param {number} photographerId l'identifiant d'un photographe
   * @returns {Object} un objet JSON contenant un média
   */
  async getApiMediaById(mediaId, photographerId) {
    console.log(`${Date.now()} - API Fetch Media`);
    /** @type {Array<Object>} obj un tableau d'objet json contenant le média du photographe spécifié */
    let obj = fetch(this._url) // Appel API  pour obtenir le media du photgraphe
      .then((res) => res.json())
      .then((res) => res.media)
      .then((res) =>
        res.filter(function (el) {
          return el.id === mediaId && el.photographerId === photographerId;
        })
      )
      .catch((err) => console.log("an error occurs", err));

    return obj;
  }
}

/** @type {MediumApi} - instanciation de l'objet unique MediumApi */
const singletonMediumApi = new MediumApi("data/photographers.json");
// Renseigner le tableau en mémoire dans ce singleton avec tous les médias de tous les photographes du fichier JSON
singletonMediumApi.setDataMedium(await singletonMediumApi.getApiAllMedium());
// Geler ce singleton
Object.freeze(singletonMediumApi);

export default singletonMediumApi;
