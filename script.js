document.addEventListener('DOMContentLoaded', () => { // Correct
    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- AOS INITIALIZATION ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
    });

    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const halo = document.getElementById('cursor-halo');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        halo.style.transform = `translate(${posX - 400}px, ${posY - 400}px)`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
    document.querySelectorAll('a, button, .slider, [data-tilt]').forEach(el => {
        el.addEventListener('mouseover', () => cursorOutline.classList.add('cursor-hovered'));
        el.addEventListener('mouseout', () => cursorOutline.classList.remove('cursor-hovered'));
    });
    
    // --- ANIMATED HERO TITLE ---
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // --- 3D TILT EFFECT ---
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
    
    // --- MOBILE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // --- DYNAMIC PROJECTS ---
    const projects = [
        { 
        title: 'Personal Portfolio Website', 
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tlIGdLzPe29repUgNE3LBsHVKeswk1lQtw&s',
        desc: 'The very portfolio you are currently exploring, designed with a clean aesthetic and built using modern web technologies to showcase my skills and projects.',
        tags: ['HTML', 'CSS', 'JavaScript', 'AOS'],
        liveUrl: '#',
        githubUrl: 'https://github.com/rahibhojak/RahiBhojak.github.io'
    },
        { 
            title: 'Creative Portfolio Agency', 
            img: 'https://placehold.co/600x400/112240/64ffda?text=Project+2',
            desc: 'A modern, visually-driven portfolio website for a creative agency, focusing on animations and user experience.',
            tags: ['Figma', 'Next.js', 'GSAP'],
            liveUrl: '#',
            githubUrl: '#'
        },
        { 
            title: 'Task Management App', 
            img: 'https://placehold.co/600x400/112240/64ffda?text=Project+3',
            desc: 'A sleek and intuitive task manager with drag-and-drop functionality, built to improve productivity.',
            tags: ['TypeScript', 'React', 'Styled-Components'],
            liveUrl: '#',
            githubUrl: '#'
        },
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', index * 100);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <a href="${project.liveUrl}" target="_blank"><img src="${project.img}" alt="${project.title}"></a>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="${project.liveUrl}" target="_blank" aria-label="External Link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // --- BACK TO TOP & ACTIVE NAV ON SCROLL ---
    const backToTopButton = document.querySelector('.back-to-top');
    const navLinksList = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        // Back to top visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // Active nav link highlighting
        let currentSection = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 150) {
                currentSection = section.id;
            }
        });
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }); // This was the first fix

}); // <-- This was the final missing piece