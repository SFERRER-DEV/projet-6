// Importer le fabriques
import * as facHeader from "./../factories/photographer.js";
import * as facGallery from "./../factories/media.js";
// Importer les classes
import Photographer from "./../models/photographer.js";
import Media from "../models/media.js";
// Importer les objets API
import singletonPhotograherApi from "./../api/photographerApi.js";
import singletonMediumApi from "./../api/mediumApi.js";
// Importer les fonctions de tri
import * as sort from "../utils/sort.js";
// Importer les fonctions du formulaire de contact
import * as fm from "../utils/contactForm.js";

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
 * Obtenir les données des médias d'un photographe
 *
 * @param {number} targetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Array<{Media}>) - Un tableau contenant la liste des medias du photographe
 */
async function getMedium(targetID) {
  /** @type {Array<Media>} - Un tableau pour contenir des objets de type Media */
  let medium = singletonMediumApi.getAllDataByID(targetID); // en recherchant en mémoire locale d'abord ...
  if (Array.isArray(medium) && !medium.length) {
    medium = await singletonMediumApi.getAllById(targetID); // ...sinon en recherchant avec l'API
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
    const mediaModel = facGallery.mediaFactory(m); // Instancier une fabrique pour créer la HTML Card
    /** @type {HTMLArticleElement} - une HTML Card d'un media qui est fabriquée dans une balise article */
    const mediaCardDOM = mediaModel.getMediaCardDOM(); // Fabriquer la HTML Card

    /** @type {HTMLButtonElement} - le bouton j'aime dans cette HTML Card*/
    const buttonIlike = mediaCardDOM.querySelector(
      ".card-media__heading__likes__ilike"
    );
    // Ajouter l'évènement du click au bouton j'aime de ce média
    addEventILike(buttonIlike, m.id);

    // Ajouter cette HTML Card Media à la liste
    cardsHtml.appendChild(mediaCardDOM);
  });

  // Remplacer les medias existant et afficher les nouveaux medias fabriqués
  container.replaceChildren(cardsHtml);
}

/**
 * Determiner quel tri est selectionné dans la dropdownlist
 *
 * @param {HTMLSelectElement} sorted la liste déroulante des différents tris
 */
const getSortOption = () => {
  /** @type {HTMLSelectElement} - La liste déroulante des différents tris */
  const sorted = document.querySelector(".sorted__form__list");
  /** @type {HTMLOptionElement} - L'option sélectionnée dans la liste de tri */
  const selected = sorted.options[sorted.selectedIndex];
  /** @type {string} - Le tri à appliquer est écrit dans un attribut data */
  const sortOption = selected.getAttribute("data-sort");

  return sortOption;
};

/**
 * Ajouter un évènement click au bouton j'aime d'une HTML Card de média.
 * Le bouton appelle la fonction iLike(media) qui est hors de la portée de la fabrique.
 * L'évènement est donc ajouté ici.
 *
 * @param {HTMLButtonElement} buttonIlike - un bouton j'aime d'une HTML Card de Media fabriquée
 * @param {number} mediaId - L'identifiant d'un media
 *
 */
const addEventILike = (buttonIlike, mediaId) => {
  // Ajouter l'évèvement click au bouton j'aime
  buttonIlike.addEventListener("click", function () {
    iLike(mediaId); // Ajouter un j'aime +1
  });
};

/**
 * Incrémenter le nombre de likes d'un média
 * Remplacer la HTML Card à partir de l'identifiant du média passé en paramètre et le permutter
 * avec une nouvelle HTML Card fabriquée
 * L'objet de type media est obtenu à nouveau à partir de son id depuis l'API.
 * Ainsi son compte de likes sera toujours incrémenté à partir de sa valeur d'origine dans le fichier JSON
 * et le média ne pourra être liké qu'une seule fois.
 * Il faut rajouter ici l'évènement click au bouton j'aime de la nouvelle HTML Card
 * car cet évènement n'est pas fourni par la fabrique
 *
 * @param {number} mediaId - L'identifiant d'un media
 */
async function iLike(mediaId) {
  /**  @type {Object} obj - un objet JSON obtenu d'après l'identifiant du média à créer*/
  const obj = await singletonMediumApi.getById(mediaId, photographerId);
  if (Array.isArray(obj) && obj.length === 1) {
    /** @type {Media} media - un objet de type média créé à partir des donnés json*/
    const media = Media.createMedia(obj[0]);
    // Renseigner le chemin du dossier conteneur du média avec le prénom du photographe
    media.media_folder = `assets/images/${photographer.firstname}/`;

    // Incrémenter d'un seul j'aime ce media obtenu depuis l'API
    media.likes += 1;

    /** @type {Object} - Factory Method qui fabrique une HTML Card avec un objet de type Media */
    const mediaModel = facGallery.mediaFactory(media); // Instancier une fabrique pour créer la HTML Card

    /** @type {HTMLArticleElement} - une nouvelle HTML Card à fabriquer pour ce média */
    const newMediaCardDOM = mediaModel.getMediaCardDOM(); // Fabriquer la nouvelle HTML Card

    /** @type {HTMLButtonElement} - le bouton j'aime dans cette HTML Card*/
    const buttonIlike = newMediaCardDOM.querySelector(
      ".card-media__heading__likes__ilike"
    );

    // Ajouter l'évènement du click du bouton j'aime de ce média (puisque la factory ne le fait pas)
    // Si cet évènement n'est pas ajouté à nouveau alors les médias ne pourraientt être cliqués qu'une seule et première fois.
    addEventILike(buttonIlike, media.id);

    /** @type {HTMLDivElement} - Le conteneur html <div> qui contient toutes les HTML Cards */
    const container = document.querySelector("#gallery");

    /** @type {} - l'ancienne HTML Card de ce media */
    const oldMediaCardDom = container.querySelector(`[data-id="${media.id}"]`);

    // Permutter les HTML Cards
    container.replaceChild(newMediaCardDOM, oldMediaCardDom);

    /** {Array<Media>} medium - un tableau contenant les objets de type Média du photographe */
    let medium = await getMedium(photographer.id); // Remplir le tableau des medias pour le photographe
    /** @type {number} - trouver l'indice du média d'après sa propriété id dans le tableau de médias */
    const index = medium.map((m) => m.id).indexOf(mediaId);
    // Vérifier qu'une instance de type Media a été retrouvée pour l'id
    if (index !== -1) {
      medium[index].likes = media.likes; // Mettre à jour le tableau afin de tenir le compte total des likes juste
    }
    // Recalculer la somme des likes du photographe
    photographerLikes();
  } else {
    throw `Echec du like: Media ${mediaId} non trouvé pour photographe ${photographerId}`;
  }
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
const photographerLikes = () => {
  /** @type {Array<Media>} - Un tableau pour contenir des objets de type Media */
  const medium = singletonMediumApi.getAllDataByID(photographerId); //// obtenu en mémoire locale
  /** @type {number} - Faire la somme des likes  */
  const counter = likesCounter(medium);
  /** @type {HTMLSpanElement} - Encart du compteur de likes */
  const likes = document.querySelector(".informations__rates__likes");
  // Mettre à jour l'encart avec la somme du nombre de j'aime des medias du photographe
  likes.textContent = counter;
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
    photographerLikes();
  }
}

// Point d'entrée de la page

/** {URLSearchParams} - paramètres FET de l'URL de la page */
let params = new URL(document.location).searchParams;
/** @type {number} - l'identifiant du photographe obtenu en paramètre url */
const photographerId = parseInt(params.get("id"));

/** @type {Object} - l'objet contenant les données du photographe */
const photographer = await getPhotographer(photographerId);
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
  console.log("change");
  /** @type {string} - chaine de caractère du tri sélectionné dans la dropdownlist: popular, date, title */
  const sortOption = getSortOption();
  init(sortOption);
});

// Gestion des évènements de u formulaire de contact

const btnContact = document.getElementById("btn-modal-open");
btnContact.addEventListener("click", () => fm.displayModal(photographer.name));

const btnClose = document.getElementById("btn-modal-close");
btnClose.addEventListener("click", () => fm.closeModal());

init();
