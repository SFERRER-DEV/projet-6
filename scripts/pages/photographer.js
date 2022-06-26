import * as fac from "./../factories/photographer.js";
import singletonPhotograherApi from "./../api/photographerApi.js";
import singletonMediumApi from "./../api/mediumApi.js";

/**
 * Obtenir les données d'un photographe
 *
 * @param {Number} tagetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
 */
async function getPhotographer(tagetID) {
  // Obtenir le Photographe
  let photographer;
  // en recherchant en local d'abord ...
  photographer = singletonPhotograherApi.getDataByID(tagetID);
  if (photographer === undefined) {
    // ...sinon en recherchant avec l'API
    photographer = await singletonPhotograherApi.getById(tagetID);
    if (photographer === undefined) {
      throw `photographe ${tagetID} non trouvé`;
    }
  }

  return photographer;
}

/**
 * Obtenir les données des médias d'un photographe
 *
 * @param {Number} tagetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
 */
async function getMedium(tagetID) {
  // Obtenir le Photographe
  let medium;
  // en recherchant en local d'abord ...
  medium = singletonMediumApi.getDataByID(tagetID);
  if (medium === undefined) {
    // ...sinon en recherchant avec l'API
    medium = await singletonMediumApi.getById(tagetID);
    if (medium === undefined) {
      throw `Medias du photographe ${tagetID} non trouvé`;
    }
  }

  return medium;
}

/**
 * Afficher les données d'un photographe
 * dans une card html en utilisantla factory photographer
 *
 * @param photographer - Les données d'un photographe
 */
async function displayData(photographer) {
  /** @type {HTMLDivElement} - le conteneur html <div> pour afficher le photographe */
  const parent = document.querySelector(".photograph-header");
  /** @type {HTMLButtonElement} - le bouton de contact sur la page du photographe */
  const bouton = parent.querySelector(".contact_button");

  // Afficher les data du photographe lu sur la console
  console.table(photographer);

  /** @type {Object} - Factory Method qui fabrique la HTML Card de photographe */
  const photographerModel = fac.photographerFactory(photographer, parent); // Instancier une fabrique pour créer la card
  /** @type {HTMLDivElement} - une card de photographe qui a été fabriquée dans une balise article */
  const userCardDOM = photographerModel.getUserCardDOM(parent); // Obtenir la card pour le photographe et en fonction du conteneur parent
  // Ajouter la card créée pour l'afficher avant la position du bouton de contact
  parent.insertBefore(userCardDOM, bouton);
}

/**
 * Point d'entrée de la page
 * Obtenir les données du photographe et de ses médias puis les afficher
 */
async function init() {
  let params = new URL(document.location).searchParams;
  // Obtenir l'identifiant du photographe depuis les paramètres de l'url
  let tagetID = parseInt(params.get("id"));
  /** @type {Object} - l'objet contenant les données du photographe */
  const photographer = await getPhotographer(tagetID);
  // Afficher les données sur la console
  console.table(photographer);
  /** @type {Object} - l'objet contenant les données des médias du photographe */
  const medium = await getPhotographer(tagetID);

  displayData(photographer);
}

init();
