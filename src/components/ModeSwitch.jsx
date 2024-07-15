import React from 'react';
import './ModeSwitch.css';

const ModeSwitch = ({ darkMode, setDarkMode }) => {
  return (
    <div className="mode-switch">
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        Dark Mode
      </label>
    </div>
  );
};

export default ModeSwitch;
