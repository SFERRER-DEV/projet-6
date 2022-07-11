/**
 *
 * @param {*} name
 */
export function displayModal(name) {
  /** @type {*} */
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  /** @type {*} */
  const who = document.querySelector(
    ".contact-container__modal__heading__contact__who"
  );
  who.replaceChildren(document.createTextNode(name));
}

/**
 *
 */
export function closeModal() {
  const modal = document.getElementById("lightbox");
  modal.style.display = "none";
}
