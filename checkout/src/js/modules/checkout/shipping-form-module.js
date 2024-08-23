import groupAndInsert from "../../helpers/group-and-insert";
import waitForElm, { waitForElms } from "../../helpers/wait-for-element";

class ShippingFormModule {
  constructor() {
    this.init();

    // Garante que seja executado quando o usuário sair e voltar pro formulário
    window.addEventListener(
      "hashchange",
      () => window.location.hash.toLowerCase() === "#/shipping" && this.init()
    );
  }

  init() {
    this.addCepFieldPlaceholder();
    this.rearrangeInputs();
    this.shippingMethodsTextPackage();
  }

  /**
   * Altera o texto padrão de (ex: Em até 6 dias úteis) para (ex: 6 dias úteis) conforme Figma
   */
  shippingMethodsTextPackage() {
    document.querySelectorAll(".shp-option-text-package").forEach((elm) => {
      const valueElm = elm.querySelector("span");
      const value = valueElm.textContent.match(/\d+/)[0];
      valueElm.textContent =
        Number(value) > 1 ? `${value} dias úteis` : `${value} dia útil`;
    });
  }

  /**
   * Adiciona placeholder "CEP" no input conforme Figma
   */
  addCepFieldPlaceholder() {
    waitForElm("#ship-postalCode").then((elm) => {
      elm.setAttribute("placeholder", "CEP");
    });
  }

  /**
   * Responsável por reorganizar a ordem dos Inputs conforme Figma
   * Agrupa alguns inputs para exibição lado à lado no Desktop
   */
  rearrangeInputs() {
    const inputContainer =
      ".shipping-container .vtex-omnishipping-1-x-addressForm .vtex-omnishipping-1-x-address div";

    waitForElm(inputContainer).then((container) => {
      waitForElms(["p.ship-city", "p.ship-state"]).then(() => {
        groupAndInsert(container, ["p.ship-city, p.ship-state"]);
      });
      waitForElms(["p.ship-street", "p.ship-number"]).then(() => {
        groupAndInsert(container, ["p.ship-street, p.ship-number"]);
      });
      waitForElms(["p.ship-complement", "p.ship-neighborhood"]).then(() => {
        groupAndInsert(container, ["p.ship-complement, p.ship-neighborhood"]);
      });
    });
  }
}

export default ShippingFormModule;
