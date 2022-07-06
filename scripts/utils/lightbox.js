// Importer la fabrique
import * as facLightbox from "./../factories/lightbox.js";
// Importer le singleton API
import singletonMediumApi, { MediumApi } from "./../api/mediumApi.js";

/**
 * Apparition de la lightbox
 * Fabriquer un HTML Card et l'afficher dans la lightbox
 *
 * @param {*} event -
 * @param {HTMLSectionElement} container - La section HTML à afficher ou masquer et qui contient la HTML Card
 * @param {Media} media - L'objet de type Media à afficher dans la lightbox
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
export function showLightbox(event, container, media, medium) {
  /** @type {number} -  l'identifiant du photographe des médias */
  const photographerId = media.photographerId;

  /** @type {Object} - Factory Method qui fabrique une HTML Card avec un objet de type Media */
  const mediaModel = facLightbox.lightboxFactory(media); // Instancier une fabrique pour créer la HTML Card

  /** @type {number} - l'identifiant du média précédent */
  const previousId = MediumApi.getMediaPreviousId(media.id, medium);

  /** @type {number} - l'identifiant du média suivant */
  const nextId = MediumApi.getMediaNextId(media.id, medium);

  /** @type {HTMLArticleElement} - une HTML Card lightbox d'un media qui est fabriquée dans une balise article */
  // Fabriquer la HTML Card de la lightbox  dont les boutons suivant et précédent contiendront un identifiant de média
  const cardHtml = mediaModel.getLightboxCardDOM(previousId, nextId);

  /** @type {HTMLButtonElement} - la croix pour fermer la lightbox */
  const btnClose = cardHtml.querySelector(
    ".lightbox__container__buttons__close"
  );
  // Ajouter l'évènement sur la croix pour masquer la section HTML contenant la lightbox
  btnClose.addEventListener("click", () => (container.style.display = "none"));

  // Configurer l'évènement du Bouton précédent sauf pour le premier média
  if (previousId !== undefined && previousId != -1) {
    /** @type {HTMLButtonElement} -  bouton précédent */
    const btnPrevious = cardHtml.querySelector(
      ".lightbox__container__previous"
    );
    // Ajouter l'évènement suivant
    addEventPreviousOrNext(
      event,
      container,
      btnPrevious,
      medium,
      previousId,
      photographerId
    );
  }

  // Configurer l'évènement du Bouton suivant sauf pour le dernier média
  if (nextId !== undefined && nextId != -1) {
    /** @type {HTMLButtonElement} -  bouton suivant */
    const btnNext = cardHtml.querySelector(
      ".lightbox__container__buttons__next"
    );
    // Ajouter l'évènement précédent
    addEventPreviousOrNext(
      event,
      container,
      btnNext,
      medium,
      nextId,
      photographerId
    );
  }

  // Remplacer le media existant en affichant le nouveau media fabriqué
  container.replaceChildren(cardHtml);
  // Afficher la section HTML contenant la lightbox
  container.style.display = "block";
}

/**
 * Ajouter soit l'évènement au bouton précédent pour afficher le média précédent
 * ou soit l'évènement au bouton suivant pour afficher le média suivant
 * de ce photographe
 *
 * @param {*} event -
 * @param {HTMLSectionElement} container - La section HTML à afficher ou masquer et qui contient la HTML Card
 * @param {HTMLButtonElement} button - le bouton d'action suivant ou précédent
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 * @param {number} mediaId - l'identifiant du média précédent
 * @param {number} photographerId - l'identifiant du photographe des médias
 */
const addEventPreviousOrNext = (
  event,
  container,
  button,
  medium,
  mediaId,
  photographerId
) => {
  // Ajouter l'évènement pour afficher le média suivant dans la lightbox
  button.addEventListener("click", () => {
    /** @type {Media} - le media suivant de ce photographe */
    const media = singletonMediumApi.getDataMediaById(mediaId, photographerId);
    // Afficher la lightbox
    showLightbox(event, container, media, medium);
  });
};
