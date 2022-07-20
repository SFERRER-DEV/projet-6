import { MEDIUM } from "../models/media.js";
/**
 * Obtenir un div avec sa classe
 *
 * @param {string} [strClass=""] - une classe CSS
 * @returns {HTMLDivElement} balise div conteneur
 */
export const getDiv = (strClass = "") => {
  /** @type {HTMLDivElement} - balise div */
  const div = document.createElement("div");

  return _setBalise(div, strClass);
};

/**
 * Obtenir un span avec sa classe
 * @param {string} [strClass=""] - une classe CSS
 * @param {string} [strText=""] - une chaine de caractère
 * @returns {HTMLSpanElement} balise span
 */
export const getSpan = (strClass = "", strText = "") => {
  /** @type {HTMLSpanElement} - balise span */
  const span = document.createElement("span");

  return _setBalise(span, strClass, strText);
};

/**
 * Obtenir un paragraphe avec sa classe
 * @param {string} [strClass=""] - une classe CSS
 * @param {string} [strText=""] - une chaine de caractère
 * @returns {HTMLSpanElement} balise paragraphe
 */
export const getPara = (strClass = "", strText = "") => {
  /** @type {HTMLParagraphElement} - balise p */
  const para = document.createElement("p");

  return _setBalise(para, strClass, strText);
};

/**
 * Paraamétrer une balise contenant du texte
 *
 * @param {HTMLParagraphElement | HTMLSpanElement} balise - l'élément HTML à configurer
 * @param {string} strClass - une classe CSS
 * @param {string} strText - une chaine de caractère
 * @returns {HTMLParagraphElement | HTMLSpanElement} span balise span conteneur.
 */
const _setBalise = (balise, strClass, strText) => {
  if (strClass !== undefined && strClass !== "") {
    balise.classList.add(strClass);
  }
  if (strText !== undefined && strText !== "") {
    /** @type {HTMLElement} - une chaine de caractère */
    const strNode = document.createTextNode(strText);
    balise.appendChild(strNode);
  }

  return balise;
};

/**
 * Obtenir un texte contenu dans un titre
 *
 * @param {string} balise - une notation pour un type de balise html
 * @param {string} strText - une chaine de caractère pour le titre
 * @param {string} [strClass=""] - une classe CSS
 * @param {string} [strAriaLabel=""] - une chaine de caractère pour l'ARIA
 * @returns {HTMLTitleElement | HTMLParagraphElement | HTMLSpanElement} balise titre h1 ... h6
 */
export const getTitle = (balise, strText, strClass = "", strAriaLabel = "") => {
  /** @type {HTMLTitleElement } - balise de titre h1 ... h6  */
  const titre = document.createElement(balise);

  if (strAriaLabel !== undefined && strAriaLabel !== "") {
    titre.setAttribute("aria-label", strAriaLabel);
  }

  return _setBalise(titre, strClass, strText);
};

/**
 * Obtenir une balise image pour afficher une photographie
 * ou
 * obtenir une balise vidéo pour jouer une vidéo
 *
 * @param {Media} myMedia - Un objet de la classe Media
 * @param {string} strClass1 - Une classe CSS pour la balise video
 * @param {string} strClass2 - Une classe CSS pour la balise image
 * @returns {HTMLDivElement} balise div avec une image ou une video
 */
export const getMedia = (myMedia, strClass1, strClass2) => {
  /** @type {HTMLImageElement | HTMLVideoElement} - une image ou une vidéo */
  let media;
  /** @type {string} - chemin complet avec le nom du fichier média: path/filename.ext */
  const filename = myMedia.media_folder + myMedia.filename;
  if (myMedia.media === MEDIUM.VIDEO) {
    media = getVideo(strClass1, filename, myMedia.title);
  } else {
    media = getPhoto(strClass2, filename, myMedia.title);
  }

  return media;
};

/**
 * Obtenir une image
 * Exemples: le portrait du photographe.
 *
 * @param {string} strClass - une classe CSS
 * @param {string} src - le chemin complet du dossier avec le nom de fichier de l'image
 * @param {string} title - le titre du média
 * @returns {HTMLImageElement} balise img pour afficher la photographie
 */
export const getPhoto = (strClass, src, title) => {
  /** @type {HTMLImageElement} - balise img pour le portrait */
  const img = document.createElement("img");
  img.src = src;
  img.setAttribute("alt", `Une photographie nommée ${title}`);
  if (strClass !== undefined && strClass !== "") {
    img.classList.add(strClass);
    if (strClass === "lightbox__container__photo") {
      img.setAttribute("tabindex", 0);
      img.setAttribute(
        "aria-label",
        `Une photographie en vue rappochée nommée ${title}`
      );
    }
  }

  return img;
};

/**
 * Obtenir une vidéo
 *
 * @param {string} strClass - une classe CSS
 * @param {string} src - le chemin complet du dossier avec le nom de fichier de la vidéo
 *  @param {string} title -le titre du média
 * @returns {HTMLVideoElement} img - balise video pour jouer une vidéo
 */
export const getVideo = (strClass, src, title) => {
  /** @type {HTMLImageElement} - balise vidéo pour les medias */
  const video = document.createElement("video");
  video.src = src;
  video.setAttribute("alt", `Une vidéo nommée ${title}`);
  video.setAttribute("type", "video/mp4");
  if (strClass !== undefined && strClass !== "") {
    video.classList.add(strClass);
    if (strClass === "lightbox__container__video") {
      video.controls = true;
      video.muted = false;
      video.setAttribute("tabindex", 0);
      video.setAttribute(
        "aria-label",
        `Une vidéo agrandie dans le lecteur nommée ${title}`
      );
    } else {
      video.controls = false;
    }
  }

  return video;
};

/**
 *  Obtenir une balise button avec une icône
 *  Exemples: liker un media, cont^roler la lightbox
 *
 * @param {string} strClass1 - Une classe CSS pour le bouton
 * @param {string} strClass2 - Une classe CSS pour la forme de l'icône
 * @param {string} [strClass3="fa-solid"] - Une classe CSS pour le style de l'icône
 * @param {string} strAriaLabel - le text de l'aria label de l'icône
 * @returns {HTMLButtonElement} balise bouton avec une icône
 */
export const getButton = (
  strClass1,
  strClass2,
  strClass3 = "fa-solid",
  strAriaLabel = ""
) => {
  /** @type {HTMLButtonElement} - balise bouton */
  const bouton = document.createElement("button");
  if (strClass1 !== undefined && strClass1 !== "") {
    bouton.classList.add(strClass1);
  }

  if (strAriaLabel !== "") {
    bouton.setAttribute("aria-label", strAriaLabel);
  }

  if (strClass2 !== undefined && strClass2 !== "") {
    /** @type {HTMLElement} - balise de texte pour contenir l'icone coeur */
    const icone = document.createElement("i");
    icone.classList.add(strClass3);
    icone.classList.add(strClass2);
    icone.setAttribute("aria-hidden", true);

    bouton.append(icone);
  }

  return bouton;
};

/**
 * Obtenir un lien vers la page du photographe et le renvoyer.
 *
 * @param {string} strClass - Une classe CSS pour le lien
 * @param {string} strRelativeUrl - Une classe CSS pour le lien
 * @param {string} [strAriaLabel=""] - le text de l'aria label de l'icône
 * @returns {HTMLAnchorElement} - balise a pointant vers une page photographe.
 */
export const getLink = (strClass, strRelativeUrl, strAriaLabel = "") => {
  /** @type {HTMLAnchorElement} - balise a */
  const link = document.createElement("a");
  if (strClass !== undefined && strClass !== "") {
    link.classList.add(strClass);
  }
  link.setAttribute("href", strRelativeUrl);
  if (strAriaLabel !== "") {
    link.setAttribute("aria-label", strAriaLabel);
  }

  return link;
};

/**
 * Pieger le focus dans un conteneur
 * pour ne boucler uniquement dedans en utilisant la touche tabulation
 *
 * @param {HTMLSectionElement | HTMLDivElement} container - la lightbox ou la modale du formulaire de contact
 */
export const trapFocus = (container) => {
  // Sélectionne les élements focusables de l'élément passé en argument
  const elements = container.querySelectorAll("button:not([disabled])");
  const first = elements[0];
  const last = elements[elements.length - 1];

  /* Listener de touche appuyée sur l'élément passé en argument */
  container.addEventListener("keydown", (e) => {
    // Si tab appuyé
    if (e.key === "Tab" || e.keyCode === 9) {
      // Si tab + shift appuyé sur 1 élement -> focus dernier élément
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        // Si tab est appuyé sur dernier élément -> focus 1er élément
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
};
