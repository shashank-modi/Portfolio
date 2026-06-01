import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [handshakeLogs, setHandshakeLogs] = useState([]);

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

  const executeHandshake = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('sending');
    setHandshakeLogs([]);

    const logSequence = [
      'sys_contact: initializing handshake protocol...',
      'sys_contact: validating email address schema... OK',
      'sys_contact: packaging message payload...',
      'sys_contact: establishing socket tunnel to mail server...',
      'sys_contact: transmitting encrypted data stream...',
      'sys_contact: verification parity check... PASSED',
      'sys_status: HTTP_202 ACCEPTED // MESSAGE_TRANSMITTED_OK'
    ];

    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setHandshakeLogs(prev => [...prev, log]);
        if (index === logSequence.length - 1) {
          setFormState('success');
          setFormData({ name: '', email: '', message: '' });
        }
      }, (index + 1) * 400); // Stagger line outputs
    });
  };

  return (
    <div className="contact-container">
      
      <div className="contact-content">
        
        {/* Title */}
        <ScrollReveal direction="up" delay={0}>
          <div className="panel-subtitle panel-subtitle-large">
            // CONNECTION PROTOCOL // 06
          </div>
          <h2 className="section-title">
            ESTABLISH CONNECTION
          </h2>
        </ScrollReveal>

        {/* Contact Split Grid */}
        <div className="contact-columns">
          
          {/* Left Panel: Protocol Terminal Info */}
          <ScrollReveal direction="up" delay={150} className="contact-panel contact-panel-left">
            <div className="panel-details panel-details-large">
              <div className="panel-subtitle">
                system_nodes // active_listeners
              </div>

              <div>
                <h3 className="panel-title panel-title-large">
                  COGNITIVE DIRECTIVES
                </h3>
                <p className="panel-text" style={{ marginTop: '0.75rem' }}>
                  Always open to brainstorming new product concepts, scalable backend architectures, agentic pipelines, or operational opportunities. Send a message to initiate the handshake protocol.
                </p>
              </div>

              {/* Direct Mail Copy Box */}
              <div className="mail-box">
                <span className="panel-subtitle">
                  Direct Channel:
                </span>
                <div className="mail-row">
                  <span className="mail-address mail-address-cyan">
                    {emailAddress}
                  </span>
                  
                  <button 
                    onClick={copyEmail}
                    className="copy-btn copy-btn-cyan"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Socials / External links */}
            <div className="social-links social-links-underlined">
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

          {/* Right Panel: Active Handshake Form */}
          <ScrollReveal direction="up" delay={300} className="contact-panel contact-panel-right">
            
            {formState === 'idle' && (
              <form onSubmit={executeHandshake} className="contact-form">
                
                {/* Name */}
                <div className="form-group">
                  <label className="form-label form-label-large">
                    Sender Designation:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="form-input form-input-cyan"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label form-label-large">
                    Return Routing Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="form-input form-input-cyan"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label form-label-large">
                    Message Payload:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Input message parameters..."
                    className="form-textarea form-textarea-cyan"
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn form-submit-btn-cyan"
                >
                  Initiate Handshake Protocol
                </button>

              </form>
            )}

            {/* Handshake Telemetry Logs View */}
            {(formState === 'sending' || formState === 'success') && (
              <div className="telemetry-container">
                
                <div className="panel-details">
                  <div className="telemetry-header">
                    <span className="telemetry-header-title">// SECURE_HANDSHAKE_TRANSMISSION</span>
                    <span className="telemetry-header-status">{formState === 'sending' ? 'TRANSMITTING...' : 'FINISHED'}</span>
                  </div>

                  <div className="telemetry-logs">
                    {handshakeLogs.map((log, index) => (
                      <div key={index} className="telemetry-line">
                        <span className="telemetry-bullet">&gt;</span>
                        <span className="telemetry-text">{log}</span>
                      </div>
                    ))}
                    {formState === 'sending' && (
                      <div className="telemetry-line">
                        <span className="telemetry-bullet telemetry-bullet-active">&gt;</span>
                        <span className="inline-block w-1.5 h-3 bg-[#00f0ff] caret-blink ml-1 align-middle" />
                      </div>
                    )}
                  </div>
                </div>

                {formState === 'success' && (
                  <button
                    onClick={() => setFormState('idle')}
                    className="telemetry-reset-btn"
                  >
                    Open New Protocol Session
                  </button>
                )}

              </div>
            )}

          </ScrollReveal>

        </div>

      </div>

    </div>
  );
}
