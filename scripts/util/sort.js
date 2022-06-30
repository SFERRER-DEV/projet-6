/**
 * Fonction de tri des médias
 *
 * @param {Array<Media>} medium - Un tableau de medias à trier
 * @param {string} sortOption - le type du tri à appliquer
 *
 */
export const sorted = (medium, sortOption) => {
  switch (sortOption) {
    case "title":
      // Tri alphabétique du tableau
      getByTitle(medium);
      break;

    case "date":
      // Tri par date du tableau
      getByDate(medium);
      break;

    default:
    case "popular":
      // Tri par likes du tableau
      getByPopular(medium);
      break;
  }
};

/**
 * Tri par date descendant,
 * du média le plus réceant au plus ancien.
 *
 * @param {Array<Media>} medium - Un tableau de medias
 */
const getByDate = (medium) => {
  medium.sort(function (a, b) {
    return new Date(b.date_media) - new Date(a.date_media);
  });
};

/**
 * Tri par j'aime descendant,
 * le media le plus populaire en premier
 *
 * @param {Array<Media>} medium - Un tableau de medias
 */
const getByPopular = (medium) => {
  medium.sort(function (a, b) {
    return b.likes - a.likes;
  });
};

/**
 * Tri aplpabétique ascendant
 *
 * @param {Array<Media>} medium - Un tableau de medias
 */
const getByTitle = (medium) => {
  medium.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
};
