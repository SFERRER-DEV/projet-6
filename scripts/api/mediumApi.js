import Api from "./api.js";

let instance;

class MediumApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);

    if (instance) {
      throw new Error("You can only create one instance of MediumApi class !");
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
   *  la liste des médias au format JSON
   *  Sinon retourner les medias obtenus précédement.
   * @returns
   */
  async get() {
    if (Array.isArray(this._data) && !this._data.length) {
      console.log("fetch medium");
      return fetch(this._url)
        .then((res) => res.json())
        .then((res) => res.media)
        .catch((err) => console.log("an error occurs", err));
    } else {
      return this.getData();
    }
  }
}

const singletonMediumApi = new MediumApi("data/photographers.json");
singletonMediumApi.setData(await singletonMediumApi.get());
Object.freeze(singletonMediumApi);

export default singletonMediumApi;
