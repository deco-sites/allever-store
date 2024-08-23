import ClassWatcher from "../../helpers/class-watcher";
import groupAndInsert from "../../helpers/group-and-insert";

class ContactFormModule {
  constructor() {
    this.contactFormVisibility();
    this.rearrangeInputs();
    this.stateSubscription(
      document.querySelector(".box-client-info-pj h5.corporate-title"),
      document.querySelector(".box-client-info-pj .corporate-info-box")
    );
    this.createNewFields();
    this.events();
  }

  contactFormVisibility() {
    const contactForm = document.querySelector(
      "#client-profile-data .step.client-profile-data"
    );

    window.location.hash.toLowerCase() === "#/email"
      ? contactForm.classList.add("hide")
      : contactForm.classList.remove("hide");

    window.addEventListener("hashchange", () => {
      window.location.hash.toLowerCase() === "#/email"
        ? contactForm.classList.add("hide")
        : contactForm.classList.remove("hide");
    });
  }

  createNewFields() {
    const inputContainer = document.querySelector(".box-client-info-pf");

    const clientBirth = `
        <div class="desk-input-group">
            <p class="client-birth input">
                <label for="client-birth">Data de nascimento</label>
                <input required type="text" id="client-birth" class="input-small mask" />
            </p>
            <p class="client-gender input">
                <label for="client-gender">Gênero biológico</label>
                <select id="client-gender">
                    <option>Masculino</option>
                    <option>Feminino</option>
                </select>
            </p>
        </div>
    `;

    inputContainer.insertAdjacentHTML("beforeend", clientBirth);

    const healthProfessionalClient = `
      <fieldset class="box-client-info-health">
        <label class="checkbox health-label">
          <input type="checkbox" id="chk-health-client">
          <span class="health-text">Sou profissional de saúde (nutricionistas, médicos, outros).</span>
        </label>

        <div class="health-info-box">
          <div class="desk-input-group">
            <p class="health-profession input">
                <label for="health-profession">Profissão</label>
                <select id="health-profession">
                    <option>Médico</option>
                    <option>Nutricionista</option>
                    <option>Outros</option>
                </select>
            </p>
            <p class="health-registry input">
                <label for="health-registry">Registro (CRM/CRN...)</label>
                <input class="input-small" type="text" id="health-registry" />
            </p>
          </div>
        </div>
      </fieldset>
    `;

    inputContainer.insertAdjacentHTML("afterend", healthProfessionalClient);

    const whatsappNewsletter = `
      <p class="whatsapp">
        <label class="checkbox whatsapp-label">
            <input type="checkbox" id="chk-whatsapp-newsletter">
            <span class="whatsapp-text">Quero receber novidades e ofertas por WhatsApp</span>
        </label>
      </p>
    `;

    const where = document.querySelector(".box-client-info");
    where.insertAdjacentHTML("beforeend", whatsappNewsletter);
  }

  events() {
    document
      .getElementById("chk-health-client")
      .addEventListener("change", (evt) => {
        if (evt.currentTarget.checked) {
          document.querySelector(".health-info-box").classList.add("visible");
          document.getElementById("health-registry").required = true;
        } else {
          document
            .querySelector(".health-info-box")
            .classList.remove("visible");
          document.getElementById("health-registry").required = false;
        }
      });

    document.getElementById("client-birth").addEventListener("blur", (evt) => {
      if (evt.currentTarget.value.length !== 10) {
        evt.currentTarget.classList.add("error");
        evt.currentTarget.classList.remove("success");
      } else {
        evt.currentTarget.classList.remove("error");
        evt.currentTarget.classList.add("success");
      }
    });

    $(document).ajaxStop(() => {
      $().mask && $("#client-birth").mask("00/00/0000");
    });

    this.professionEvent();
  }

  professionEvent() {
    const $buttonNextStep = document.querySelector("#go-to-shipping");

    $buttonNextStep.addEventListener("click", async () => {
      const isHealthProfessional =
        document.querySelector("#chk-health-client")?.checked;

      if (!isHealthProfessional) return;

      const email = vtexjs.checkout.orderForm.clientProfileData.email;
      const profession = document.querySelector("#health-profession")?.value;

      sendProfession(email, profession);

      this.sendCRM(document.getElementById("health-registry").value);
    });
  }

  /**
   * Responsável por reorganizar a ordem dos Inputs conforme Figma
   * Agrupa alguns inputs para exibição lado à lado no Desktop
   */
  rearrangeInputs() {
    const pfInputContainer = document.querySelector(".box-client-info-pf");
    const pjInputContainer = document.querySelector(
      ".box-client-info-pj .corporate-info-box"
    );

    groupAndInsert(pfInputContainer, [
      "p.client-first-name, p.client-last-name",
      "p.client-phone, p.client-document",
    ]);

    groupAndInsert(pjInputContainer, [
      "p.client-company-name, p.client-company-nickname",
      // "p.client-company-ie, p.client-company-document",
    ]);
  }

  /**
   * Garante que o container tenha display "flex" quando visível. Alterando o padrão da vtex (block).
   *
   * @param {HTMLElement} targetNode O nó alvo que será observado para alterações de visibilidade.
   * @param {HTMLElement} container O container cujo display será modificado para "flex" quando o targetNode estiver visível.
   */
  stateSubscription(targetNode, container) {
    function visibleHandler() {
      container.style.display = "flex";
    }

    function hidedHandler() {
      container.style.display = "none";
    }

    new ClassWatcher(targetNode, "visible", visibleHandler, hidedHandler);
  }

  async sendProfession(email, profession) {
    const baseUrl =
      "https://truesource-backend.vercel.app/api/customers/profession";

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          email: email,
          profession: profession,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();

      // Agora você pode verificar a resposta do servidor e tomar ações com base nela.
      if (responseData.success) {
        // A solicitação foi bem-sucedida, você pode fazer algo aqui.
        console.log("Solicitação bem-sucedida");
      } else {
        // A solicitação não foi bem-sucedida, você pode lidar com isso aqui.
        console.error("Erro na solicitação:", responseData.error);
      }
    } catch (error) {
      // Lidar com erros de rede ou de outra natureza.
      console.error("Erro na requisição:", error);
    }
  }

  sendCRM(crm) {
    $.ajax(
      `/api/checkout/pub/orderForm/${vtexjs.checkout.orderForm.orderFormId}/customData/crm/CRM`,
      {
        type: "PUT",
        data: {
          expectedOrderFormSections: [
            "items",
            "gifts",
            "totalizers",
            "clientProfileData",
            "shippingData",
            "paymentData",
            "sellers",
            "messages",
            "marketingData",
            "clientPreferencesData",
            "storePreferencesData",
            "customData",
          ],
          value: crm,
        },
      }
    ).done((o) => {});
  }
}

export default ContactFormModule;
