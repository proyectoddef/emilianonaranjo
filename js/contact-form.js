document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      // IMPORTANT: use form.action EXACTLY as it is, without adding any extra "ajax/" segments.
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        console.error("Formsubmit error:", response.status);
        return;
      }

      form.reset();

      const lang = (document.documentElement.lang || "").toLowerCase();
      let text;
      if (lang.startsWith("en")) {
        text = "Thank you for your message! I will get back to you soon.";
      } else if (lang.startsWith("pt")) {
        text = "Obrigado pela sua mensagem! Vou responder em breve.";
      } else {
        text = "¡Gracias por tu mensaje! Te responderé pronto.";
      }

      if (successMessage) {
        successMessage.textContent = text;
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 6000);
      }
    } catch (error) {
      console.error("Network error sending form:", error);
    }
  });
});
