import * as fac from "./../factories/photographer.js";
import singletonPhotograherApi from "../api/photographerApi.js";
import Photographer from "./../models/photographer.js";

/**
 * Obtenir les données des photographes
 * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
 */
async function getPhotographers() {
  // Obtenir les Photographes
  const photographers = singletonPhotograherApi.getData();
  // Retourner le tableau photographers seulement une fois
  return photographers;
}

/**
 * Afficher les données de tous les photographes
 * dans des html cards sur la page d'accueil en utilisant
 * la factory photographer
 * @param photographers - Une liste de photographes
 */
async function displayData(photographers) {
  // Obtenir le conteneur html <div> pour l'affichage de la liste des photographes
  const parent = document.querySelector(".photographer_section");
  // Parcourir la liste des photographes
  photographers.forEach((photographer) => {
    // Afficher les data du photographe lu sur la console
    // console.table(photographer);
    // console.log(photographer.toString());
    // console.log(photographer.medium);
    // Créer une fabrique pour instancier la card html du photographe lu
    const photographerModel = fac.photographerFactory(photographer, parent);
    // Créer une html card d'après le photographe lu en fonction du conteneur html parent
    const userCardDOM = photographerModel.getUserCardDOM(parent);
    // Ajouter la html card créée pour l'afficher dans la page
    parent.appendChild(userCardDOM);
  });
}

/**
 * Point d'entrée de l'application
 * Obtenir les données de manière asynchrone et
 * les afficher
 */
async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  // Afficher les données
  displayData(photographers);
}

init();
