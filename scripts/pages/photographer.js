import * as fac from "./../factories/photographer.js";
import singletonPhotograherApi from "../api/photographerApi.js";
// import singletonMeddiumApi from "../api/mediumApi.js";

/**
 * Obtenir les données d'un photographe
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
 * Afficher les données d'un photographe
 * dans une html cards sur la page du photographe en utilisant
 * la factory photographer
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
  const userCardDOM = photographerModel.getUserCardDOM(parent); // Obtener la card pour le photographe et en fonction du conteneur parent
  // Ajouter la card créée pour l'afficher dans la page

  //parent.appendChild(userCardDOM);
  parent.insertBefore(userCardDOM, bouton);
}

/**
 * Point d'entrée de l'application
 * Obtenir les données du photographe puis
 * les afficher
 */
async function init() {
  let params = new URL(document.location).searchParams;
  // Obtenir l'identifiant du photographe depuis les paramètres de l'url
  let tagetID = parseInt(params.get("id"));
  const photographer = await getPhotographer(tagetID);
  // Afficher les donnnées sur la console
  console.table(photographer);
  displayData(photographer);
}

init();
