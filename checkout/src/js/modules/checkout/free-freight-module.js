import waitForElm from "../../helpers/wait-for-element";

class FreeFreightModule {
  shippingValue;
  orderValue;

  constructor() {
    this.render();
    this.events();

    window.addEventListener("hashchange", this.render.bind(this));
  }

  events() {
    const _this = this;

    $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
      _this.getFreightValue(orderForm);
      _this.updateFreight();
    });
  }

  async getFreightValue(orderForm = null) {
    let form = orderForm;

    if (!orderForm) {
      form = await vtexjs.checkout.getOrderForm();
    }

    if (form) {
      const shipping = form.totalizers.find((total) => total.id === "Shipping");

      const order = form.totalizers.find((total) => total.id === "Items");

      this.orderValue = order?.value / 100;
      this.shippingValue = shipping?.value / 100;
    }
  }

  updateFreight() {
    document
      .querySelectorAll(".checkout-free-freight__text")
      .forEach((entry) => {
        if (this.orderValue > 0) {
          const innerBar = entry.parentElement.querySelector(
            ".checkout-free-freight__bar--inner",
          );

          const minFreeShipping = 200; // Valor mínimo para frete grátis
          let widthPercentage = (this.orderValue / minFreeShipping) * 100;
          if (widthPercentage > 100) widthPercentage = 100;
          innerBar.style.width = widthPercentage + "%";

          const remainingValue = minFreeShipping - this.orderValue;
          if (remainingValue > 0) {
            entry.textContent = `Faltam R$ ${
              remainingValue
                .toFixed(2)
                .replace(".", ",")
            } para frete grátis!`;
            entry.classList.remove("congracts");
          } else {
            entry.textContent = "Parabéns! Você ganhou frete grátis!";
            entry.classList.add("congracts");
          }
        }
      });
  }

  render() {
    this.getFreightValue();

    if (window.location.hash.toLowerCase() === "#/cart") {
      waitForElm("#shipping-preview-container .srp-content").then((elm) => {
        if (elm.parentElement.querySelector(".checkout-free-freight")) {
          return;
        }

        const html = `
            <div class="checkout-free-freight freight-cart">
                <span class="checkout-free-freight__title">Frete</span>
                <div class="checkout-free-freight__bar">
                    <div class="checkout-free-freight__bar checkout-free-freight__bar--inner"></div>
                </div>
                <span class="checkout-free-freight__text"></span>
            </div>
        `;

        elm.parentElement.insertAdjacentHTML("beforeend", html);
      });

      return;
    }

    waitForElm(
      ".mini-cart .summary-template-holder .accordion-inner table.table .totalizers-list",
    ).then((elm) => {
      if (elm.querySelector(".checkout-free-freight")) {
        return;
      }

      elm.classList.add("free-freight-below");

      const html = `
        <div class="checkout-free-freight freight-orderform">
            <span class="checkout-free-freight__title">Frete</span>
            <div class="checkout-free-freight__bar">
                <div class="checkout-free-freight__bar checkout-free-freight__bar--inner"></div>
            </div>
            <span class="checkout-free-freight__text"></span>
        </div>
    `;

      elm.insertAdjacentHTML("beforeend", html);
    });
  }
}

export default FreeFreightModule;
