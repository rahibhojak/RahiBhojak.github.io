document.addEventListener('DOMContentLoaded', () => {
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

    // --- NEW GOOEY CURSOR ---
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursor.appendChild(cursorDot);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-dot-follower';
    cursor.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    const speed = 0.1;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
        let dx = mouseX - followerX;
        let dy = mouseY - followerY;
        followerX += dx * speed;
        followerY += dy * speed;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    document.querySelectorAll('a, button, [data-tilt]').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hovered'));
    });

    // --- NEW HOVER GLOW EFFECT ---
    document.querySelectorAll('.bento-item, .project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
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
        liveUrl: 'https://rahibhojak.github.io/',
        githubUrl: 'https://github.com/rahibhojak/RahiBhojak.github.io'
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
    });

});
