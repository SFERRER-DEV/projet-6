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
   * @param {number} nextId -  l'identifiant du Média ayant l'indice suivant dans le tableau des médias
   * @returns {HTMLArticleElement} HMTL Card pour afficher un média dans la lightbox
   */
  function getLightboxCardDOM(previousId, nextId) {
    /** @type {HTMLArticleElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("lightbox__container");
    // Ce data attribut permet de marquer cette HTML Card pour l'identifier
    article.setAttribute("data-id", id);
    /** @type {string} - une chaine de caractères pour le label aria */
    const strAriaLabel =
      myMedia.media === Media.MEDIUM.VIDEO
        ? "Vidéo agrandie"
        : "Image en vue rapprochée";
    article.setAttribute("aria-label", strAriaLabel);

    /** @type {string} - texte spécifique pour aria-label  */
    const strMedia = myMedia.media === Media.MEDIUM.VIDEO ? "Vidéo" : "Image";

    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button1 = Dom.getButton(
      "lightbox__container__previous",
      "fa-chevron-left",
      "fa-solid",
      `${strMedia} précédente`
    );

    // Ce data attribut permet d'identifier le média précédent si il existe
    button1.setAttribute("data-id", previousId);

    /** @type {HTMLButtonElement} - bouton image suivante > */
    const button2 = Dom.getButton(
      "lightbox__container__buttons__next",
      "fa-chevron-right",
      "fa-solid",
      `${strMedia} suivante`
    );
    // Ce data attribut permet d'identifier le média suivant si il existe
    button2.setAttribute("data-id", nextId);

    /** @type {HTMLButtonElement} - bouton fermer X */
    const button3 = Dom.getButton(
      "lightbox__container__buttons__close",
      "fa-times",
      "fa-solid",
      "Fermer cette fenêtre"
    );

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

    // Ajouter le paragraphe pour le titre
    divMedia.appendChild(title);
    // Ajouter le conteneur media
    article.appendChild(divMedia);

    /** @type {HTMLDivElement} - conteneur des deux autres boutons */
    const divButtons = Dom.getDiv("lightbox__container__buttons");
    // Ajouter les deux autres boutons
    divButtons.appendChild(button2); // >
    divButtons.appendChild(button3); // X

    // Ajouter le conteneur de boutons
    article.appendChild(divButtons);

    return article;
  }

  return { id, getLightboxCardDOM };
}
