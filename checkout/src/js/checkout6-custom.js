import {
  AlertModule,
  CartModule,
  ContactFormModule,
  EmptyCartModule,
  FooterModule,
  FreeFreightModule,
  HeaderModule,
  MiniCartModule,
  PaymentFormModule,
  ShippingFormModule,
} from "./modules/checkout";

class Checkout {
  static main() {
    document.addEventListener("DOMContentLoaded", () => {
      new EmptyCartModule();
      new CartModule();
      new AlertModule();
      new HeaderModule();
      new FooterModule();
      new ContactFormModule();
      new ShippingFormModule();
      new MiniCartModule();
      new PaymentFormModule();
      new FreeFreightModule();
    });
  }
}

Checkout.main();
