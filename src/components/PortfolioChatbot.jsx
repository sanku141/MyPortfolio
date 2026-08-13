import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, RotateCcw, Copy, Check, Mail, MessageCircle } from 'lucide-react';

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState('greeting'); // greeting -> ask_name -> ask_contact_type -> [ask_email] / [ask_country -> ask_whatsapp] -> ask_purpose -> [ask_project_type -> ask_budget] / [ask_role] / [ask_interest] -> show_summary
  const [userData, setUserData] = useState({
    name: '',
    contactType: '',
    countryCode: '',
    contact: '',
    purpose: '',
    projectType: '',
    budget: '',
    role: '',
    interest: '',
    extraDetails: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [copied, setCopied] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Initialize bot greeting
  useEffect(() => {
    resetChat();
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Hi there! 👋 I'm Sanket's portfolio assistant."
      },
      {
        id: 2,
        sender: 'bot',
        text: "How can I help you today? Let's compile a quick brief so we can connect."
      }
    ]);
    setStep('greeting');
    setUserData({
      name: '',
      contactType: '',
      countryCode: '',
      contact: '',
      purpose: '',
      projectType: '',
      budget: '',
      role: '',
      interest: '',
      extraDetails: ''
    });
    setInputValue('');
    setOptions(['Start Briefing ✨']);
  };

  const handleOptionClick = (optionText) => {
    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: optionText }]);
    setOptions([]);

    setTimeout(() => {
      processStep(optionText);
    }, 600);
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();

    // 1. INPUT FORMAT VALIDATIONS
    if (step === 'ask_name') {
      const nameRegex = /^[a-zA-Z\s]{2,50}$/;
      if (!nameRegex.test(userText)) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'user', text: userText },
          { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Oops! Please enter a valid name (letters only, minimum 2 characters)." 
          }
        ]);
        return;
      }
    }

    if (step === 'ask_email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(userText)) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'user', text: userText },
          { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Please enter a valid email address (e.g. name@domain.com)." 
          }
        ]);
        return;
      }
    }

    if (step === 'ask_whatsapp') {
      const isDigitsOnly10 = /^\d{10}$/.test(userText);
      if (!isDigitsOnly10) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'user', text: userText },
          { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Please enter exactly 10 digits (digits only, e.g. 9876543210)." 
          }
        ]);
        return;
      }
    }

    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: userText }]);
    setInputValue('');

    setTimeout(() => {
      processStep(userText);
    }, 600);
  };

  const processStep = (userInput) => {
    let nextStep = step;
    let botResponse = '';
    let nextOptions = [];

    if (step === 'greeting') {
      nextStep = 'ask_name';
      botResponse = "Great — let’s get a few details. What’s your name?";
    } 
    
    else if (step === 'ask_name') {
      setUserData((prev) => ({ ...prev, name: userInput }));
      nextStep = 'ask_contact_type';
      botResponse = `Nice to meet you, ${userInput}! How would you prefer I contact you?`;
      nextOptions = ["Email 📧", "WhatsApp 💬"];
    }

    else if (step === 'ask_contact_type') {
      if (userInput.includes('Email')) {
        setUserData((prev) => ({ ...prev, contactType: 'Email' }));
        nextStep = 'ask_email';
        botResponse = "Great. Please enter your email address:";
      } else {
        setUserData((prev) => ({ ...prev, contactType: 'WhatsApp' }));
        nextStep = 'ask_country';
        botResponse = "Got it. What is your country code?";
        nextOptions = ["India (+91)", "US/Canada (+1)", "UK (+44)", "Other"];
      }
    }

    else if (step === 'ask_email') {
      setUserData((prev) => ({ ...prev, contact: userInput }));
      nextStep = 'ask_purpose';
      botResponse = "Got it. What brings you to my portfolio today?";
      nextOptions = [
        "Hire me for a project (Client)",
        "Job / Recruitment opportunity",
        "Just exploring / Networking"
      ];
    }

    else if (step === 'ask_country') {
      // Parse out the country code digits (e.g., "India (+91)" -> "+91")
      const matches = userInput.match(/\+\d+/);
      const code = matches ? matches[0] : userInput;
      setUserData((prev) => ({ ...prev, countryCode: code }));
      
      nextStep = 'ask_whatsapp';
      botResponse = `Understood (${code}). Please enter your exact 10-digit WhatsApp number (digits only):`;
    }

    else if (step === 'ask_whatsapp') {
      const fullContact = `${userData.countryCode} ${userInput}`.trim();
      setUserData((prev) => ({ ...prev, contact: fullContact }));
      
      nextStep = 'ask_purpose';
      botResponse = "Got it. What brings you to my portfolio today?";
      nextOptions = [
        "Hire me for a project (Client)",
        "Job / Recruitment opportunity",
        "Just exploring / Networking"
      ];
    }
    
    else if (step === 'ask_purpose') {
      setUserData((prev) => ({ ...prev, purpose: userInput }));
      
      if (userInput.includes('Client')) {
        nextStep = 'ask_project_type';
        botResponse = "Excellent! What kind of project is this?";
        nextOptions = ["SaaS Platform", "Full-Stack Website", "Automation Script", "Other"];
      } else if (userInput.includes('Recruitment')) {
        nextStep = 'ask_role';
        botResponse = "Great! What type of role are you hiring for?";
        nextOptions = ["Full-Stack Developer", "Backend / Automation Specialist", "React Frontend Developer", "Other"];
      } else {
        nextStep = 'ask_interest';
        botResponse = "Glad to have you here! What interests you the most about my work?";
        nextOptions = ["AI / Cortex Projects", "Web Development", "Network Automation", "Just browsing!"];
      }
    } 
    
    else if (step === 'ask_project_type') {
      setUserData((prev) => ({ ...prev, projectType: userInput }));
      nextStep = 'ask_budget';
      botResponse = "Thanks. What’s your rough budget?";
      nextOptions = ["Under ₹30k", "₹30k - ₹1L", "₹1L - ₹3L", "₹3L+"];
    } 
    
    else if (step === 'ask_budget') {
      const updatedData = { ...userData, budget: userInput };
      setUserData((prev) => ({ ...prev, budget: userInput }));
      showSummary(updatedData, false);
      return;
    } 
    
    else if (step === 'ask_role') {
      const updatedData = { ...userData, role: userInput };
      setUserData((prev) => ({ ...prev, role: userInput }));
      showSummary(updatedData, false);
      return;
    } 
    
    else if (step === 'ask_interest') {
      const updatedData = { ...userData, interest: userInput };
      setUserData((prev) => ({ ...prev, interest: userInput }));
      showSummary(updatedData, false);
      return;
    } 
    
    else if (step === 'show_summary') {
      // User entered additional details -> Append & refresh summary brief
      setUserData((prev) => {
        const updated = { ...prev, extraDetails: userInput };
        setTimeout(() => {
          showSummary(updated, true);
        }, 100);
        return updated;
      });
      return;
    }

    setStep(nextStep);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse
      }
    ]);
    
    if (nextOptions.length > 0) {
      setOptions(nextOptions);
    }
  };

  const showSummary = (finalData, isUpdate = false) => {
    setStep('show_summary');
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 2,
        sender: 'bot',
        text: isUpdate 
          ? "Got it! I have updated your brief with the additional details:" 
          : "Thanks! Here is your compiled briefing summary:"
      },
      {
        id: Date.now() + 3,
        sender: 'bot',
        summary: true,
        data: finalData
      },
      {
        id: Date.now() + 4,
        sender: 'bot',
        text: "You can type more details to append them, or click an option below to send the brief!"
      }
    ]);
  };

  const getBriefMessage = (data = userData) => {
    let brief = `Hi Sanket,\n\nI visited your portfolio and compiled this inquiry brief:\n\n`;
    brief += `📋 Connection Summary:\n`;
    brief += `• Name: ${data.name}\n`;
    brief += `• Contact Type: ${data.contactType}\n`;
    brief += `• Contact: ${data.contact}\n`;
    brief += `• Reason: ${data.purpose}\n`;
    
    if (data.purpose.includes('Client')) {
      brief += `• Project: ${data.projectType}\n`;
      brief += `• Budget: ${data.budget}\n`;
    } else if (data.purpose.includes('Recruit')) {
      brief += `• Role: ${data.role}\n`;
    } else if (data.interest) {
      brief += `• Interest: ${data.interest}\n`;
    }

    if (data.extraDetails) {
      brief += `\n💬 Additional Details:\n"${data.extraDetails}"\n`;
    }
    
    brief += `\nLet's connect soon!\n`;
    return brief;
  };

  const handleWhatsApp = (data = userData) => {
    const text = getBriefMessage(data);
    const cleanNumber = data.contact.replace(/[^\d]/g, '');
    // If it's a whatsapp contact, we can prefill the link to send to Sanket's WhatsApp
    const url = `https://wa.me/917620407962?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmail = (data = userData) => {
    const text = getBriefMessage(data);
    const subject = `Portfolio Inquiry - ${data.name} (${data.purpose.split(' ')[0]})`;
    
    // Redirect to Gmail Web Compose in a new browser tab
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=sanketnk1401@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopy = (data = userData) => {
    const text = getBriefMessage(data);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="chatbot-container">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button className="chatbot-trigger" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
          <div className="pulse-ring" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-window glass-panel">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <MessageSquare size={18} />
              </div>
              <div className="chatbot-header-text">
                <h4>Sanket Assistant</h4>
                <div className="chatbot-status">Online</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Message Area */}
          <div className="chatbot-messages">
            {messages.map((msg) => {
              if (msg.summary) {
                const { data } = msg;
                return (
                  <div key={msg.id} className="chatbot-summary-card">
                    <h5>📋 Brief Summary</h5>
                    <ul>
                      <li><strong>Name:</strong> {data.name}</li>
                      <li><strong>Contact Choice:</strong> {data.contactType}</li>
                      <li><strong>Details:</strong> {data.contact}</li>
                      <li><strong>Purpose:</strong> {data.purpose}</li>
                      {data.projectType && <li><strong>Project:</strong> {data.projectType}</li>}
                      {data.budget && <li><strong>Budget:</strong> {data.budget}</li>}
                      {data.role && <li><strong>Hiring Role:</strong> {data.role}</li>}
                      {data.interest && <li><strong>Interest:</strong> {data.interest}</li>}
                      {data.extraDetails && <li><strong>Additional:</strong> {data.extraDetails}</li>}
                    </ul>

                    {/* Summary Quick Action Buttons */}
                    <div className="chatbot-summary-actions">
                      <button className="chatbot-action-btn whatsapp" onClick={() => handleWhatsApp(data)}>
                        <MessageCircle size={14} /> WhatsApp
                      </button>
                      <button className="chatbot-action-btn email" onClick={() => handleEmail(data)}>
                        <Mail size={14} /> Email
                      </button>
                      <button className="chatbot-action-btn" onClick={() => handleCopy(data)}>
                        {copied ? <Check size={14} style={{ color: '#00ff9d' }} /> : <Copy size={14} />} 
                        {copied ? 'Copied' : 'Copy Brief'}
                      </button>
                      <button className="chatbot-action-btn" onClick={resetChat}>
                        <RotateCcw size={14} /> Restart
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              );
            })}
            
            {/* Dynamic Options Display */}
            {options.length > 0 && (
              <div className="chatbot-options">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    className="chatbot-option-btn"
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder={
                step === 'greeting'
                  ? 'Click option above...'
                  : step === 'show_summary'
                  ? 'Type extra details here...'
                  : options.length > 0
                  ? 'Select option bubble...'
                  : 'Type your message...'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendText(e);
              }}
              disabled={options.length > 0 && step !== 'show_summary'}
            />
            <button
              type="button"
              className="chatbot-send-btn"
              onClick={handleSendText}
              disabled={!inputValue.trim() || (options.length > 0 && step !== 'show_summary')}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioChatbot;
