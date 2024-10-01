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

// Função para carregar e aplicar as traduções
function setLanguage(language) {
    const xhr = new XMLHttpRequest();
    
    // Define o caminho para os arquivos XML, ajustando conforme necessário
    xhr.open('GET', `languages/strings_${language}.xml`, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(`Arquivo de tradução (${language}) carregado com sucesso.`);
                const xmlDoc = xhr.responseXML;
                applyTranslations(xmlDoc);
            } else {
                console.error(`Erro ao carregar o arquivo XML para o idioma ${language}.`);
            }
        }
    };
    
    xhr.send();
}

// Função para aplicar as traduções
function applyTranslations(xmlDoc) {
    const strings = xmlDoc.getElementsByTagName('string');

    for (let i = 0; i < strings.length; i++) {
        const id = strings[i].getAttribute('name');
        const value = strings[i].textContent;
        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = value;
        } else {
            console.warn(`Elemento com o ID "${id}" não encontrado no HTML.`);
        }
    }
}

// Carrega o idioma padrão ao abrir a página
window.onload = function() {
    setLanguage('pt'); // Definir o português como idioma padrão
};
