import React, { useContext, useState } from 'react';
import { ChatbotContext } from '../context/ChatbotContext';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const { messages, sendMessage } = useContext(ChatbotContext);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className={`chatbox ${isOpen ? 'open' : ''}`}>
      <div className="chatbox-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="image-container">
          <img className='avatar' src="https://cdn1.iconfinder.com/data/icons/vocation-man-avatar-2/64/Archaeologist-avatar-character-explorer-512.png" alt="Chatbot" />
        </div>
        <span>Chat with us!</span>
      </div>
      {isOpen && (
        <div className="chatbox-body">
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                <strong>{msg.sender}:</strong> {msg.text}
                {msg.itemId && (
                  <Link to={`/item/${msg.itemId}`} className="item-link">
                    <span> (View Item)</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
