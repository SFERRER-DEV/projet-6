// Importer la fabrique
import * as facLightbox from "./../factories/lightbox.js";
// Importer le singleton API
import singletonMediumApi, { MediumApi } from "./../api/mediumApi.js";
// Importer des fonctions utiles
import * as Dom from "./dom.js";

/**
 * Apparition de la lightbox
 * Fabriquer un HTML Card et l'afficher dans la lightbox
 *
 * @param {*} event
 * @param {HTMLSectionElement} container - La section HTML à afficher ou à masquer contenant la HTML Card lightbox
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
  const btnClose = cardHtml.querySelector(".lightbox__container__close");

  // Ajouter l'évènement sur la croix pour masquer la section HTML contenant la lightbox
  btnClose.addEventListener("click", () => {
    container.style.display = "none";
    document.getElementById("lightbox").setAttribute("aria-hidden", "true");
    document.querySelector("main").setAttribute("aria-hidden", "false");
  });
  // Ajouter l'évènement de la touche clavier escape pour fermer la lightbox
  container.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      btnClose.click();
    }
  });

  // Ajouter l'évènement sur le bouton Précédent
  addEvent(event, container, cardHtml, medium, previousId, photographerId);
  // Ajouter l'évènement sur le bouton Suivant
  addEvent(event, container, cardHtml, medium, nextId, photographerId, true);

  // Remplacer le media existant en affichant le nouveau media fabriqué
  container.replaceChildren(cardHtml);
  // Pieger le cycle du focus sur les boutons
  Dom.trapFocus(container);

  // Afficher la section HTML contenant la lightbox
  container.style.display = "block";
  // Garder le focus sur le media
  container
    .querySelector(".lightbox__container img, .lightbox__container video")
    .focus();
}

/**
 * Ajouter soit l'évènement au bouton précédent pour afficher le média précédent
 * ou soit l'évènement au bouton suivant pour afficher le média suivant
 * de ce photographe
 *
 * @param {*} event -
 * @param {HTMLSectionElement} container - La section HTML à afficher ou masquer et qui contient la HTML Card
 * @param {HTMLArticleElement} cardHtml - HMTL Card pour afficher un média dans la lightbox
 * @param {HTMLButtonElement} button - le bouton d'action suivant ou précédent
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 * @param {number} mediaId - l'identifiant du média précédent
 * @param {number} photographerId - l'identifiant du photographe des médias
 * @param {boolean} flag - false pour le bouton Previous ou true pour le bouton Next
 */
const addEvent = (
  event,
  container,
  cardHtml,
  medium,
  mediaId,
  photographerId,
  flag = false
) => {
  // L'évènement n'est ajouté que si il y a au moins un mdia suivant pour le bouton Next
  // ou au moins un média un précédent pour le bouton Previous
  if (mediaId !== undefined && mediaId != -1) {
    /** @type {HTMLButtonElement} -  précédent suivant ou bouton suivant */
    let button;
    // Déterminer de quel bouton il s'agit < ou >
    if (!flag) {
      button = cardHtml.querySelector(".lightbox__container__previous");
    } else {
      button = cardHtml.querySelector(".lightbox__container__next");
    }

    // Ajouter l'évènement pour afficher le média suivant dans la lightbox
    button.addEventListener("click", () => {
      /** @type {Media} - le media suivant de ce photographe */
      const media = singletonMediumApi.getDataMediaById(
        mediaId,
        photographerId
      );
      // Afficher la lightbox
      showLightbox(event, container, media, medium);
    });

    if (!flag) {
      // Ajouter l'évènement de la touche clavier flèche gauche pour afficher le media précédent
      cardHtml.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft") {
          button.click();
        }
      });
    } else {
      // Ajouter l'évènement de la touche clavier flèche droite pour afficher le media suivant
      cardHtml.addEventListener("keyup", (e) => {
        if (e.key === "ArrowRight") {
          button.click();
        }
      });
    }
  }
};
