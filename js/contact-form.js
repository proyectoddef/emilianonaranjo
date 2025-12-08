window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json();

      if (response.status === 200 && data.success !== false) {
        form.reset();

        const lang = (document.documentElement.lang || "").toLowerCase();
        let message = "Thank you for your message! I will get back to you soon.";

        if (lang.startsWith("es")) {
          message = "¡Gracias por tu mensaje! Te responderé pronto.";
        } else if (lang.startsWith("pt")) {
          message = "Obrigado pela sua mensagem! Vou responder em breve.";
        }

        if (successMessage) {
          successMessage.textContent = message;
          successMessage.style.display = "block";

          setTimeout(() => {
            successMessage.style.display = "none";
          }, 6000);
        }
      } else {
        console.error("Web3Forms error", response.status, data);
        alert("Hubo un error al enviar el formulario. Por favor, intentá nuevamente más tarde.");
      }
    } catch (error) {
      console.error("Network error", error);
      alert("Hubo un error al enviar el formulario. Por favor, intentá nuevamente más tarde.");
    }
  });
});
