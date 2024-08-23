class AlertModule {
  sessionStorageKey = "tsrc@alert-box";
  closed = false;

  constructor() {
    const _this = this;

    if (!this.isClosed) {
      vtexjs.checkout.getOrderForm().then((oF) => {
        if (oF.items.length > 0) {
          _this.render(this.getRenderArea());
          _this.events();
        }
      });

      window.addEventListener("hashchange", () => {
        vtexjs.checkout.getOrderForm().then((oF) => {
          if (oF.items.length > 0) {
            _this.render(this.getRenderArea());
            _this.events();
          }
        });
      });
    }
  }

  get isClosed() {
    return sessionStorage.getItem(this.sessionStorageKey) === "true";
  }

  closeBox() {
    sessionStorage.setItem(this.sessionStorageKey, "true");
    document.getElementById("alert-box").remove();
  }

  getRenderArea() {
    if (window.location.hash.toLowerCase() === "#/cart") {
      return {
        helperClass: "alert-cart",
        area: document.querySelector(".cart-template-holder"),
        where: "afterbegin",
      };
    }

    return {
      helperClass: "alert-orderform",
      area: document.querySelector(".orderform-template-holder .row-fluid"),
      where: "beforebegin",
    };
  }

  render(targetArea) {
    document.getElementById("alert-box")?.remove();

    const html = `
      <div id="alert-box" class="${targetArea.helperClass}">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#E9B90E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8.5V12.5" stroke="#E9B90E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 16.5H12.01" stroke="#E9B90E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span>Desconto dos kits só serão aplicados na quantidade pré-definida pelo site [3 ou em múltiplos de 3 (ex: 6,9,12...)].</span>
        
        <button class="alert-box--close-box">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5ZM15.7071 8.79289C16.0976 9.18342 16.0976 9.81658 15.7071 10.2071L13.4142 12.5L15.7071 14.7929C16.0976 15.1834 16.0976 15.8166 15.7071 16.2071C15.3166 16.5976 14.6834 16.5976 14.2929 16.2071L12 13.9142L9.70711 16.2071C9.31658 16.5976 8.68342 16.5976 8.29289 16.2071C7.90237 15.8166 7.90237 15.1834 8.29289 14.7929L10.5858 12.5L8.29289 10.2071C7.90237 9.81658 7.90237 9.18342 8.29289 8.79289C8.68342 8.40237 9.31658 8.40237 9.70711 8.79289L12 11.0858L14.2929 8.79289C14.6834 8.40237 15.3166 8.40237 15.7071 8.79289Z" fill="#3C3C3B"/>
          </svg>
        </button>
      </div>
    `;

    targetArea.area.insertAdjacentHTML(targetArea.where, html);
  }

  events() {
    const closeButton = document.querySelector(".alert-box--close-box");
    closeButton.addEventListener("click", this.closeBox.bind(this));
  }
}

export default AlertModule;
