/**
 *
 * @param {*} data
 * @returns
 */
export function mediaFactory(data) {
  // Destructurer les propriétés de l'objet data dans des variables séparées
  const { id } = data;

  /**
   *
   * @returns
   */
  function getMediaCardDOM() {
    const article = document.createElement("article");
    return article;
  }

  return { id, getMediaCardDOM };
}
