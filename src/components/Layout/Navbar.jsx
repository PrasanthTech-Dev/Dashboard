import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  X, 
  User as UserIcon, 
  Mail, 
  CheckSquare, 
  Settings, 
  Lock, 
  LogOut 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import defaultAvatar from '../../assets/images/profile/#2.png';

const Navbar = ({ onToggleSidebar, onToggleSettings }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeNotificationHoverId, setActiveNotificationHoverId] = useState(2);
  const [activeMenuHover, setActiveMenuHover] = useState('Settings'); // Defaults to Settings hover state

  // Auto-close open dropdown menus on navigation path change
  useEffect(() => {
    setShowNotifications(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Click outside to collapse open dropdown panels
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        !event.target.closest('.notification-trigger-btn') &&
        !event.target.closest('.notification-dropdown')
      ) {
        setShowNotifications(false);
      }
      if (
        showUserMenu &&
        !event.target.closest('.user-profile-dropdown') &&
        !event.target.closest('.user-menu-dropdown')
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showUserMenu]);

  const [notifications, setNotifications] = useState([
    { id: 1, name: 'Regina Cooper', time: '1 min ago', avatar: defaultAvatar, online: true },
    { id: 2, name: 'Judith Black', time: '5 min ago', avatar: defaultAvatar, online: true },
    { id: 3, name: 'Ronald Robertson', time: '3 hour ago', avatar: defaultAvatar, online: true },
    { id: 4, name: 'Dustin Williamson', time: '15 hour ago', avatar: defaultAvatar, online: true },
    { id: 5, name: 'Calvin Flores', time: 'Yesterday', avatar: defaultAvatar, online: true },
    { id: 6, name: 'Robert Edwards', time: 'Yesterday', avatar: defaultAvatar, online: true },
  ]);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(prev => !prev);
    setShowNotifications(false);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="navbar" style={{ height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 24px', zIndex: 1000, position: 'relative' }}>
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="menu-toggle-btn" 
          onClick={onToggleSidebar}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
          <Search size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <button 
            onClick={toggleNotifications}
            className="notification-trigger-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown" style={{
              position: 'absolute',
              top: '45px',
              right: '-10px',
              width: '320px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #cbd5e1',
              zIndex: 9999,
              padding: '16px 0',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>Notifications</span>
                {notifications.length > 0 && (
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '10px' }}>
                    {notifications.length}
                  </span>
                )}
              </div>

              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => {
                    const isHovered = activeNotificationHoverId === item.id;
                    return (
                      <div 
                        key={item.id} 
                        onMouseEnter={() => setActiveNotificationHoverId(item.id)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '10px 20px', 
                          cursor: 'pointer', 
                          backgroundColor: isHovered ? '#f8fafc' : 'transparent',
                          transition: 'background-color 0.15s' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#f1f5f9' }}>
                            <img 
                              src={item.avatar} 
                              alt={item.name} 
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            {item.online && (
                              <span style={{ position: 'absolute', bottom: '0', right: '0', width: '8px', height: '8px', backgroundColor: '#10b981', border: '2px solid #ffffff', borderRadius: '50%' }}></span>
                            )}
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.name}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.time}</div>
                          </div>
                        </div>

                        {isHovered && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteNotification(item.id); }}
                            style={{ border: 'none', background: '#cbd5e1', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', cursor: 'pointer' }}
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Trigger */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={toggleUserMenu}
            className="user-profile-dropdown" 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={defaultAvatar} 
                alt="User Avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
              {user?.name || 'ArtTemplate'}
            </span>
            <ChevronDown size={16} style={{ color: '#94a3b8' }} />
          </div>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="user-menu-dropdown" style={{
              position: 'absolute',
              top: '45px',
              right: '0',
              width: '240px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #cbd5e1',
              zIndex: 9999,
              padding: '16px 0',
              textAlign: 'left'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                    <img 
                      src={defaultAvatar} 
                      alt="Avatar" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{user?.name || 'ArtTemplate'}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>User</div>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '10px' }}>
                  8
                </span>
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', marginBottom: '6px' }}>
                {[
                  { name: 'My Profile', icon: UserIcon, action: () => { navigate('/profile'); setShowUserMenu(false); } },
                  { name: 'My Messages', icon: Mail, action: () => { navigate('/mail/inbox'); setShowUserMenu(false); } },
                  { name: 'My Tasks', icon: CheckSquare, action: () => { navigate('/projects/tasks'); setShowUserMenu(false); } },
                ].map((item) => {
                  const Icon = item.icon;
                  const isHovered = activeMenuHover === item.name;
                  return (
                    <div 
                      key={item.name}
                      onMouseEnter={() => setActiveMenuHover(item.name)}
                      onClick={item.action}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '8px 20px', 
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: isHovered ? '#15803d' : '#475569',
                        backgroundColor: isHovered ? '#f8fafc' : 'transparent',
                        fontWeight: isHovered ? '600' : '500'
                      }}
                    >
                      <Icon size={16} style={{ color: isHovered ? '#15803d' : '#64748b' }} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px', marginBottom: '6px' }}>
                {[
                  { name: 'Settings', icon: Settings, action: () => { if (onToggleSettings) onToggleSettings(); setShowUserMenu(false); } },
                  { name: 'Lock Screen', icon: Lock, action: () => navigate('/auth/lock-screen') },
                ].map((item) => {
                  const Icon = item.icon;
                  const isHovered = activeMenuHover === item.name;
                  return (
                    <div 
                      key={item.name}
                      onMouseEnter={() => setActiveMenuHover(item.name)}
                      onClick={item.action}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '8px 20px', 
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: isHovered ? '#15803d' : '#475569',
                        backgroundColor: isHovered ? '#f8fafc' : 'transparent',
                        fontWeight: isHovered ? '600' : '500'
                      }}
                    >
                      <Icon size={16} style={{ color: isHovered ? '#15803d' : '#64748b' }} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>

              <div>
                <div 
                  onMouseEnter={() => setActiveMenuHover('Logout')}
                  onClick={handleLogout}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 20px', 
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: activeMenuHover === 'Logout' ? '#ef4444' : '#475569',
                    backgroundColor: activeMenuHover === 'Logout' ? '#fdf2f2' : 'transparent',
                    fontWeight: activeMenuHover === 'Logout' ? '600' : '500'
                  }}
                >
                  <LogOut size={16} style={{ color: activeMenuHover === 'Logout' ? '#ef4444' : '#64748b' }} />
                  <span>Logout</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
