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
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [prevThoughtCount, setPrevThoughtCount] = useState(userThoughts.length);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    // Initial animation sequence
    setTimeout(() => setIsAnimating(false), 1200);
    setTimeout(() => {
      setConversationStarted(true);
      startConversation();
    }, 1800);
  }, []);

  useEffect(() => {
    if (userThoughts.length > prevThoughtCount) {
      const latest = userThoughts[userThoughts.length - 1];
      showUserThought(latest);
      setPrevThoughtCount(userThoughts.length);
    }
  }, [userThoughts, prevThoughtCount]);

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

    // Automatically pause after each message to require manual continuation
    setTimeout(() => {
      setActiveSpeaker(null);
      setIsPaused(true); // Always pause after each message
    }, 3000); // Show message for 3 seconds then pause
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
    const containerRef = document.querySelector('.table-container');
    const containerRect = containerRef?.getBoundingClientRect();
    const containerSize = Math.min(containerRect?.width || 600, containerRect?.height || 600);
    
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = containerSize * 0.23; // 23% of container size for responsive positioning
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const getSpeechBubblePosition = (stakeholderId: string) => {
    const containerRef = document.querySelector('.table-container');
    const containerRect = containerRef?.getBoundingClientRect();
    const containerWidth = containerRect?.width || 600;
    const containerHeight = containerRect?.height || 600;
    
    // Calculate responsive dimensions
    const avatarRadius = Math.min(containerWidth, containerHeight) * 0.23; // ~23% of container size
    const avatarSize = Math.min(containerWidth, containerHeight) * 0.08; // ~8% for avatar size
    const minGap = Math.min(containerWidth, containerHeight) * 0.03; // ~3% minimum gap
    
    const speakerIdx = stakeholders.findIndex(s => s.id === stakeholderId);
    if (speakerIdx === -1) return { x: 0, y: 0, placement: 'top', maxWidth: '200px', tailOffset: 0 };

    // Estimate bubble dimensions based on content
    const text = currentMessage?.content || '';
    const charCount = text.length;
    const baseWidth = Math.min(containerWidth * 0.4, 280); // Max 40% of container or 280px
    let width = Math.max(baseWidth * 0.6, Math.min(baseWidth, charCount * 6 + 40));
    
    const charsPerLine = Math.floor(width / 8);
    const lineCount = Math.ceil(charCount / Math.max(1, charsPerLine));
    const height = lineCount * 18 + 40; // 18px line height + padding

    // Get speaker position
    const speakerAngle = (speakerIdx / stakeholders.length) * 2 * Math.PI - Math.PI / 2;
    const speakerX = Math.cos(speakerAngle) * avatarRadius;
    const speakerY = Math.sin(speakerAngle) * avatarRadius;

    // Get all stakeholder positions for collision detection
    const allStakeholderPositions = stakeholders.map((_, idx) => {
      const angle = (idx / stakeholders.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: Math.cos(angle) * avatarRadius,
        y: Math.sin(angle) * avatarRadius,
        radius: avatarSize / 2 + minGap
      };
    });

    // Function to check if a bubble position collides with any stakeholder
    const hasCollision = (bubbleX: number, bubbleY: number, bubbleW: number, bubbleH: number) => {
      const bubbleRect = {
        left: bubbleX - bubbleW / 2,
        right: bubbleX + bubbleW / 2,
        top: bubbleY - bubbleH / 2,
        bottom: bubbleY + bubbleH / 2
      };

      return allStakeholderPositions.some(pos => {
        // Check distance from bubble edges to stakeholder center
        const closestX = Math.max(bubbleRect.left, Math.min(pos.x, bubbleRect.right));
        const closestY = Math.max(bubbleRect.top, Math.min(pos.y, bubbleRect.bottom));
        const distance = Math.sqrt((closestX - pos.x) ** 2 + (closestY - pos.y) ** 2);
        return distance < pos.radius;
      });
    };

    // Function to check if bubble is within container bounds
    const isWithinBounds = (x: number, y: number, w: number, h: number) => {
      const margin = Math.min(containerWidth, containerHeight) * 0.02; // 2% margin
      const maxX = containerWidth / 2 - margin;
      const maxY = containerHeight / 2 - margin;
      
      return (
        x - w / 2 >= -maxX &&
        x + w / 2 <= maxX &&
        y - h / 2 >= -maxY &&
        y + h / 2 <= maxY
      );
    };

    // Try positions in expanding circles around the speaker
    const maxSearchRadius = Math.min(containerWidth, containerHeight) * 0.4;
    const searchStep = Math.min(containerWidth, containerHeight) * 0.02;
    const angleStep = Math.PI / 12; // 15 degree steps

    let bestPosition = { x: speakerX, y: speakerY };
    let found = false;

    // Start from minimum distance that clears the speaking stakeholder
    const minDistance = avatarSize / 2 + minGap + Math.max(width, height) / 2;

    for (let radius = minDistance; radius <= maxSearchRadius && !found; radius += searchStep) {
      // Try different angles around the speaker
      for (let angleOffset = 0; angleOffset < 2 * Math.PI; angleOffset += angleStep) {
        const testX = speakerX + Math.cos(speakerAngle + angleOffset) * radius;
        const testY = speakerY + Math.sin(speakerAngle + angleOffset) * radius;

        if (isWithinBounds(testX, testY, width, height) && 
            !hasCollision(testX, testY, width, height)) {
          bestPosition = { x: testX, y: testY };
          found = true;
          break;
        }
      }
    }

    // If no good position found, place along the radial direction at safe distance
    if (!found) {
      const safeDistance = Math.min(maxSearchRadius * 0.8, minDistance * 1.5);
      bestPosition = {
        x: speakerX + Math.cos(speakerAngle) * safeDistance,
        y: speakerY + Math.sin(speakerAngle) * safeDistance
      };
    }

    // Determine tail placement based on bubble position relative to speaker
    const dx = speakerX - bestPosition.x;
    const dy = speakerY - bestPosition.y;
    let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    
    if (Math.abs(dx) > Math.abs(dy)) {
      placement = dx > 0 ? 'right' : 'left';
    } else {
      placement = dy > 0 ? 'bottom' : 'top';
    }

    // Calculate tail offset to point toward speaker
    let tailOffset = 0;
    if (placement === 'left' || placement === 'right') {
      const deltaY = speakerY - bestPosition.y;
      tailOffset = Math.max(-height / 2 + 16, Math.min(height / 2 - 16, deltaY));
    } else {
      const deltaX = speakerX - bestPosition.x;
      tailOffset = Math.max(-width / 2 + 16, Math.min(width / 2 - 16, deltaX));
    }

    return {
      x: bestPosition.x,
      y: bestPosition.y,
      placement,
      maxWidth: `${width}px`,
      tailOffset
    };
  };

  const getUserPosition = () => {
    const containerRef = document.querySelector('.table-container');
    const containerRect = containerRef?.getBoundingClientRect();
    const containerHeight = containerRect?.height || 600;
    
    // Position user input at bottom of table, responsive to container size
    return { x: 0, y: containerHeight * 0.3 };
  };

  const resumeConversation = () => {
    if (!isPausedRef.current) return;
    setIsPaused(false);
    setCurrentMessage(null); // Clear current message when continuing
    continueConversation();
  };

  const togglePause = () => {
    if (isPausedRef.current) {
      resumeConversation();
    } else {
      setIsPaused(true);
    }
  };

  const showUserThought = (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      stakeholderId: 'user',
      content,
      timestamp: Date.now(),
      type: 'user'
    };

    setCurrentMessage(userMsg);
    setConversationHistory(prev => [...prev, userMsg]);

    // Automatically pause after user input to allow for reflection
    setTimeout(() => {
      setCurrentMessage(null);
      setIsPaused(true); // Always pause after user input
    }, 3000);
  };

  return (
    <div className="roundtable-conversation" data-paused={isPaused}>
      {/* Normal close button in top right */}
      <button className="close-icon" onClick={onClose}>×</button>
      

      
      {/* Table View */}
      <div className={`table-container ${isAnimating ? 'animating' : ''}`}>
        <div className="table-surface">
          {/* Central Control Buttons */}
          <div className="central-controls">
            {/* Add Stakeholder Button */}
            {stakeholders.length < 6 && (
              <button 
                className="central-button add-button"
                onClick={addStakeholder}
                title="Add stakeholder"
              >
                +
              </button>
            )}
            
            {/* Next/Continue Button */}
            <button
              className="central-button next-button"
              onClick={togglePause}
              title="Continue to next message"
            >
              ▶
            </button>
          </div>
          
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
          
          
          {/* Elegant Designerly Connection */}
          {currentMessage && currentMessage.type === 'stakeholder' && (
            (() => {
              const speakerIdx = stakeholders.findIndex(s => s.id === currentMessage.stakeholderId);
              if (speakerIdx === -1) return null;
              
              const speakerPos = getStakeholderPosition(speakerIdx, stakeholders.length);
              const bubblePos = getSpeechBubblePosition(currentMessage.stakeholderId);
              const stakeholderColor = stakeholders.find(s => s.id === currentMessage.stakeholderId)?.color || '#667eea';
              
              // Calculate the path from avatar center to bubble edge
              // The speakerPos is the center of the stakeholder-seat (avatar + nameplate)
              // We need to offset upward to get the actual center of the avatar
              const avatarOffset = -20; // Offset upward to center of avatar (avatar is above seat center)
              const startX = 300 + speakerPos.x; // Avatar center X
              const startY = 300 + speakerPos.y + avatarOffset; // Actual avatar center Y
              const endX = 300 + bubblePos.x;
              const endY = 300 + bubblePos.y;
              
              // Create elegant curved path
              const controlX = (startX + endX) / 2;
              const controlY = Math.min(startY, endY) - 30; // Curve upward
              
              return (
                <svg 
                  className="elegant-connector"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '600px',
                    height: '600px',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 350, // Behind stakeholder avatars
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <linearGradient id={`gradient-${currentMessage.stakeholderId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: stakeholderColor, stopOpacity: 0.8}} />
                      <stop offset="50%" style={{stopColor: stakeholderColor, stopOpacity: 0.4}} />
                      <stop offset="100%" style={{stopColor: stakeholderColor, stopOpacity: 0.8}} />
                    </linearGradient>
                    <filter id={`glow-${currentMessage.stakeholderId}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Elegant curved connection */}
                  <path
                    d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                    stroke={`url(#gradient-${currentMessage.stakeholderId})`}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    filter={`url(#glow-${currentMessage.stakeholderId})`}
                    className="connection-path"
                  />
                  
                  {/* Connection start dot at avatar */}
                  <circle
                    cx={startX}
                    cy={startY}
                    r="4"
                    fill={stakeholderColor}
                    opacity="0.9"
                    className="connection-start"
                  />
                  
                  {/* Connection end dot at bubble */}
                  <circle
                    cx={endX}
                    cy={endY}
                    r="3"
                    fill={stakeholderColor}
                    opacity="0.7"
                    className="connection-end"
                  />
                </svg>
              );
            })()
          )}
 
          {currentMessage && (
            <div 
              className={`speech-bubble ${currentMessage.type}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                ...((): React.CSSProperties & Record<'--x' | '--y', string> => {
                  if (currentMessage.type === 'user') {
                    const pos = getUserPosition();
                    return { '--x': `${pos.x}px`, '--y': `${pos.y}px` } as any;
                  } else if (currentMessage.type === 'system') {
                    return { '--x': '0px', '--y': '-80px' } as any;
                  } else {
                    const pos = getSpeechBubblePosition(currentMessage.stakeholderId);
                    return { '--x': `${pos.x}px`, '--y': `${pos.y}px` } as any;
                  }
                })(),
                zIndex: 500,
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
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundtableConversation; 