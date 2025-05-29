// Language switcher and IP detection
const languageSwitcher = {
  currentLanguage: 'en',
  translations: {
    en: {
      // Add all English translations here
      welcome: 'Welcome',
      services: 'Our Services',
      about: 'About Us',
      contact: 'Contact Now'
    },
    es: {
      // Add all Spanish translations here
      welcome: 'Bienvenido',
      services: 'Nuestros Servicios',
      about: 'Sobre Nosotros',
      contact: 'Contactar Ahora'
    }
  },

  init: function() {
    this.detectCountry();
    this.createLanguageSelector();
    this.applyTranslations();
  },

  detectCountry: function() {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        if (data.country === 'MX') {
          this.currentLanguage = 'es';
          this.applyTranslations();
        }
      })
      .catch(error => console.error('Error detecting country:', error));
  },

  createLanguageSelector: function() {
    const nav = document.querySelector('.main-menu ul');
    if (nav) {
      // const li = document.createElement('li');
      li.innerHTML = `
        <a href="#" class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</a>
        <span class="separator">/</span>
        <a href="#" class="lang-btn ${this.currentLanguage === 'es' ? 'active' : ''}" data-lang="es">ES</a>
      `;
      nav.appendChild(li);
      
      li.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.currentLanguage = e.target.dataset.lang;
          this.applyTranslations();
          document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        });
      });
    }
  },

  applyTranslations: function() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (this.translations[this.currentLanguage][key]) {
        el.textContent = this.translations[this.currentLanguage][key];
      }
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  languageSwitcher.init();
});