let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

// Função para mostrar o slide específico
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

// Função para rolar suavemente até o elemento alvo
function scrollToSection(section) {
  document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
}

// Eventos de clique para os links do menu
document.querySelector('a[href="#pillars"]').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  currentSlide(4); // Define o slide para "home_equity.jpeg"
  scrollToSection('.carousel-section'); // Rola suavemente até o carrossel
});

document.querySelector('a[href="#services"]').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  scrollToSection('#services'); // Rola suavemente até a seção "Serviços"
});

document.querySelector('a[href="#specialized"]').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  scrollToSection('#specialized'); // Rola suavemente até a seção "Assessoria Especializada"
});

document.querySelector('a[href="#about"]').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  scrollToSection('#about'); // Rola suavemente até a seção "Quem somos"
});

document.querySelector('a[href="#contact"]').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  scrollToSection('#contact'); // Rola suavemente até a seção "Contato"
});