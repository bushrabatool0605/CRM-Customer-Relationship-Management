import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='layout'>
      <aside className='sidebar'>
        <div className='sidebar-logo'>⚡ XDevFlow CRM</div>

        <nav className='sidebar-nav'>
          <NavLink
            to='/dashboard'
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to='/leads'
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            👥 Leads
          </NavLink>
          <NavLink
            to='/leads/create'
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            ➕ Add Lead
          </NavLink>
        </nav>

        <div className='sidebar-footer'>
          <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '10px' }}>
            👤 {user?.name}
          </p>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </aside>

      <main className='main-content'>
        {children}
      </main>
    </div>
  );
};

export default Layout;