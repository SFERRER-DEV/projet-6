import * as fac from "./../factories/photographer.js";

/**
 * Faire un appel au serveur pour obtenir
 * la liste des photographes au format JSON
 * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
 */
const _retrievePhotographersLocalData = () =>
  fetch("./../data/photographers.json")
    .then((res) => res.json())
    .then((data) => data.photographers)
    .catch((err) => console.log("Oh no", err));

/**
 * Obtenir les données des photographes
 * @returns {Array.<{city:string, country: string, id: number, name: string, portrait: string, price: number, tagline: string}>)
 */
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = await _retrievePhotographersLocalData();

  // et bien retourner le tableau photographers seulement une fois
  return photographers;
}

/**
 * Afficher les données de tous les photographes
 * dans des html cards sur la page d'accueil
 * @param photographers - Une liste de photographes
 */
async function displayData(photographers) {
  // Obtenir le conteneur html <div> pour l'affichage de la liste des photographes
  const photographersSection = document.querySelector(".photographer_section");
  // Parcourir la liste des photographes
  photographers.forEach((photographer) => {
    // Afficher les data du photographe lu sur la console
    console.table(photographer);
    // Créer l'usine pour instancier des cards html pour un photographe
    const photographerModel = fac.photographerFactory(photographer);
    // Créer une html card pour le photographe lu
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajouter la html card créée pour l'afficher dans la page html
    photographersSection.appendChild(userCardDOM);
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
  displayData(photographers);
}

init();
