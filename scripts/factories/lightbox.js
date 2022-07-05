import * as Media from "./../models/media.js";
/**
 *
 * @param {Media} myMedia - Un objet de la classe Media
 * @returns
 */

export function lightboxFactory(myMedia) {
  // Destructurer les propriétés de l'objet data dans des variables séparées
  const { id } = myMedia;

  /**
   * @param {number} previousId - l'identifiant du Média ayant l'indice précédent dans le tableau des médias
   * @param {number} nextId -  l'identifiant du Média ayant l'indice suivant dans le tableau des médias
   * @returns {HTMLArticleElement} HMTL Card pour afficher un média dans la lightbox
   */
  function getLightboxCardDOM(previousId, nextId) {
    /** @const {HTMLArticleElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("lightbox__container");
    // Ce data attribut permet de marquer cette HTML Card pour l'identifier
    article.setAttribute("data-id", id);
    if (myMedia.media === Media.MEDIUM.VIDEO) {
      article.setAttribute("aria-label", "Vidéo agrandie");
    } else {
      article.setAttribute("aria-label", "Image en vue rapprochée");
    }

    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button1 = _getButton("lightbox__container__previous");
    // Ce data attribut permet d'identifier le média précédent si il existe
    button1.setAttribute("data-id", previousId);
    /** @type {HTMLButtonElement} - bouton image suivante > */
    const button2 = _getButton("lightbox__container__buttons__next");
    // Ce data attribut permet d'identifier le média suivant si il existe
    button2.setAttribute("data-id", nextId);
    /** @type {HTMLButtonElement} - bouton fermer < */
    const button3 = _getButton("lightbox__container__buttons__close");

    // Ajouter le bouton précédent
    article.appendChild(button1); // <

    /** @type {HTMLDivElement} - conteneur du média image ou vidéo */
    const divMedia = _getMedia();
    /** @type {HTMLParagraphElement} - le titre du média */
    const title = _getTitle();
    // Ajouter le paragraphe pour le titre
    divMedia.appendChild(title);
    // Ajouter le conteneur media
    article.appendChild(divMedia);

    /** @type {HTMLDivElement} - conteneur des deux autres boutons */
    const divButtons = _getDiv("lightbox__container__buttons");
    // Ajouter les deux autres boutons
    divButtons.appendChild(button2); // >
    divButtons.appendChild(button3); // X

    // Ajouter le conteneur de boutons
    article.appendChild(divButtons);

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
   *  Obtenir une balise button pour agir sur le media
   *
   *  @returns {HTMLButtonElement} balise bouton avec une icône
   */
  const _getButton = (strClass) => {
    /** @type {HTMLButtonElement} - balise bouton */
    const bouton = document.createElement("button");
    // Ajouter la class css BEM de ce bouton
    bouton.classList.add(strClass);
    /** @type {string} - texte spécifique pour aria-label  */
    let strMedia;
    if (myMedia.media === Media.MEDIUM.VIDEO) {
      strMedia = "Vidéo";
    } else {
      strMedia = "Image";
    }

    /** @type {HTMLElement} - balise de texte pour contenir une icône  */
    const icone = document.createElement("i");
    icone.classList.add("fa-solid");
    icone.setAttribute("aria-hidden", true);

    // Choisir le bon awesome icon
    switch (strClass) {
      case "lightbox__container__previous": // <
        icone.classList.add("fa-chevron-left");
        icone.setAttribute("aria-label", `${strMedia} précédente`);
        break;

      case "lightbox__container__buttons__next": // >
        icone.classList.add("fa-chevron-right");
        icone.setAttribute("aria-label", `${strMedia} suivante`);
        break;

      case "lightbox__container__buttons__close": // X
        icone.classList.add("fa-times");
        icone.setAttribute("aria-label", "Fermer cette fenêtre");
        break;
    }
    // Ajouter l'icone dans le bouton
    bouton.append(icone);

    return bouton;
  };

  /**
   * Obtenir une balise image pour afficher une photographie
   * ou une balise vidéo pour jouer une vidéo
   *
   * @param {string} folder - le chemin complet du dossier contenant les medias de ce photographe
   * @returns {HTMLDivElement} balise div avec une image ou une video
   */
  const _getMedia = () => {
    /** @type {HTMLDivElement} - balise div */
    const div = _getDiv("lightbox__container__media");
    /** @type {HTMLImageElement | HTMLVideoElement} - une image ou une vidéo */
    let media;
    /** @type {string} - chemin complet avec le nom du fichier média: path/filename.ext */
    const filename = myMedia.media_folder + myMedia.filename;
    if (myMedia.media === Media.MEDIUM.VIDEO) {
      media = _getVideo(filename);
    } else {
      media = _getPhoto(filename);
    }
    div.appendChild(media);

    return div;
  };

  /**
   * Obtenir une image pour un média type photo
   *
   * @param {string} src - le chemin complet du dossier avec le nom de fichier de l'image
   * @returns {HTMLImageElement} - balise img pour afficher la photographie
   */
  const _getPhoto = (src) => {
    /** @type {HTMLImageElement} - balise img pour le portrait */
    const img = document.createElement("img");
    img.src = src;
    img.setAttribute("alt", `Une photograhpie nommée ${myMedia.title}`);
    img.classList.add("lightbox__container__media__photo");

    return img;
  };

  /**
   * Obtenir une vidéo pour un média de type vidéo
   *
   * @param {string} src - le chemin complet du dossier avec le nom de fichier de la vidéo
   * @returns {HTMLVideoElement} - balise video pour jouer une vidéo
   */
  const _getVideo = (src) => {
    /** @type {HTMLImageElement} - balise img pour le portrait */
    const video = document.createElement("video");
    video.src = src;
    video.setAttribute("alt", `Une vidéo nommée ${myMedia.title}`);
    video.classList.add("lightbox__container__media__video");
    video.autoplay = false;
    video.controls = true;
    video.muted = false;

    return video;
  };

  /**
   * Obtenir le titre du média.
   *
   * @returns {HTMLParagraphElement} titre - balise paragraphe avec le nom de la vidéo ou de la photographie
   */
  const _getTitle = () => {
    /** @type {HTMLParagraphElement} - balise paragraphe */
    const titre = document.createElement("p");
    titre.textContent = myMedia.title;
    titre.classList.add("lightbox__container__media__title");

    return titre;
  };

  return { id, getLightboxCardDOM };
}
