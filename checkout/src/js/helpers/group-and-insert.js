/**
 * Agrupa e insere os elementos em um container.
 *
 * @param {HTMLElement} container O container onde os elementos serão inseridos.
 * @param {string[]} selectors Um array de seletores CSS para os elementos a serem agrupados.
 */
const groupAndInsert = (container, selectors) => {
  const groups = selectors.map((selector) =>
    container.querySelectorAll(selector)
  );

  groups.forEach((group) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("desk-input-group");

    group.forEach((elm) => inputGroup.appendChild(elm));
    container.insertAdjacentElement("beforeend", inputGroup);
  });
};

export default groupAndInsert;
