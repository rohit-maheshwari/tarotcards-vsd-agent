import React, { useState, useEffect, useRef } from 'react';
import './RoundtableConversation.css';

type Stakeholder = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  personality: string;
};

type Message = {
  id: string;
  stakeholderId: string;
  content: string;
  timestamp: number;
  type: 'stakeholder' | 'user' | 'system';
};

type RoundtableConversationProps = {
  currentCard: {
    title: string;
    color: string;
    backimage: string;
  };
  userThoughts: string[];
  onAddThought: (thought: string) => void;
  onClose: () => void;
};

const defaultStakeholders: Stakeholder[] = [
  {
    id: 'end-user',
    name: 'Sarah',
    role: 'End User',
    avatar: '👩‍💼',
    color: '#667eea',
    personality: 'practical, concerned about usability'
  },
  {
    id: 'developer',
    name: 'Alex',
    role: 'Developer',
    avatar: '👨‍💻',
    color: '#f39c12',
    personality: 'technical, solution-oriented'
  },
  {
    id: 'regulator',
    name: 'Dr. Chen',
    role: 'Policy Expert',
    avatar: '👩‍⚖️',
    color: '#e74c3c',
    personality: 'cautious, focused on compliance'
  }
];

const RoundtableConversation: React.FC<RoundtableConversationProps> = ({
  currentCard,
  userThoughts,
  onAddThought,
  onClose
}) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(defaultStakeholders);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [showUserInput, setShowUserInput] = useState(false);

  useEffect(() => {
    // Initial animation sequence
    setTimeout(() => setIsAnimating(false), 1200);
    setTimeout(() => {
      setConversationStarted(true);
      startConversation();
    }, 1800);
  }, []);

  const startConversation = () => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      stakeholderId: 'system',
      content: `Let's discuss the implications of "${currentCard.title}" for your project.`,
      timestamp: Date.now(),
      type: 'system'
    };
    
    // Show system message briefly, then start with first stakeholder
    setCurrentMessage(initialMessage);
    setTimeout(() => {
      setCurrentMessage(null);
      speakForStakeholder(stakeholders[0], getInitialResponse(stakeholders[0]));
    }, 3000);
  };

  const getInitialResponse = (stakeholder: Stakeholder) => {
    const responses = {
      'end-user': `As an end user, I'm immediately thinking about how this might affect my daily experience. ${currentCard.title} makes me wonder - will this make technology more accessible or create new barriers?`,
      'developer': `From a technical perspective, ${currentCard.title} raises some interesting implementation challenges. We need to consider the trade-offs between functionality and ethical implications.`,
      'regulator': `This is concerning from a policy standpoint. ${currentCard.title} touches on areas that definitely need regulatory oversight. What safeguards are being built in?`
    };
    return responses[stakeholder.id as keyof typeof responses] || `I have some thoughts about ${currentCard.title}...`;
  };

  const speakForStakeholder = (stakeholder: Stakeholder, content: string) => {
    setActiveSpeaker(stakeholder.id);

    const message: Message = {
      id: Date.now().toString(),
      stakeholderId: stakeholder.id,
      content,
      timestamp: Date.now(),
      type: 'stakeholder'
    };

    // Show bubble immediately
    setCurrentMessage(message);
    setConversationHistory(prev => {
      const updated = [...prev, message];
      return updated;
    });

    // Clear after display duration
    const displayDuration = 4000;
    setTimeout(() => {
      setCurrentMessage(null);
      setActiveSpeaker(null);

      // Decide if it's the user's turn or continue with another stakeholder
      if (!isUserTurn && Math.random() > 0.5) {
        setIsUserTurn(true);
        setShowUserInput(true);
      } else {
        continueConversation();
      }
    }, displayDuration);
  };

  const continueConversation = () => {
    const availableStakeholders = stakeholders.filter(s => s.id !== activeSpeaker);
    const nextSpeaker = availableStakeholders[Math.floor(Math.random() * availableStakeholders.length)];
    const response = generateResponse(nextSpeaker);
    speakForStakeholder(nextSpeaker, response);
  };

  const generateResponse = (stakeholder: Stakeholder) => {
    const responses = [
      `That's a valid point. From my perspective as a ${stakeholder.role.toLowerCase()}, I think we also need to consider the impact on users who might be excluded from this technology.`,
      `I agree, but I'd like to add something from the ${stakeholder.role.toLowerCase()} viewpoint. We should think about the long-term consequences of implementing this.`,
      `Interesting perspective. In my experience as a ${stakeholder.role.toLowerCase()}, I've seen similar situations where good intentions led to unintended outcomes.`,
      `Building on that thought, as a ${stakeholder.role.toLowerCase()}, I'm curious about how we might measure the success or failure of this approach.`,
      `That raises an important question. From the ${stakeholder.role.toLowerCase()} perspective, we need to consider who benefits and who might be harmed by this decision.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleUserSubmit = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      stakeholderId: 'user',
      content: userInput,
      timestamp: Date.now(),
      type: 'user'
    };

    setCurrentMessage(userMessage);
    setConversationHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsUserTurn(false);
    setShowUserInput(false);

    // Add to thoughts if meaningful
    if (userInput.length > 20) {
      onAddThought(userInput);
    }

    // Clear user message and have stakeholder respond
    setTimeout(() => {
      setCurrentMessage(null);
      setTimeout(() => {
        const respondingStakeholder = stakeholders[Math.floor(Math.random() * stakeholders.length)];
        const response = `That's really insightful! Building on what you said, I think we should also consider how this might affect different communities differently.`;
        speakForStakeholder(respondingStakeholder, response);
      }, 1000);
    }, 3000);
  };

  const addStakeholder = () => {
    const newStakeholderOptions = [
      { id: 'community', name: 'Maya', role: 'Community Leader', avatar: '👩‍🤝‍👩', color: '#9b59b6' },
      { id: 'investor', name: 'Robert', role: 'Investor', avatar: '💼', color: '#2ecc71' },
      { id: 'ethicist', name: 'Dr. Kim', role: 'Ethics Expert', avatar: '🧠', color: '#34495e' }
    ];

    const newStakeholder = newStakeholderOptions.find(s => !stakeholders.some(existing => existing.id === s.id));
    if (newStakeholder) {
      setStakeholders(prev => [...prev, { ...newStakeholder, personality: 'thoughtful and analytical' }]);
    }
  };

  const getStakeholderPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 140; // Position around the table edge
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const getSpeechBubblePosition = (stakeholderId: string) => {
    const idx = stakeholders.findIndex(s => s.id === stakeholderId);
    if (idx === -1) return { x: 0, y: 0, placement: 'top', maxWidth: '200px' };

    // 1. Estimate bubble width & height based on text length
    const text = currentMessage?.content || '';
    const charCount = text.length;
    let width = 200;
    if (charCount > 150) width = 280;
    else if (charCount > 100) width = 260;
    else if (charCount > 60) width = 230;
    width = Math.max(160, Math.min(280, width));

    // Rough char per line & height
    const charsPerLine = Math.floor(width / 8); // approx 8px per char
    const lineCount = Math.ceil(charCount / Math.max(1, charsPerLine));
    const height = lineCount * 18 + 28; // 18px line height + padding

    // 2. Geometry constants
    const avatarRadius = 140; // where avatars sit
    const startDist = avatarRadius + 40; // start 40px beyond avatar
    const maxDist = 280; // container half-size minus margin
    const step = 20;

    // Speaker angle & unit vector
    const angle = (idx / stakeholders.length) * 2 * Math.PI - Math.PI / 2;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);

    // Avatar position for tail direction calc
    const avatarPos = { x: ux * avatarRadius, y: uy * avatarRadius };

    let chosen = { x: 0, y: 0 };
    let found = false;
    // iterate outward until fits
    for (let d = startDist; d <= maxDist; d += step) {
      const cx = ux * d;
      const cy = uy * d;
      const left = cx - width / 2;
      const right = cx + width / 2;
      const top = cy - height / 2;
      const bottom = cy + height / 2;

      // inside container
      if (left < -maxDist || right > maxDist || top < -maxDist || bottom > maxDist) {
        continue;
      }

      // keep away from avatar (circle radius 32)
      const distToAvatarSq = (cx - avatarPos.x) ** 2 + (cy - avatarPos.y) ** 2;
      const safe = Math.sqrt(distToAvatarSq) > 60; // 60px safety
      if (!safe) continue;

      chosen = { x: cx, y: cy };
      found = true;
      break;
    }
    if (!found) {
      chosen = { x: ux * maxDist, y: uy * maxDist };
    }

    // 3. Determine tail placement
    const dx = avatarPos.x - chosen.x;
    const dy = avatarPos.y - chosen.y;
    let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    if (Math.abs(dx) > Math.abs(dy)) {
      placement = dx > 0 ? 'left' : 'right';
    } else {
      placement = dy > 0 ? 'top' : 'bottom';
    }

    return { x: chosen.x, y: chosen.y, placement, maxWidth: `${width}px` };
  };

  const getUserPosition = () => {
    // Position user input at bottom of table
    return { x: 0, y: 180 };
  };

  return (
    <div className="roundtable-conversation">
      {/* Table View */}
      <div className={`table-container ${isAnimating ? 'animating' : ''}`}>
        <div className="table-surface">
          {/* Central Card */}
          {stakeholders.length < 6 && (
            <div 
              className="add-stakeholder-seat"
              onClick={addStakeholder}
            >
              <div className="add-button">+</div>
            </div>
          )}
          
          {/* Stakeholder Seats */}
          {stakeholders.map((stakeholder, index) => {
            const position = getStakeholderPosition(index, stakeholders.length);
            const isActive = activeSpeaker === stakeholder.id;
            
            return (
              <div
                key={stakeholder.id}
                className={`stakeholder-seat ${isActive ? 'active' : ''}`}
                style={{
                  '--pos-x': `${position.x}px`,
                  '--pos-y': `${position.y}px`,
                  animationDelay: `${index * 200}ms`
                } as React.CSSProperties}
              >
                <div className="stakeholder-avatar" style={{ backgroundColor: stakeholder.color }}>
                  {stakeholder.avatar}
                </div>
                <div className="stakeholder-nameplate">
                  <div className="name">{stakeholder.name}</div>
                  <div className="role">{stakeholder.role}</div>
                </div>
                
                {/* typing indicator removed */}
              </div>
            );
          })}
          
          
          {currentMessage && (
            <div 
              className={`speech-bubble ${currentMessage.type}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: (() => {
                  if (currentMessage.type === 'user') {
                    const pos = getUserPosition();
                    return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`;
                  } else if (currentMessage.type === 'system') {
                    return 'translate(-50%, calc(-50% - 80px))';
                  } else {
                    const pos = getSpeechBubblePosition(currentMessage.stakeholderId);
                    return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`;
                  }
                })(),
                zIndex: 100,
              }}
              data-placement={currentMessage.type === 'stakeholder' ? getSpeechBubblePosition(currentMessage.stakeholderId).placement : 'top'}
            >
              <div className="bubble-content" style={{
                backgroundColor: currentMessage.type === 'user' 
                  ? currentCard.color 
                  : currentMessage.type === 'system'
                  ? 'rgba(102, 126, 234, 0.9)'
                  : stakeholders.find(s => s.id === currentMessage.stakeholderId)?.color || '#fff',
                color: currentMessage.type === 'system' || currentMessage.type === 'user' ? '#fff' : '#333',
                maxWidth: currentMessage.type === 'stakeholder' ? getSpeechBubblePosition(currentMessage.stakeholderId).maxWidth : '240px'
              }}>
                {currentMessage.type === 'stakeholder' && (
                  <div className="speaker-name">
                    {stakeholders.find(s => s.id === currentMessage.stakeholderId)?.name}
                  </div>
                )}
                <div className="message-text">{currentMessage.content}</div>
              </div>
              
              {/* Speech bubble tail */}
              {(() => {
                const placement = currentMessage.type === 'stakeholder' ? getSpeechBubblePosition(currentMessage.stakeholderId).placement : 'top';
                const color = currentMessage.type === 'user'
                  ? currentCard.color
                  : currentMessage.type === 'system'
                  ? 'rgba(102, 126, 234, 0.9)'
                  : stakeholders.find(s => s.id === currentMessage.stakeholderId)?.color || '#fff';
                const style: React.CSSProperties = {};
                if (placement === 'top') style.borderTopColor = color;
                else if (placement === 'bottom') style.borderBottomColor = color;
                else if (placement === 'left') style.borderRightColor = color;
                else if (placement === 'right') style.borderLeftColor = color;
                return <div className="bubble-tail" style={style}></div>;
              })()}
            </div>
          )}

          {/* User Input Area */}
          {showUserInput && (
            <div 
              className="user-input-bubble"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: (() => {
                  const pos = getUserPosition();
                  return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`;
                })(),
                zIndex: 100,
              }}
            >
              <div className="input-prompt">💭 Your turn to contribute</div>
              <div className="input-container">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserSubmit()}
                  placeholder="Share your thoughts..."
                  className="user-input"
                  autoFocus
                />
                <button 
                  onClick={handleUserSubmit}
                  className="send-button"
                  style={{ backgroundColor: currentCard.color }}
                >
                  💬
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="conversation-controls">
        <button onClick={onClose} className="close-conversation">
          End Conversation
        </button>
        <div className="conversation-status">
          {conversationHistory.length} messages exchanged
        </div>
      </div>
    </div>
  );
};

export default RoundtableConversation; 