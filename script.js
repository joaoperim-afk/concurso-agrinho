document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // DATA: FATOS E DADOS DOS ESPECIALISTAS
    // ==========================================
    const expertDatabase = {
        precisao: {
            title: "Agricultura de Precisão",
            icon: "fa-tractor",
            quote: "\"A aplicação cirúrgica de recursos baseada em dados de IoT transforma a margem de lucro enquanto blinda os ecossistemas locais.\" — Dr. Carlos Mendes, Embrapa.",
            facts: [
                "Redução drástica de até 30% no uso defensivos químicos desnecessários devido à aplicação em taxa variável.",
                "Economia substancial de combustível de maquinários via roteirização inteligente monitorada por GPS.",
                "Sensores em tempo real evitam o superaquecimento do solo e a compactação prejudicial às raízes primárias."
            ]
        },
        ilpf: {
            title: "Reflorestamento Integrado (ILPF)",
            icon: "fa-tree",
            quote: "\"A integração de árvores com pastagens cria um microclima ideal que melhora o bem-estar animal e retém nutrientes orgânicos no perfil do solo.\" — Dra. Helena Rocha, Pesquisadora Ambiental.",
            facts: [
                "Propriedades que utilizam ILPF conseguem neutralizar integralmente as emissões de gases estufa do rebanho local.",
                "As árvores nativas inseridas servem como barreiras físicas naturais contra ventos fortes e erosão hídrica cambial.",
                "Diversificação de renda para o produtor rural através do manejo sustentável de madeira e produtos florestais."
            ]
        },
        hidrico: {
            title: "Manejo Hídrico Avançado",
            icon: "fa-droplet",
            quote: "\"A água doce é o recurso mais crítico do século. Tratar a irrigação como ciência exata assegura a sustentabilidade das bacias hidrográficas.\" — Eng. Roberto Silva, Especialista em Recursos Hídricos.",
            facts: [
                "A irrigação localizada por gotejamento direciona a umidade à raiz ativa, erradicando perdas severas por evaporação.",
                "Sistemas automatizados integrados com previsões meteorológicas evitam regas redundantes em dias chuvosos.",
                "A captação e reuso planejado de águas pluviais minimiza a dependência direta de poços artesianos profundos."
            ]
        },
        "graos-esp": {
            title: "Impacto em Grãos & Cereais",
            icon: "fa-wheat-awn",
            quote: "\"Monitorar o balanço de Nitrogênio em tempo real previne a lixiviação química prejudicial aos aquíferos de águas subterrâneas.\" — Prof. Marcos Von, Centro de Agronomia Computacional.",
            facts: [
                "Evita o fenômeno de fitotoxicidade, onde o excesso de fertilizantes minerais queima e prejudica o desenvolvimento da plantação.",
                "Aumenta a densidade nutritiva dos grãos colhidos através de dosagens personalizadas por metro quadrado."
            ]
        },
        "pecuaria-esp": {
            title: "Impacto em Pecuária Verde",
            icon: "fa-cow",
            quote: "\"O pastejo rotacionado quebra o ciclo biológico de pragas rasteiras e acelera drasticamente a regeneração natural do capim.\" — Esp. Amanda Lins, Consultora Agropecuária.",
            facts: [
                "Evita a degradação e desertificação do solo arenoso causada pelo pisoteio excessivo e ininterrupto do gado.",
                "Melhora a conversão alimentar dos animais, gerando ciclos de corte mais rápidos e eficientes."
            ]
        },
        "horti-esp": {
            title: "Impacto em Hortifrúti",
            icon: "fa-seedling",
            quote: "\"A hidroponia vertical urbana reduz cadeias logísticas longas e entrega alimentos frescos com frações mínimas do gasto hídrico tradicional.\" — Chef e Ativista Agro Mariana Costa.",
            facts: [
                "Ambientes controlados em estufas mitigam perdas drásticas causadas por intempéries climáticas extremas fora de época.",
                "Cultivo vertical otimiza o uso do espaço físico, produzindo até 10 vezes mais alimentos por metro quadrado real utilizado."
            ]
        }
    };

    // ==========================================
    // 1. CONTROLE DE AMPLITUDE DE MÉTRICAS (SLIDERS)
    // ==========================================
    const sliders = document.querySelectorAll('.amplitude-slider');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetCounter = document.getElementById(targetId);
            if (targetCounter) {
                targetCounter.textContent = e.target.value;
            }
        });
    });

    // ==========================================
    // 2. GERENCIAMENTO DAS JANELAS MODAIS (ESPECIALISTAS)
    // ==========================================
    const modal = document.getElementById('expertModal');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.querySelector('.close-modal');
    const clickables = document.querySelectorAll('[data-expert]');

    const openExpertPage = (key) => {
        const data = expertDatabase[key];
        if (!data) return;

        // Monta a lista de fatos estruturada dinamicamente
        const factsHTML = data.facts.map(fact => `<li>${fact}</li>`).join('');

        // Injeta o conteúdo estruturado no corpo do modal
        modalBody.innerHTML = `
            <div class="expert-header">
                <i class="fa-solid ${data.icon}"></i>
                <h3 class="expert-title">${data.title}</h3>
            </div>
            <p class="expert-quote">${data.quote}</p>
            <h4 style="margin-bottom: 10px; color: var(--dark-color);">Fatos Científicos Comprovados:</h4>
            <ul class="expert-fact-list">
                ${factsHTML}
            </ul>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Trava a rolagem de fundo
    };

    // Atribui cliques para cards e caixas de abas com atributo data-expert
    clickables.forEach(element => {
        element.addEventListener('click', (e) => {
            // Evita abrir modal se o clique no container for decorrente do uso dos botões de abas normais
            if (e.target.classList.contains('tab-btn')) return;
            
            const expertKey = element.getAttribute('data-expert');
            openExpertPage(expertKey);
        });
    });

    // Fechar Modal ao clicar no 'X' ou fora da caixa branca
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // ==========================================
    // 3. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = navLinksContainer.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================
    // 4. SISTEMA DE ABAS (TABS) - TECNOLOGIAS
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o acionamento indesejado do modal do especialista
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.getAttribute('data-target');

            tabContents.forEach(content => {
                const category = content.getAttribute('data-category');
                if (target === 'all' || target === category) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 5. FORMULÁRIO DE CONTATO / NEWSLETTER
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            
            formResponse.textContent = `Obrigado, ${name}! Inscrição realizada com sucesso.`;
            formResponse.className = 'form-message success';
            formResponse.classList.remove('hidden');
            contactForm.reset();
        });
    }
});
