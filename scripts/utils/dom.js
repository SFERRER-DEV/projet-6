import * as Media from "./../models/media.js";
/**
 * Obtenir un div avec sa classe
 *
 * @param {string} strClass - une classe CSS
 * @returns {HTMLDivElement} div balise div conteneur.
 */
export const getDiv = (strClass) => {
  /** @type {HTMLDivElement} - balise div */
  const div = document.createElement("div");
  if (strClass !== undefined && strClass !== "") {
    div.classList.add(strClass);
  }

  return div;
};

/**
 * Obtenir un texte contenu dans un titre ou un paragraphe
 * ou présenter du texte inline
 * Exemples: le titre du média, le nom ou les infos du photographe
 *
 * @param {string} strClass - une classe CSS
 * @param {string} balise - une notation pour un type de balise html
 * @param {string} balise - une notation pour un type de balise html
 * @returns {HTMLTitleElement | HTMLParagraphElement | HTMLSpanElement} balise titre h3, h2, h1 ou un paragraphe contenant une chaine de caractères
 */
export const getTitle = (strClass, balise, strText, strAriaLabel = "") => {
  /** @type {HTMLTitleElement |HTMLParagraphElement | HTMLSpanElement} - balise contenant la chaine de caractères */
  const titre = document.createElement(balise);
  titre.textContent = strText;
  if (strClass !== undefined && strClass !== "") {
    titre.classList.add(strClass);
  }
  if (strAriaLabel !== "") {
    titre.setAttribute("aria-label", strAriaLabel);
  }

  return titre;
};

/**
 * Obtenir une balise image pour afficher une photographie
 * ou
 * obtenir une balise vidéo pour jouer une vidéo
 *
 * @param {Media} myMedia - Un objet de la classe Media
 * @param {string} strClass1 - Une classe CSS pour la balise conteneur div
 * @param {string} strClass2 - Une classe CSS pour la balise video
 * @param {string} strClass3 - Une classe CSS pour la balise image
 * @returns {HTMLDivElement} balise div avec une image ou une video
 */
export const getMedia = (myMedia, strClass1, strClass2, strClass3) => {
  /** @type {HTMLDivElement} - balise div */
  const div = getDiv(strClass1);
  /** @type {HTMLImageElement | HTMLVideoElement} - une image ou une vidéo */
  let media;
  /** @type {string} - chemin complet avec le nom du fichier média: path/filename.ext */
  const filename = myMedia.media_folder + myMedia.filename;
  if (myMedia.media === Media.MEDIUM.VIDEO) {
    media = getVideo(strClass2, filename, `Une vidéo nommée ${myMedia.title}`);
  } else {
    media = getPhoto(
      strClass3,
      filename,
      `Une photograhpie nommée ${myMedia.title}`
    );
  }
  div.appendChild(media);

  return div;
};

/**
 * Obtenir une image
 * Exemples: le portrait du photographe.
 *
 * @param {string} strClass - une classe CSS
 * @param {string} src - le chemin complet du dossier avec le nom de fichier de l'image
 * @param {string} strAlt -le texte alternatif pour l'image
 * @returns {HTMLImageElement} balise img pour afficher la photographie
 */
export const getPhoto = (strClass, src, strAlt) => {
  /** @type {HTMLImageElement} - balise img pour le portrait */
  const img = document.createElement("img");
  img.src = src;
  img.setAttribute("alt", strAlt);
  if (strClass !== undefined && strClass !== "") {
    img.classList.add(strClass);
    if (strClass === "lightbox__container__media__photo") {
      img.setAttribute("tabindex", 5);
    }
  }

  return img;
};

/**
 * Obtenir une vidéo
 *
 * @param {string} src - le chemin complet du dossier avec le nom de fichier de la vidéo
 * @returns {HTMLVideoElement} img - balise video pour jouer une vidéo
 */
export const getVideo = (strClass, src, strAlt) => {
  /** @type {HTMLImageElement} - balise vidéo pour les medias */
  const video = document.createElement("video");
  video.src = src;
  if (strClass !== undefined && strClass !== "") {
    video.classList.add(strClass);
    if (strClass === "lightbox__container__media__video") {
      video.controls = true;
      video.autoplay = true;
      video.muted = false;
      video.setAttribute("tabindex", 5);
    } else {
      video.controls = false;
    }
  }

  video.setAttribute("alt", strAlt);

  return video;
};

/**
 *  Obtenir une balise button avec une icône
 *  Exemples: liker un media, cont^roler la lightbox
 *
 * @param {string} strClass1 - Une classe CSS pour le bouton
 * @param {string} strClass2 - Une classe CSS pour la forme de l'icône
 * @param {string} strClass3 - Une classe CSS pour le style de l'icône
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

  if (strClass2 !== undefined && strClass2 !== "") {
    /** @type {HTMLElement} - balise de texte pour contenir l'icone coeur */
    const icone = document.createElement("i");
    icone.classList.add(strClass3);
    icone.classList.add(strClass2);
    if (strAriaLabel !== "") {
      icone.setAttribute("aria-hidden", true);
      if (strAriaLabel !== "") {
        icone.setAttribute("aria-label", strAriaLabel);
      }
    }

    bouton.append(icone);
  }

  return bouton;
};

/**
 * Obtenir un lien vers la page du photographe et le renvoyer.
 *
 * @param {string} strClass - Une classe CSS pour le lien
 * @param {string} strRelativeUrl - Une classe CSS pour le lien
 * @param {string} strAriaLabel - le text de l'aria label de l'icône
 * @returns {HTMLAnchorElement} - balise a pointant vers une page photographe.
 */
export const getLink = (strClass, strRelativeUrl, strAriaLabel) => {
  /** @type {HTMLAnchorElement} - balise a */
  const link = document.createElement("a");
  if (strClass !== undefined && strClass !== "") {
    link.classList.add(strClass);
  }
  link.setAttribute("href", strRelativeUrl);
  link.setAttribute("aria-label", strAriaLabel);

  return link;
};
