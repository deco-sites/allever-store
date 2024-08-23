class EmptyCartModule {
  constructor() {
    vtexjs.checkout.getOrderForm().then((orderForm) => {
      if (orderForm.items.length > 0) {
        document.body.classList.remove("body-empty-cart");
      } else {
        document.body.classList.add("body-empty-cart");
      }
    });

    this.events();
  }

  events() {
    $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
      if (orderForm.items.length > 0) {
        document.body.classList.remove("body-empty-cart");
      } else {
        document.body.classList.add("body-empty-cart");
      }
    });
  }
}

export default EmptyCartModule;
