/**
 * Portfolio Website JavaScript
 * Handles all interactive functionality including navigation, themes, forms, and animations
 */

'use strict';

// =============================================================================
// GLOBAL CONFIGURATION
// =============================================================================

const Portfolio = {
  elements: {
    body: document.body,
    nav: document.querySelector('.nav'),
    navToggle: document.querySelector('.nav__toggle'),
    navMenu: document.querySelector('.nav__menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    themeToggle: document.querySelector('.theme-toggle'),
    themeIcon: document.querySelector('.theme-toggle__icon'),
    contactForm: document.getElementById('contact-form'),
    contactSuccess: document.getElementById('contact-success'),
    modal: document.getElementById('project-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.querySelector('.modal__close'),
    modalOverlay: document.querySelector('.modal__overlay'),
    projectsGrid: document.getElementById('projects-grid'),
    experienceTimeline: document.getElementById('experience-timeline'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    skillsContainers: {
      frontend: document.getElementById('frontend-skills'),
      backend: document.getElementById('backend-skills'),
      tools: document.getElementById('tools-skills')
    }
  },
  
  state: {
    isNavOpen: false,
    currentTheme: 'light',
    isModalOpen: false,
    currentFilter: 'all',
    animatedElements: new Set(),
    isLoading: false
  },
  
  config: {
    keyboardShortcuts: true,
    scrollOffset: 80,
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID' // TODO: Replace with actual Formspree ID
  }
};

// =============================================================================
// DATA CONFIGURATION
// =============================================================================

const skillsData = {
  frontend: [
    { name: 'HTML5 & CSS3', level: 90 },
    { name: 'JavaScript (ES6+)', level: 85 },
    { name: 'React.js', level: 80 },
    { name: 'Vue.js', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'Responsive Design', level: 95 },
    { name: 'CSS Frameworks', level: 85 },
    { name: 'Web Performance', level: 80 }
  ],
  backend: [
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'Express.js', level: 80 },
    { name: 'RESTful APIs', level: 85 },
    { name: 'Database Design', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'MySQL', level: 80 }
  ],
  tools: [
    { name: 'Git & GitHub', level: 90 },
    { name: 'VS Code', level: 95 },
    { name: 'Docker', level: 70 },
    { name: 'Linux/Unix', level: 80 },
    { name: 'Figma', level: 85 },
    { name: 'Adobe Creative Suite', level: 75 },
    { name: 'Testing Tools', level: 75 },
    { name: 'CI/CD', level: 70 }
  ]
};

const projectsData = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with HTML, CSS, and vanilla JavaScript featuring dark mode, animations, and accessibility.',
    image: './assets/1000101515.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    liveUrl: '#',
    repoUrl: 'https://github.com/poovarasu/portfolio',
    details: {
      overview: 'This portfolio website showcases modern web development practices with a focus on performance, accessibility, and user experience.',
      features: [
        'Responsive mobile-first design',
        'Dark/light theme switching',
        'Smooth scroll animations',
        'Contact form with validation',
        'Print-friendly resume view',
        'Keyboard navigation support'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'CSS Grid', 'Flexbox'],
      challenges: 'Implementing smooth animations while maintaining excellent performance scores and ensuring full accessibility compliance.'
    }
  },
  {
    id: 'task-manager',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, user authentication, and team collaboration features.',
    image: './assets/download.jpeg',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'http://localhost:3000',
    repoUrl: 'https://github.com/poovarasu/task-manager',
    details: {
      overview: 'A full-stack task management solution designed for teams to collaborate effectively and track project progress.',
      features: [
        'Real-time collaboration',
        'User authentication & authorization',
        'Drag-and-drop task organization',
        'File attachments and comments',
        'Progress tracking and analytics',
        'Email notifications'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
      challenges: 'Implementing real-time synchronization while maintaining data consistency and handling concurrent user interactions.'
    }
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: './assets/download (1).jpeg',
    tags: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
    liveUrl: '#',
    repoUrl: 'https://github.com/poovarasu/ecommerce',
    details: {
      overview: 'A comprehensive e-commerce platform built for small to medium businesses with modern web technologies.',
      features: [
        'Product catalog with search and filters',
        'Shopping cart and checkout process',
        'Payment gateway integration',
        'Order tracking and management',
        'Admin dashboard for inventory',
        'Customer reviews and ratings'
      ],
      technologies: ['Vue.js', 'Python', 'Django REST Framework', 'PostgreSQL', 'Stripe API'],
      challenges: 'Building a secure payment system and optimizing database queries for large product catalogs.'
    }
  }
];

const experienceData = [
  {
    id: 'intern-webdev',
    type: 'internship',
    date: '2024 - Present',
    title: 'Web Development Intern',
    company: 'Tech Solutions Inc.',
    description: 'Developing responsive web applications using modern JavaScript frameworks and contributing to open-source projects.',
    tags: ['JavaScript', 'React', 'Node.js', 'Git']
  },
  {
    id: 'freelance-frontend',
    type: 'freelance',
    date: '2023 - 2024',
    title: 'Freelance Frontend Developer',
    company: 'Various Clients',
    description: 'Created custom websites and web applications for small businesses, focusing on user experience and performance optimization.',
    tags: ['HTML', 'CSS', 'JavaScript', 'WordPress']
  },
  {
    id: 'project-lead',
    type: 'work',
    date: '2023',
    title: 'Student Project Lead',
    company: 'University IT Department',
    description: 'Led a team of 5 students in developing a campus event management system, coordinating development phases and ensuring project delivery.',
    tags: ['Leadership', 'Project Management', 'Full Stack Development']
  }
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateElement(element, animationClass = 'animate-in') {
  if (!Portfolio.state.animatedElements.has(element)) {
    element.classList.add(animationClass);
    Portfolio.state.animatedElements.add(element);
  }
}

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    this.setTheme(savedTheme);
    this.bindEvents();
  },

  setTheme(theme) {
    Portfolio.state.currentTheme = theme;
    Portfolio.elements.body.setAttribute('data-theme', theme);
    
    if (Portfolio.elements.themeIcon) {
      Portfolio.elements.themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    
    localStorage.setItem('portfolio-theme', theme);
    
    // Control cyberpunk effects based on theme
    if (window.CyberpunkEffects) {
      CyberpunkEffects.toggleMatrixRain(theme === 'dark');
    }
    
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  toggle() {
    const newTheme = Portfolio.state.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  },

  bindEvents() {
    if (Portfolio.elements.themeToggle) {
      Portfolio.elements.themeToggle.addEventListener('click', () => {
        this.toggle();
      });
    }
  }
};

// =============================================================================
// NAVIGATION MANAGEMENT
// =============================================================================

const NavigationManager = {
  init() {
    this.bindEvents();
    this.handleScroll();
  },

  toggleMobileMenu() {
    Portfolio.state.isNavOpen = !Portfolio.state.isNavOpen;
    
    if (Portfolio.elements.navToggle && Portfolio.elements.navMenu) {
      Portfolio.elements.navToggle.setAttribute('aria-expanded', Portfolio.state.isNavOpen);
      Portfolio.elements.navMenu.classList.toggle('nav__menu--open', Portfolio.state.isNavOpen);
      Portfolio.elements.body.style.overflow = Portfolio.state.isNavOpen ? 'hidden' : '';
    }
  },

  closeMobileMenu() {
    if (Portfolio.state.isNavOpen) {
      this.toggleMobileMenu();
    }
  },

  scrollToSection(targetId) {
    const target = document.getElementById(targetId.replace('#', ''));
    if (target) {
      const offset = Portfolio.config.scrollOffset;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  },

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + Portfolio.config.scrollOffset + 50;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        Portfolio.elements.navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  },

  handleScroll: throttle(function() {
    NavigationManager.updateActiveLink();
    
    if (Portfolio.elements.nav) {
      Portfolio.elements.nav.classList.toggle('nav--scrolled', window.pageYOffset > 100);
    }
  }, 100),

  bindEvents() {
    if (Portfolio.elements.navToggle) {
      Portfolio.elements.navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    Portfolio.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          this.scrollToSection(href);
          this.closeMobileMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (Portfolio.state.isNavOpen && 
          !Portfolio.elements.navMenu.contains(e.target) && 
          !Portfolio.elements.navToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    window.addEventListener('scroll', this.handleScroll);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Portfolio.state.isNavOpen) {
        this.closeMobileMenu();
      }
    });
  }
};

// =============================================================================
// FORM MANAGEMENT
// =============================================================================

const FormManager = {
  init() {
    this.bindEvents();
  },

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    this.clearFieldError(field);

    if (isRequired && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    else if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    else if (field.name === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  },

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    field.classList.add('error');
  },

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
    field.classList.remove('error');
  },

  validateForm() {
    const fields = Portfolio.elements.contactForm.querySelectorAll('input, textarea');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  },

  async handleSubmit(e) {
    e.preventDefault();

    if (Portfolio.state.isLoading) return;

    if (!this.validateForm()) {
      return;
    }

    Portfolio.state.isLoading = true;
    const submitButton = Portfolio.elements.contactForm.querySelector('.contact__submit');
    const buttonText = submitButton.querySelector('.btn__text');
    const buttonLoading = submitButton.querySelector('.btn__loading');

    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';

    try {
      const formData = new FormData(Portfolio.elements.contactForm);
      await this.simulateSubmission(formData);
      this.showSuccessMessage();
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    } finally {
      Portfolio.state.isLoading = false;
      submitButton.disabled = false;
      buttonText.style.display = 'inline';
      buttonLoading.style.display = 'none';
    }
  },

  async simulateSubmission(formData) {
    return new Promise(resolve => setTimeout(resolve, 1500));
  },

  showSuccessMessage() {
    Portfolio.elements.contactForm.style.display = 'none';
    Portfolio.elements.contactSuccess.style.display = 'block';
    Portfolio.elements.contactForm.reset();
    
    setTimeout(() => {
      Portfolio.elements.contactSuccess.style.display = 'none';
      Portfolio.elements.contactForm.style.display = 'grid';
    }, 5000);
  },

  bindEvents() {
    if (!Portfolio.elements.contactForm) return;

    Portfolio.elements.contactForm.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    const fields = Portfolio.elements.contactForm.querySelectorAll('input, textarea');
    fields.forEach(field => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });
      
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          this.clearFieldError(field);
        }
      });
    });
  }
};

// =============================================================================
// SKILLS MANAGEMENT
// =============================================================================

const SkillsManager = {
  init() {
    this.renderSkills();
    this.observeSkillsSection();
  },

  renderSkills() {
    Object.keys(skillsData).forEach(category => {
      const container = Portfolio.elements.skillsContainers[category];
      if (!container) return;

      const skillsHTML = skillsData[category].map(skill => `
        <div class="skill-item">
          <div class="skill-item__info">
            <span class="skill-item__name">${skill.name}</span>
            <span class="skill-item__level">${skill.level}%</span>
          </div>
          <div class="skill-progress">
            <div class="skill-progress__bar" data-level="${skill.level}"></div>
          </div>
        </div>
      `).join('');

      container.innerHTML = skillsHTML;
    });
  },

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress__bar');
    
    skillBars.forEach(bar => {
      if (isInViewport(bar) && !Portfolio.state.animatedElements.has(bar)) {
        const level = bar.getAttribute('data-level');
        
        setTimeout(() => {
          bar.style.width = `${level}%`;
        }, 100);
        
        Portfolio.state.animatedElements.add(bar);
      }
    });
  },

  observeSkillsSection() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }
};

// =============================================================================
// PROJECTS MANAGEMENT
// =============================================================================

const ProjectsManager = {
  init() {
    this.renderProjects();
    this.bindEvents();
  },

  renderProjects() {
    if (!Portfolio.elements.projectsGrid) return;

    const projectsHTML = projectsData.map(project => `
      <article class="project-card" data-project-id="${project.id}">
        <div class="project-card__image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__description">${project.description}</p>
          <div class="project-card__tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="project-card__links">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              Live Demo
            </a>
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
              View Code
            </a>
          </div>
        </div>
      </article>
    `).join('');

    Portfolio.elements.projectsGrid.innerHTML = projectsHTML;
  },

  openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !Portfolio.elements.modal) return;

    Portfolio.elements.modalTitle.textContent = project.title;
    
    const modalContent = `
      <div class="modal-project">
        <div class="modal-project__image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="modal-project__content">
          <p class="modal-project__overview">${project.details.overview}</p>
          
          <div class="modal-project__section">
            <h4>Key Features</h4>
            <ul>
              ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-project__section">
            <h4>Technologies Used</h4>
            <div class="modal-project__tags">
              ${project.details.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
          </div>
          
          <div class="modal-project__section">
            <h4>Challenges & Solutions</h4>
            <p>${project.details.challenges}</p>
          </div>
          
          <div class="modal-project__links">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
              View Live Project
            </a>
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
              View Source Code
            </a>
          </div>
        </div>
      </div>
    `;
    
    Portfolio.elements.modalBody.innerHTML = modalContent;
    this.showModal();
  },

  showModal() {
    Portfolio.state.isModalOpen = true;
    Portfolio.elements.modal.setAttribute('aria-hidden', 'false');
    Portfolio.elements.body.style.overflow = 'hidden';
    
    const focusableElements = Portfolio.elements.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  },

  hideModal() {
    Portfolio.state.isModalOpen = false;
    Portfolio.elements.modal.setAttribute('aria-hidden', 'true');
    Portfolio.elements.body.style.overflow = '';
  },

  bindEvents() {
    if (Portfolio.elements.projectsGrid) {
      Portfolio.elements.projectsGrid.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard && !e.target.closest('.project-card__links')) {
          const projectId = projectCard.getAttribute('data-project-id');
          this.openProjectModal(projectId);
        }
      });
    }

    if (Portfolio.elements.modalClose) {
      Portfolio.elements.modalClose.addEventListener('click', () => {
        this.hideModal();
      });
    }

    if (Portfolio.elements.modalOverlay) {
      Portfolio.elements.modalOverlay.addEventListener('click', () => {
        this.hideModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (Portfolio.state.isModalOpen && e.key === 'Escape') {
        this.hideModal();
      }
    });
  }
};

// =============================================================================
// EXPERIENCE MANAGEMENT
// =============================================================================

const ExperienceManager = {
  init() {
    this.renderExperience();
    this.bindEvents();
  },

  renderExperience(filter = 'all') {
    if (!Portfolio.elements.experienceTimeline) return;

    const filteredExperience = filter === 'all' 
      ? experienceData 
      : experienceData.filter(item => item.type === filter);

    const experienceHTML = filteredExperience.map(item => `
      <div class="timeline-item" data-type="${item.type}">
        <div class="timeline-item__marker"></div>
        <div class="timeline-item__content">
          <div class="timeline-item__date">${item.date}</div>
          <h3 class="timeline-item__title">${item.title}</h3>
          <p class="timeline-item__subtitle">${item.company}</p>
          <p class="timeline-item__description">${item.description}</p>
          <div class="timeline-item__tags">
            ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    Portfolio.elements.experienceTimeline.innerHTML = experienceHTML;
    this.animateTimelineItems();
  },

  animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
      }, index * 200);
    });
  },

  filterExperience(filter) {
    Portfolio.state.currentFilter = filter;
    
    Portfolio.elements.filterButtons.forEach(button => {
      button.classList.remove('filter-btn--active');
      if (button.getAttribute('data-filter') === filter) {
        button.classList.add('filter-btn--active');
      }
    });
    
    this.renderExperience(filter);
  },

  bindEvents() {
    Portfolio.elements.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.filterExperience(filter);
      });
    });
  }
};

// =============================================================================
// CYBERPUNK BACKGROUND EFFECTS
// =============================================================================

const CyberpunkEffects = {
  init() {
    this.initMatrixRain();
    this.initParallaxEffects();
    this.initGlitchEffects();
  },

  /**
   * Initialize Matrix Digital Rain Effect
   */
  initMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    if (!matrixContainer) return;

    // Matrix characters (mix of katakana, numbers, and symbols)
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Create matrix columns
    const createMatrixColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      
      // Random position and animation duration
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      column.style.animationDelay = Math.random() * 2 + 's';
      
      // Generate random characters
      let text = '';
      const charCount = Math.floor(Math.random() * 20) + 10;
      for (let i = 0; i < charCount; i++) {
        text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
      }
      column.innerHTML = text;
      
      matrixContainer.appendChild(column);
      
      // Remove column after animation
      setTimeout(() => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      }, 5000);
    };
    
    // Create columns periodically
    const createColumns = () => {
      if (Portfolio.state.currentTheme === 'dark' && Math.random() > 0.7) {
        createMatrixColumn();
      }
    };
    
    // Start matrix effect
    setInterval(createColumns, 200);
  },

  /**
   * Initialize parallax effects for floating shapes
   */
  initParallaxEffects() {
    const shapes = document.querySelectorAll('.floating-shape');
    if (!shapes.length) return;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
      });
    };
    
    // Throttled mouse move handler
    document.addEventListener('mousemove', throttle(handleMouseMove, 50));
  },

  /**
   * Initialize glitch effects for text elements
   */
  initGlitchEffects() {
    const glitchElements = document.querySelectorAll('[data-text]');
    
    glitchElements.forEach(element => {
      // Create glitch layers
      const createGlitchLayer = (className, color) => {
        const layer = document.createElement('span');
        layer.className = className;
        layer.textContent = element.getAttribute('data-text');
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.color = color;
        layer.style.zIndex = '-1';
        element.appendChild(layer);
        return layer;
      };
      
      // Add glitch layers
      element.style.position = 'relative';
      const redLayer = createGlitchLayer('glitch-red', 'rgba(255, 0, 0, 0.3)');
      const blueLayer = createGlitchLayer('glitch-blue', 'rgba(0, 255, 255, 0.3)');
      
      // Trigger random glitch effects
      setInterval(() => {
        if (Math.random() > 0.95) {
          redLayer.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
          blueLayer.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
          
          setTimeout(() => {
            redLayer.style.transform = 'translate(0, 0)';
            blueLayer.style.transform = 'translate(0, 0)';
          }, 100);
        }
      }, 200);
    });
  },

  /**
   * Toggle matrix rain based on theme
   */
  toggleMatrixRain(enabled) {
    const matrixContainer = document.getElementById('matrix-rain');
    if (matrixContainer) {
      matrixContainer.style.opacity = enabled ? '0.05' : '0';
    }
  }
};

// =============================================================================
// ENHANCED SCROLL ANIMATIONS
// =============================================================================

const EnhancedScrollAnimations = {
  init() {
    this.observeElements();
    this.initParallaxSections();
  },

  observeElements() {
    const elementsToAnimate = document.querySelectorAll('.section, .timeline-item, .project-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered animation delays
          const elements = entry.target.querySelectorAll('.animate-child');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-in');
            }, index * 100);
          });
          
          animateElement(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  },

  /**
   * Initialize parallax scrolling for sections
   */
  initParallaxSections() {
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', throttle(handleScroll, 10));
  }
};

// =============================================================================
// INTERACTIVE PARTICLE SYSTEM
// =============================================================================

const ParticleSystem = {
  init() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    this.bindEvents();
    this.animate();
  },

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    this.resizeCanvas(canvas);
    
    return canvas;
  },

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },

  createParticle(x, y) {
    return {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      decay: Math.random() * 0.02 + 0.01,
      size: Math.random() * 3 + 1,
      color: Portfolio.state.currentTheme === 'dark' ? 
        `rgba(59, 130, 246, ${Math.random()})` : 
        `rgba(37, 99, 235, ${Math.random()})`
    };
  },

  updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      
      return particle.life > 0;
    });
  },

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  },

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  },

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Create particles on mouse movement
      if (Math.random() > 0.9) {
        this.particles.push(this.createParticle(this.mouse.x, this.mouse.y));
      }
    });
    
    window.addEventListener('resize', () => {
      this.resizeCanvas(this.canvas);
    });
    
    // Create random particles
    setInterval(() => {
      if (this.particles.length < 50) {
        this.particles.push(this.createParticle(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height
        ));
      }
    }, 1000);
  }
};

const ScrollAnimations = {
  init() {
    this.observeElements();
  },

  observeElements() {
    const elementsToAnimate = document.querySelectorAll('.section, .timeline-item, .project-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  }
};

const KeyboardShortcuts = {
  init() {
    if (Portfolio.config.keyboardShortcuts) {
      this.bindEvents();
    }
  },

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'g':
          e.preventDefault();
          NavigationManager.scrollToSection('projects');
          break;
        case 'c':
          e.preventDefault();
          NavigationManager.scrollToSection('contact');
          break;
        case 't':
          e.preventDefault();
          ThemeManager.toggle();
          break;
      }
    });
  }
};

// =============================================================================
// MAIN APPLICATION
// =============================================================================

class PortfolioApp {
  constructor() {
    this.modules = [
      ThemeManager,
      NavigationManager,
      FormManager,
      SkillsManager,
      ProjectsManager,
      ExperienceManager,
      CyberpunkEffects,
      EnhancedScrollAnimations,
      ParticleSystem,
      KeyboardShortcuts
    ];
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    console.log('Portfolio App Starting...');
    
    try {
      this.modules.forEach(module => {
        if (module && typeof module.init === 'function') {
          module.init();
        }
      });
      
      document.body.classList.add('loaded');
      console.log('Portfolio App Initialized Successfully');
      window.dispatchEvent(new CustomEvent('portfolioready'));
      
    } catch (error) {
      console.error('Portfolio App Initialization Error:', error);
    }
  }

  getState() {
    return Portfolio.state;
  }

  updateConfig(newConfig) {
    Object.assign(Portfolio.config, newConfig);
  }
}

// Initialize the application
const app = new PortfolioApp();
app.init();

// Make app globally available for debugging
window.PortfolioApp = app;

// Additional features
window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}