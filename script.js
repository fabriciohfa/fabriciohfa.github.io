// Inicializa o efeito de fumaça com Vanta.js
VANTA.FOG({
    el: ".vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    highlightColor: 0x9B6AFF, // Roxo
    midtoneColor: 0x00C9FF,   // Azul
    lowlightColor: 0x92FE9D,  // Verde
    baseColor: 0x121212,      // Cor de fundo
    blurFactor: 0.8,
    speed: 1.5,
    zoom: 0.90
});

// Função para rolagem suave ao clicar nos botões
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Função para revelar os elementos ao rolar
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // Quantidade de pixels antes de ativar a animação

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Adiciona o evento de scroll
window.addEventListener('scroll', revealOnScroll);

// Chama a função no início
revealOnScroll();

// Função para carregar e aplicar as traduções usando fetch
function setLanguage(language) {
    fetch(`languages/strings_${language}.xml`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo de tradução: ${response.statusText}`);
            }
            console.log(`Arquivo de tradução (${language}) carregado com sucesso.`);
            return response.text();
        })
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // Verifica se há erro no parsing do XML
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error("Erro ao fazer parse do XML.");
            }

            applyTranslations(xmlDoc);
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

// Função para aplicar as traduções
function applyTranslations(xmlDoc) {
    if (!xmlDoc) {
        console.error("Documento XML inválido.");
        return;
    }

    const strings = xmlDoc.getElementsByTagName('string');

    if (strings.length === 0) {
        console.error("Nenhuma string encontrada no XML.");
        return;
    }

    for (let i = 0; i < strings.length; i++) {
        const id = strings[i].getAttribute('name');
        const value = strings[i].textContent;
        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = value;
            console.log(`ID: ${id}, Valor aplicado: ${value}`);
        } else {
            console.warn(`Elemento com o ID "${id}" não encontrado no HTML.`);
        }
    }
}

// Carrega o idioma padrão ao abrir a página
window.onload = function() {
    setLanguage('pt'); // Definir o português como idioma padrão
};
