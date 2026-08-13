import React, { useState } from 'react';
import { Github, Eye, EyeOff, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [previewOpen, setPreviewOpen] = useState({});

  const projectsData = [
    {
      id: 'hrms-saas',
      title: 'HRMS SaaS Platform',
      client: 'Sahu Constructions',
      duration: '07/2025 – 11/2025',
      categories: ['web', 'automation'],
      tags: ['React.js', 'Node.js', 'PostgreSQL', 'Docker', 'Razorpay'],
      description: 'Delivered a full-stack multi-tenant HRMS SaaS end-to-end, managing workflows for Employee, Manager, HR, and Admin roles.',
      features: [
        'Live location & selfie-based attendance logging',
        'Payroll, leave, reimbursement, timesheets with workflows',
        'Integrated Razorpay for automated subscription billing',
        'Containerized with Docker for automated deployment'
      ],
      github: '#', // Not public/disclosed client repo
      demo: ''
    },
    {
      id: 'artist-portfolio',
      title: 'Artist Portfolio Platform',
      client: 'Shubhangi Kedar',
      duration: '11/2025 – 03/2026',
      categories: ['web'],
      tags: ['React.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      description: 'Built a full-stack media portfolio website end-to-end, including a custom admin panel for dynamic content management.',
      features: [
        'Responsive, mobile-friendly UI layout in Tailwind',
        'Custom admin panel for adding/editing/deleting media',
        'Optimized PostgreSQL query layer for media listing'
      ],
      github: '#',
      demo: ''
    },
    {
      id: 'cortex-ai-voice',
      title: 'CortexAI Voice Assistant',
      duration: '01/2025 – 06/2025',
      categories: ['ai'],
      tags: ['Python', 'Speech Recognition', 'AI/ML'],
      description: 'Built a browser-based Python assistant combining chat and voice interaction for hands-free engagement.',
      features: [
        'Voice-command handling to trigger scripts',
        'Custom speech synthesis response parameters',
        'Desktop automations driven by voice cues'
      ],
      github: 'https://github.com/sanku141',
      demo: ''
    },
    {
      id: 'allowance-report',
      title: 'Daily Report & Allowance System',
      duration: '10/2024 – 12/2024',
      categories: ['web', 'automation'],
      tags: ['Node.js', 'Automation', 'PDF Generation'],
      description: 'A powerful web application and reporting tool for streamlining daily and monthly expense reporting. Users input travel coordinates and mileage to calculate totals and generate PDF reports.',
      features: [
        'Real-time calculations for travel allowance',
        'PDF report builder with automated formatting',
        'Responsive workspace layouts'
      ],
      github: 'https://github.com/sanku141/Daily_Report2.git',
      demo: 'https://daily-report2.onrender.com/'
    },
    {
      id: 'vidsnap',
      title: 'CortexAI VidSnap',
      categories: ['ai', 'automation'],
      tags: ['Flask', 'AI/ML', 'Content Creation'],
      description: 'Intelligent content creation tool that transforms images and text into stunning Instagram Reels. Features AI-powered Text-to-Speech voiceovers and professional automated video stitching.',
      features: [
        'AI Text-to-Speech narration',
        'Automated image to video compiling',
        'Multi-image backdrop configuration'
      ],
      github: 'https://github.com/sanku141/CortexAi-VidSnap.git',
      demo: 'https://cortexai-vidsnap.onrender.com/#gsc.tab=0'
    },
    {
      id: 'assistant',
      title: 'CortexAI Assistant',
      categories: ['ai', 'web'],
      tags: ['ChatGPT API', 'Flask', 'Real-time API'],
      description: 'Advanced AI web assistant combining OpenAI\'s GPT with real-time data integration. Provides intelligent chat responses, weather info, news feeds, and system automation capabilities.',
      features: [
        'ChatGPT API integration with memory buffers',
        'Live weather & headlines API bindings',
        'Automated shell command interface'
      ],
      github: 'https://github.com/sanku141/CortexAi-Assistant.git',
      demo: 'https://cortexai-assistant.onrender.com'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Web Dev' },
    { id: 'automation', label: 'Automation' }
  ];

  const handleFilterChange = (catId) => {
    setFilter(catId);
  };

  const togglePreview = (id) => {
    setPreviewOpen((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProjects = projectsData.filter((project) => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p className="subtitle">
              Innovative solutions showcasing SaaS products, automated pipelines, AI integrations, and full-stack architectures.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal direction="up" delay={150}>
          <div className="project-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal 
              key={project.id} 
              direction="up" 
              delay={(idx % 3) * 150} // Staggered entry delay based on columns
              duration={700}
            >
              <div className="project-card glass-panel">
                <div className="project-header">
                  <div>
                    <h3>{project.title}</h3>
                    {project.client && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', display: 'block', marginTop: '4px' }}>
                        Client: {project.client} ({project.duration})
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Description */}
                <p className="project-description">{project.description}</p>

                {/* Features list */}
                <div className="project-features">
                  {project.features.map((feature, idx) => (
                    <span key={idx}>
                      <CheckCircle size={14} /> {feature}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="project-links">
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="link-btn"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <button
                      className="link-btn"
                      onClick={() => togglePreview(project.id)}
                    >
                      {previewOpen[project.id] ? (
                        <>
                          <EyeOff size={16} /> Hide Demo
                        </>
                      ) : (
                        <>
                          <Eye size={16} /> Live Demo
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Iframe Preview Box */}
                {project.demo && previewOpen[project.id] && (
                  <div className="project-preview">
                    <iframe
                      src={project.demo}
                      title={`${project.title} Live Preview`}
                      frameBorder="0"
                      width="100%"
                      height="400px"
                      style={{ background: '#fff', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
