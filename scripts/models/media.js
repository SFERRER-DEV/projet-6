/** @type {Number} - Une constante utilisée pour gérer les deux affichage de la Card Photographe */
export const MEDIUM = {
  IMAGE: 0,
  VIDEO: 1,
};

export default class Media {
  /**
   * @param {number} id identifiant du media
   * @param {number} photographerId identifiant du photographe
   * @param {string} title descriptif de la photo
   * @param {string} media nom d'un fichier média image ou vidéo: filename.ext
   * @param {number} likes nombre de j'aime du media
   * @param {date} date_media yyyy-mm-dd
   * @param {number} price tarif prix du média
   * @param {string} [media_folder=""] le chemin du dossier contenant le media est aussi constitué du prénom du photographe
   */

  constructor(
    id,
    photographerId,
    title,
    media,
    likes,
    date_media,
    price,
    media_folder = ""
  ) {
    /** @type {number} _id identifiant du media */
    this._id = id;
    /** @type {number} _photograpgerId identifiant du photographe */
    this._photographerId = photographerId;
    /** @type {string} _filename nom du fichier media image ou vidéo */
    this._title = title;
    /** @type {string} _filename nom du fichier media image ou vidéo */
    this._filename = media;
    /** @type {number} _likes nombre de j'aime de ce média */
    this._likes = likes;
    /** @type {date} date yyyy-mm-dd */
    this._date_media = date_media;
    /** @type {number} _price tarif prix */
    this._price = price;
    /** @type {MEDIUM.IMAGE|MEDIUM.VIDEO} _media le nom du fichier de média est-il pour une image ou une vidéo ? */
    this._media = Media.isImageOrVideo(media);
    /** @type {string} le chemin complet du dossier contenant le média */
    this._media_folder = media_folder;
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
   * @property {string} title  titre descriptif du media
   */
  get title() {
    return this._title;
  }

  /**
   * @property {MEDIUM.IMAGE | MEIDUM.VIDEO} media  est une constante de type MEDIUM: 0 => image ou 1 => vidéo
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
  set likes(value) {
    this._likes = value;
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
    const imageOrVideo = this.ImageOrVideo == MEDIUM.IMAGE ? "IMAGE" : "VIDEO";
    return `${this._id}-${this._photograpgerId} ${imageOrVideo}`;
  }

  /**
   * @property {string} filename - nom du fichier image ou vidéo file.ext
   */
  get filename() {
    return this._filename;
  }

  /**
   * @property {string} media_folder - chemin complet du dossier contenant le media
   */
  get media_folder() {
    return this._media_folder;
  }

  set media_folder(value) {
    this._media_folder = value;
  }

  /**
   * Déterminer avec l'extension du fichier si le média
   * est une image ou une vidéo
   *
   * @param {string} filename le nom de fichier d'un media
   * @returns {MEDIUM.IMAGE|MEDIUM.VIDEO} une constante pour soit une image soit une vidéo
   */
  static isImageOrVideo(filename) {
    if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(filename)) {
      return MEDIUM.IMAGE;
    } else if (/\.(mp4|avi|ogm|ogv|ogg|webm)$/i.test(filename)) {
      return MEDIUM.VIDEO;
    } else {
      throw new Error(
        `L'extension de ce fichier '${filename}' n'a pas permis de déterminer son type.`
      );
    }
  }
}

//export { Media, MEDIUM };
