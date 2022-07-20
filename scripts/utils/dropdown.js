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
 */
export function sortByPopularity() {
  /** @type {HTMLButtonElement} */
  const btnToogle = document.querySelector(
    ".sorted__container__select__toogle"
  );

  //Actualisation des éléments du menu filtres
  btnToogle.innerHTML =
    'Popularité <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("popularity");
  // Enlever ou ajouter la classe qui permet d'ouvrir ou fermer la custom dropdown
  btnToogle.classList.toggle("show-sorted");
}

/**
 * Trier par date
 */
export function sortByDate() {
  /** @type {HTMLButtonElement} */
  const btnToogle = document.querySelector(
    ".sorted__container__select__toogle"
  );
  //Actualisation des éléments du menu filtres
  btnToogle.innerHTML =
    'Date <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("date");
  // Enlever ou ajouter la classe qui permet d'ouvrir ou fermer la custom dropdown
  btnToogle.classList.toggle("show-sorted");
}

/**
 * Trier par titre
 */
export function sortByTitle() {
  /** @type {HTMLButtonElement} */
  const btnToogle = document.querySelector(
    ".sorted__container__select__toogle"
  );
  //Actualisation des éléments du menu filtres
  btnToogle.innerHTML =
    'Titre <span class="fa-solid fa-angle-down sorted__container__select__toogle__icon" aria-hidden="true"></span>';
  // Gérer l'affichage et l'accesibilité des élément de la custom dropdown
  _setDropDownElements("title");
  // Enlever ou ajouter la classe qui permet d'ouvrir ou fermer la custom dropdown
  btnToogle.classList.toggle("show-sorted");
}

/**
 *
 * @param {*} strSorting
 */
const _setDropDownElements = (strSorting) => {
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortPopularity = document.getElementById("sort-popularity");
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortDate = document.getElementById("sort-date");
  /** @type {HTMLElement} -  une élément li de la liste des tris */
  const sortTitle = document.getElementById("sort-title");

  switch (strSorting) {
    case "popularity":
      // Affichage
      sortPopularity.style.display = "none";
      //
      sortDate.style.display = "block";
      sortTitle.style.display = "block";
      //Accessibilité
      sortPopularity.setAttribute("aria-selected", "true");
      //
      sortDate.setAttribute("aria-selected", "false");
      sortTitle.setAttribute("aria-selected", "false");
      break;

    case "date":
      // Affichage
      sortDate.style.display = "none";
      //
      sortPopularity.style.display = "block";
      sortTitle.style.display = "block";
      //Accessibilité
      sortDate.setAttribute("aria-selected", "true");
      //
      sortPopularity.setAttribute("aria-selected", "false");
      sortTitle.setAttribute("aria-selected", "false");
      break;

    case "title":
      // Affichage
      sortTitle.style.display = "none";
      //
      sortDate.style.display = "block";
      sortPopularity.style.display = "block";
      //Accessibilité
      sortTitle.setAttribute("aria-selected", "true");
      //
      sortDate.setAttribute("aria-selected", "false");
      sortPopularity.setAttribute("aria-selected", "false");
      break;
  }
  //Fermeture du menu de tri
  closeSortingList();
};
