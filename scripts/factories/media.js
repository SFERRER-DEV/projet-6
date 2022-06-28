import * as Media from "./../models/media.js";
/**
 *
 * @param {Media} myMedia - Un objet de la classe Media
 * @returns
 */
export function mediaFactory(myMedia) {
  // Destructurer les propriétés de l'objet data dans des variables séparées
  const { id } = myMedia;

  /**
   *
   * @param {string} folder - le chemin complet du dossier contenant les medias de ce photographe
   * @returns
   */
  function getMediaCardDOM(folder) {
    /** @const {HTMLDivElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("card-media");

    /** @type {HTMLDivElement} - conteneur pour un media qui est soit une photo ou soit une video */
    const divMedia = _getMedia(`${folder}`);
    // Ajouter le media dans l'article
    article.appendChild(divMedia);

    return article;
  }

  /**
   * Obtenir un conteneur pour le média à présenter
   *
   * @returns {HTMLDivElement} div - balise div conteneur.
   */
  const _getContainerDiv = () => {
    /** @type {HTMLDivElement} - balise div */
    const div = document.createElement("div");
    div.classList.add("card-media__container");

    return div;
  };

  /**
   * Obtenir une balise image pour afficher une photographie
   * ou une balise vidéo pour jouer une vidéo
   *
   * @param {string} folder - le chemin complet du dossier contenant les medias de ce photographe
   * @returns {HTMLImageElement | HTMLVideoElement} balise img ou video pour le media
   */
  const _getMedia = (folder) => {
    /** @type {HTMLDivElement} - balise div */
    const div = _getContainerDiv();
    /** @type {HTMLImageElement | HTMLVideoElement} - une image ou une vidéo */
    let media;
    if (myMedia.media === Media.MEDIUM.VIDEO) {
      media = _getVideo(`${folder}${myMedia.filename}`);
    } else {
      media = _getPhoto(`${folder}${myMedia.filename}`);
    }
    div.appendChild(media);

    return div;
  };

  /**
   * Obtenir une image pour la photo du photographe.
   *
   * @param {string} src - le chemin complet du dossier avec le nom de fichier de l'image
   * @returns {HTMLImageElement} img - balise img pour afficher la photographie
   */
  const _getPhoto = (src) => {
    /** @type {HTMLImageElement} - balise img pour le portrait */
    const img = document.createElement("img");
    img.src = src;
    img.setAttribute("alt", `Une photograhpie nommée ${myMedia.title}`);
    img.classList.add("card-media__container__photo");

    return img;
  };

  /**
   *
   * @param {string} src - le chemin complet du dossier avec le nom de fichier de la vidéo
   * @returns {HTMLVideoElement} img - balise video pour jouer une vidéo
   */
  const _getVideo = (src) => {
    /** @type {HTMLImageElement} - balise img pour le portrait */
    const video = document.createElement("video");
    video.src = src;
    video.setAttribute("alt", `Une vidéo nommée ${myMedia.title}`);
    video.classList.add("card-media__container__video");

    return video;
  };

  return { id, getMediaCardDOM };
}
