//import Photographer from "./../models/photographer.js";
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

    /** @type {HTMLDivElement} - conteneur */
    const div = _getContainerDiv();
    // Ajouter le div conteneur dans le lien
    link.appendChild(div);

    /** @type {HTMLImageElement} - image contenant la photo du portrait */
    const photo = _getPhoto();
    // Ajouter la photo dans le lien
    div.appendChild(photo);
    photo.classList.add("card-photograph__link__container__portrait");

    /** @type {HTMLTitleElement} - titre contenant le nom du photographe  */
    const name = _getName();
    // Ajouter le nom du photographe dans le lien
    div.appendChild(name);

    /** @type {HTMLParagraphElement} -  paragraphe contenant les informations du photographe */
    const para = _getParagraph(myPhotographer.location);
    para.classList.add("card-photograph__link__container__location");
    // Ajouter le paragaphe
    div.appendChild(para);

    /** @type {HTMLSpanElement} - élément en ligne pour afficher le slogan */
    const span1 = _getSpan(myPhotographer._tagline);
    span1.classList.add("card-photograph__link__container__location__slogan");
    // Ajouter l'élément de ligne
    para.appendChild(span1);

    /** @type {HTMLSpanElement} - élément en ligne pour afficher le tarif jour */
    const span2 = _getSpan(myPhotographer.pricePerDay);
    span2.classList.add("card-photograph__link__container__location__tarif");
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
    const name = _getName();
    name.classList.add("card-photograph__container__heading");
    // Ajouter le nom du photographe
    parent.appendChild(name);

    /** @type {HTMLElement} -  paragraphe contenant les informations du photographe */
    const para = _getParagraph(myPhotographer.location);
    para.classList.add("card-photograph__container__location");
    // Ajouter le paragaphe
    parent.appendChild(para);

    /** @type {HTMLElement} - élément en ligne pour afficher le slogan */
    const span = _getSpan(myPhotographer._tagline);
    span.classList.add("card-photograph__container__location__slogan");
    // Ajouter l'élément de ligne
    para.appendChild(span);

    /** @type {HTMLElement} - image contenant la photo du portrait */
    const photo = _getPhoto();
    // Ajouter la photo
    parent.appendChild(photo);
  }

  /**
   * Obtenir un conteneur pour regrouper
   * la photo et les informations du photographe
   *
   * @returns {HTMLDivElement} div - balise div conteneur.
   */
  const _getContainerDiv = () => {
    /** @type {HTMLDivElement} - balise div */
    const div = document.createElement("div");
    div.classList.add("card-photograph__link__container");

    return div;
  };

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

  /**
   * Obtenir une image pour la photo du photographe.
   *
   * @returns {HTMLImageElement} img - balise img pour le portrait
   */
  const _getPhoto = () => {
    /** @type {HTMLImageElement} - balise img pour le portrait */
    const img = document.createElement("img");
    img.setAttribute("src", myPhotographer.portrait);
    img.setAttribute("alt", `Portrait du photographe ${myPhotographer._name}`);

    return img;
  };

  /**
   * Obtenir un titre pour le nom du photographe.
   *
   * @returns {HTMLTitleElement} titre - balise titre h1 ou h2 avec le nom du photographe
   */
  const _getName = () => {
    /** @type {HTMLTitleElement} - balise titre */
    let titre;

    if (disposition === DIRECTION.HORIZONTAL) {
      // photograher.html
      titre = document.createElement("h1");
      titre.classList.add("card-photograph__container__heading");
    } else if (disposition === DIRECTION.VERTICAL) {
      // index.html
      titre = document.createElement("h2");
      titre.classList.add("card-photograph__link__container__heading");
    }
    titre.textContent = myPhotographer.name;

    return titre;
  };

  /**
   * Préparer et obtenir un paragraphe de texte.
   *
   * @param {String} strTexte - une chaine de caractère à afficher
   * @returns {HTMLParagraphElement} para - balise p avec le texte mis en forme
   */
  const _getParagraph = (strTexte) => {
    /** @type {HTMLParagraphElement} - un paragraphe de texte */
    const para = document.createElement("p");
    para.appendChild(document.createTextNode(strTexte));

    return para;
  };

  /**
   * Préparer et obtenir un élément d'une ligne de texte.
   *
   * @param {String} strTexte - le texte à mettre en forme avec css
   * @returns {HTMLSpanElement} span
   */
  const _getSpan = (strTexte) => {
    /** @type {HTMLSpanElement} - texte en ligne */
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(strTexte));

    return span;
  };

  return { id, name, getUserCardDOM, disposition };
}
