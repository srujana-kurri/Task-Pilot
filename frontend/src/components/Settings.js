import React, { useState } from 'react';
/*Users can change their password by providing the current password, a new password, and confirming the new password.
Users can select a theme (light or dark), and this selection is applied to the UI.*/

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handlePasswordChange = () => {
    if (newPassword === confirmNewPassword) {
      // Update the user's password using an API call or appropriate mechanism.
      console.log('Password changed successfully');
    } else {
      console.error('Passwords do not match');
    }
  };

  const handleThemeChange = (theme) => {
    // Update the user's theme preference, and apply the selected theme.
    setSelectedTheme(theme);
    // You can apply the theme using CSS classes, context, or other styling methods.
    // Example: document.body.classList.add('dark-theme') or update a context value.
  };

  return (
    <div>
      <h2>Settings</h2>
      {/* Change Password Section */}
      <div>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>

      {/* Theme Selection Section */}
      <div>
        <h3>Theme Selection</h3>
        <label>
          <input
            type="radio"
            value="light"
            checked={selectedTheme === 'light'}
            onChange={() => handleThemeChange('light')}
          /> Light Theme
        </label>
        <label>
          <input
            type="radio"
            value="dark"
            checked={selectedTheme === 'dark'}
            onChange={() => handleThemeChange('dark')}
          /> Dark Theme
        </label>
      </div>
    </div>
  );
}

export default Settings;
