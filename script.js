// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initCounters();
  initForm();
});

// 1. FILTRO DINÂMICO DE PILARES (Abas)
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetCategory = button.getAttribute("data-target");

      // Atualiza classe ativa dos botões
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filtra o conteúdo
      tabContents.forEach(content => {
        if (targetCategory === "all" || content.getAttribute("data-category") === targetCategory) {
          content.style.display = "block";
          setTimeout(() => { content.style.opacity = "1"; }, 50);
        } else {
          content.style.opacity = "0";
          content.style.display = "none";
        }
      });
    });
  });
}

// 2. CONTADOR ANIMADO (Efeito de números crescendo)
function initCounters() {
  const counters = document.querySelectorAll(".count");
  const speed = 200; // Quanto maior, mais lenta a animação

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(() => startCounting(counter), 15);
    } else {
      counter.innerText = target;
    }
  };

  // Detecta quando a seção de dados aparece na tela para iniciar a animação
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        startCounting(counter);
        observer.unobserve(counter); // Roda a animação apenas uma vez
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
function initForm() {
  const form = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio real / recarregamento da página

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
      showResponse("Por favor, preencha todos os campos.", "error");
      return;
    }

    // Simulando envio bem-sucedido
    showResponse(`Obrigado, ${name}! Sua mensagem sobre o Agro Sustentável foi enviada.`, "success");
    form.reset();
  });

  function showResponse(message, type) {
    formResponse.innerText = message;
    formResponse.className = `form-message ${type}`;
    formResponse.style.display = "block";
  }
}
