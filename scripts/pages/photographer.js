import * as fac from "./../factories/photographer.js";
import Media from "./../models/media.js";
import Photographer from "./../models/photographer.js";
import singletonPhotograherApi from "./../api/photographerApi.js";
import singletonMediumApi from "./../api/mediumApi.js";

/**
 * Obtenir les données d'un photographe
 *
 * @param {Number} tagetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Photographer) photographer - Un photographe obtenu en mémoire ou sinon par un appel API au fichier JSON
 */
async function getPhotographer(targetID) {
  /** @type {Photographer} - Obtenir une instance de type Photographer */
  let photographer;
  // en recherchant en mémoire dans le singleton d'abord ...
  photographer = singletonPhotograherApi.getDataByID(targetID);
  // ...sinon en recherchant avec l'API
  if (photographer === undefined) {
    /** @type {Objet} - Un objet JSON pour contenir les données d'un photographe sépcifique */
    const obj = await singletonPhotograherApi.getById(targetID);
    if (obj !== undefined) {
      // Instancier le photographe à partir de ses données JSON
      photographer = new Photographer(
        obj.id,
        obj.name,
        obj.city,
        obj.country,
        obj.tagline,
        obj.price,
        obj.portrait
      );
    } else {
      throw `Photographe ${targetID} non trouvé`;
    }
  }

  return photographer;
}

/**
 * Obtenir les données de tous les médias de tous les photographes
 *
 * @returns {Array<Media>)
 */
async function getAllMedium() {
  /** @type {Array<Media>} - Un tableau contenant la liste de tous les médias de tous les photographes */
  const medium = singletonMediumApi.getData();
  // Retourner le tableau des médias seulement une fois
  return medium;
}

/**
 * Obtenir les données des médias d'un photographe
 *
 * @param {number} targetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Array<{Media}>)
 */
async function getMedium(targetID) {
  /** @type {Array<Media>} - Un tableau pour contenir des objets de type Media */
  let medium = [];
  // en recherchant en mémoire locale d'abord ...
  medium = singletonMediumApi.getAllDataByID(-targetID);
  if (Array.isArray(medium) && !medium.length) {
    // ...sinon en recherchant avec l'API
    medium = await singletonMediumApi.getAllById(targetID);
    if (Array.isArray(medium) && !medium.length) {
      //throw `Medias du photographe ${targetID} non trouvés`;
    }
  }
  console.log(`${medium.length} medias trouvés`);
  return medium;
}

/**
 * Afficher les données d'un photographe
 * dans une card html en utilisantla factory photographer
 *
 * @param {Photographer} photographer - Un objet de type photographe
 */
async function displayData(photographer) {
  /** @type {HTMLDivElement} - le conteneur html <div> pour afficher le photographe */
  const parent = document.querySelector(".photograph-header");
  /** @type {HTMLButtonElement} - le bouton de contact sur la page du photographe */
  const bouton = parent.querySelector(".contact_button");
  /** @type {Object} - Factory Method qui fabrique la HTML Card de photographe */
  const photographerModel = fac.photographerFactory(photographer, parent); // Instancier une fabrique pour créer la card
  /** @type {HTMLDivElement} - une card de photographe qui a été fabriquée dans une balise article */
  const userCardDOM = photographerModel.getUserCardDOM(parent); // Obtenir la card pour le photographe et en fonction du conteneur parent
  // Ajouter cette card créée et l'afficher avant la position du bouton de contact
  parent.insertBefore(userCardDOM, bouton);
}

/**
 * Point d'entrée de la page
 * Obtenir les données du photographe et de ses médias puis les afficher
 */
async function init() {
  let params = new URL(document.location).searchParams;
  /** @type {number} - l'identifiant du photographe obtenu en paramètre url */
  let tagetID = parseInt(params.get("id"));
  /** @type {Object} - l'objet contenant les données du photographe */
  const photographer = await getPhotographer(tagetID);
  // Afficher les données sur la console
  console.table(photographer);
  /** @type {Array<Media>} - un tableau contenant les données des médias du photographe */
  const medium = await getMedium(photographer.id);

  displayData(photographer);
}

init();
