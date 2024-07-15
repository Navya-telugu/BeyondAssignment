import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import ModeSwitch from './components/ModeSwitch';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null); // State for selected chat name
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectChat = (chatId, chatName) => {
    console.log("Chat selected:", chatId, chatName);
    setSelectedChatId(chatId);
    setSelectedChatName(chatName); // Set selected chat name
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="content">
        <div className="sidebar">
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className="main">
          {selectedChatId ? (
            <ChatWindow chatId={selectedChatId} chatName={selectedChatName} />
          ) : (
            <div className="placeholder">Select a chat to view messages</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
