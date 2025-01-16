'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Clock, ChevronRight, Heart, Pill, Stethoscope, Thermometer } from 'lucide-react'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bertha';
  timestamp: Date;
}

export function EmergencyChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "I understand you're in an emergency situation. I'm here to help. Can you please provide more details about what's happening?",
      sender: 'bertha',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate Bertha's response
    setTimeout(() => {
      const berthaMessage: Message = {
        id: Date.now() + 1,
        text: "Thank you for providing that information. I'm analyzing it now. Can you tell me if you're experiencing any pain or discomfort?",
        sender: 'bertha',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, berthaMessage]);
    }, 1000);
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        yoyo: Infinity,
        repeatDelay: 2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col"
    >
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 left-1/4 text-rose-500"
        >
          <Heart size={48} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-3/4 left-3/4 text-blue-500"
        >
          <Pill size={48} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-1/2 left-1/2 text-green-500"
        >
          <Stethoscope size={48} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 right-1/4 text-yellow-500"
        >
          <Thermometer size={48} />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between p-4 border-b border-gray-800"
      >
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={onClose}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Bot className="w-6 h-6 text-rose-400" />
          </motion.div>
          <span className="font-bold text-xl">Bertha</span>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-gray-800 text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <Clock className="w-4 h-4" />
            Access History
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Warning Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-rose-500/20 p-4 text-rose-200 text-sm"
      >
        You are using emergency setting of Bertha, meaning Bertha is trying to help you without knowing anything about you. So please try and be detailed so that Bertha can help you. And Sign in when possible to allow Bertha to help you better.
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-rose-500' : 'bg-gray-800'} rounded-2xl p-4`}>
                <p>{message.text}</p>
                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.form
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="p-4 border-t border-gray-800"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your emergency..."
            className="flex-1 bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-rose-500 p-3 rounded-xl hover:bg-rose-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

