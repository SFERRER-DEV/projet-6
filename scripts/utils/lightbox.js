// Importer la fabrique
import * as facLightbox from "./../factories/lightbox.js";
// Importer l'objet API
import singletonMediumApi from "./../api/mediumApi.js";

/**
 * Apparition de la lightbox
 * Fabriquer un HTML Card et l'afficher dans la lightbox
 *
 * @param {*} event -
 * @param {HTMLSectionElement} container - La section HTML à afficher ou masquer et qui contient la HTML Card
 * @param {Media} media - L'objet de type Media à afficher dans la lightbox
 */
export function showLightbox(event, container, media) {
  /** @type {number} */
  const photographerId = media.photographerId;

  /** @type {Object} - Factory Method qui fabrique une HTML Card avec un objet de type Media */
  const mediaModel = facLightbox.lightboxFactory(media); // Instancier une fabrique pour créer la HTML Card

  /** @type {number} - l'identifiant du média précédent */
  const previousId = singletonMediumApi.getMediaPreviousId(media.id);

  /** @type {number} - l'identifiant du média suivant */
  const nextId = singletonMediumApi.getMediaNextId(media.id);

  /** @type {HTMLArticleElement} - une HTML Card d'un media qui est fabriquée dans une balise article */
  const cardHtml = mediaModel.getLightboxCardDOM(previousId, nextId); // Fabriquer la HTML Card

  /** @type {HTMLButtonElement} - la croix pour fermer la lightbox */
  const btnClose = cardHtml.querySelector(
    ".lightbox__container__buttons__close"
  );
  // Ajouter l'évènement sur la croix pour masquer la section HTML contenant la lightbox
  btnClose.addEventListener("click", () => (container.style.display = "none"));

  /** @type {HTMLButtonElement} -  précédent */
  const btnPrevious = cardHtml.querySelector(".lightbox__container__previous");

  /** @type {HTMLButtonElement} -  suivant */
  const btnNext = cardHtml.querySelector(".lightbox__container__buttons__next");

  btnPrevious.addEventListener("click", () => {
    console.log(`Previous ${previousId}`);
    //const media = singletonMediumApi.getDataByID(previousId, photographerId);
    // Afficher la lightbox
    showLightbox(event, container, media);
  });

  btnNext.addEventListener("click", () => {
    console.log(`Next ${nextId}`);
    //const media = singletonMediumApi.getDataByID(nextId, photographerId);
    // Afficher la lightbox
    showLightbox(event, container, media);
  });

  // Remplacer le media existant en affichant le nouveau media fabriqué
  container.replaceChildren(cardHtml);
  // Afficher la section HTML contenant la lightbox
  container.style.display = "block";
}
