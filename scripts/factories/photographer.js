/**
 * Un fabrique pour instancier des cards hmtl pour les photographes
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
    /** type {HTMLElement} - l'élément hmtl image pour la photo */
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    /** type {HTMLElement} - l'élément hmtl titre pour le nom du photographe */
    const h2 = document.createElement("h2");
    h2.textContent = name;
    // Ajouter le portrait du photgraphe
    article.appendChild(img);
    // Ajouter le nom du photgraphe
    article.appendChild(h2);
    /** type {HTMLElement} - l'élément hmtl paragraph pour la ville + le pays */
    const para1 = getParagraph(`${city}, ${country}`);
    article.appendChild(para1);
    /** type {HTMLElement} - l'élément hmtl paragraph pour le slogan */
    const para2 = getParagraph(tagline);
    article.appendChild(para2);
    /** type {HTMLElement} - l'élément hmtl paragraph pour le tarif */
    const para3 = getParagraph(`${price}€/Jour`);
    article.appendChild(para3);

    return article;
  }

  return { id, name, picture, getUserCardDOM };
}
/**
 * Préparer un paragraphe de texte
 * @param strTexte - une chaine de caractère à afficher
 * @returns un paragraphe contenant un texte
 */
const getParagraph = (strTexte) => {
  /** type {HTMLElement} - un paragraphe de texte */
  const para = document.createElement("p");
  para.appendChild(document.createTextNode(strTexte));
  return para;
};
