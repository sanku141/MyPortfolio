// Placeholder for future scroll animations or interactive toggles
console.log("Portfolio loaded!");
const texts = ["Creative Developer| Web App Builder| AI-Powered Thinker| Python Enthusiast"];
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

function togglePreview(btn) {
  const preview = btn.parentElement.nextElementSibling;
  if (preview.style.display === "none") {
      preview.style.display = "block";
      btn.textContent = "Hide Demo";
  } else {
      preview.style.display = "none";
      btn.textContent = "View Demo";
  }
}
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
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

tsParticles.load("particles-js", {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
      number: { value: 80 },
      color: { value: "#00bfff27" },
      shape: {
        type: "char",
        character: {
          value: ["💻", "Sanket", "Kshirsagar","Ai","Python","Developer"], // emojis or text
          font: "Verdana",
          style: "",
          weight: "400",
          fill: true
        }
      },
      opacity: { value: 0.5 },
      size: { value: 5 },
      move: { enable: true, speed: 1 }
  },
  interactivity: {
      events: {
          onhover: { enable: true, mode: "repulse" }
      }
  }
});

const skillDescriptions = {
    programming: [
        "Python – Primary language for automation, AI, backend",
        "JavaScript – For frontend interactions and dynamic UI",
        "PHP – Experience with CodeIgniter framework",
        "HTML/CSS – Semantic and responsive structure",
        "MangoDB – Database handling for web and automation tools",
        "SQL / MySQL – Database handling for web and automation tools",
        
    ],
    web: [
        "Flask – Web apps, REST APIs, and full-stack development",
        "Jinja2 Templating – For dynamic and maintainable web pages",
        "Bootstrap / Tailwind CSS – Responsive and modern UI styling",
        "API Integration – OpenAI, TTS APIs, etc.",
        "Website Deployment – GitHub Pages, Render, Vercel"
    ],
    js: [
        "DOM manipulation",
        "UI interactivity",
        "Fetch API & AJAX"
    ],
    ai: [
        "Voice Assistant Development – Built Cortex using OpenAI and offline commands",
        "OpenAI Integration",
        "Speech Recognition & TTS – Speech-to-text, text-to-speech (gTTS, pyttsx3, etc.)",
        "Offline System Automation – Shutdown, lock, play media, tell time/jokes via voice commands",
        "Network Automation – Automating workflows using Python at Wipro"
    ],
    tools: [
        "Git & GitHub – Version control and project collaboration",
        "Postman – API testing and development",
        "VS Code / PyCharm – Preferred coding environments",
        "Windows & Linux Shell – Command-line workflows"
    ]
};

const skillItems = document.querySelectorAll(".skill-item");
const detailBox = document.getElementById("skill-detail-box");
const detailText = document.getElementById("skill-detail-text");

skillItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        const key = item.getAttribute("data-skill");
        const lines = skillDescriptions[key];
        detailText.innerHTML = Array.isArray(lines) ? lines.join("<br>") : lines;
    });
    item.addEventListener("mouseleave", () => {
        detailText.textContent = "Hover over a skill to see more details.";
    });
});

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('show');
}

function closeMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.remove('show');
}
