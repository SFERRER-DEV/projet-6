// Importer les fabriques
import * as facHeader from "./../factories/photographer.js";
import * as facGallery from "./../factories/media.js";
// Importer les classes
import Photographer from "./../models/photographer.js";
import Media from "../models/media.js";
// Importer les objets API
import singletonPhotograherApi from "./../api/photographerApi.js";
import singletonMediumApi, { MediumApi } from "./../api/mediumApi.js";
// Importer les fonctions de tri
import * as sort from "../utils/sort.js";
// Importer les fonctions du formulaire de contact
import * as fm from "../utils/contactForm.js";
// Importer les fonctions de la lightbox
import * as lbx from "../utils/lightbox.js";

/**
 * Obtenir les données d'un photographe
 *
 * @param {Number} tagetID - Identifiant du photographe passé en paramètre à l'url
 * @returns {Photographer)Un photographe obtenu en mémoire ou sinon par un appel API au fichier JSON
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
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
async function displayDataMedium(medium) {
  /** @type {HTMLDivElement} - le conteneur html <div> pour afficher la gallerie de medias */
  const gallery = document.querySelector("#gallery");
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

    /** @type {HTMLDivElement} - un conteneur <div> qui contient soit une image soit une vidéo */
    const container = mediaCardDOM.querySelector(".card-media__container");
    // Ajouter l'évènement du click pour ouvrir la lightbox sur ce media
    addEventOpenLightbox(container, m);

    /** @type {HTMLButtonElement} - le bouton j'aime dans cette HTML Card*/
    const buttonIlike = mediaCardDOM.querySelector(
      ".card-media__heading__likes__ilike"
    );
    // Ajouter l'évènement du click au bouton j'aime de ce média
    addEventILike(buttonIlike, m.id, medium);

    // Ajouter cette HTML Card Media à la liste
    cardsHtml.appendChild(mediaCardDOM);
  });

  // Remplacer les medias existant en affichant les nouveaux medias fabriqués
  gallery.replaceChildren(cardsHtml);
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
 * Le bouton appelle la fonction iLike(media) qui est hors de la portée de la fabrique de HTML Card Media.
 * L'évènement est donc ajouté ici, car cette fonction de callbak est dans ce script.
 *
 * @param {HTMLButtonElement} buttonIlike - un bouton j'aime d'une HTML Card de Media fabriquée
 * @param {number} mediaId - L'identifiant d'un media
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 *
 */
const addEventILike = (buttonIlike, mediaId, medium) => {
  // Ajouter l'évèvement click au bouton j'aime
  buttonIlike.addEventListener("click", function () {
    iLike(mediaId, medium); // Ajouter un j'aime +1
  });
};

/**
 * Ajouter un évènement click au div container d'un média dans une HTML Card de média
 * pour ouvrir ce média dans une lightbox
 * La fonction d'ouverture appellée qui est hors de la portée de la fabrique de HTML Card Media
 * L'évènement est donc ajouté ici, cette fonction de callback est référencée par ce script.
 *
 * @param {HTMLDivElement} container - un conteneur <div> qui contient soit une image soit une vidéo
 * @param {Media} media - un objet de type Media
 */
const addEventOpenLightbox = (container, media) => {
  /** @type {HTMLSectionElement} - le conteneur <section> pour afficher la lightbox */
  const lightbox = document.querySelector("#lightbox");

  // Ajouter l'évènement du click qui ouvre la lightbox pour ce media
  container.addEventListener("click", function (event) {
    // Afficher la lightbox
    lbx.showLightbox(event, lightbox, media);
  });
};

/**
 * Liker un média qu'une fois
 * L'objet de type media est obtenu à nouveau à partir de son id depuis un appel à l'API.
 * Ainsi son compte de likes sera toujours incrémenté à partir de sa valeur d'origine dans le fichier JSON
 *
 * Fabriquer une HTML Card à partir du média
 * Permutter avec cette nouvelle HTML Card fabriquée
 *
 * Les évènements des HTML Card Media ne sont pas fournis par leur fabrique
 * Il faut les rajouter ici, puisque leur fonctions callback sont dans ce script
 * - l'évènement click au bouton j'aime le média
 * - l'évènement click de l'ouverture de la lightbox sur le média
 *
 * @param {number} mediaId - L'identifiant d'un media
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
async function iLike(mediaId, medium) {
  /**  @type {Object} obj - un objet JSON obtenu d'après l'identifiant du média à liker */
  const obj = await singletonMediumApi.getApiMediaById(mediaId, photographerId);
  if (Array.isArray(obj) && obj.length === 1) {
    /** @type {Media} media - un objet de type média créé à partir des donnés json*/
    const media = Media.createMedia(obj[0]);
    // Renseigner le chemin du dossier conteneur du média avec le prénom du photographe
    media.media_folder = `assets/images/${photographer.firstname}/`;

    // Incrémenter d'un j'aime ce media obtenu depuis l'API, avant de fabriquer ss HTML Card
    media.likes += 1;

    /** @type {Object} - Factory Method qui fabrique une HTML Card avec un objet de type Media */
    const mediaModel = facGallery.mediaFactory(media); // Instancier une fabrique pour créer la HTML Card

    /** @type {HTMLArticleElement} - une nouvelle HTML Card à fabriquer pour ce média */
    const newMediaCardDOM = mediaModel.getMediaCardDOM(); // Fabriquer la nouvelle HTML Card

    /** @type {HTMLButtonElement} - le bouton j'aime dans cette nouvelle HTML Card fabriquée */
    const buttonIlike = newMediaCardDOM.querySelector(
      ".card-media__heading__likes__ilike"
    );
    // Ajouter l'évènement du click du bouton j'aime de ce média
    addEventILike(buttonIlike, media.id, medium);

    /** @type {HTMLDivElement} -  le conteneur <div> de l'image ou la vidéo et qui peuvent être ouvertes dans une lightbox */
    const container = newMediaCardDOM.querySelector(".card-media__container");
    // Ajouter l'évènement du click pour ouvrir la lightbox sur ce media
    addEventOpenLightbox(container, media);

    /** @type {HTMLDivElement} - Le conteneur html <div> qui contient toutes les HTML Cards */
    const gallery = document.querySelector("#gallery");

    /** @type {} - l'ancienne HTML Card de ce media dans la gallerie */
    const oldMediaCardDom = gallery.querySelector(`[data-id="${media.id}"]`);

    // Permutter les HTML Cards
    gallery.replaceChild(newMediaCardDOM, oldMediaCardDom);

    /** @type {number} - trouver l'indice du média dans le tableau de médias */
    const index = MediumApi.getMediaIndex(mediaId, medium);
    // Vérifier qu'un Media a été retrouvée pour cet id
    if (index !== -1) {
      // Mettre à jour aussi le tableau afin de tenir le compte total des likes juste
      medium[index].likes = media.likes;
    }
    // Recalculer et afficher la somme des likes du photographe
    displayLikes(medium);
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
 * Faire la somme des likes du photographe
 * et l'afficher dans l'encart
 *
 * @param {Array<Media>} medium - Un tableau d'objets de type Media
 */
const displayLikes = (medium) => {
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
  /** @type {Array<Media>} - Un tableau pour contenir des objets de type Media pour ce photographe */
  let medium = singletonMediumApi.getDataMediumById(photographerId); // en recherchant en locale
  if (Array.isArray(medium) && !medium.length) {
    throw `Medias du photographe ${photographerId} non trouvés`;
  } else {
    // Afficher le nombre de médias trouvés sur la console
    console.log(`${medium.length} medias trouvés`);
  }

  // Appliquer un type de tri au tableau des medias
  if (sortOption !== undefined) {
    sort.sorted(medium, sortOption);
  }

  // Afficher les HTML Cards des medias du photographe dans la page HTML
  displayDataMedium(medium);

  // Afficher le nombre de likes du photographe
  displayLikes(medium);
}

// Point d'entrée de la page : Obtenir le photographe, puis obtenir les médias du photographe

/** {URLSearchParams} - paramètres GET de l'URL de la page */
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

// Obtenir les données des médias du photographe
init();

// Gestion des évènements

/** @type {HTMLButtonElement} - Le bouton pour contacter le photographe */
const btnContact = document.getElementById("btn-modal-open");
// Ecouter l'action du clic  pour ouvrir la modale
btnContact.addEventListener("click", () => fm.displayModal(photographer.name));

/** @type {HTMLSelectElement} - La liste déroulante pour choisir un tri différents */
const sorted = document.querySelector(".sorted__form__list");
// Ecouter l'action de changement de la liste et appeler la bonne fonction de tri
sorted.addEventListener("change", function () {
  console.log("change");
  /** @type {string} - chaine de caractère du tri sélectionné dans la dropdownlist: popular, date, title */
  const sortOption = getSortOption();
  // Obtenir les données des médias du photographe
  init(sortOption);
});
