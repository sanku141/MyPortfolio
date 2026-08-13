import React, { useState, useRef, useEffect } from 'react';
import { Terminal, FileCode, Cpu, User, GraduationCap } from 'lucide-react';

const InteractiveConsole = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'output',
      text: (
        <div>
          <span style={{ color: '#00ff9d' }}>Welcome to Sanket's Interactive Developer Console!</span><br />
          Type <span style={{ color: '#00d2ff' }}>help</span> to see all available commands, or click the file tabs above to execute shortcuts.
        </div>
      )
    }
  ]);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom of the console output when history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Refocus input field on clicking anywhere inside the terminal body
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const interpretCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    
    if (cleanCmd === 'help') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>Available Commands:</span><br />
          - <span style={{ color: '#00d2ff' }}>cat skills --all</span> : Show all skills in JSON format<br />
          - <span style={{ color: '#00d2ff' }}>cat skills --frontend</span> : Show frontend skills<br />
          - <span style={{ color: '#00d2ff' }}>cat skills --backend</span> : Show backend skills<br />
          - <span style={{ color: '#00d2ff' }}>cat skills --database</span> : Show database stacks<br />
          - <span style={{ color: '#00d2ff' }}>cat skills --architecture_tools</span> : Show DevOps & tools<br />
          - <span style={{ color: '#00d2ff' }}>cat skills --languages</span> : Show programming languages<br />
          - <span style={{ color: '#00d2ff' }}>python experience --all</span> : Show all experience details<br />
          - <span style={{ color: '#00d2ff' }}>python experience --wipro</span> : Show Wipro Limited achievements<br />
          - <span style={{ color: '#00d2ff' }}>python experience --intern</span> : Show internship highlights<br />
          - <span style={{ color: '#00d2ff' }}>./projects_status.sh</span> : Monitor project statistics<br />
          - <span style={{ color: '#00d2ff' }}>cat bio.txt</span> : Show professional summary<br />
          - <span style={{ color: '#00d2ff' }}>./education.sh</span> : Show academic credentials<br />
          - <span style={{ color: '#00d2ff' }}>clear</span> : Clear console screen
        </div>
      );
    }

    if (cleanCmd === 'cat skills --all' || cleanCmd === 'cat skills.json' || cleanCmd === 'cat skills') {
      return (
        <div>
          <span className="terminal-output-code">&#123;</span>
          <div style={{ paddingLeft: '20px' }}>
            <span className="terminal-output-json-key">"frontend"</span>: [<span className="terminal-output-json-val">"React.js", "Next.js", "Tailwind CSS", "JavaScript"</span>],<br />
            <span className="terminal-output-json-key">"backend"</span>: [<span className="terminal-output-json-val">"Node.js", "Python", "Flask", "Django", "NestJS", "REST API", "RBAC"</span>],<br />
            <span className="terminal-output-json-key">"databases"</span>: [<span className="terminal-output-json-val">"PostgreSQL", "MySQL", "MongoDB"</span>],<br />
            <span className="terminal-output-json-key">"architecture_tools"</span>: [<span className="terminal-output-json-val">"SaaS", "Docker", "Git/GitHub", "Linux CLI", "Postman"</span>],<br />
            <span className="terminal-output-json-key">"languages"</span>: [<span className="terminal-output-json-val">"JavaScript", "Node.js", "Python", "PHP", "C", "C++"</span>]<br />
          </div>
          <span className="terminal-output-code">&#125;</span>
        </div>
      );
    }

    if (cleanCmd === 'cat skills --frontend') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>[Frontend Stack]</span><br />
          - React.js / Next.js SPA/SSR Frameworks<br />
          - Tailwind CSS Utility Styling<br />
          - JavaScript (ES6+) responsive layouts
        </div>
      );
    }

    if (cleanCmd === 'cat skills --backend') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>[Backend Stack]</span><br />
          - Node.js (Express, NestJS) API layers<br />
          - Python (Flask, Django) microservices<br />
          - REST API Design & RBAC permission architectures
        </div>
      );
    }

    if (cleanCmd === 'cat skills --database' || cleanCmd === 'cat skills --databases') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>[Databases]</span><br />
          - PostgreSQL (Schema optimization, relational indexing)<br />
          - MySQL (Transactional query optimization)<br />
          - MongoDB (Document-oriented NoSQL storage)
        </div>
      );
    }

    if (cleanCmd === 'cat skills --architecture_tools') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>[Architecture & Tools]</span><br />
          - Multi-tenant SaaS architectures with automated billing pipelines<br />
          - Docker containerization & deploy setups<br />
          - Git/GitHub version control workflows<br />
          - Linux shell scripting & API diagnostics in Postman
        </div>
      );
    }

    if (cleanCmd === 'cat skills --languages') {
      return (
        <div>
          <span style={{ color: '#00ff9d' }}>[Programming Languages]</span><br />
          - JavaScript & Node.js (Full-stack API development)<br />
          - Python (Automation pipelines & scripts)<br />
          - PHP, C, C++ (Algorithms & legacy modules)
        </div>
      );
    }

    if (cleanCmd === 'python experience --all' || cleanCmd === 'python experience.py' || cleanCmd === 'python experience') {
      return (
        <div>
          <span className="terminal-output-code">class</span> <span style={{ color: '#c084fc' }}>DeveloperProfile</span>:<br />
          &nbsp;&nbsp;<span className="terminal-output-code">def</span> <span style={{ color: '#00d2ff' }}>__init__</span>(self):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;self.role = <span className="terminal-output-json-val">"Full-Stack Dev / Automation Engineer at Wipro"</span> (03/2023 - Present)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;self.intern = <span className="terminal-output-json-val">"Backend Intern at LBM Infotech"</span> (01/2023 - 03/2023)<br />
          <br />
          &nbsp;&nbsp;<span className="terminal-output-code">def</span> <span style={{ color: '#00d2ff' }}>get_wipro_highlights</span>(self):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;return [<span className="terminal-output-json-val">"Backend Node/Flask REST APIs"</span>, <span className="terminal-output-json-val">"Python scripts reducing operations workload ~30-40%"</span>]<br />
          <br />
          &nbsp;&nbsp;<span className="terminal-output-code">def</span> <span style={{ color: '#00d2ff' }}>get_internship_highlights</span>(self):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;return &#123;<span className="terminal-output-json-key">"stack"</span>: <span className="terminal-output-json-val">"PHP, MySQL query optimization"</span>&#125;
        </div>
      );
    }

    if (cleanCmd === 'python experience --wipro') {
      return (
        <div>
          <span style={{ color: '#c084fc' }}>Wipro Limited (03/2023 - Present)</span><br />
          - Developed backend API automation in Python and Node.js.<br />
          - Streamlined database storage procedures with optimized queries in PostgreSQL.<br />
          - Achieved ~30-40% reduction in manual operations overhead.
        </div>
      );
    }

    if (cleanCmd === 'python experience --intern') {
      return (
        <div>
          <span style={{ color: '#c084fc' }}>LBM Infotech (01/2023 - 03/2023)</span><br />
          - Backend Intern building relational modules in PHP.<br />
          - Wrote custom MySQL queries and mapped dashboard features.
        </div>
      );
    }

    if (cleanCmd === './projects_status.sh' || cleanCmd === 'projects_status.sh') {
      return (
        <div>
          <span style={{ color: '#c084fc' }}>[system] Initializing project diagnostics...</span><br />
          <span style={{ color: '#00ff9d' }}>✔ HRMS SaaS (Sahu Constructions - Production phase)</span><br />
          <span style={{ color: '#00ff9d' }}>✔ Media Portfolio (Shubhangi Kedar CMS - Live)</span><br />
          <span style={{ color: '#00ff9d' }}>✔ CortexAI (Voice PC Assistant - Active)</span><br />
          <span style={{ color: '#00ff9d' }}>✔ VidSnap AI Reels Creator (Flask - Live)</span><br />
          - Type <span style={{ color: '#00d2ff' }}>cat skills --all</span> or look at the Projects section on screen!
        </div>
      );
    }

    if (cleanCmd === 'cat bio.txt' || cleanCmd === 'cat bio') {
      return (
        <div>
          <span style={{ color: '#00d2ff' }}>Name:</span> Kshirsagar Sanket Namdev<br />
          <span style={{ color: '#00d2ff' }}>Role:</span> Full-Stack Developer with 3+ years experience<br />
          <span style={{ color: '#00d2ff' }}>Summary:</span> Delivering end-to-end SaaS products, automation tools, and containerized API microservices.
        </div>
      );
    }

    if (cleanCmd === './education.sh' || cleanCmd === 'education.sh') {
      return (
        <div>
          <span style={{ color: '#00d2ff' }}>Degree:</span> B.Sc. Computer Science (Graduated 2022)<br />
          <span style={{ color: '#00d2ff' }}>College:</span> KTHM College, Nashik (Savitribai Phule Pune University)<br />
          <span style={{ color: '#00d2ff' }}>Performance:</span> CGPA 7.10 / 10
        </div>
      );
    }

    if (cleanCmd === 'clear') {
      return 'clear';
    }

    // Default response for unhandled commands
    return (
      <div>
        <span style={{ color: '#ef4444' }}>command not found: {cmdText}</span><br />
        Type <span style={{ color: '#00ff9d' }}>help</span> to see all available commands.
      </div>
    );
  };

  const handleRunCommand = (commandText) => {
    if (!commandText.trim()) return;

    const result = interpretCommand(commandText);

    if (result === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'cmd', text: commandText },
        { type: 'output', text: result }
      ]);
    }

    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRunCommand(inputVal);
    }
  };

  const handleTabClick = (commandText) => {
    handleRunCommand(commandText);
    focusInput();
  };

  const fileTabs = [
    { name: 'skills.json', command: 'cat skills.json', icon: <FileCode size={14} /> },
    { name: 'experience.py', command: 'python experience.py', icon: <Cpu size={14} /> },
    { name: 'projects_status.sh', command: './projects_status.sh', icon: <Terminal size={14} /> },
    { name: 'bio.txt', command: 'cat bio.txt', icon: <User size={14} /> },
    { name: 'education.sh', command: './education.sh', icon: <GraduationCap size={14} /> }
  ];

  return (
    <div className="terminal" onClick={focusInput}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-btn red" />
          <div className="terminal-btn yellow" />
          <div className="terminal-btn green" />
        </div>
        <div className="terminal-title">bash - sanket@portfolio:~</div>
        <div style={{ width: '42px' }} />
      </div>

      <div className="terminal-tabs">
        {fileTabs.map((tab, idx) => (
          <button
            key={idx}
            className="terminal-tab"
            onClick={(e) => {
              e.stopPropagation(); // Prevent trigger input focus
              handleTabClick(tab.command);
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="terminal-body" ref={terminalBodyRef}>
        {history.map((line, idx) => (
          <div key={idx} className={line.type === 'cmd' ? 'terminal-prompt' : 'terminal-output'}>
            {line.type === 'cmd' && <span>sanket@portfolio:~$ </span>}
            <span className={line.type === 'cmd' ? 'terminal-cmd' : ''}>{line.text}</span>
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="terminal-prompt active-input-line">
          <span>sanket@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input-element"
            placeholder="Type help..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveConsole;
