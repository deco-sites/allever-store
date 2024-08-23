class HeaderModule {
  constructor() {
    this.hideOldHeader();
    this.render(this.getRenderArea());

    window.addEventListener("hashchange", () => {
      this.render(this.getRenderArea());
    });
  }

  getRenderArea() {
    if (window.location.hash.toLowerCase() === "#/cart") {
      return {
        helperClass: "header-body",
        area: document.body,
        where: "afterbegin",
      };
    }

    return {
      helperClass: "header-orderform",
      area: document.querySelector(".orderform-template-holder"),
      where: "afterbegin",
    };
  }

  render(targetArea) {
    document.querySelector(".checkout-header")?.remove();

    const html = `
        <div class="checkout-header ${targetArea.helperClass}">
            <div class="checkout-header__row">
                <a href="/">
                    <img class="checkout-header--logo" src="/arquivos/logo.png" alt="True Source" />
                </a>
            </div>

            <div class="checkout-header__info">
                <span>
                    Compra segura
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.25 8.25V5.25C5.25 4.25544 5.64509 3.30161 6.34835 2.59835C7.05161 1.89509 8.00544 1.5 9 1.5C9.99456 1.5 10.9484 1.89509 11.6517 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V8.25M3.75 8.25H14.25C15.0784 8.25 15.75 8.92157 15.75 9.75V15C15.75 15.8284 15.0784 16.5 14.25 16.5H3.75C2.92157 16.5 2.25 15.8284 2.25 15V9.75C2.25 8.92157 2.92157 8.25 3.75 8.25Z" stroke="#3C3C3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span>
                    Dúvidas?
                    <a href="https://api.whatsapp.com/send?phone=5527999141539" target="_blank" class="checkout-header__info--wpp">
                        Chame no Whatsapp
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2871 3.68254C13.5995 2.98799 12.7805 2.4373 11.8778 2.06258C10.9752 1.68787 10.0069 1.49664 9.02961 1.50004C4.93461 1.50004 1.59711 4.83754 1.59711 8.93254C1.59711 10.245 1.94211 11.52 2.58711 12.645L1.53711 16.5L5.47461 15.465C6.56211 16.0575 7.78461 16.3725 9.02961 16.3725C13.1246 16.3725 16.4621 13.035 16.4621 8.94004C16.4621 6.95254 15.6896 5.08504 14.2871 3.68254ZM9.02961 15.1125C7.91961 15.1125 6.83211 14.8125 5.87961 14.25L5.65461 14.115L3.31461 14.73L3.93711 12.45L3.78711 12.2175C3.17042 11.2328 2.84296 10.0945 2.84211 8.93254C2.84211 5.52754 5.61711 2.75254 9.02211 2.75254C10.6721 2.75254 12.2246 3.39754 13.3871 4.56754C13.9627 5.14052 14.4189 5.82204 14.7292 6.57261C15.0394 7.32319 15.1976 8.12788 15.1946 8.94004C15.2096 12.345 12.4346 15.1125 9.02961 15.1125ZM12.4196 10.4925C12.2321 10.4025 11.3171 9.95254 11.1521 9.88504C10.9796 9.82504 10.8596 9.79504 10.7321 9.97504C10.6046 10.1625 10.2521 10.5825 10.1471 10.7025C10.0421 10.83 9.92961 10.845 9.74211 10.7475C9.55461 10.6575 8.95461 10.455 8.24961 9.82504C7.69461 9.33004 7.32711 8.72254 7.21461 8.53504C7.10961 8.34754 7.19961 8.25004 7.29711 8.15254C7.37961 8.07004 7.48461 7.93504 7.57461 7.83004C7.66461 7.72504 7.70211 7.64254 7.76211 7.52254C7.82211 7.39504 7.79211 7.29004 7.74711 7.20005C7.70211 7.11004 7.32711 6.19504 7.17711 5.82004C7.02711 5.46004 6.86961 5.50504 6.75711 5.49754H6.39711C6.26961 5.49754 6.07461 5.54254 5.90211 5.73004C5.73711 5.91754 5.25711 6.36754 5.25711 7.28254C5.25711 8.19754 5.92461 9.08254 6.01461 9.20254C6.10461 9.33004 7.32711 11.205 9.18711 12.0075C9.62961 12.2025 9.97461 12.315 10.2446 12.3975C10.6871 12.54 11.0921 12.5175 11.4146 12.4725C11.7746 12.42 12.5171 12.0225 12.6671 11.5875C12.8246 11.1525 12.8246 10.785 12.7721 10.7025C12.7196 10.62 12.6071 10.5825 12.4196 10.4925Z" fill="#8CBF3C"/>
                        </svg>
                    </a>
                </span>
            </div>
        </div>
    `;

    targetArea.area.insertAdjacentHTML(targetArea.where, html);
  }

  // Provisório
  hideOldHeader() {
    // document.querySelector('a[title="Go to homepage"]').parentElement.remove();
    // $(".container")[0].remove();
  }
}

export default HeaderModule;
