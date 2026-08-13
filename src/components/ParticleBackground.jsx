import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const connectionDistance = 120;
    const mouse = { x: null, y: null, radius: 150 };
    
    // Dynamic theme colors managed via observer
    let accentColor = 'rgba(0, 255, 157, 0.4)';
    let secondaryColor = 'rgba(192, 132, 252, 0.15)';
    let coreGlowColor = '192, 132, 252';

    const updateColors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        accentColor = 'rgba(79, 70, 229, 0.35)'; // Indigo for readability on white
        secondaryColor = 'rgba(124, 58, 237, 0.15)'; // Violet
        coreGlowColor = '124, 58, 237';
      } else {
        accentColor = 'rgba(0, 255, 157, 0.4)'; // Cyber-mint for dark mode
        secondaryColor = 'rgba(192, 132, 252, 0.15)'; // Lavender
        coreGlowColor = '192, 132, 252';
      }
      particles.forEach((p) => {
        p.color = accentColor;
      });
    };

    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetSpeedMultiplier = 1;
    let currentSpeedMultiplier = 1;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        
        const dx = this.x - width / 2;
        const dy = this.y - height / 2;
        const dist = Math.hypot(dx, dy) || 1;
        this.ox = dx / dist;
        this.oy = dy / dist;
        
        this.radius = Math.random() * 2 + 1;
        this.color = accentColor;
      }

      update(speedMultiplier) {
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        const warpFactor = speedMultiplier - 1;
        this.x += this.vx * speedMultiplier + this.ox * warpFactor * 0.8;
        this.y += this.vy * speedMultiplier + this.oy * warpFactor * 0.8;

        if (warpFactor > 1) {
          if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Initial color setup
    updateColors();

    // Theme mutation observer to toggle color palettes dynamically
    const themeObserver = new MutationObserver(() => {
      updateColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const connectParticles = (speedMultiplier) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const warpFade = Math.max(0.2, 1 - (speedMultiplier - 1) / 5);
            const alpha = (1 - dist / connectionDistance) * 0.15 * warpFade;
            
            // Draw connection line
            ctx.strokeStyle = accentColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * 0.05;
      targetSpeedMultiplier += (1 - targetSpeedMultiplier) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (currentSpeedMultiplier > 2) {
        const grad = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width);
        const alpha = Math.min(0.15, (currentSpeedMultiplier - 1) * 0.02);
        grad.addColorStop(0, `rgba(${coreGlowColor}, ${alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((particle) => {
        particle.update(currentSpeedMultiplier);
        particle.draw();
      });

      connectParticles(currentSpeedMultiplier);

      // Track mouse line if close to particle
      if (mouse.x !== null && mouse.y !== null && currentSpeedMultiplier < 3) {
        particles.forEach((particle) => {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius - 30) {
            const alpha = (1 - dist / (mouse.radius - 30)) * 0.12;
            ctx.strokeStyle = secondaryColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      targetSpeedMultiplier = Math.min(12, 1 + scrollVelocity * 0.18);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.length = 0;
      const newParticleCount = Math.min(80, Math.floor((width * height) / 15000));
      for (let i = 0; i < newParticleCount; i++) {
        particles.push(new Particle());
      }
      updateColors();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
