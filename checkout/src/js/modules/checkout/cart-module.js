class CartModule {
  products = [];

  constructor() {
    const _this = this;

    _this.buildProducts();
  }

  productsBuildedCallback() {
    // this.renderSignmentButton();
  }

  renderSignmentButton() {
    const _this = this;
    vtexjs.checkout.getOrderForm().then((orderForm) => {
      document
        .querySelectorAll("tr.product-item")
        .forEach((productElement, index) => {
          const item = _this.products[index];

          const selectWrapper = productElement.querySelector(
            ".p-signment-select",
          );

          let html = `
            <select>
                <option disabled>Assine e economize ${item.economize}</option>
                <option>A cada 14 dias</option>
                <option>A cada 30 dias</option>
                <option>A cada 2 meses</option>
                <option>A cada 3 meses</option>
            </select>
        `;

          if (selectWrapper) {
            selectWrapper.innerHTML = html;
          } else {
            html = `
                <div class="p-signment-select">
                    <select>
                        <option disabled>Assine e economize ${item.economize}</option>
                        <option>A cada 14 dias</option>
                        <option>A cada 30 dias</option>
                        <option>A cada 2 meses</option>
                        <option>A cada 3 meses</option>
                    </select>
                </div>
            `;
            productElement.insertAdjacentHTML("beforeend", html);
          }
        });
    });
  }

  addSignment({ orderFormId, itemIndex, frequency }) {
    let url =
      `/api/checkout/pub/orderForm/${orderFormId}/items/${itemIndex}/attachments/vtex.subscription.assinatura`;

    let payload = {
      content: {
        "vtex.subscription.key.frequency": "2 week",
        "vtex.subscription.key.purchaseday": 16,
      },
      noSplitItem: false,
    };

    fetch(url, {
      method: "POST",
      data: JSON.stringify(payload),
    });

    url =
      `/api/checkout/pub/orderForm/${orderFormId}/attachments/subscriptionData`;

    payload = {
      subscriptions: [
        {
          itemIndex: 0,
          plan: {
            frequency: { interval: "2", periodicity: "WEEK" },
            validity: {},
            type: "RECURRING_PAYMENT",
          },
        },
      ],
    };

    fetch(url, {
      method: "POST",
      data: JSON.stringify(payload),
    });
  }

  buildProducts() {
    const _this = this;

    vtexjs.checkout.getOrderForm().then((orderForm) => {
      const items = orderForm.items.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          seller: 1,
        };
      });

      const data = {
        items,
      };

      fetch("/api/checkout/pub/orderforms/simulation", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then(function (simulation) {
          _this.products = simulation.items;

          _this.products = _this.products.map((prod) => {
            const price = prod.price / 100;

            const economizeValue = price - (price - price * (20 / 100));

            return {
              ...prod,
              economize: economizeValue.toFixed(2),
            };
          });

          _this.productsBuildedCallback();
        });
    });
  }
}

export default CartModule;
