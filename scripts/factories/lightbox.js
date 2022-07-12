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

    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button1 = getButton(myMedia, previousId, false);
    button1.setAttribute("tabindex", 0);
    // Ajouter le bouton précédent
    article.appendChild(button1); // <

    /** @type {HTMLDivElement} - conteneur du média image ou vidéo */
    const media = Dom.getMedia(
      myMedia,
      "lightbox__container__video",
      "lightbox__container__photo"
    );
    // Ajouter le conteneur media
    article.appendChild(media);

    /** @type {HTMLButtonElement} - bouton fermer X */
    const button3 = Dom.getButton(
      "lightbox__container__close",
      "fa-times",
      "fa-solid",
      "Fermer cette fenêtre"
    );

    button3.setAttribute("tabindex", 0);
    article.appendChild(button3); // X

    /** @type {HTMLButtonElement} - bouton image précédente < */
    const button2 = getButton(myMedia.strMedia, nextId, true);
    button2.setAttribute("tabindex", 0);
    article.appendChild(button2); // >

    /** @type {HTMLParagraphElement} - le titre du média */
    const title = Dom.getTitle(
      "lightbox__container__title",
      "p",
      myMedia.title
    );
    title.setAttribute("tabindex", 0);
    // Ajouter le paragraphe pour le titre
    article.appendChild(title);

    return article;
  }

  return { id, getLightboxCardDOM };
}

/**
 * Créer et paramètrer le bouton précédent ou suivant
 * de la lightbox
 *
 * @param {string} strMedia - une chaine de caractère  image ou vidéo
 * @param {number} previousId - l'identifiant du Média ayant l'indice précédent dans le tableau des médias
 * @param {boolean} flag - false pour le bouton précédent ou true pour le bouton suivant
 */
const getButton = (strMedia, mediaId, flag) => {
  /** @type {HTMLButtonElement} - bouton précdent < ou bouton suivant > */
  let button;

  if (!flag) {
    button = Dom.getButton(
      "lightbox__container__previous",
      "fa-chevron-left",
      "fa-solid",
      `${strMedia} précédente`
    );
  } else {
    button = Dom.getButton(
      "lightbox__container__next",
      "fa-chevron-right",
      "fa-solid",
      `${strMedia} suivante`
    );
  }

  // Ce data attribut permet d'identifier le média précédent si il existe
  button.setAttribute("data-id", mediaId);

  return button;
};
