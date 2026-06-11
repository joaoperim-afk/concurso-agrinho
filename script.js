// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTabs();
  initCounters();
  initForm();
});

// 0. MENU RESPONSÍVEL (Mobile)
function initMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("toggle-open");
    });
  }
}

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

      // Filtra o conteúdo com transição suave
      tabContents.forEach(content => {
        const category = content.getAttribute("data-category");
        if (targetCategory === "all" || category === targetCategory) {
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
  const speed = 100; // Ajustado para animação mais fluida

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    
    const updateCount = () => {
      const inc = target / speed;
      if (count < target) {
        count += inc;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCount();
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
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

// 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
function initForm() {
  const form = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  if (!form || !formResponse) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio real / recarregamento da página

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (!nameInput || !emailInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") {
      showResponse("Por favor, preencha todos os campos.", "error");
      return;
    }

    // Simulando envio bem-sucedido
    showResponse(`Obrigado, ${name}! Sua inscrição foi realizada com sucesso.`, "success");
    form.reset();
  });
