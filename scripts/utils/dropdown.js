/**
 * Ouverture de la liste déroulabte de tri
 */
export function showSortingList() {
  /** @type {HTMLButtonElement} */
  const btnToogle = document.querySelector(
    ".sorted__container__select__toogle"
  );
  // Ajouter ou enlever la classe css pour montrer les tris dans la liste déroulante
  btnToogle.classList.toggle("show-sorted");

  if (btnToogle.classList.contains("show-sorted")) {
    /** @type {HTMLElement} - la liste ul des tris */
    const sortedList = document.querySelector(
      ".sorted__container__select__list"
    );
    // Afficher la liste déroulante ouverte
    sortedList.style.display = "block";
    //
    btnToogle.style.padding = "0.5em 0 0.8em 0";
    btnToogle.style.borderBottom = "1px solid white";
    //Accessibilité
    btnToogle.setAttribute("aria-expanded", "true");
    /** @type {HTMLSpanElement} - L'icône de la liste déroulante */
    const iconBtnToggle = document.querySelector(
      ".sorted__container__select__toogle__icon"
    );
    // Gérer l'apparence de l'icône de la liste déroulante : Ouverture
    iconBtnToggle.classList.remove("fa-angle-down");
    iconBtnToggle.classList.add("fa-angle-up");
  } else {
    // Fermer la liste déroulante
    closeSortingList();
  }
}

/**
 *  Fermeture de la liste déroulante de tri
 */
export function closeSortingList() {
  /** @type {HTMLElement} - la liste ul des tris */
  const sortedList = document.querySelector(".sorted__container__select__list");
  /** @type {HTMLButtonElement} */
  const btnToogle = document.querySelector(
    ".sorted__container__select__toogle"
  );

  // Masquer la liste déroulante des tris
  sortedList.style.display = "none";

  /** @type {HTMLSpanElement} - L'icône de la liste déroulante */
  const iconBtnToggle = document.querySelector(
    ".sorted__container__select__toogle__icon"
  );
  // Gérer l'apparence de l'icône de la liste déroulante : Fermeture
  iconBtnToggle.classList.remove("fa-angle-up");
  iconBtnToggle.classList.add("fa-angle-down");

  btnToogle.style.padding = ".4em 0";
  btnToogle.style.borderBottom = "none";
  //Accessibilité
  btnToogle.setAttribute("aria-expanded", "false");
}

/**
 *  Trier par popularité
 * @param {HTMLButtonElement} bouton - le bouton pour ouvrir ou fermer la custom dropbox
 */
export function sortByPopularity(bouton) {
  //Actualisation des éléments du menu filtres
  bouton.innerHTML =
    'Popularité <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("popularity");
}

/**
 * Trier par date
 * @param {HTMLButtonElement} bouton - le bouton pour ouvrir ou fermer la custom dropbox
 */
export function sortByDate(bouton) {
  //Actualisation des éléments du menu filtres
  bouton.innerHTML =
    'Date <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("date");
}

/**
 * Trier par titre
 * @param {HTMLButtonElement} bouton - le bouton pour ouvrir ou fermer la custom dropbox
 */
export function sortByTitle(bouton) {
  //Actualisation des éléments du menu filtres
  bouton.innerHTML =
    'Titre <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("title");
}

/**
 * Régler l'affichage et l'accessibilité des éléments de la
 * custom dropdown de tri
 * @param {string} strSorting - une chaine de caractère pour le tri concerné
 */
const _setDropDownElements = (strSorting) => {
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortPopularity = document.getElementById("sort-popularity");
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortDate = document.getElementById("sort-date");
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortTitle = document.getElementById("sort-title");

  // Affichage
  sortPopularity.style.display = "block";
  sortDate.style.display = "block";
  sortTitle.style.display = "block";
  // Accessibilité
  sortDate.setAttribute("aria-selected", "false");
  sortPopularity.setAttribute("aria-selected", "false");
  sortTitle.setAttribute("aria-selected", "false");

  switch (strSorting) {
    case "popularity":
      // Affichage
      sortPopularity.style.display = "none";
      //Accessibilité
      sortPopularity.setAttribute("aria-selected", "true");
      break;

    case "date":
      // Affichage
      sortDate.style.display = "none";
      //Accessibilité
      sortDate.setAttribute("aria-selected", "true");
      break;

    case "title":
      // Affichage
      sortTitle.style.display = "none";
      //Accessibilité
      sortTitle.setAttribute("aria-selected", "true");
      break;
  }
  //Fermeture du menu de tri
  closeSortingList();
};
