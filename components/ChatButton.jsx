'use client'
import { set } from 'mongoose';
import React, { useState } from 'react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to GetPrompted Chat Support! How can I help you today?' }
  ]);

  const parseBoldText = (text) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.replace(boldRegex, "<strong>$1</strong>");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return; // Don't send empty messages

    const newMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([newMessage]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.content || 'No response content' },
      ]);
    } catch (error) {
      console.error('Error fetching completion:', error);
    } finally {
      setInput(''); // Clear the input field
    }
  };

  return (
    <div>
      {/* Chat Button */}
      <button
        type='button'
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'darkcyan',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '10px',
          fontFamily: 'poppins',
          zIndex: 1000,
          // Adjust button size on mobile
          width: 'auto',
          maxWidth: '150px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        Live Chat
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '400px',
            height: '500px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // Make the chat window responsive
            width: '90%',
            maxWidth: '400px',
            height: '70%',
            maxHeight: '500px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              backgroundColor: 'darkcyan',
              color: '#fff',
              fontFamily: 'poppins',
              borderRadius: '10px 10px 0 0',
            }}
          >
            <span>Chat with us</span>
            <button
              onClick={toggleChat}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                fontFamily: 'poppins',
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              padding: '10px',
              flexGrow: 1,
              overflowY: 'auto',
            }}
          >
            {/* Display messages */}
            {messages.map((msg, index) => (
              <div key={index} style={{ margin: '5px 0' }}>
                <strong>{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html: parseBoldText(msg.content),
                  }}
                    style={{
                        margin: '5px 0',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: msg.role === 'user' ? 'lightblue' : '#f0f0f0',
                    }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px',
              borderTop: '1px solid #ccc',
            }}
          >
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Type a message...'
              style={{
                flexGrow: 1,
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              type='button'
              onClick={sendMessage}
              style={{
                marginLeft: '10px',
                padding: '10px 20px',
                backgroundColor: 'orange',
                color: 'white',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'poppins',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
