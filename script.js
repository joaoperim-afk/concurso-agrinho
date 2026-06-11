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
    });
  }
}

// 1. FILTRO DINÂMICO DE TECNOLOGIAS (Abas)
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");

      // Atualiza classe ativa dos botões
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filtra os conteúdos com efeito visual básico
      tabContents.forEach(content => {
        const category = content.getAttribute("data-category");
        
        if (target === "all" || target === category) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });
}

// 2. CONTADORES ANIMADOS (Métricas com Intersection Observer)
function initCounters() {
  const counters = document.querySelectorAll(".count");
  const speed = 60; // Fator de velocidade da animação

  const startAnimation = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / speed;
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCount();
  };

  // Ativa animação somente ao rolar a tela até a seção
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation(entry.target);
        observer.unobserve(entry.target); // Executa apenas uma vez
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// 3. FORMULÁRIO DE NEWSLETTER (Validação e Feedback)
function initForm() {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("formResponse");

  if (form && responseMessage) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (name && email) {
        // Simulação de envio com sucesso
        responseMessage.textContent = `Obrigado, ${name}! Inscrição realizada com sucesso.`;
        responseMessage.className = "form-message success";
        form.reset();
      } else {
        responseMessage.textContent = "Por favor, preencha todos os campos corretamente.";
        responseMessage.className = "form-message error";
      }
    });
  }
}
