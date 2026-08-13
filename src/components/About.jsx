import React from 'react';
import InteractiveConsole from './InteractiveConsole';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '7+', label: 'Tech Stacks' }
  ];

  const technologies = [
    { name: 'React.js', icon: 'devicon-react-original colored' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'Flask', icon: 'devicon-flask-original colored' },
    { name: 'Django', icon: 'devicon-django-plain colored' },
    { name: 'NestJS', icon: 'devicon-nestjs-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original' }
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>About Me</h2>
            <p className="subtitle">Full-Stack Developer | Automation Engineer | SaaS Creator</p>
          </div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal direction="left">
            <div className="about-text">
              <p>
                Hey there! I am a <strong>Full-stack Software Developer</strong> with 3+ years of experience delivering complete client-facing SaaS products from React/Tailwind front ends to Node.js/PostgreSQL backends.
              </p>
              
              <p>
                Currently at <strong>Wipro</strong>, I build backend services, REST APIs, and automation solutions in Python and Node.js. In addition to enterprise work, I independently design and deliver production-ready client platforms—most recently a multi-tenant HRMS SaaS featuring live tracking and billing integrations.
              </p>

              <ul className="achievements">
                <li>
                  <strong>SaaS & Multi-Tenant Architectures</strong> — Experienced in building role-based control panels, workflow automations, and third-party checkout flows.
                </li>
                <li>
                  <strong>Enterprise Automation</strong> — Streamlined operations workflows using Python scripts at Wipro, resulting in a ~30–40% manual overhead reduction.
                </li>
                <li>
                  <strong>Full-Stack APIs</strong> — Proficient in architecting scalable endpoints in Node (Express, NestJS) and Python (Flask, Django) matched with robust database layers in PostgreSQL, MySQL, and MongoDB.
                </li>
              </ul>

              <p>
                I focus on building solutions that are not just clean and containerized, but also highly performant and user-friendly. Let's collaborate to build something impactful!
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="about-stats">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card glass-panel">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Developer Terminal Widget */}
        <ScrollReveal direction="up" delay={200}>
          <div className="terminal-section">
            <h3>
              <i className="fas fa-terminal" style={{ color: 'var(--accent-cyan)' }}></i>
              Interactive Developer Console
            </h3>
            <InteractiveConsole />
          </div>
        </ScrollReveal>

        {/* Technology Badges */}
        <ScrollReveal direction="up" delay={300}>
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '20px' }}>
              Current Core Stack
            </h3>
            <div className="tech-stack-badges">
              {technologies.map((tech, idx) => (
                <div key={idx} className="tech-badge">
                  <i className={tech.icon}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
