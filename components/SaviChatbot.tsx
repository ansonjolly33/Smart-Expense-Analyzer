"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Heart, Sparkles, TrendingDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

export function SaviChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'savi' | 'user', text: string}[]>([
    { role: 'savi', text: 'Hi! I am Savi, your Savings Buddy 💚 How are your goals coming along today?' }
  ]);
  const [input, setInput] = useState('');
  const { streak, points, limits } = useStore();
  const endRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add User message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Savi Heuristic AI Response Generator
    setTimeout(() => {
      let saviReply = "I'm always here for you! Let's keep those streaks going. You are doing amazing! 💚";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('spent') || lower.includes('over')) {
        saviReply = "It's okay, you went over budget this week — let's adjust and recover 💚 Every day is a new start!";
      } else if (lower.includes('streak')) {
        saviReply = `You're on a ${streak}-day streak! I'm so proud of you! Keep racking up those ${points} points! 🏆`;
      } else if (lower.includes('food') || lower.includes('transport')) {
        saviReply = "You're doing great! Just reduce dining twice this week to stay on track. Small steps lead to 25% better savings!";
      } else if (lower.includes('stress') || lower.includes('worry')) {
        saviReply = "Take a deep breath 🌬️ Your Dynamic Limits automatically adjust to help you softly land. We'll get through this together.";
      }
      
      setMessages(prev => [...prev, { role: 'savi', text: saviReply }]);
    }, 800);
  };

  if (pathname === '/login') return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 glass-card rounded-2xl shadow-2xl border border-primary/20 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-full text-white">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-tight">Savi</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Savings Buddy
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-sm' 
                      : 'bg-secondary text-secondary-foreground rounded-bl-sm border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-background/50 flex gap-2 items-center">
              <input 
                type="text" 
                placeholder="Talk to Savi..." 
                className="flex-1 bg-transparent border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-primary rounded-full text-white hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
