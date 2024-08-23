class HeaderModule {
  constructor() {
    this.hideOldHeader();
    this.render();
  }

  render() {
    const html = `
        <div id="checkout-confirmation-header">
            <header class="orderplaced-header">
                <a href="/">
                    <img class="orderplaced-header--logo" src="/arquivos/logo.png" alt="True Source" />
                </a>
            </header>
        </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", html);
  }

  /* Provisório */
  hideOldHeader() {
    $("#checkout-confirmation-header").remove();
  }
}

export default HeaderModule;
