import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateRAGResponse, type ChatMessage } from '../rag/responseGenerator';

const STARTER_PROMPTS = [
  'Job Tracker API',
  'Avatar Chat',
  'LeadLens',
  'Tech Stack',
  'Work Experience',
  'Contact Kashif',
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am **Kashif AI Assistant**.\n\nI can answer questions regarding Kashif's engineering background, production projects, and technical skills. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      try {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      } catch {
        // Fallback
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
        try {
          inputRef.current?.focus();
        } catch {
          // Fallback
        }
      }, 60);
    }
  }, [isOpen]);

  // Only auto-scroll down when a new message is appended or typing state initiates
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isTyping) return;

    const userMsgId = 'user-' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { text, sources } = await generateRAGResponse(query);
      const assistantMsgId = 'ai-' + Date.now();

      const responseSources = sources.map((s) => ({
        title: s.chunk.title,
        source: s.chunk.source,
        score: Math.round(s.score * 100),
        url: s.chunk.url,
        githubUrl: s.chunk.githubUrl,
      }));

      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: responseSources,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          sender: 'assistant',
          text: 'An error occurred while fetching information. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSourceView = (msgId: string) => {
    setExpandedSources((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Conversation reset. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return (
      <div className="space-y-1.5 text-[13px] leading-relaxed text-slate-700">
        {lines.map((line, idx) => {
          if (!line || !line.trim()) return <div key={idx} className="h-1" />;

          // Headers
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-semibold text-slate-900 text-[13px] mt-2 mb-1">
                {line.replace('### ', '')}
              </h4>
            );
          }

          // Bullet points
          const isBullet = line.startsWith('- ') || line.startsWith('* ');
          const formattedLine = line.replace(/^[-*]\s+/, '');

          const parts = formattedLine.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

          const content = parts.map((part, pIdx) => {
            if (!part) return null;
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] border border-slate-200">
                  {part.slice(1, -1)}
                </code>
              );
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch && linkMatch[1] && linkMatch[2]) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium underline inline-flex items-center space-x-0.5"
                >
                  <span>{linkMatch[1]}</span>
                  <span className="text-[10px]">↗</span>
                </a>
              );
            }
            return part;
          });

          return isBullet ? (
            <div key={idx} className="flex items-start space-x-2 pl-1">
              <span className="text-slate-400 mt-1 text-xs">•</span>
              <span className="text-slate-700">{content}</span>
            </div>
          ) : (
            <p key={idx} className="text-slate-700">{content}</p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ================= 1. FLOATING CHATBOT LAUNCHER (LIGHT THEME) ================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-cursor="pointer"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
        >
          {/* Clean Modern Icon (Dark Color) */}
          {isOpen ? (
            <svg className="w-5 h-5 text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ================= 2. LIGHT PROFESSIONAL CHATBOT WINDOW ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] h-[530px] max-h-[82vh] max-h-[82dvh] rounded-2xl flex flex-col overflow-hidden bg-white border border-slate-200 shadow-2xl"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Header: Pure, Clean Light Theme */}
            <div className="px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
                  Kashif AI Assistant
                </h3>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  data-cursor="pointer"
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  data-cursor="pointer"
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Body: Fully Isolated Scroll Container */}
            <div
              ref={chatBodyRef}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 custom-chat-scrollbar select-text overscroll-contain"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}

                    {/* Minimal Collapsible Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => toggleSourceView(msg.id)}
                          data-cursor="pointer"
                          className="text-[11px] font-medium text-slate-500 hover:text-slate-700 flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Sources ({msg.sources.length})</span>
                          <span>{expandedSources[msg.id] ? '▲' : '▼'}</span>
                        </button>

                        <AnimatePresence>
                          {expandedSources[msg.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-1.5 space-y-1 overflow-hidden"
                            >
                              {msg.sources.map((src, i) => (
                                <div
                                  key={i}
                                  className="p-1.5 px-2 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between"
                                >
                                  <span className="truncate max-w-[240px]">{src.title}</span>
                                  {src.url ? (
                                    <a
                                      href={src.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline ml-2 flex-shrink-0 font-medium"
                                    >
                                      Live ↗
                                    </a>
                                  ) : src.githubUrl ? (
                                    <a
                                      href={src.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline ml-2 flex-shrink-0 font-medium"
                                    >
                                      GitHub ↗
                                    </a>
                                  ) : null}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs max-w-[90px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Light Minimal Prompt Chips */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center space-x-1.5 flex-shrink-0"
              style={{ overscrollBehavior: 'contain' }}
            >
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  data-cursor="pointer"
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Clean Light Input Bar */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Kashif's experience, skills, or projects..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-xs focus:outline-none transition-colors"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                data-cursor="pointer"
                aria-label="Send message"
                className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                  inputValue.trim() && !isTyping
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
