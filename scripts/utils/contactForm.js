// Importer des fonctions utiles
import * as Dom from "./dom.js";
/**
 * Afficher le formulaire de contact.
 * en piégeant le focus tabulation à l'intérieur
 *
 * @param {string} name - le nom du photographer à contacter
 */
export function displayModal(name) {
  /** @type {HTMLDivElement} - Conteneur du formulaire de contact*/
  const container = document.getElementById("contact_modal"); // = ".contact-container"
  container.style.display = "block";
  // Accessibilité
  container.setAttribute("aria-hidden", "false");
  document.querySelector("main").setAttribute("aria-hidden", "true");

  /** @type {HTMLDivElement} - le contenu de la modale */
  const modal = container.querySelector(".contact-container__modal");
  // Pieger le cycle du focus sur les boutons
  Dom.trapFocus(modal);
  modal.focus();

  // Raz du formulaire
  cleanAllFormData();

  // Ajouter l'évènement de la touche clavier escape pour fermer la lightbox
  modal.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  /** @type {HTMLSpanElement} - Le nom du photographe */
  const who = document.querySelector(
    ".contact-container__modal__heading__contact__who"
  );
  who.replaceChildren(document.createTextNode(name));

  /** {URLSearchParams} - paramètres GET de l'URL de la page */
  let params = new URL(document.location).searchParams;
  /** @type {number} - l'identifiant du photographe obtenu en paramètre url */
  const photographerId = parseInt(params.get("id"));
  // Renseigner le champ caché avec l'identitifiant du photographer pour une bonne redirection
  document.getElementById("photographId").value = photographerId;
}

/**
 * Fermer la modale du formulaire de contact
 */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.querySelector("main").setAttribute("aria-hidden", "false");
}

/** @type {Array.<{String}>} Tableau pour stocker les valeurs des champs d'une inscription */
export let arrContact = [];

export const checkValidity = () => {
  /** @type {NodeList} Une collection de tous les champs du formulaire d'inscription à saisir */
  const fields = document.querySelectorAll(
    '.formData input[type="text"], input[type="email"], textarea'
  );
  // Flag formulaire
  let valid = true;
  // Flag champ
  let ok = true;
  // Mémoriser les champs en erreur
  let fieldsErrorsFocus = [];
  // Raz du formulaire
  cleanAllFormData();
  // Parcourir les champs input à contrôler du formulaire
  for (let input of fields) {
    // Tester champ
    ok = input.validity.valid;
    valid &= ok;
    // Si toutes les contraintes d'un champ sont validées
    if (ok) {
      // OK: Alors mémoriser le champ et sa valeur validée dans un tableau
      arrContact.push({ name: input.name, value: input.value });
    } else {
      // KO: Sinon mémoriser ce champ en erreur
      fieldsErrorsFocus.push(input);
      updateMessageValidation(input, input.validationMessage);
    }
  }
  // Positionner l'utilisateur sur le premier champ en erreur de validation
  if (fieldsErrorsFocus.length > 0) {
    fieldsErrorsFocus[0].focus();
  }
  return valid;
};

/**
 * Fonction utile pour afficher les indications après la
 * validation d'un champ
 * @param {Node} field - Un champ du formulaire d'inscription
 * @param {string} message - Un message de validation pour l'utilisateur
 */
const updateMessageValidation = (field, message) => {
  // Récupérer le noeud parent du champ passé à la fonction
  let formData = field.parentNode;
  // Vérifier que ce noeud parent correspond bien au div conteneur formData
  if (formData.classList.contains("formData")) {
    // Marquer le champ en erreurs avec une bordure et un message en rouge
    formData.setAttribute("data-error", message);
    formData.setAttribute("data-error-visible", true);
  }
};

/**
 * Remettre à Zéro de la présentation de toutes les  erreurs  de
 * validation affichées sur le formulaire.
 */
const cleanAllFormData = () => {
  /** @type {NodeList} Une collection de tous les champs du formulaire d'inscription à saisir */
  const fields = document.querySelectorAll(
    '.formData input[type="text"], input[type="email"], textarea'
  );
  // La collection fields contient tous les élements du formulaire à valider
  for (let input of fields) {
    resetValidation(input);
  }
};

/**
 * Fonction utile pour remettre à la présentation d'un champ
 * à zéro au début d'une validation (RAZ)
 *  @param {Node} field - Un champ du formulaire d'inscription
 */
const resetValidation = (field) => {
  // Récupérer le noeud parent du champ passé à la fonction
  const formData = field.parentNode;
  // Vérifier que ce noeud parent correspond bien au div conteneur formData
  if (formData.classList.contains("formData")) {
    // Faire disparaitre la bordure rouge sur le champ du formulaire
    formData.setAttribute("data-error", "");
    formData.setAttribute("data-error-visible", false);
  }
};
