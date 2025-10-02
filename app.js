// Skills data with original brand colors and glow effects
const skillsData = {
    all: [
        {name: "HTML", icon: "fa-brands fa-html5", color: "#E34F26"},
        {name: "CSS", icon: "fa-brands fa-css3-alt", color: "#1572B6"},
        {name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E"},
        {name: "MongoDB", icon: "fa-solid fa-leaf", color: "#47A248"},
        {name: "MySQL", icon: "fa-solid fa-database", color: "#4479A1"},
        // {name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933"},
        {name: "Java", icon: "fa-brands fa-java", color: "#ED8B00"},
        // {name: "Python", icon: "fa-brands fa-python", color: "#3776AB"}
    ],
    frontend: [
        {name: "HTML", icon: "fa-brands fa-html5", color: "#E34F26"},
        {name: "CSS", icon: "fa-brands fa-css3-alt", color: "#1572B6"},
        {name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E"}
    ],
    backend: [
        {name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933"}
    ],
    database: [
        {name: "MongoDB", icon: "fa-solid fa-leaf", color: "#47A248"},
        {name: "MySQL", icon: "fa-solid fa-database", color: "#4479A1"}
    ],
    languages: [
        {name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E"},
        {name: "Java", icon: "fa-brands fa-java", color: "#ED8B00"},
        // {name: "Python", icon: "fa-brands fa-python", color: "#3776AB"}
    ]
};

// Global variables
let skillsGrid = null;
let tabButtons = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize DOM elements
    skillsGrid = document.getElementById('skills-grid');
    tabButtons = document.querySelectorAll('.tab-btn');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');
    const resumeLink = document.getElementById('resume-link');
    const resumeModal = document.getElementById('resume-modal');
    const closeModal = document.getElementById('close-modal');
    const downloadResumeBtn = document.getElementById('download-resume-btn');

    // Skills functionality
    function createSkillCard(skill) {
        return `
            <div class="skill-card" data-skill="${skill.name}">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <h3 class="skill-name">${skill.name}</h3>
            </div>
        `;
    }

    function renderSkills(category) {
        console.log('Rendering skills for category:', category);
        
        if (!skillsGrid) {
            console.error('Skills grid not found!');
            return;
        }
        
        const skills = skillsData[category] || skillsData.all;
        console.log('Skills to render:', skills);
        
        // Add fade out effect
        skillsGrid.style.opacity = '0';
        
        setTimeout(() => {
            // Clear and render new skills
            skillsGrid.innerHTML = skills.map(skill => createSkillCard(skill)).join('');
            
            // Add fade in effect
            skillsGrid.style.opacity = '1';
            
            console.log('Skills rendered successfully');
        }, 150);
    }

    // Tab button event listeners with improved functionality
    if (tabButtons && tabButtons.length > 0) {
        tabButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const category = this.getAttribute('data-tab');
                console.log('Tab clicked:', category);
                
                // Remove active class from all tabs
                tabButtons.forEach(tab => {
                    tab.classList.remove('active');
                    tab.style.background = 'transparent';
                    tab.style.color = '#E8F4F8';
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                this.style.background = '#4A90E2';
                this.style.color = '#0B0E1A';
                
                // Render skills for the selected category
                renderSkills(category);
            });
        });
    }

    // Initialize with "All Skills" tab
    renderSkills('all');

     // Resume modal open
  if (resumeLink && resumeModal) {
    resumeLink.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  // Resume modal close
  if (closeModal && resumeModal) {
    closeModal.addEventListener('click', () => {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  // Optional: close modal after clicking download
  if (downloadResumeBtn && resumeModal) {
    downloadResumeBtn.addEventListener('click', () => {
      setTimeout(() => {
        resumeModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    });
  }


    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Handle resume link separately
            if (href === '#resume' || this.id === 'resume-link') {
                return; // Let the resume modal handler take care of this
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                console.log('Scrolling to:', targetId);
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target not found:', targetId);
            }
        });
    });

    // Contact form submission with email functionality
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate email sending
            setTimeout(() => {
                // Create mailto link to send email to amitkumar365460@gmail.com
                const subject = encodeURIComponent(`Contact from ${name} - Portfolio Website`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const mailtoLink = `mailto:amitkumar365460@gmail.com?subject=${subject}&body=${body}`;
                
                // Open default email client
                window.open(mailtoLink);
                
                alert(`Thank you, ${name}! Your message has been prepared for sending. Your default email client should open shortly.`);
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }

    // Enhanced social media links functionality
    const socialLinks = document.querySelectorAll('.social-link-small');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            console.log('Social link clicked:', href);
            
            if (href) {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        });
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.1)';
            link.style.boxShadow = '0 8px 20px rgba(74, 144, 226, 0.4)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(-2px) scale(1)';
            link.style.boxShadow = '0 5px 15px rgba(74, 144, 226, 0.3)';
        });
    });

    // // Navbar scroll effects
    // const navbar = document.querySelector('.navbar');
    // let lastScrollTop = 0;

    // window.addEventListener('scroll', () => {
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
    //     if (navbar) {
    //         if (scrollTop > lastScrollTop && scrollTop > 100) {
    //             navbar.style.transform = 'translateY(-100%)';
    //         } else {
    //             navbar.style.transform = 'translateY(0)';
    //         }
            
    //         const opacity = Math.min(scrollTop / 100, 0.95);
    //         navbar.style.background = `rgba(11, 14, 26, ${opacity})`;
    //     }
        
    //     lastScrollTop = scrollTop;
    // });

    // Animation observers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .about-text-section, .project-card, .contact-form');
    animatedElements.forEach(el => observer.observe(el));

    // Project cards stagger animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => projectObserver.observe(card));

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }

    // Particle effect for background
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleCount = 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(74, 144, 226, 0.4);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
    }

    createParticles();
    
    // Add brand color highlighting to tech tags
    function addTechTagHighlighting() {
        const techTags = document.querySelectorAll('.tech-tag');
        const techColors = {
            'HTML': '#E34F26',
            'CSS': '#1572B6',
            'JavaScript': '#F7DF1E',
            'Node.js': '#339933',
            'MongoDB': '#47A248',
            'MySQL': '#4479A1',
            'Java': '#ED8B00',
            'Python': '#3776AB',
            'Express': '#339933',
            'JWT': '#4479A1',
            'API': '#F7DF1E',
            'React': '#61DAFB',
            'Database': '#4479A1'
        };
        
        techTags.forEach(tag => {
            const tech = tag.textContent.trim();
            if (techColors[tech]) {
                const color = techColors[tech];
                tag.style.borderColor = color + '60';
                
                tag.addEventListener('mouseenter', () => {
                    tag.style.backgroundColor = color + '20';
                    tag.style.color = color;
                    tag.style.borderColor = color;
                    tag.style.boxShadow = `0 0 10px ${color}40`;
                });
                
                tag.addEventListener('mouseleave', () => {
                    tag.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                    tag.style.color = '#4A90E2';
                    tag.style.borderColor = 'rgba(74, 144, 226, 0.2)';
                    tag.style.boxShadow = 'none';
                });
            }
        });
    }
    
    // Apply tech tag highlighting after a short delay
    setTimeout(addTechTagHighlighting, 500);

    // Profile image interaction
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.1)';
            profileImage.style.boxShadow = '0 0 80px rgba(74, 144, 226, 0.6)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1.05)';
            profileImage.style.boxShadow = '0 0 60px rgba(74, 144, 226, 0.5)';
        });
    }

    // Add dynamic skill card interactions
    function addSkillCardInteractions() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Re-add interactions after skills are rendered
    const originalRenderSkills = renderSkills;
    renderSkills = function(category) {
        originalRenderSkills(category);
        setTimeout(addSkillCardInteractions, 200);
    };

    console.log('Initialization complete');
});

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card,
    .about-text-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .navbar {
        transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
    }
    
    .skill-card {
        transition: all 0.3s ease-in-out;
    }
    
    .skills-grid {
        transition: opacity 0.3s ease-in-out;
    }
    
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
        }
        50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.7; 
        }
    }
    
    /* Tech tag animations */
    .tech-tag {
        transition: all 0.3s ease-in-out;
        cursor: default;
    }
    
    /* Typing cursor effect */
    .hero-subtitle::after {
        content: '|';
        animation: blink 1s infinite;
        color: rgba(74, 144, 226, 0.8);
        margin-left: 2px;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Social link hover effects */
    .social-link-small {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Modal animations */
    .modal {
        animation: modalFadeIn 0.3s ease-out;
    }
    
    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Enhanced skill card glow effects with original brand colors */
    .skill-card[data-skill="HTML"]:hover {
        box-shadow: 0 15px 40px rgba(227, 79, 38, 0.4) !important;
        border-color: #E34F26 !important;
    }
    
    .skill-card[data-skill="CSS"]:hover {
        box-shadow: 0 15px 40px rgba(21, 114, 182, 0.4) !important;
        border-color: #1572B6 !important;
    }
    
    .skill-card[data-skill="JavaScript"]:hover {
        box-shadow: 0 15px 40px rgba(247, 223, 30, 0.4) !important;
        border-color: #F7DF1E !important;
    }
    
    .skill-card[data-skill="MongoDB"]:hover {
        box-shadow: 0 15px 40px rgba(71, 162, 72, 0.4) !important;
        border-color: #47A248 !important;
    }
    
    .skill-card[data-skill="MySQL"]:hover {
        box-shadow: 0 15px 40px rgba(68, 121, 161, 0.4) !important;
        border-color: #4479A1 !important;
    }
    
    .skill-card[data-skill="Node.js"]:hover {
        box-shadow: 0 15px 40px rgba(51, 153, 51, 0.4) !important;
        border-color: #339933 !important;
    }
    
    .skill-card[data-skill="Java"]:hover {
        box-shadow: 0 15px 40px rgba(237, 139, 0, 0.4) !important;
        border-color: #ED8B00 !important;
    }
    
    .skill-card[data-skill="Python"]:hover {
        box-shadow: 0 15px 40px rgba(55, 118, 171, 0.4) !important;
        border-color: #3776AB !important;
    }
`;
document.head.appendChild(style);

