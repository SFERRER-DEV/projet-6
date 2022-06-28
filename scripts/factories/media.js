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

    /** @type {HTMLDivElement} - conteneur pour le titre du media et ses j'aime */
    const divHeading = _getDiv("card-media__heading");

    /** @type {HTMLParagraphElement} - le titre du média */
    const h3 = _getTitle();
    // Ajouter le titre du média
    divHeading.appendChild(h3);

    /** @type {HTMLSpanElement} - le nombre de likes du média */
    const likes = _getSpan(myMedia.likes);
    likes.classList.add("card-media__heading__likes");
    // Ajouter le titre du média
    divHeading.appendChild(likes);

    /** @type {HTMLButtonElement} - un bouton pour incrémenter le nombre de j'aime */
    const button = _getLike();
    // Ajouter le bouton j'aime
    divHeading.appendChild(button);

    // Ajouter le conteneur de titre dans l'article
    article.appendChild(divHeading);

    return article;
  }

  /**
   * Obtenir un div avec sa classe
   *
   * @param {string} strClass - une classe CSS
   * @returns {HTMLDivElement} div - balise div conteneur.
   */
  const _getDiv = (strClass) => {
    /** @type {HTMLDivElement} - balise div */
    const div = document.createElement("div");
    div.classList.add(strClass);

    return div;
  };

  /**
   * Obtenir le titre du média.
   *
   * @returns {HTMLTitleElement} titre - balise titre h3 avec le nom de la vidéo ou de la photographie
   */
  const _getTitle = () => {
    /** @type {HTMLTitleElement} - balise titre */
    const titre = document.createElement("h3");
    titre.textContent = myMedia.title;
    titre.classList.add("card-media__heading__title");

    return titre;
  };

  /**
   * Préparer et obtenir un élément d'une ligne de texte.
   *
   * @param {String} strTexte - le texte à mettre en forme avec css
   * @returns {HTMLSpanElement} span
   */
  const _getSpan = (strTexte) => {
    /** @type {HTMLSpanElement} - texte en ligne */
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(strTexte));

    return span;
  };

  /**
   *  Obtenir une balise button pour liker un media
   *
   *  @returns {HTMLButtonElement} balise bouton pour liker
   */
  const _getLike = () => {
    /** @type {HTMLButtonElement} - balise bouton */
    const bouton = document.createElement("button");
    bouton.classList.add("card-media__heading__likes__ilike");

    /** @type {HTMLElement} - balise de texte pour contenir l'icone coeur */
    const icone = document.createElement("i");
    icone.classList.add("fa-solid");
    icone.classList.add("fa-heart");
    bouton.append(icone);

    return bouton;
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
    const div = _getDiv("card-media__container");
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
