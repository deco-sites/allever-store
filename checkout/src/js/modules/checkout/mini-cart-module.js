class MiniCartModule {
  constructor() {
    this.rearrangeElements();
    this.discountCouponForm();

    setInterval(this.cartItemsAdjusts.bind(this), 500);
    // this.cashback();
  }

  cartItemsAdjusts() {
    document.querySelectorAll(".hproduct.item").forEach((item) => {
      this.adjustCartItemPrice(item);
      this.adjustCartItemQuantity(item);
    });
  }

  adjustCartItemQuantity(item) {
    const quantityElm = item.querySelector(".quantity");

    const quantity = quantityElm.textContent.match(/\d+/)[0];

    const subscription = item.querySelector(".item-subscription");

    let text = "";

    const subscriptions = {
      "A cada 2 semanas": "semanal",
      "A cada 1 mês": "mensal",
      "A cada 2 meses": "mensal",
      "A cada 3 meses": "mensal",
    };

    if (quantity > 1) {
      text = `${quantity} unidades`;
    } else {
      text = `${quantity} unidade`;
    }

    if (subscription) {
      const subTime = subscription.querySelector(
        ".item-subscription-time",
      )?.textContent;

      const recorrencia = subscriptions[subTime];

      text = text + ` • Assinatura com recorrência ${recorrencia}`;
    }

    quantityElm.textContent = text;
  }

  adjustCartItemPrice(item) {
    const itemPriceElm = Array.from(
      item.querySelectorAll(".description > *"),
    ).filter((elm) => {
      return String(elm.getAttribute("data-bind")).includes("priceValue");
    })[0];

    const sellingPriceElm = Array.from(
      item.querySelectorAll(".description > *"),
    ).filter((elm) => {
      return String(elm.getAttribute("data-bind")).includes("sellingPrice");
    })[0];

    const itemPrice = parseFloat(
      itemPriceElm.textContent?.replace("R$ ", "").replace(",", "."),
    );

    const sellingPrice = parseFloat(
      sellingPriceElm.textContent?.replace("R$ ", "").replace(",", "."),
    );

    sellingPriceElm.classList.add("price-new");

    if (sellingPrice < itemPrice) {
      itemPriceElm.classList.add("visible", "price-old");
    } else {
      itemPriceElm.classList.remove("visible");
    }
  }

  rearrangeElements() {
    const minicartTitle = document.querySelector(".cart-template.mini-cart h2");

    minicartTitle.after(document.getElementById("go-to-cart-button"));
  }

  discountCouponForm() {
    const targetArea = document.querySelector(
      ".mini-cart .summary-template-holder .accordion-inner table.table",
    );

    const html = `
      <div class="checkout-cart-coupon">
        <fieldset class="checkout-cart-coupon__fields">
          <input id="checkout-c-coupon" class="checkout-cart-coupon__fields--input" type="text" placeholder="Cupom de desconto" />
          <button id="checkout-c-apply-coupon" class="checkout-cart-coupon__fields--apply" type="button">Aplicar</button>
        </fieldset>
        <div class="checkout-cart-coupon__active-coupon">
          <!-- Flag de Cupom Ativo -->
        </div>
      </div>
    `;

    targetArea.insertAdjacentHTML("beforebegin", html);

    document
      .getElementById("checkout-c-apply-coupon")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        const coupon = document.getElementById("checkout-c-coupon").value;

        if (coupon) {
          vtexjs.checkout.addDiscountCoupon(coupon);
          document.getElementById("checkout-c-coupon").value = "";
        }
      });

    const _this = this;

    $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
      if (orderForm.marketingData) {
        _this.renderCoupon(orderForm.marketingData.coupon);
      } else {
        _this.renderCoupon(null);
      }
    });
  }

  renderCoupon(coupon) {
    const targetArea = document.querySelector(
      ".checkout-cart-coupon__active-coupon",
    );

    if (!coupon) {
      targetArea.innerHTML = "";
      document.querySelector(
        ".checkout-cart-coupon__fields--apply",
      ).disabled = false;
      return;
    }

    const html = `
      <div class="checkout-cart-coupon__active-coupon--flag">${coupon}</div>
    `;

    targetArea.innerHTML = html;
    document.querySelector(
      ".checkout-cart-coupon__fields--apply",
    ).disabled = true;

    document
      .querySelector(".checkout-cart-coupon__active-coupon--flag")
      .addEventListener("click", () => {
        vtexjs.checkout.removeDiscountCoupon();
      });
  }

  cashback() {
    /*CashBack*/
    $(window).on("orderFormUpdated.vtex", function () {
      const orderForm = vtexjs.checkout.orderForm;

      if ($(".cashback-value")) {
        $(".cashback-value").remove();
      }

      if (orderForm.paymentData) {
        const cashBack = orderForm.paymentData.giftCards.find(function (item) {
          return item.caption == "UpCashBack";
        });

        console.log(orderForm, "cash");

        if (cashBack) {
          if (cashBack.value > 0) {
            const totalOld = orderForm.value;
            const cashBackValue = cashBack.value;
            const cashBackValueDecimal = cashBackValue / 100;
            const cashBackValueMoney = cashBackValueDecimal.toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              },
            );
            const totalNew = totalOld - cashBackValue;
            const totalNewDecimal = totalNew / 100;
            const totalNewMoney = totalNewDecimal.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });

            $(
              '<tbody class="cashback-value" style="border: none"><tr class=""><td class="info">CashBack</td><td class="space"></td><td class="monetary">' +
                cashBackValueMoney +
                '</td><td class="empty"></td></tr></tbody>',
            ).insertBefore(".mini-cart .summary-template-holder tfoot");

            setTimeout(function () {
              $(".mini-cart .summary-template-holder tfoot .monetary").html(
                totalNewMoney,
              );
            }, 200);
          }
        }
      }
    });
  }
}

export default MiniCartModule;
