import * as Media from "./../models/media.js";
import * as Dom from "./../utils/dom.js";
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
   * @param {number} nextId - l'identifiant du Média ayant l'indice suivant dans le tableau des médias
   * @returns {HTMLArticleElement} HMTL Card pour afficher un média dans la lightbox
   */
  function getLightboxCardDOM(previousId, nextId) {
    /** @type {HTMLArticleElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("lightbox__container");
    // Ce data attribut permet de marquer cette HTML Card pour l'identifier
    article.setAttribute("data-id", id);
    // Aria label
    article.setAttribute(
      "aria-label",
      myMedia.media === Media.MEDIUM.VIDEO
        ? `${myMedia.strMedia} agrandie`
        : `${myMedia.strMedia} en vue rapprochée`
    );
    article.setAttribute("tabindex", 0);
    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button1 = getButton(myMedia, previousId, false);
    button1.setAttribute("tabindex", 0);
    // Ajouter le bouton précédent
    article.appendChild(button1); // <

    /** @type {HTMLDivElement} - conteneur du média image ou vidéo */
    const divMedia = Dom.getMedia(
      myMedia,
      "lightbox__container__media",
      "lightbox__container__media__video",
      "lightbox__container__media__photo"
    );

    /** @type {HTMLParagraphElement} - le titre du média */
    const title = Dom.getTitle(
      "lightbox__container__media__title",
      "p",
      myMedia.title
    );
    title.setAttribute("tabindex", 0);
    // Ajouter le paragraphe pour le titre
    divMedia.appendChild(title);

    // Ajouter le conteneur media
    article.appendChild(divMedia);

    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button2 = getButton(myMedia, nextId, true);

    /** @type {HTMLButtonElement} - bouton fermer X */
    const button3 = Dom.getButton(
      "lightbox__container__buttons__close",
      "fa-times",
      "fa-solid",
      "Fermer cette fenêtre"
    );

    /** @type {HTMLDivElement} - conteneur des deux autres boutons */
    const divButtons = Dom.getDiv("lightbox__container__buttons");

    // Ajouter les deux autres boutons
    button2.setAttribute("tabindex", 0);
    divButtons.appendChild(button2); // >

    button3.setAttribute("tabindex", 0);
    divButtons.appendChild(button3); // X

    // Ajouter le conteneur de boutons
    article.appendChild(divButtons);

    return article;
  }

  return { id, getLightboxCardDOM };
}

/**
 * Créer et paramètrer les boutons précédent et suivant
 * de la lightbox
 *
 * @param {Media} myMedia - un objet de la classe Media
 * @param {number} previousId - l'identifiant du Média ayant l'indice précédent dans le tableau des médias
 * @param {boolean} flag - false pour le bouton précédent ou true pour le bouton suivant
 */
const getButton = (myMedia, mediaId, flag) => {
  /** @type {HTMLButtonElement} - bouton précdent < ou bouton suivant > */
  let button;

  if (!flag) {
    button = Dom.getButton(
      "lightbox__container__previous",
      "fa-chevron-left",
      "fa-solid",
      `${myMedia.strMedia} précédente`
    );
  } else {
    button = Dom.getButton(
      "lightbox__container__buttons__next",
      "fa-chevron-right",
      "fa-solid",
      `${myMedia.strMedia} suivante`
    );
  }

  // Ce data attribut permet d'identifier le média précédent si il existe
  button.setAttribute("data-id", mediaId);

  return button;
};
