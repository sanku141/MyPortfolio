import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = [
    'Full Stack Software Developer',
    'AI Solutions Architect',
  ];

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40); // speed up deleting
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100); // normal typing speed
      }

      // Check if word is complete
      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 1500); // pause at complete word
        return;
      }

      // Check if deletion is complete
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(300); // pause before starting next word
        return;
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // RotateX is determined by y-displacement, RotateY by x-displacement
    const rotateX = -y / 15;
    const rotateY = x / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="section hero">
      <div className="container">
        <div className="hero-grid">
          {/* Content Column */}
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Sanket Kshirsagar</span>
            </h1>
            <div className="role-container hero-role-align">
              <span>{text}</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-subtitle hero-sub-align">
              Building intelligent solutions with AI, automation, and clean, modular code.
            </p>

            <div className="hero-actions">
              <a
                href="/Kshirsagar_Sanket_Resume.pdf"
                className="btn btn-primary"
                download="Kshirsagar_Sanket_Resume.pdf"
              >
                <Download size={18} /> Download Resume
              </a>
              <a
                href="#projects"
                className="btn btn-secondary"
                onClick={scrollToProjects}
              >
                View My Work <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Interactive Portrait Column */}
          <div className="hero-image-wrapper">
            <div className="portrait-glow-back" />

            <div
              className="interactive-portrait-frame"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/images/assets/ProfilePotraitSanket.jpeg"
                alt="Sanket Kshirsagar Portrait"
                className="interactive-portrait-img"
              />
            </div>

            {/* Orbiting Badges */}
            <div className="floating-orbit-badge orbit-python">
              <i className="devicon-python-plain colored"></i>
              <span>Python</span>
            </div>
            <div className="floating-orbit-badge orbit-react">
              <i className="devicon-react-original colored"></i>
              <span>React</span>
            </div>
            <div className="floating-orbit-badge orbit-ai">
              <i className="fas fa-brain" style={{ color: 'var(--accent-cyan)' }}></i>
              <span>CortexAI</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-prompt" onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById('about');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }}>
        <span>Scroll to explore</span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
};

export default Hero;
