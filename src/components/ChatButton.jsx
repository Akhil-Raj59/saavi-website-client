import React from 'react';
import { MessageCircle } from 'lucide-react'; 

export default function ChatButton() {
  return (
    <button 
      // Tailwind classes for fixed position, bottom right corner, spacing, and styling
      className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-2xl shadow-red-500/50 
                 hover:bg-red-700 transition duration-300 transform hover:scale-105 
                 focus:outline-none focus:ring-4 focus:ring-red-300"
      onClick={() => console.log('Open Chatbot UI')} // Replace with actual chat logic
      aria-label="Open Chatbot"
    >
      <MessageCircle size={32} />
    </button>
  );
}