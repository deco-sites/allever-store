/**
 * Observa mudanças de classe em um elemento HTML.
 */
class ClassWatcher {
  /**
   * Cria uma instância de ClassWatcher.
   *
   * @param {HTMLElement} targetNode O elemento HTML a ser observado.
   * @param {string} classToWatch A classe CSS a ser observada.
   * @param {Function} classAddedCallback Uma função de retorno de chamada a ser invocada quando a classe alvo é adicionada ao elemento.
   * @param {Function} classRemovedCallback Uma função de retorno de chamada a ser invocada quando a classe alvo é removida do elemento.
   */
  constructor(
    targetNode,
    classToWatch,
    classAddedCallback,
    classRemovedCallback,
  ) {
    this.targetNode = targetNode;
    this.classToWatch = classToWatch;
    this.classAddedCallback = classAddedCallback;
    this.classRemovedCallback = classRemovedCallback;
    this.observer = null;
    this.lastClassState = targetNode.classList.contains(this.classToWatch);

    this.init();
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback);
    this.observe();
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true });
  }

  disconnect() {
    this.observer.disconnect();
  }

  mutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        let currentClassState = mutation.target.classList.contains(
          this.classToWatch,
        );
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState;
          if (currentClassState) {
            this.classAddedCallback();
          } else {
            this.classRemovedCallback();
          }
        }
      }
    }
  };
}

export default ClassWatcher;
