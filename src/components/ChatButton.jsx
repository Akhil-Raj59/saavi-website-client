import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function ChatButton() {
  const [miniOpen, setMiniOpen] = useState(false);
  const [agenticOpen, setAgenticOpen] = useState(false);
  const [miniMessages, setMiniMessages] = useState([
    { text: "Hello! I'm your AI Mini assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [agenticMessages, setAgenticMessages] = useState([
    { text: "Greetings! I'm your advanced AI Agentic assistant with enhanced capabilities. What would you like to explore?", sender: 'bot' }
  ]);
  const [miniInput, setMiniInput] = useState('');
  const [agenticInput, setAgenticInput] = useState('');
  const [miniTyping, setMiniTyping] = useState(false);
  const [agenticTyping, setAgenticTyping] = useState(false);
  
  const miniMessagesRef = useRef(null);
  const agenticMessagesRef = useRef(null);

  const quickQuestions = [
    "What is SaaviGenAI and what does it do?",
    "What training programs does SaaviGenAI offer?",
    "How does SaaviGenAI help with AI security and compliance?"
  ];

  useEffect(() => {
    if (miniMessagesRef.current) {
      miniMessagesRef.current.scrollTop = miniMessagesRef.current.scrollHeight;
    }
  }, [miniMessages, miniTyping]);

  useEffect(() => {
    if (agenticMessagesRef.current) {
      agenticMessagesRef.current.scrollTop = agenticMessagesRef.current.scrollHeight;
    }
  }, [agenticMessages, agenticTyping]);

  const sendMiniMessage = async (message) => {
    setMiniMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMiniTyping(true);

    try {
      const response = await fetch('https://api.saavigen.ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const botResponse = data.response || data.answer || data.message || 
        'Thank you for your question! Our team will get back to you soon.';
      
      setMiniTyping(false);
      setMiniMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Mini Chatbot API Error:', error);
      setMiniTyping(false);
      
      const fallbacks = [
        "Thank you for your question! I'm currently experiencing high demand. Our team will get back to you soon via email.",
        "I appreciate your interest in SaaviGen.AI! For immediate assistance, please contact us at contact@saavigen.ai",
        "Thanks for reaching out! While I'm temporarily unavailable, you can explore our services above or contact our team directly."
      ];
      
      const randomResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setMiniMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }
  };

  const sendAgenticMessage = async (message) => {
    setAgenticMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setAgenticTyping(true);

    try {
      const response = await fetch('https://api2.saavigen.ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const botResponse = data.response || data.answer || data.message || 
        'Thank you for your question! Our team will get back to you soon.';
      
      setAgenticTyping(false);
      setAgenticMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Agentic Chatbot API Error:', error);
      setAgenticTyping(false);
      
      const fallbacks = [
        "Thank you for your question! I'm currently experiencing high demand. Our team will get back to you soon via email.",
        "I appreciate your interest in SaaviGen.AI! For immediate assistance, please contact us at contact@saavigen.ai",
        "Thanks for reaching out! While I'm temporarily unavailable, you can explore our services above or contact our team directly."
      ];
      
      const randomResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setAgenticMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }
  };

  const handleMiniSubmit = () => {
    if (miniInput.trim()) {
      sendMiniMessage(miniInput);
      setMiniInput('');
    }
  };

  const handleAgenticSubmit = () => {
    if (agenticInput.trim()) {
      sendAgenticMessage(agenticInput);
      setAgenticInput('');
    }
  };

  const handleMiniKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMiniSubmit();
    }
  };

  const handleAgenticKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAgenticSubmit();
    }
  };

  const TypingIndicator = () => (
    <div className="flex gap-1 p-3 bg-blue-50 rounded-xl rounded-bl-sm max-w-[80%]">
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></span>
    </div>
  );

  return (
    <>
      {/* AI Mini Chatbot (Blue) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!miniOpen && (
          <button
            className={`w-14 h-14 bg-blue-500 text-white rounded-full shadow-2xl hover:bg-blue-600 
                       transition-all duration-300 hover:scale-110 flex items-center justify-center
                       ${agenticOpen ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => setMiniOpen(true)}
            aria-label="Open AI Mini Chatbot"
          >
            <MessageCircle size={28} />
          </button>
        )}

        {miniOpen && (
          <div className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold text-base">AI Mini Chatbot</h3>
              <button
                onClick={() => setMiniOpen(false)}
                className="hover:bg-white/10 p-1 rounded transition"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={miniMessagesRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {miniMessages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-sm' 
                      : 'bg-blue-50 text-blue-900 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {miniTyping && <TypingIndicator />}
            </div>

            <div className="p-3 border-t bg-gray-50">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMiniMessage(q)}
                  className="w-full mb-2 p-2 bg-white border border-blue-500 text-blue-500 rounded-full 
                           text-xs hover:bg-blue-500 hover:text-white transition text-left"
                >
                  {q.split('?')[0].substring(0, 40)}...
                </button>
              ))}
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={miniInput}
                  onChange={(e) => setMiniInput(e.target.value)}
                  onKeyPress={handleMiniKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-full text-sm outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleMiniSubmit}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Agentic Chatbot (Green) */}
      <div className="fixed bottom-6 right-24 z-50">
        {!agenticOpen && (
          <button
            className={`w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 
                       transition-all duration-300 hover:scale-110 flex items-center justify-center
                       ${miniOpen ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => setAgenticOpen(true)}
            aria-label="Open AI Agentic Chatbot"
          >
            <Bot size={28} />
          </button>
        )}

        {agenticOpen && (
          <div className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-green-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold text-base">AI Agentic Chatbot</h3>
              <button
                onClick={() => setAgenticOpen(false)}
                className="hover:bg-white/10 p-1 rounded transition"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={agenticMessagesRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {agenticMessages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-green-500 text-white rounded-br-sm' 
                      : 'bg-blue-50 text-blue-900 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {agenticTyping && <TypingIndicator />}
            </div>

            <div className="p-3 border-t bg-gray-50">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendAgenticMessage(q)}
                  className="w-full mb-2 p-2 bg-white border border-green-500 text-green-500 rounded-full 
                           text-xs hover:bg-green-500 hover:text-white transition text-left"
                >
                  {q.split('?')[0].substring(0, 40)}...
                </button>
              ))}
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={agenticInput}
                  onChange={(e) => setAgenticInput(e.target.value)}
                  onKeyPress={handleAgenticKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-full text-sm outline-none focus:border-green-500"
                />
                <button
                  onClick={handleAgenticSubmit}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}