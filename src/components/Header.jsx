import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <div className={`header-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="header">
        <i className="fas fa-bars menu-icon" onClick={toggleMenu}></i>
        <h1>Telegram</h1>
        <i className="fas fa-search search-icon" onClick={toggleSearch}></i>
        {isSearchActive && (
          <input
            type="text"
            className="search-input"
            placeholder="Search contact..."
          />
        )}
        {/* <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
      {isMenuOpen && (
        <div className={`menu ${isDarkMode ? 'dark' : ''}`}>
          <div className="menu-item"><i className="fas fa-user"></i> My Profile</div>
          <div className="menu-item"><i className="fas fa-users"></i> New Group</div>
          <div className="menu-item"><i className="fas fa-address-book"></i> Contacts</div>
          <div className="menu-item"><i className="fas fa-phone"></i> Calls</div>
          <div className="menu-item"><i className="fas fa-street-view"></i> People Nearby</div>
          <div className="menu-item"><i className="fas fa-bookmark"></i> Saved Messages</div>
          <div className="menu-item"><i className="fas fa-cog"></i> Settings</div>
          <div className="menu-item"><i className="fas fa-user-friends"></i> Invite Friends</div>
          <div className="menu-item"><i className="fas fa-info-circle"></i> Telegram Features</div>
        </div>
      )}
    </div>
  );
};

export default Header;
