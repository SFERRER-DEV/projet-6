import Api from "./api.js";

let instance;

class PhotograherApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);

    if (instance) {
      throw new Error(
        "You can only create one instance of PhotograherApi class !"
      );
    }
    instance = this;
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
   * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
   */
  async get() {
    if (Array.isArray(this._data) && !this._data.length) {
      console.log("fetch photographers");
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
   * @param {*} targetID
   * @returns Array - un tableau d'un élément qui est un photographe
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

const singletonPhotograherApi = new PhotograherApi("data/photographers.json");
singletonPhotograherApi.setData(await singletonPhotograherApi.get());
Object.freeze(singletonPhotograherApi);

export default singletonPhotograherApi;
