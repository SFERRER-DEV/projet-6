/** @type {Number} - Une constante utilisée pour gérer les deux affichage de la Card Photographe */
const MEDIA = {
  IMAGE: 0,
  VIDEO: 1,
};

export default class Media {
  /**
   * @param {number} id identifiant du media
   * @param {number} photographerId identifiant du photographe
   * @param {string} media nom d'un fichier média image ou vidéo: filename.ext
   * @param {number} likes nombre de j'aime du media
   * @param {date} date_media yyyy-mm-dd
   * @param {number} price tarif prix du média
   */
  constructor(id, photographerId, media, likes, date_media, price) {
    /** @type {number} _id identifiant du media */
    this._id = id;
    /** @type {number} _photograpgerId identifiant du photographe */
    this._photographerId = photographerId;
    /** @type {string} _filename nom du fichier media image ou vidéo */
    this._filename = media;
    /** @type {number} _likes nombre de j'aime de ce média */
    this._likes = likes;
    /** @type {date} date yyyy-mm-dd */
    this._date_media = date_media;
    /** @type {number} _price tarif prix */
    this._price = price;
    /** @type {MEDIA.IMAGE|MEDIA.VIDEO} _media le nom du fichier de média est-il pour une image ou une vidéo ? */
    this._media = Media.isImageOrVideo(media);
  }

  /**
   * @property {number} id identifiant du média
   */
  get id() {
    return this._id;
  }

  /**
   * @property {number} photograpgerId identifiant d'un photographe
   */
  get photographerId() {
    return this._photographerId;
  }

  /**
   * @property {MEDIA.IMAGE | MEDIA.VIDEO} media  est une constante de type MEDIA: 0 => image ou 1 => vidéo
   */
  get media() {
    return this._media;
  }

  /**
   * @property {number} likes nombre de j'aime du média
   */
  get likes() {
    return this._likes;
  }

  /**
   * @property {number} price tarif du média
   */
  get price() {
    return this._price;
  }

  /**
   * @property {date} date_media yyyy-mm-dd
   */
  get date_media() {
    return this._date_media;
  }

  /**
   *
   * @returns {string} chaine de caractères
   */
  toString() {
    /** @type {string} image ou vidéo */
    const imageOrVideo = this.ImageOrVideo == MEDIA.IMAGE ? "IMAGE" : "VIDEO";
    return `${this._id}-${this._photograpgerId} ${imageOrVideo}`;
  }

  /**
   * @property {string} filename - nom du fichier image ou vidéo file.ext
   */
  get fileName() {
    return this._filename;
  }

  /**
   * Déterminer avec l'extension du fichier si le média
   * est une image ou une vidéo
   *
   * @param {string} filename le nom de fichier d'un media
   * @returns {MEDIA.IMAGE|MEDIA.VIDEO} une constante pour soit une image soit une vidéo
   */
  static isImageOrVideo(filename) {
    if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(filename)) {
      return MEDIA.IMAGE;
    } else if (/\.(mp4|avi|mpg|webm|mov)$/i.test(filename)) {
      return MEDIA.VIDEO;
    } else {
      throw new Error(
        `L'extension de ce fichier '${filename}' n'a pas permis de déterminer son type.`
      );
    }
  }
}
