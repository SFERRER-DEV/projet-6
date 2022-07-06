//import Photographer from "./../models/photographer.js";
import * as Dom from "./../utils/dom.js";
/** @type {Number} - Une constante utilisée pour gérer les deux affichage de la Card Photographe */
const DIRECTION = {
  VERTICAL: 0,
  HORIZONTAL: 1,
};

/**
 * Une méthode de fabrique pour instancier des cards hmtl de photographe.
 * La card photographe est différente suivant la page html pour laquelle on la fabrique.
 * Les classes css du parent déterminent cette page html et le sens de présenation de la card à fabriquer :
 *  - la présentation est verticale pour la page index.html.
 *  - la présentation est horizontale pour la page photographer.html.
 * La notation BEM des classes des éléments HTML de la card est spécifique d'une page à l'autre.
 *
 * @param  {Photographer} myPhotographer - Un objet de la classe photographe
 * @param  {HTMLDivElement} parent - le conteneur html de la Card (un élément du DOM)
 * @returns id, name, picture, disposition, getUserCardDOM  - l'identifiant photographe, le nom photographe, le chemin de l'image, la disposition de la présentation de la Card Html, la Card html fabriquée
 */
export function photographerFactory(myPhotographer, parent) {
  // Destructurer les propriétés de l'objet Photographer dans des variables séparées
  const { id, name } = myPhotographer;

  /** @type {number} - La page d'index demande une disposition verticale, alors que la page photographer demande une disposition horizontale.*/
  let disposition;
  if (parent.classList.contains("photographer_section")) {
    // Page index.html
    disposition = DIRECTION.VERTICAL;
  } else if (parent.classList.contains("photograph-header")) {
    // Page photograph.html
    disposition = DIRECTION.HORIZONTAL;
  }

  /**
   * Créer un article html en utilisant le DOM
   * afin d'afficher les données d'un photographe
   * avec un template spécifique suivant la page
   *
   * @returns une html card d'un photographe
   */
  function getUserCardDOM() {
    /** @const {HTMLDivElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("card-photograph");

    if (disposition === DIRECTION.VERTICAL) {
      // index.html
      _addUSerCardDOMVertical(article);
    } else if (disposition === DIRECTION.HORIZONTAL) {
      // photographer.html
      _addUSerCardDOMHorizontal(article);
    }

    return article;
  }

  /**
   * Ajouter les éléments au DOM de la page index.html
   * avec une présentation verticale specifique.
   *
   * @param {HTMLDivElement} parent - est une balise article
   */
  function _addUSerCardDOMVertical(parent) {
    /** @type {HTMLAnchorElement} - lien vers la page du photographe */
    const link = _getLink();
    // Ajouter le lien vers la page du photographe dans l'article
    parent.appendChild(link);

    /** @type {HTMLDivElement} - un conteneur pour regrouper la photo et les informations du photographe */
    const div = Dom.getDiv("card-photograph__link__container");

    // Ajouter le div conteneur dans le lien
    link.appendChild(div);

    /** @type {HTMLImageElement} - image contenant la photo du portrait */
    const photo = Dom.getPhoto(
      "card-photograph__link__container__portrait",
      myPhotographer.portrait,
      `Portrait du photographe ${myPhotographer._name}`
    );
    // Ajouter la photo dans le lien
    div.appendChild(photo);

    /** @type {HTMLTitleElement} - titre contenant le nom du photographe  */
    const name = getName(disposition, myPhotographer);
    // Ajouter le nom du photographe dans le lien
    div.appendChild(name);

    /** @type {HTMLParagraphElement} -  paragraphe contenant les informations du photographe */
    const para = Dom.getTitle(
      "card-photograph__link__container__location",
      "p",
      myPhotographer.location
    );
    // Ajouter le paragaphe
    div.appendChild(para);

    /** @type {HTMLSpanElement} - élément en ligne pour afficher le slogan */
    const span1 = Dom.getTitle(
      "card-photograph__link__container__location__slogan",
      "span",
      myPhotographer._tagline
    );

    // Ajouter l'élément de ligne
    para.appendChild(span1);

    /** @type {HTMLSpanElement} - élément en ligne pour afficher le tarif jour */
    const span2 = Dom.getTitle(
      "card-photograph__link__container__location__tarif",
      "span",
      myPhotographer.pricePerDay
    );

    // Ajouter l'élément de ligne
    para.appendChild(span2);
  }

  /**
   * Ajouter les éléments au DOM de la page photograph.html
   * avec une présentation horizontale spécifique.
   *
   * @param {HTMLDivElement} parent - est une balise article.
   */
  function _addUSerCardDOMHorizontal(parent) {
    /** @type {HTMLElement} - titre contenant le nom du photographe  */
    const name = getName(disposition, myPhotographer);
    // Ajouter le nom du photographe
    parent.appendChild(name);

    /** @type {HTMLParagraphElement} -  paragraphe contenant les informations du photographe */
    const para = Dom.getTitle(
      "card-photograph__container__location",
      "p",
      myPhotographer.location
    );
    // Ajouter le paragaphe
    parent.appendChild(para);

    /** @type {HTMLElement} - élément en ligne pour afficher le slogan */
    const span = Dom.getTitle(
      "card-photograph__container__location__slogan",
      "span",
      myPhotographer._tagline
    );
    // Ajouter l'élément de ligne
    para.appendChild(span);

    /** @type {HTMLImageElement} - image contenant la photo du portrait */
    const photo = Dom.getPhoto(
      "",
      myPhotographer.portrait,
      `Portrait du photographe ${myPhotographer._name}`
    );

    // Ajouter la photo
    parent.appendChild(photo);
  }

  /**
   * Obtenir un lien vers la page du photographe et le renvoyer.
   *
   * @returns {HTMLAnchorElement} link - balise a pointant vers une page photographe.
   */
  const _getLink = () => {
    /** @type {HTMLAnchorElement} - balise a */
    const link = document.createElement("a");
    link.classList.add("card-photograph__link");
    // création du lien pour acceder à la page du photographe
    link.setAttribute("href", `./photographer.html?id=${myPhotographer.id}`);
    link.setAttribute("aria-label", name);

    return link;
  };

  return { id, name, getUserCardDOM, disposition };
}

/**
 * Obtenir un titre pour le nom du photographe.
 *
 * @param {number} - Une constante utilisée pour gérer les deux affichage de la Card Photographe
 * @param  {Photographer} myPhotographer - Un objet de la classe photographe
 * @returns {HTMLTitleElement} titre - balise titre h1 ou h2 avec le nom du photographe
 */
const getName = (disposition, myPhotographer) => {
  /** @type {HTMLTitleElement} - balise titre h1 ou h2 */
  let title;

  if (disposition === DIRECTION.HORIZONTAL) {
    // photographer.html
    title = Dom.getTitle(
      "card-photograph__container__heading",
      "h1",
      myPhotographer.name
    );
  } else if (disposition === DIRECTION.VERTICAL) {
    // index.html
    title = Dom.getTitle(
      "card-photograph__link__container__heading",
      "h2",
      myPhotographer.name
    );
  }

  return title;
};
