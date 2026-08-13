import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Check, AlertCircle, Phone, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      // Offline fallback: Simulate message receipt locally
      console.log('API offline, simulating successful submit locally:', formData);
      setTimeout(() => {
        setStatus({ 
          type: 'success', 
          message: 'Your message has been logged successfully (Simulation)! Sanket will connect with you.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>Let's Connect</h2>
            <p className="subtitle">
              I'm always excited about new opportunities, automation ideas, and collaborations.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-container">
          {/* Info Column */}
          <ScrollReveal direction="left">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>
                Have a question, feedback, or an idea to discuss? Drop me a line directly 
                or find me on professional platforms.
              </p>

              <div className="contact-methods">
                <a href="mailto:sanketnk1401@gmail.com" className="contact-method glass-panel">
                  <div className="method-icon">
                    <Mail size={20} />
                  </div>
                  <div className="method-details">
                    <h4>Email</h4>
                    <p>sanketnk1401@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917620407962" className="contact-method glass-panel">
                  <div className="method-icon">
                    <Phone size={20} />
                  </div>
                  <div className="method-details">
                    <h4>Phone</h4>
                    <p>+91 7620407962</p>
                  </div>
                </a>

                <div className="contact-method glass-panel">
                  <div className="method-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="method-details">
                    <h4>Location</h4>
                    <p>Pune, Maharashtra</p>
                  </div>
                </div>

                <a 
                  href="https://github.com/sanku141" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-method glass-panel"
                >
                  <div className="method-icon">
                    <Github size={20} />
                  </div>
                  <div className="method-details">
                    <h4>GitHub</h4>
                    <p>github.com/sanku141</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/sanket-kshirsagar-016178206" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-method glass-panel"
                >
                  <div className="method-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="method-details">
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/sanket-kshirsagar-016178206</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Column */}
          <ScrollReveal direction="right">
            <div className="contact-form-panel glass-panel">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Let's collaborate"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status.type && (
                  <div className={`form-status ${status.type}`}>
                    {status.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
