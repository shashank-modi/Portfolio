import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

export default function CinematicContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const emailAddress = 'shashank.modi@outlook.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('sending');
    
    // Simulate transmission delay, then transition to success
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="contact-container">
      
      {/* Cinematic Spotlights */}
      <div className="spotlight radial-spotlight-indigo" style={{ top: '35%', right: '25%', width: '35vw', height: '35vw' }} />
      <div className="spotlight radial-spotlight-silver" style={{ bottom: '15%', left: '25%', width: '30vw', height: '30vw' }} />

      <div className="contact-content">
        
        {/* Title */}
        <ScrollReveal direction="up" delay={0}>
          <div className="panel-subtitle panel-subtitle-large">
            // CONNECTION PROTOCOL // 04
          </div>
          <h2 className="section-title">
            ESTABLISH CONNECTION
          </h2>
        </ScrollReveal>

        {/* Contact Split Columns */}
        <div className="contact-columns">
          
          {/* Left panel: Info & links */}
          <ScrollReveal direction="up" delay={150} className="contact-panel contact-panel-left">
            <div className="panel-details">
              <div className="panel-subtitle">
                Direct Channels // Interface Link
              </div>

              <div className="panel-details">
                <h3 className="panel-title">
                  COGNITIVE DIRECTIVES
                </h3>
                <p className="panel-text">
                  Always open to discussions surrounding scalable product frameworks, machine learning systems engineering, or structural interface design. Copy the direct link or dispatch a transmission.
                </p>
              </div>

              {/* Direct Mail Copy Box */}
              <div className="mail-box">
                <span className="panel-subtitle">
                  Direct Mail Address:
                </span>
                <div className="mail-row">
                  <span className="mail-address">
                    {emailAddress}
                  </span>
                  
                  <button 
                    onClick={copyEmail}
                    className="copy-btn"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="social-links">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Github
              </a>
              <span>//</span>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span>//</span>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </ScrollReveal>

          {/* Right panel: Form / Transmission state */}
          <ScrollReveal direction="up" delay={300} className="contact-panel contact-panel-right">
            
            {formState === 'idle' && (
              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* Name */}
                <div className="form-group">
                  <label className="panel-subtitle">
                    Sender Identification:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="panel-subtitle">
                    Return Routing Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="panel-subtitle">
                    Message Parameters:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Input message payload..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                >
                  DISPATCH TRANSMISSION
                </button>

              </form>
            )}

            {formState === 'sending' && (
              <div className="sending-wrapper">
                <div className="sending-line-loader">
                  <div className="sending-line-loader-inner animate-pulse" />
                </div>
                <span className="panel-subtitle">
                  TRANSMITTING...
                </span>
              </div>
            )}

            {formState === 'success' && (
              <div className="success-wrapper">
                <div className="success-dot" />
                
                <div className="panel-details">
                  <h3 className="panel-title panel-title-large">
                    MESSAGE RECEIVED.
                  </h3>
                  <p className="panel-text">
                    The transmission has been recorded. We will establish a connection channel soon.
                  </p>
                </div>

                <button
                  onClick={() => setFormState('idle')}
                  className="copy-btn"
                  style={{ width: 'fit-content', marginTop: '1rem' }}
                >
                  NEW TRANSMISSION
                </button>
              </div>
            )}

          </ScrollReveal>

        </div>

      </div>

    </div>
  );
}
