/**
 * Aguarda a existência de elementos no DOM que correspondam aos seletores especificados.
 * Retorna uma Promise que resolve com um array de elementos quando todos estiverem disponíveis.
 *
 * @param {string[]} selectors Lista de seletores CSS dos elementos a serem aguardados.
 * @returns {Promise<HTMLElement[]>} Uma Promise que resolve com um array de elementos quando todos estiverem disponíveis.
 */
function waitForElms(selectors) {
  return Promise.all(selectors.map((selector) => waitForElm(selector)));
}

/**
 * Aguarda a existência de um elemento no DOM que corresponda ao seletor especificado.
 * Retorna uma Promise que resolve com o elemento quando estiver disponível.
 *
 * @param {string} selector O seletor CSS do elemento a ser aguardado.
 * @returns {Promise<HTMLElement>} Uma Promise que resolve com o elemento quando estiver disponível.
 */
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export { waitForElms };

export default waitForElm;
