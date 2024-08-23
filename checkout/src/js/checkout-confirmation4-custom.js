import { FooterModule, HeaderModule } from "./modules/checkout-confirmation";

class CheckoutConfirmation {
  static main() {
    document.addEventListener("DOMContentLoaded", () => {
      new HeaderModule();
      new FooterModule();
    });
  }
}

CheckoutConfirmation.main();
