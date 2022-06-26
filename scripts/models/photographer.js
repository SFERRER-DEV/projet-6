export default class Photographer {
  /**
   * @param {number} id identifiant
   * @param {string} name nom
   * @param {string} city ville
   * @param {string} country pays
   * @param {string} tagline slogan
   * @param {number} price tarif
   * @param {string} portrait nom du fichier du portrait
   */
  constructor(id, name, city, country, tagline, price, portrait) {
    /** @property {number} _id identifiant du photographe */
    this._id = id;
    /** @property {string} _name nom du photographe */
    this._name = name;
    /** @property {string} _city ville du photographe */
    this._city = city;
    /** @property {string} _country pays du photographe */
    this._country = country;
    /** @property {string} _tagline slogan du photographe */
    this._tagline = tagline;
    /** @property {number} _price tarif du photographe */
    this._price = price;
    /** @property {string} _portrait fichier du portait du photographe file.ext */
    this._portrait = portrait;
  }

  /**
   *
   * @returns {string} chaine de caractères
   */
  toString() {
    return `${this._id} ${this._name} ${this._country}`;
  }

  /**
   * @property {number} id
   */
  get id() {
    return this._id;
  }

  /**
   * @property {string} name
   */
  get name() {
    return this._name;
  }

  /**
   * @property {function} portrait chemin du fichier de la photo du photographe: path/file.ext
   */
  get portrait() {
    return `assets/photographers/${this._portrait}`;
  }

  /**
   * @property {function} tarif prix jour en euro: 100€/Jour
   */
  get pricePerDay() {
    return `${this._price}€/Jour`;
  }

  /**
   * @property {function} location ville et pays du photographe: Paris, France
   */
  get location() {
    return `${this._city}, ${this._country}`;
  }
}
