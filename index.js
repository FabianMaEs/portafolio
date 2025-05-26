// Cambiar el idioma
function switchLanguage(language) {

    // Añadir la animación de fade-out y fade-in
    const elementosTraducidos = document.querySelectorAll('[data-es]');
    
    elementosTraducidos.forEach(el => {
        el.style.opacity = 0;
        
        setTimeout(() => {
            el.style.opacity = 1;

            const dataAttr = language === 'es' ? 'data-es' : 'data-en';
            document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
                const text = el.getAttribute(dataAttr);
                if (text) {
                    el.innerHTML = text;
                }
            });
        }, 100); // Espera a que termine el fade-out antes de cambiar el texto
    });
    
    // Cambiar el onclick del botón
    const button = document.querySelector(`button[onclick="switchLanguage('${language === 'es' ? 'es' : 'en'}')"]`);
    if (button) {
        button.setAttribute('onclick', `switchLanguage('${language === 'es' ? 'en' : 'es'}')`);
        button.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }
    
    // Añadir la animación de cambio de idioma
    const icon = button.querySelector('i');
    if (icon) {
        icon.classList.remove('language-icon-animate', 'language-icon-animate-reverse');

        void icon.offsetWidth; // Forzar el reflow para reiniciar la animación
        language === 'es' ? icon.classList.add('language-icon-animate') : icon.classList.add('language-icon-animate-reverse');
    }
}

const body = document.body;
const toggle = document.getElementById('toggle-theme');

// Función para aplicar el tema
function applyTheme(theme) {
    body.classList.remove('dark', 'light');
    body.classList.add(theme);

    // Cambiar el icono del toggle
    const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    toggle.innerHTML = `<i class="fas ${iconClass} theme-icon-animate"></i>`;
    
    // Remover la clase después de la animación
    setTimeout(() => {
      const iconEl = toggle.querySelector('i');
      if (iconEl) iconEl.classList.remove('theme-icon-animate');
    }, 400);
}

// Detectar y aplicar el tema preferido del sistema
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

// Cambiar tema al hacer clic
toggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Añadir zoom a las imágenes con la clase 'zoomable'
document.querySelectorAll('img.zoomable').forEach(img => {
  img.addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.classList.add('zoom-overlay');

    const clone = img.cloneNode();
    overlay.appendChild(clone);
    document.body.appendChild(overlay);

    function closeOverlay() {
      overlay.classList.add('zoom-out');
      setTimeout(() => overlay.remove(), 200); // coincide con duración de fadeOut
      document.removeEventListener('keydown', escHandler);
    }

    function escHandler(e) {
      if (e.key === 'Escape') {
        closeOverlay();
      }
    }

    overlay.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', escHandler);
  });
});

document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  let currentId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom > 80) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
});


// Inicializar el tema al cargar la página
window.onload = initializeTheme;


/*
window.onload = function() {
    // Asignar automáticamente el idioma al cargar la página (según el idioma del navegador)
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('es')) {
        switchToSpanish();
    } else {
        switchToEnglish();
    }
}
 */


