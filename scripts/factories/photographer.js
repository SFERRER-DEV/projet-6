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
  if (parent.classList.contains("photographers")) {
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
   * @returns {HTMLArticleElement} une HTLK Card d'un photographe
   */
  function getUserCardDOM() {
    /** @const {HTMLDivElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");
    article.classList.add("card-photograph");
    article.setAttribute(
      "aria-label",
      `Carte de visite du photographe ${name}`
    );

    if (disposition === DIRECTION.VERTICAL) {
      // index.html
      addUSerCardDOMVertical(article, myPhotographer);
    } else if (disposition === DIRECTION.HORIZONTAL) {
      // photographer.html
      addUSerCardDOMHorizontal(article, myPhotographer);
    }

    return article;
  }

  return { id, name, getUserCardDOM, disposition };
}

/**
 * Ajouter les éléments au DOM de la page photograph.html
 * avec une présentation horizontale spécifique.
 *
 * @param {Photographer} myPhotographer - Un objet de la classe photographe
 * @param {HTMLDivElement} parent - est une balise article
 */
function addUSerCardDOMHorizontal(parent, myPhotographer) {
  /** @type {HTMLTitleElement} - titre contenant le nom du photographe  */
  const name = getName(myPhotographer, DIRECTION.HORIZONTAL);
  name.setAttribute("tabindex", "0");
  // Ajouter le nom du photographe
  parent.appendChild(name);

  /** @type {HTMLTitleElement} -  Titre contenant la ville et le pays du photographe */
  const localisation = Dom.getTitle(
    "h2",
    myPhotographer.location,
    "card-photograph__location"
  );
  // Ajouter le paragaphe
  parent.appendChild(localisation);

  /** @type {HTMLParagraphElement} -  paragraphe contenant les informations du photographe */
  const para = getInformations(myPhotographer, DIRECTION.HORIZONTAL);
  para.setAttribute("tabindex", "0");
  // Ajouter le paragaphe
  parent.appendChild(para);

  /** @type {HTMLImageElement} - image contenant la photo du portrait */
  const photo = Dom.getPhoto(
    "",
    myPhotographer.portrait,
    `Portrait du photographe ${myPhotographer.name}`
  );
  photo.setAttribute("tabindex", 0);
  // Ajouter la photo
  parent.appendChild(photo);
}
/**
 * Ajouter les éléments au DOM de la page index.html
 * avec une présentation verticale specifique.
 *
 * @param {HTMLDivElement} parent - est une balise article
 * @param {Photographer} myPhotographer - Un objet de la classe photographe
 */
function addUSerCardDOMVertical(parent, myPhotographer) {
  /** @type {HTMLAnchorElement} - lien vers la page du photographe photographer.html?id=123 */
  const link = Dom.getLink(
    "card-photograph__link",
    `./photographer.html?id=${myPhotographer.id}`
  );

  // le nom du photographe en titre h2 labellise ce lien en utilsant l'id unique du photographe
  link.setAttribute("aria-labelledby", `photographer-${myPhotographer.id}`);
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
  const name = getName(myPhotographer, DIRECTION.VERTICAL);
  // Ajouter le nom du photographe dans le lien
  div.appendChild(name);

  /** @type {HTMLTitleElement} -  Titre contenant la ville et le pays du photographe */
  const localisation = Dom.getTitle(
    "h3",
    myPhotographer.location,
    "card-photograph__link__container__location"
  );
  // Ajouter le paragaphe
  div.appendChild(localisation);

  /** @type {HTMLParagraphElement} -  paragraphe contenant les informations du photographe */
  const para = getInformations(myPhotographer, DIRECTION.VERTICAL);
  para.setAttribute("tabindex", 0);
  // Ajouter le paragaphe
  parent.appendChild(para);
}

/**
 * Obtenir un titre pour le nom du photographe.
 *
 * @param  {Photographer} myPhotographer - Un objet de la classe photographe
 * @param {number} - Une constante utilisée pour gérer les deux affichage de la Card Photographe
 * @returns {HTMLTitleElement} balise titre h1 ou h2 avec le nom du photographe
 */
const getName = (myPhotographer, disposition) => {
  /** @type {HTMLTitleElement} - balise titre h1 ou h2 */
  let title;

  if (disposition === DIRECTION.HORIZONTAL) {
    // photographer.html
    title = Dom.getTitle(
      "h1",
      myPhotographer.name,
      "card-photograph__heading",
      myPhotographer.name
    );
  } else if (disposition === DIRECTION.VERTICAL) {
    // index.html
    title = Dom.getTitle(
      "h2",
      myPhotographer.name,
      "card-photograph__link__container__heading",
      myPhotographer.name
    );
    // L'identifiant du titre h2 est lié à l'attribut aria-labelledby du lien de la page photographer.html?id=123
    title.id = `photographer-${myPhotographer.id}`; // en utilsant l'id unique du photographe
  }

  return title;
};

/**
 *
 * @param {*} myPhotographer
 * @returns
 */
const getInformations = (myPhotographer, disposition) => {
  /** @type {HTMLParagrahElement} - texte du slogan */
  let para;

  if (disposition === DIRECTION.VERTICAL) {
    /** @type {HTMLBRElement} - saut de ligne entre le slogan et le tarif */
    para = Dom.getPara(
      "card-photograph__slogan--vertical",
      myPhotographer._tagline
    );
    const br = document.createElement("br");
    para.appendChild(br);
    /** @type {HTMLSpanElement} - élément en ligne pour afficher le tarif jour */
    const span = Dom.getSpan(
      "card-photograph__slogan__tarif",
      myPhotographer.pricePerDay
    );

    // Ajouter l'élément de ligne
    para.appendChild(span);
  } else {
    para = Dom.getPara(
      "card-photograph__slogan--horizontal",
      myPhotographer._tagline
    );
  }

  return para;
};
