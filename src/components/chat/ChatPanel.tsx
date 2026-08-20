import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Sparkles, 
  User, 
  Copy, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  MessageSquare,
  X
} from 'lucide-react';
import { initialChatMessages, suggestedPrompts, getChatbotResponse } from '../../data/chatbotKnowledge';
import { ChatMessage } from '../../types/portfolio';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { triggerConfetti } from '../ui/Confetti';
import { renderInlineMarkdown } from '../../utils/markdownParser';

export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletedToast, setDeletedToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { openFile, toggleBottomPanel, closeSidebar } = useWorkspace();
  const { playKeySound } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isTyping) return;

    playKeySound();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Simulate AI generation / typewriter response
    setTimeout(() => {
      const botRes = getChatbotResponse(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: botRes.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: botRes.suggestedAction,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteMessage = (id: string) => {
    playKeySound();
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const clearAllMessages = () => {
    playKeySound();
    setMessages([]);
    setDeletedToast(true);
    setTimeout(() => setDeletedToast(false), 2500);
  };

  const restartChat = () => {
    playKeySound();
    setMessages(initialChatMessages);
  };

  const executeAction = (action: { label: string; fileId?: string; command?: string }) => {
    if (action.fileId) {
      openFile(action.fileId);
    } else if (action.command) {
      if (action.command.includes('hire')) {
        triggerConfetti();
      }
      toggleBottomPanel('terminal');
    }
  };

  const renderChatMessageContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-white text-xs sm:text-sm pt-1 pb-0.5 font-mono">
                {renderInlineMarkdown(line.replace('### ', ''))}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-bold text-ide-accent text-sm pt-1 pb-0.5 font-mono">
                {renderInlineMarkdown(line.replace('## ', ''))}
              </h3>
            );
          }
          if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start space-x-1.5 pl-1 text-xs">
                <span className="text-ide-accent font-bold mt-0.5">•</span>
                <span>{renderInlineMarkdown(line.replace(/^[-•*]\s+/, ''))}</span>
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-xs">
              {renderInlineMarkdown(line)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-ide-sidebar flex flex-col select-none text-xs text-ide-text border-l border-ide-border">
      {/* Top Header */}
      <div className="h-9 px-3 flex items-center justify-between font-semibold tracking-wider text-ide-muted text-[11px] border-b border-ide-border shrink-0">
        <div className="flex items-center space-x-2 text-white">
          <Bot className="w-4 h-4 text-ide-accent" />
          <span className="font-mono">AI PORTFOLIO ASSISTANT</span>
        </div>

        <div className="flex items-center space-x-1">
          {messages.length === 0 ? (
            <button
              onClick={restartChat}
              className="p-1 hover:text-white rounded text-ide-muted hover:bg-ide-tabHover flex items-center space-x-1 transition-colors"
              title="Reset Welcome Message"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={clearAllMessages}
              className="p-1 hover:text-red-400 rounded text-ide-muted hover:bg-ide-tabHover flex items-center space-x-1 transition-colors"
              title="Delete All Messages (Clear Chat)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={closeSidebar}
            className="md:hidden p-1 hover:text-white rounded text-ide-muted hover:bg-ide-tabHover ml-1"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Deleted Confirmation Toast */}
      {deletedToast && (
        <div className="bg-red-950/80 border-b border-red-800/80 px-3 py-1.5 text-[11px] text-red-200 flex items-center justify-between animate-fade-in shrink-0 font-mono">
          <span>Chat history cleared</span>
          <button onClick={restartChat} className="text-white underline hover:no-underline font-medium">
            Restore Welcome
          </button>
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 animate-fade-in text-ide-muted">
            <div className="w-12 h-12 rounded-xl bg-ide-panel border border-ide-border flex items-center justify-center text-ide-accent">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Conversation Cleared</p>
              <p className="text-[11px] text-ide-muted mt-0.5">
                Ask a question about Samarth or select a suggested topic below.
              </p>
            </div>
            <button
              onClick={restartChat}
              className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-colors font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Welcome Message</span>
            </button>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1.5 group ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Sender label */}
                <div className="flex items-center space-x-1.5 text-[10px] text-ide-muted px-1">
                  {isUser ? (
                    <>
                      <span className="font-mono">You</span>
                      <User className="w-3 h-3 text-cyan-400" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span className="font-mono">Portfolio AI</span>
                    </>
                  )}
                  <span className="font-mono">• {msg.timestamp}</span>

                  {/* Individual Delete Message Button on Hover */}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-0.5 rounded transition-opacity ml-1"
                    title="Delete this message"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[90%] rounded-lg p-3 leading-relaxed text-xs shadow-sm relative group/bubble ${
                    isUser
                      ? 'bg-ide-accent text-white rounded-tr-none'
                      : 'bg-ide-panel text-ide-text border border-ide-border rounded-tl-none'
                  }`}
                >
                  {renderChatMessageContent(msg.text)}

                  {/* Suggested Navigation Action Button */}
                  {msg.suggestedAction && (
                    <div className="mt-3 pt-2 border-t border-ide-border/50">
                      <button
                        onClick={() => executeAction(msg.suggestedAction!)}
                        className="px-2.5 py-1 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-ide-accent text-[11px] font-medium flex items-center space-x-1 transition-colors font-mono"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Copy action on hover */}
                  {!isUser && (
                    <button
                      onClick={() => copyMessage(msg.text, msg.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-ide-bg/80 hover:bg-ide-tabHover text-ide-muted hover:text-white opacity-0 group-hover/bubble:opacity-100 transition-opacity"
                      title="Copy Text"
                    >
                      {copiedId === msg.id ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-ide-muted text-[11px] p-2 bg-ide-panel rounded border border-ide-border w-32 animate-pulse font-mono">
            <Bot className="w-3.5 h-3.5 text-ide-accent" />
            <span>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="px-3 py-2 border-t border-ide-border/50 bg-ide-panel/40 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center space-x-1.5 pb-1">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-[10px] text-ide-muted uppercase font-bold tracking-wider shrink-0 font-mono">
            Suggested:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {suggestedPrompts.slice(0, 4).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] px-2 py-0.5 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-ide-text hover:text-white transition-colors truncate max-w-[200px] font-mono"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-ide-border bg-ide-sidebar shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything about Samarth's skills, projects..."
            className="flex-1 bg-ide-bg border border-ide-border rounded px-3 py-1.5 text-xs text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-1.5 rounded bg-ide-accent hover:bg-ide-accentHover disabled:opacity-50 text-white transition-colors"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
