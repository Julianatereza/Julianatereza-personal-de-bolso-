import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import { AiChatMessage, ScreenId } from '../../types';

interface Screen7AiChatProps {
  messages: AiChatMessage[];
  onSendMessage: (text: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen7AiChat: React.FC<Screen7AiChatProps> = ({ messages, onSendMessage, onNavigate }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'Sinto uma fisgada na lombar hoje',
    'Quero trocar o agachamento por leg press',
    'Como otimizar minha hidratação pré-treino?',
    'Dormi mal, devo tomar pré-treino com cafeína?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!textToSend) setInputText('');
    onSendMessage(text);

    // Simulate AI typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] pt-3 pb-2">
      {/* Top AI Status Indicator Banner */}
      <div className="glass-card px-4 py-3 rounded-2xl mb-4 flex items-center justify-between border border-[#00daf3]/30 bg-[#0a2e36]/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00daf3]/20 flex items-center justify-center text-[#00daf3]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">IA Neural Coach</span>
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-gray-400">Sincronizado com sua biometria e sensores</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#00daf3] uppercase">
          ONLINE
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div key={msg.id} className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}>
              {/* Avatar icon */}
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  isAi
                    ? 'bg-[#13353d] border border-[#00daf3]/40 text-[#00daf3]'
                    : 'bg-[#bef500] text-[#151f00]'
                }`}
              >
                {isAi ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[82%] space-y-2.5 ${isAi ? 'text-left' : 'text-right'}`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isAi
                      ? 'bg-[#1c1b1b] border border-white/10 text-gray-100 rounded-tl-none shadow-md'
                      : 'bg-[#0a2e36] border border-[#00daf3]/30 text-white rounded-tr-none shadow-md'
                  }`}
                >
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Embedded Action Card inside AI message */}
                {msg.actionCard && (
                  <div className="glass-card p-4 rounded-2xl border border-[#bef500]/50 bg-black/80 space-y-3 text-left shadow-[0_0_20px_rgba(190,245,0,0.15)]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#bef500]" />
                      <span className="text-xs font-mono font-bold text-[#bef500] uppercase tracking-wider">
                        AÇÃO SUGERIDA PELA IA
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{msg.actionCard.title}</h4>
                      <p className="text-xs text-gray-300 mt-0.5">{msg.actionCard.description}</p>
                    </div>
                    {msg.actionCard.buttonText && (
                      <button
                        onClick={() => {
                          if (msg.actionCard?.targetScreen) {
                            onNavigate(msg.actionCard.targetScreen);
                          }
                        }}
                        className="w-full py-2.5 bg-[#bef500] hover:bg-[#cbf733] text-[#151f00] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <span>{msg.actionCard.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                <span className="text-[10px] font-mono text-gray-500 block px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-[#13353d] border border-[#00daf3]/40 text-[#00daf3] flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 animate-bounce" />
            </div>
            <div className="bg-[#1c1b1b] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00daf3] animate-ping" />
              <span className="text-xs font-mono text-gray-400">Analisando biometria e recalculando treino...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="py-2.5 overflow-x-auto no-scrollbar flex gap-2 shrink-0">
        {quickSuggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sug)}
            className="whitespace-nowrap px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-gray-300 font-mono transition-all shrink-0 active:scale-95"
          >
            + {sug}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 shrink-0"
      >
        <div className="glass-card rounded-2xl p-1.5 pl-4 flex items-center gap-2 border border-white/15 focus-within:border-[#00daf3] transition-colors shadow-lg">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pergunte ao seu personal IA ou relate dores..."
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-xl bg-[#bef500] hover:bg-[#cbf733] disabled:opacity-30 disabled:hover:bg-[#bef500] text-[#151f00] flex items-center justify-center transition-all active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </form>
    </div>
  );
};
