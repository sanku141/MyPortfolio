/* ============================================
   MODERN PORTFOLIO - JAVASCRIPT
   ============================================ */

console.log("Portfolio loaded!");

/* ============================================
   TYPING ANIMATION
   ============================================ */

const texts = [
    "Creative Developer",
    "Web App Builder",
    "AI-Powered Thinker",
    "Python Enthusiast",
    "Problem Solver"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    typedText.textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(erase, 2000);
    } else {
        setTimeout(type, 100);
    }
}

function erase() {
    if (index > 0) {
        letter = currentText.slice(0, --index);
        typedText.textContent = letter;
        setTimeout(erase, 50);
    } else {
        count++;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

/* ============================================
   PROJECT PREVIEW TOGGLE
   ============================================ */

function togglePreview(btn) {
    const preview = btn.parentElement.nextElementSibling;
    if (preview.style.display === "none" || preview.style.display === "") {
        preview.style.display = "block";
        btn.textContent = "Hide Demo";
    } else {
        preview.style.display = "none";
        btn.textContent = "View Demo";
    }
}

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/* ============================================
   PARTICLES.JS CONFIGURATION
   ============================================ */

if (document.getElementById("particles-js")) {
    tsParticles.load("particles-js", {
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00bfff27" },
            shape: {
                type: "char",
                character: {
                    value: ["??", "?", "??", "?", "??"],
                    font: "Verdana",
                    style: "",
                    weight: "400",
                    fill: true
                }
            },
            opacity: { value: 0.4, random: true },
            size: { value: 4, random: true },
            move: { enable: true, speed: 0.5, random: true },
            connect: { enable: false }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

/* ============================================
   SKILL DESCRIPTIONS
   ============================================ */

const skillDescriptions = {
    programming: [
        "?? Python – Primary language for automation, AI, backend",
        "?? JavaScript – For frontend interactions and dynamic UI",
        "?? HTML/CSS – Semantic and responsive structure",
        "??? MongoDB – NoSQL database handling",
        "?? SQL/MySQL – Relational database management",
        "?? PHP – Experience with CodeIgniter framework"
    ],
    web: [
        "?? Flask – Web apps, REST APIs, full-stack development",
        "?? Jinja2 – Dynamic template rendering",
        "?? Bootstrap/Tailwind – Responsive UI styling",
        "?? API Integration – OpenAI, TTS APIs, etc.",
        "?? Deployment – GitHub Pages, Render, Vercel",
        "?? Real-time Updates – WebSockets & AJAX"
    ],
    js: [
        "?? DOM Manipulation – Efficient element handling",
        "? Event Handling – Click, hover, scroll events",
        "?? Fetch API & AJAX – Asynchronous data loading",
        "?? Local Storage – Client-side data persistence",
        "?? CSS Animations – Smooth visual effects",
        "?? ES6+ Features – Modern JavaScript syntax"
    ],
    ai: [
        "?? Voice Assistant – Built Cortex using OpenAI",
        "?? OpenAI Integration – ChatGPT-3.5 & GPT-4",
        "?? Speech Recognition & TTS – gTTS, pyttsx3",
        "?? Automation – PC control, system commands",
        "?? Network Automation – Enterprise workflows at Wipro",
        "?? Machine Learning – Data processing & analysis"
    ],
    tools: [
        "?? Git & GitHub – Version control & collaboration",
        "?? Postman – API testing & development",
        "??? VS Code/PyCharm – IDEs for development",
        "?? Windows/Linux – Command-line expertise",
        "?? Docker – Containerization basics",
        "?? Cloud Platforms – Deployment & hosting"
    ]
};

const skillItems = document.querySelectorAll(".skill-item");
const detailBox = document.getElementById("skill-detail-box");
const detailText = document.getElementById("skill-detail-text");

skillItems.forEach(item => {
    item.addEventListener("click", () => {
        const key = item.getAttribute("data-skill");
        const lines = skillDescriptions[key];
        detailText.innerHTML = Array.isArray(lines) ? lines.join("<br>") : lines;
        
        // Highlight active skill
        skillItems.forEach(i => i.style.opacity = "0.6");
        item.style.opacity = "1";
    });
    
    item.addEventListener("mouseenter", () => {
        const key = item.getAttribute("data-skill");
        const lines = skillDescriptions[key];
        detailText.innerHTML = Array.isArray(lines) ? lines.join("<br>") : lines;
        item.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
        item.style.opacity = "0.6";
    });
});

// Reset on page load
skillItems.forEach(i => i.style.opacity = "0.6");

/* ============================================
   NAVIGATION MENU TOGGLE
   ============================================ */

function toggleMenu() {
    const nav = document.getElementById('\''navLinks'\'');
    nav.classList.toggle('\''show'\'');
    
    // Add animation
    const hamburger = document.querySelector('\''.hamburger'\'');
    hamburger.style.transform = nav.classList.contains('\''show'\'') ? 'rotate(90deg)' : 'rotate(0deg)';
}

function closeMenu() {
    const nav = document.getElementById('\''navLinks'\'');
    nav.classList.remove('\''show'\'');
    const hamburger = document.querySelector('\''.hamburger'\'');
    hamburger.style.transform = 'rotate(0deg)';
}

// Close menu when clicking on a link
document.querySelectorAll('\''.nav-link'\'').forEach(link => {
    link.addEventListener('\''click'\'', closeMenu);
});

/* ============================================
   ACTIVE NAVIGATION INDICATOR
   ============================================ */

const sections = document.querySelectorAll('\''section'\'');
const navLinks = document.querySelectorAll('\''.nav-link'\'');

const navOptions = {
    threshold: 0.4,
    rootMargin: '\''0px 0px -50% 0px'\''
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('\''active'\''));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('\''active'\'');
            }
        }
    });
}, navOptions);

sections.forEach(section => navObserver.observe(section));

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */

document.querySelectorAll('\''a[href^="#"]'\'').forEach(anchor => {
    anchor.addEventListener('\''click'\'', function (e) {
        const href = this.getAttribute('\''href'\'');
        if (href !== '\''#'\'') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: '\''smooth'\'', block: '\''start'\'' });
            }
        }
    });
});

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */

const scrollIndicator = document.querySelector('\''.scroll-indicator'\'');

window.addEventListener('\''scroll'\'', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollIndicator) {
        scrollIndicator.style.width = scrollPercentage + '\''%'\'';
    }
});

/* ============================================
   BUTTON RIPPLE EFFECT
   ============================================ */

document.querySelectorAll('\''.btn, .link-btn, .social-btn'\'').forEach(button => {
    button.addEventListener('\''click'\'', function(e) {
        const ripple = document.createElement('\''span'\'');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = '\''relative'\'';
        this.style.overflow = '\''hidden'\'';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

/* ============================================
   PRELOAD ANIMATIONS
   ============================================ */

window.addEventListener('\''load'\'', () => {
    document.body.style.opacity = '\''1'\'';
});

body.style.opacity = '\''0'\'';

/* ============================================
   CONSOLE MESSAGE
   ============================================ */

console.log('%cWelcome to Sanket'\''s Portfolio! ??', 'font-size: 18px; color: #00bfff; font-weight: bold;');
console.log('%cLet'\''s build something amazing together! ??', 'font-size: 14px; color: #00bfff;');
