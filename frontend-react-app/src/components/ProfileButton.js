import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

function ProfileButton() {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button className="checkout-button" onClick={openMenu}>
        Profile
      </button>
      {showMenu && (
        <div
          className="sidebar"
          style={showMenu ? { transform: 'translateX(-100%)'} : {}}
        >
          <div className="sidebar-header">
            <button className="arrow-button">
              <i className="fas fa-user-circle"></i>
              Profile
            </button>
          </div>
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button className="profile-buttons" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                Log Out
              </button>
            </li>
          </ul>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
