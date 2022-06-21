/**
 * Une fabrique méthode pour instancier des cards hmtl pour les photographes
 * @param data - les données d'un photographe
 * @returns id, name, picture, getUserCardDOM - l'identifiant, le nom, le chemin de l'image et la html card d'un photographe
 */
export function photographerFactory(data) {
  // Destructurer les propriétés de l'objet data dans des variables séparées
  const { name, portrait, city, country, id, price, tagline } = data;
  /** type {String} - chemin complet de la photo du photographe */
  const picture = `assets/photographers/${portrait}`;
  /**
   * Créer un article html en utilisant le DOM
   * pour afficher les données d'un photographe
   * @returns une html card d'un photographe
   */
  function getUserCardDOM() {
    /** type {HTMLElement} - l'élement html article qui contient la card */
    const article = document.createElement("article");

    // Obtenir le lien et l'ajouter dans l'article
    const link = _addLink(article);

    // Ajouter le portrait du photographe dans le lien
    _addPhoto(link);

    // Ajouter le nom du photographe dans le lien
    _addName(link);

    // Obtenir le paragraphe avec la ville + le pays du photographe et l'ajouter à l'article
    const para = _addParagraph(`${city}, ${country}`, article);

    // Ajouter le slogan du photographe
    const span1 = _addSpan(tagline, para);
    span1.style.color = "black";
    span1.style.fontSize = "0.7em";

    // Ajouter le tarif
    const span2 = _addSpan(`${price}€/Jour`, para);
    span2.style.color = "#525252";
    span2.style.fontSize = "0.7em";

    return article;
  }

  /**
   *
   * @param {*} parent
   * @returns
   */
  const _addLink = (parent) => {
    const link = document.createElement("a");
    // création du lien pour acceder à la page du photographe
    link.setAttribute("href", `/photographer?id=${id}`);
    link.setAttribute("aria-label", name);
    // Ajouter le lien vers la page du photgraphe
    parent.appendChild(link);

    return link;
  };

  /**
   *
   * @param {HTMLElement} parent
   */
  const _addPhoto = (parent) => {
    /** type {HTMLElement} - l'élément hmtl image pour la photo */
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait du photographe ${name}`); //@TOO
    // Ajouter la photo portrait
    parent.appendChild(img);
  };

  /**
   *
   * @param {HTMLElement} parent
   */
  const _addName = (parent) => {
    /** type {HTMLElement} - l'élément hmtl titre pour le nom du photographe */
    const h2 = document.createElement("h2");
    h2.textContent = name;
    // Ajouter le nom du photographe
    parent.appendChild(h2);
  };

  /**
   * Préparer un paragraphe de texte
   * et l'ajouter à la Card
   * @param strTexte - une chaine de caractère à afficher
   * @param {HTMLElement} parent
   * @returns un paragraphe contenant un texte
   */
  const _addParagraph = (strTexte, parent) => {
    /** type {HTMLElement} - un paragraphe de texte */
    const para = document.createElement("p");
    para.appendChild(document.createTextNode(strTexte));
    para.style.display = "flex";
    para.style.flexDirection = "column";
    para.style.alignItems = "center";
    para.style.margin = "0";
    para.style.fontWeight = "500";
    para.style.color = "#901C1C";
    parent.appendChild(para);

    return para;
  };

  /**
   *
   * @param {*} strTexte
   * @param {*} parent
   * @returns
   */
  const _addSpan = (strTexte, parent) => {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(strTexte));
    parent.appendChild(span);

    return span;
  };

  return { id, name, picture, getUserCardDOM };
}
