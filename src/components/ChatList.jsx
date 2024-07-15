import React, { useEffect, useState } from 'react';
import './ChatList.css';

const dummyChats = [
  { id: 1, name: "John Doe", last_message: "Hello from Chat 1", time: "10:00 AM", profile_color: "#ffcc80" },
  { id: 2, name: "Jane Smith", last_message: "Hi from Chat 2", time: "10:30 AM", profile_color: "#b2dfdb" },
  { id: 3, name: "Michael Brown", last_message: "Greetings from Chat 3", time: "11:00 AM", profile_color: "#80cbc4" },
  { id: 4, name: "Emma Wilson", last_message: "How are you?", time: "12:00 PM", profile_color: "#ffab91" },
  { id: 5, name: "David Lee", last_message: "Good morning!", time: "12:30 PM", profile_color: "#c5e1a5" },
];

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchChats = async () => {
      try {
        // Here we use dummy data instead of an actual API call
        setChats(dummyChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(name => name[0]).join('').toUpperCase();
  };

  return (
    <div className="chat-list">
      <h2>Telegram Chats</h2>
      {chats.map(chat => (
        <div key={chat.id} className="chat-item" onClick={() => onSelectChat(chat.id, chat.name)}>
          <div className="profile-photo" style={{ backgroundColor: chat.profile_color }}>
            {getInitials(chat.name)}
          </div>
          <div className="chat-details">
            <div className="chat-header">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-time">{chat.time}</div>
            </div>
            <div className="chat-last-message">{chat.last_message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
