import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';

// Simulate a backend API call for chatbot
async function fetchBotResponse(userInput) {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 600));

  // Example backend logic (replace with real API call if needed)
  const lower = userInput.toLowerCase();
  if (lower.includes('granola')) {
    return {
      text: 'Granola is a high-fiber, protein-rich breakfast/snack. Price: ₹195 (250gm) / ₹290 (500gm). Enjoy with milk/yogurt or as a snack.',
      quickReplies: ['Order Granola', 'Show recipes', 'More products']
    };
  }
  if (lower.includes('order')) {
    return {
      text: 'To place an order, visit our website, add products to your cart, and proceed to checkout. Need help with a specific product?',
      quickReplies: ['Browse products', 'Contact support']
    };
  }
  if (lower.includes('hello') || lower.includes('hi')) {
    return {
      text: "Hi there! 👋 I'm Nurmaa Assistant. How can I help you today?",
      quickReplies: ['Browse products', 'Get recipes', 'Track order', 'Contact support']
    };
  }
  if (lower.includes('track')) {
    return {
      text: 'To track your order, please provide your order ID or contact our support team.',
      quickReplies: ['Contact support', 'Order now']
    };
  }
  // Default fallback
  return {
    text: "I'm here to help! Please ask about products, orders, or support.",
    quickReplies: ['Browse products', 'Get recipes', 'Contact support']
  };
}

function ChatMessage({ message, isUser }) {
  return (
    <div className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${isUser ? 'bg-[#6C63FF] text-white' : 'bg-gray-100 text-gray-800'}`}>
        {message.text.split('\n').map((line, i) => (
          <p key={i} className={i === 0 && !isUser ? 'font-medium' : ''}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function QuickReply({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 m-1 text-sm bg-white border border-[#6C63FF] text-[#6C63FF] rounded-full hover:bg-[#6C63FF] hover:text-white transition-colors"
    >
      {text}
    </button>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I am Nurmaa Assistant 🤖. How can I help you today?", quickReplies: ['Browse products', 'Get recipes', 'Track order', 'Contact support'] }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = { from: 'user', text: input, quickReplies: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    const botResponse = await fetchBotResponse(input);
    setMessages((prev) => [...prev, { from: 'bot', ...botResponse, quickReplies: botResponse.quickReplies || [] }]);
    setLoading(false);
  }

  async function handleQuickReply(text) {
    if (loading) return;
    const userMessage = { from: 'user', text, quickReplies: [] };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const botResponse = await fetchBotResponse(text);
    setMessages((prev) => [...prev, { from: 'bot', ...botResponse, quickReplies: botResponse.quickReplies || [] }]);
    setLoading(false);
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#6C63FF] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-full bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 overflow-hidden" style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="bg-[#6C63FF] text-white p-4 flex items-center">
            <div className="w-3 h-3 rounded-full bg-white mr-2"></div>
            <h3 className="font-semibold">Nurmaa Assistant</h3>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-1 rounded-full hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <React.Fragment key={i}>
                <ChatMessage message={msg} isUser={msg.from === 'user'} />
                {msg.quickReplies && i === messages.length - 1 && (
                  <div className="flex flex-wrap mt-2">
                    {msg.quickReplies.map((reply, j) => (
                      <QuickReply key={j} text={reply} onClick={() => handleQuickReply(reply)} />
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="px-4 py-3 rounded-2xl max-w-[85%] bg-gray-100 text-gray-400 italic animate-pulse">Nurmaa is typing…</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <form onSubmit={handleSend} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent"
                autoFocus
                disabled={loading}
              />
              <button
                type="submit"
                className="ml-2 p-2 text-[#6C63FF] hover:text-[#4a42d1]"
                aria-label="Send message"
                disabled={loading}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}