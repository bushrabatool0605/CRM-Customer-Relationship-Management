import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <div className={`layout ${darkMode ? 'dark' : ''}`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className='sidebar-overlay'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className='sidebar-logo'>
          <span>⚡ XDevFlow CRM</span>
          <button
            className='sidebar-toggle'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className='sidebar-nav'>
          <NavLink
            to='/dashboard'
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={closeSidebarOnMobile}
          >
            <span className='nav-icon'>📊</span>
            <span className='nav-text'>Dashboard</span>
          </NavLink>
          <NavLink
            to='/leads'
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={closeSidebarOnMobile}
          >
            <span className='nav-icon'>👥</span>
            <span className='nav-text'>Leads</span>
          </NavLink>
          <NavLink
            to='/leads/create'
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={closeSidebarOnMobile}
          >
            <span className='nav-icon'>➕</span>
            <span className='nav-text'>Add Lead</span>
          </NavLink>
        </nav>

        <div className='sidebar-footer'>
          <div className='user-info'>
            <div className='user-avatar'>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className='user-details'>
              <p className='user-name'>{user?.name}</p>
              <p className='user-role'>{user?.role === 'admin' ? '👑 Admin' : '👤 User'}</p>
            </div>
          </div>
          <button className='dark-mode-btn' onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className='logout-btn' onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Hamburger always visible when sidebar closed */}
      {!sidebarOpen && (
        <button
          className='hamburger-btn'
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      <main className={`main-content ${sidebarOpen ? '' : 'expanded'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;