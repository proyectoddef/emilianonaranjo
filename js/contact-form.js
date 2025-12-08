(function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok && successMessage) {
      form.reset();

      const pageLang = (document.documentElement.lang || "").toLowerCase();
      if (pageLang.startsWith("en")) {
        successMessage.textContent = "Thank you for your message! I will get back to you soon.";
      } else if (pageLang.startsWith("pt")) {
        successMessage.textContent = "Obrigado pela sua mensagem! Vou responder em breve.";
      } else {
        successMessage.textContent = "¡Gracias por tu mensaje! Te responderé pronto.";
      }

      successMessage.style.display = "block";
      setTimeout(() => (successMessage.style.display = "none"), 6000);
    }
  });
})();
