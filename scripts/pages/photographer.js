import * as facHeader from "./../factories/photographer.js";
import * as facGallery from "./../factories/media.js";
//import * as Media from "./../models/media.js";
import Photographer from "./../models/photographer.js";
import singletonPhotograherApi from "./../api/photographerApi.js";
import singletonMediumApi from "./../api/mediumApi.js";
import * as sort from "./../util/sort.js";
import Media from "../models/media.js";

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
  medium = singletonMediumApi.getAllDataByID(targetID);
  if (Array.isArray(medium) && !medium.length) {
    // ...sinon en recherchant avec l'API
    medium = await singletonMediumApi.getAllById(targetID);
    if (Array.isArray(medium) && !medium.length) {
      //throw `Medias du photographe ${targetID} non trouvés`;
    }
  }

  return medium;
}

/**
 * Afficher un photographe
 * dans une HTML Card en utilisant la factory photographer
 *
 * @param {Photographer} photographer - Un objet de type photographe
 */
async function displayDataPhotographer(photographer) {
  /** @type {HTMLDivElement} - le conteneur html <div> pour afficher le photographe */
  const parent = document.querySelector(".photograph-header");

  /** @type {HTMLButtonElement} - le bouton de contact sur la page du photographe */
  const bouton = parent.querySelector(".contact_button");

  /** @type {Object} - Factory Method qui fabrique la HTML Card de photographe */
  const photographerModel = facHeader.photographerFactory(photographer, parent); // Instancier une fabrique pour créer la card

  /** @type {HTMLDivElement} - une card de photographe qui a été fabriquée dans une balise article */
  const userCardDOM = photographerModel.getUserCardDOM(parent); // Obtenir la card pour le photographe et en fonction du conteneur parent

  // Ajouter cette card créée et l'afficher avant la position du bouton de contact
  parent.insertBefore(userCardDOM, bouton);
}

/**
 * Afficher tous les medias du photographe
 * dans des HTML Cards en utilisant la factory media
 *
 * @param {Array<Media>} medium - Un table d'objets de type Media
 */
async function displayDataMedium(medium) {
  /** @type {HTMLDivElement} - le conteneur html <div> pour afficher la gallerie de medias */
  const container = document.querySelector("#gallery");
  /** @type {NodeList} - une liste pour contenir les HTML Cards fabriquées */
  let cardsHtml = document.createDocumentFragment();

  // Parcourir tous les médias du tableau
  medium.forEach((m) => {
    // renseigner le chemin du dossier conteneur de chaque média avec le prénom connu du photographe
    m.media_folder = `assets/images/${photographer.firstname}/`;
    /** @type {Object} - Factory Method qui fabrique une HTML Card avec un objet de type Media */
    const mediaModel = facGallery.mediaFactory(m); // Instancier une fabrique pour créer la card
    /** @type {HTMLArticleElement} - une HTML Card d'un media qui est fabriquée dans une balise article */
    const mediaCardDOM = mediaModel.getMediaCardDOM(); // Fabriquer la HTML Card
    // Ajouter cette HTML Card Media à la liste
    cardsHtml.appendChild(mediaCardDOM);
  });

  // Remplacer les medias existant et afficher les nouveaux medias fabriqués
  container.replaceChildren(cardsHtml);
}

/**
 * Faire la somme des likes d'objets de type Media contenus dans un tableau
 *
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
const likesCounter = (medium) => {
  return medium
    .map((item) => item["likes"])
    .reduce((prev, next) => prev + next);
};

/**
 * Afficher la somme des likes du photographe dans l'encart
 *
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
const photographerLikes = (medium) => {
  /** @type {number} - Faire la somme des likes  */
  const counter = likesCounter(medium);
  /** @type {HTMLSpanElement} - Encart tarif journalier du photographe */
  const likes = document.querySelector(".informations__rates__likes");
  /** @type {HTMLSpanElement} - Encart tarif journalier du photographe */
  //const ilike = document.querySelector(".informations__rates__likes_ilike");
  // Mettre à jour l'encart avec le tarif du photographe
  likes.textContent = counter;
  //likes.insertBefore(document.createTextNode(counter), ilike);
};

/**
 * Afficher le tarif du photographe dans l'encart
 *
 * @param {string} pricePerDay - une chaine de caractère ex: 500€ / jour
 */
const photographerPricePerDay = (pricePerDay) => {
  /** @type {HTMLSpanElement} - Encart tarif journalier du photographe et ses j'aime */
  const priceperday = document.querySelector(
    ".informations__rates__priceperday"
  );
  // Mettre à jour l'encart avec le tarif du photographe
  priceperday.appendChild(document.createTextNode(pricePerDay));
};

/**
 * Obtenir les données médias du photographe
 * éventuellement les trier puis les afficher.
 * Compter et afficher le nombres de j'aime de ces médias.
 *
 * @param {string} sortOption - une chaine de caractère définissant un type de tri à appliquer sur l'ordre d
 */
async function init(sortOption = undefined) {
  /** {Array<Media>} medium - un tableau contenant des objets de type Média */
  let medium = await getMedium(photographer.id); // Remplir le tableau des medias pour l'identifiant du photographe
  // Afficher le nombre de médias trouvés sur la console
  console.log(`${medium.length} medias trouvés`);

  if (Array.isArray(medium) && medium.length > 0) {
    // Appliquer un type de tri au tableau des medias
    if (sortOption !== undefined) {
      sort.sorted(medium, sortOption);
    }

    // Afficher les HTML Cards des medias du photographe dans la page HTML
    displayDataMedium(medium);

    // Afficher le nombre de likes du photographe
    photographerLikes(medium);
  }
}

// Point d'entrée de la page
/** */
let params = new URL(document.location).searchParams;
/** @type {number} - l'identifiant du photographe obtenu en paramètre url */
const photograpgerId = parseInt(params.get("id"));

/** @type {Object} - l'objet contenant les données du photographe */
const photographer = await getPhotographer(photograpgerId);
// Afficher les données sur la console
console.table(photographer);

// Afficher la HTML Card du photographe dans la page HTML
displayDataPhotographer(photographer);

// Afficher le tarif jour du photographe
photographerPricePerDay(photographer.pricePerDay);

/** @type {HTMLSelectElement} - La liste déroulante des différents tris */
const sorted = document.querySelector(".sorted__form__list");
// Ecouter l'action de changement de la liste et appeler la bonne fonction de tri
sorted.addEventListener("change", function () {
  /** @type {HTMLOptionElement} - L'option sélectionnée dans la liste de tri */
  const selected = this.options[sorted.selectedIndex];
  /** @type {string} - Le tri à appliquer est écrit dans un attribut data */
  const sortOption = selected.getAttribute("data-sort");
  // Trier les medias
  init(sortOption);
});

init();
