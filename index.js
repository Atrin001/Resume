
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-category, .project-card, .experience-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Typing effect for hero subtitle
        const subtitle = document.querySelector('.hero .subtitle');
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1500);

        // Skill tags hover effect
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(2deg)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Project cards tilt effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            });
        });

        // Dynamic background particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#667eea';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.6';
            particle.style.zIndex = '1';
            
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            const endY = -10;
            const duration = Math.random() * 3000 + 2000;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            particle.animate([
                { transform: `translateY(0px)`, opacity: 0 },
                { transform: `translateY(-${window.innerHeight + 20}px)`, opacity: 0.6 },
                { transform: `translateY(-${window.innerHeight + 40}px)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            }).onfinish = () => {
                particle.remove();
            };
        }

        // Create particles periodically
        setInterval(createParticle, 300);

        // Contact form enhanced validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Enhanced validation
            if (!name || name.length < 2) {
                alert('Please enter a valid name (at least 2 characters)');
                return;
            }
            
            if (!email || !validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (!subject || subject.length < 5) {
                alert('Please enter a subject (at least 5 characters)');
                return;
            }
            
            if (!message || message.length < 10) {
                alert('Please enter a message (at least 10 characters)');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Skills progress animation
        function animateSkillBars() {
            const skillCategories = document.querySelectorAll('.skill-category');
            
            skillCategories.forEach(category => {
                const skills = category.querySelectorAll('.skill-tag');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.opacity = '0';
                        skill.style.transform = 'translateY(20px)';
                        skill.style.transition = 'all 0.5s ease';
                        
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 100);
                });
            });
        }

        // Trigger skill animation when skills section is visible
        const skillsSection = document.getElementById('skills');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);

        // Theme toggle functionality (bonus feature)
        function createThemeToggle() {
            const toggleBtn = document.createElement('button');
            toggleBtn.innerHTML = '🌙';
            toggleBtn.style.position = 'fixed';
            toggleBtn.style.top = '20px';
            toggleBtn.style.right = '20px';
            toggleBtn.style.width = '50px';
            toggleBtn.style.height = '50px';
            toggleBtn.style.borderRadius = '50%';
            toggleBtn.style.border = 'none';
            toggleBtn.style.background = 'var(--bg-card)';
            toggleBtn.style.color = 'var(--text-light)';
            toggleBtn.style.fontSize = '20px';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.zIndex = '1001';
            toggleBtn.style.transition = 'all 0.3s ease';
            toggleBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            
            toggleBtn.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                this.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
            });
            
            document.body.appendChild(toggleBtn);
        }

        // Initialize theme toggle
        createThemeToggle();

        // Add light theme styles
        const lightThemeStyles = `
            .light-theme {
                --bg-dark: #ffffff;
                --bg-card: #f8fafc;
                --text-light: #1e293b;
                --text-gray: #64748b;
            }
            
            .light-theme .hero {
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            }
            
            .light-theme .floating-element .tech-icon {
                background: var(--bg-card);
                color: var(--text-light);
                border: 1px solid #e2e8f0;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = lightThemeStyles;
        document.head.appendChild(styleSheet);

        // Scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.position = 'fixed';
            progressBar.style.top = '0';
            progressBar.style.left = '0';
            progressBar.style.width = '0%';
            progressBar.style.height = '3px';
            progressBar.style.background = 'var(--gradient)';
            progressBar.style.zIndex = '1002';
            progressBar.style.transition = 'width 0.1s ease';
            
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }

        createScrollProgress();

        // Performance optimization: Lazy loading for project images
        const projectCards = document.querySelectorAll('.project-card');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        });

        projectCards.forEach(card => {
            imageObserver.observe(card);
        });

        // Console easter egg
        console.log(`
        ╔═══════════════════════════════════════╗
        ║           Welcome to my portfolio!     ║
        ║                                       ║
        ║   Built with ❤️ by Atrin Ashnaei     ║
        ║                                       ║
        ║   Technologies used:                  ║
        ║   • HTML5 & CSS3                     ║
        ║   • Vanilla JavaScript               ║
        ║   • Modern Web APIs                  ║
        ║   • Responsive Design                ║
        ║                                       ║
        ║   Want to hire me? Let's talk!       ║
        ║   📧 atrinashnei@ut.ac.ir           ║
        ╚═══════════════════════════════════════╝
        `);