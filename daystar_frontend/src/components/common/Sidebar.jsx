import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-name">{user?.name}</div>
          <div className="user-role">{user?.role}</div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/babysitters" className="nav-link">
            Babysitters
          </NavLink>
          <NavLink to="/children" className="nav-link">
            Children
          </NavLink>
          <NavLink to="/finances" className="nav-link">
            Finances
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
