//import * as Media from "./../models/media.js";
import * as Dom from "./../utils/dom.js";
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
  function getMediaCardDOM() {
    /** @const {HTMLDivElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("card-media");
    // Ce data attribut permet de marquer cette HTML Card pour l'identifier
    article.setAttribute("data-id", id);
    article.setAttribute("role", "dialog");
    article.setAttribute("tabindex", "-1");
    article.setAttribute("aria-label", "i");

    /** @type {HTMLDivElement} - conteneur avec un media (photo ou video) */
    const divMedia = Dom.getMedia(
      myMedia,
      "card-media__container",
      "card-media__container__video",
      "card-media__container__photo"
    );
    // Ajouter le media dans l'article
    article.appendChild(divMedia);

    /** @type {HTMLDivElement} - conteneur pour le titre du media et ses j'aime */
    const divHeading = Dom.getDiv("card-media__heading");

    /** @type {HTMLParagraphElement} - le titre du média h3 avec le nom de la vidéo ou de la photographie */
    const title = Dom.getTitle("media__heading__title", "h3", myMedia.title);
    title.setAttribute("tabindex", "0");
    // Ajouter le titre du média
    divHeading.appendChild(title);

    /** @type {HTMLSpanElement} - le nombre de likes du média */
    const likes = Dom.getTitle(
      "card-media__heading__likes",
      "span",
      myMedia.likes
    );

    // Ajouter le titre du média
    divHeading.appendChild(likes);

    /** @type {HTMLButtonElement} - un bouton coeur pour incrémenter le nombre de j'aime */
    const button = Dom.getButton(
      "card-media__heading__likes__ilike",
      "fa-heart"
    );
    button.setAttribute("arial-label", "j'aime");
    // Ajouter le bouton j'aime
    divHeading.appendChild(button);

    // Ajouter le conteneur de titre dans l'article
    article.appendChild(divHeading);

    return article;
  }

  return { id, getMediaCardDOM };
}
