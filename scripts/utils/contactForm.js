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
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("main").setAttribute("aria-hidden", "true");
}

/**
 *
 */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.querySelector("main").setAttribute("aria-hidden", "false");
}
