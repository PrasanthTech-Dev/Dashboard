import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  ShoppingCart, 
  Calendar, 
  Mail, 
  MessageSquare, 
  CheckSquare,
  Layers, 
  Folder, 
  FileText, 
  Smartphone, 
  Search,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

import logoImage from '../../assets/images/icons/Compact.png';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [isEcommerceExpanded, setIsEcommerceExpanded] = useState(false);

  const menuItems = [
    { name: 'Task', path: '/projects/tasks', icon: CheckSquare },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Mail', path: '/mail/inbox', icon: Mail, badge: 8 },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Projects', path: '/projects', icon: Layers },
    { name: 'File Manager', path: '/file-manager', icon: Folder },
    { name: 'Notes', path: '/notes', icon: FileText },
    { name: 'Contacts', path: '/contacts', icon: Smartphone },
  ];

  const ecommerceSubmenu = [
    { name: 'Products', path: '/ecommerce/products' },
    { name: 'Orders', path: '/ecommerce/orders' },
    { name: 'Customers', path: '/ecommerce/customers' },
  ];

  const isEcommerceActive = location.pathname.startsWith('/ecommerce');

  return (
    <aside className="sidebar" style={{ 
      width: isCollapsed ? '70px' : '240px', 
      height: '100vh', 
      borderRight: '1px solid #e2e8f0', 
      backgroundColor: '#ffffff', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      overflowX: 'hidden'
    }}>
      
      {/* Sidebar Header (Logo) */}
      <div className="sidebar-header" style={{ 
        height: '70px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        padding: isCollapsed ? '0' : '0 24px', 
        borderBottom: '1px solid #e2e8f0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoImage} alt="FLOWER" style={{ width: '28px', height: '28px', objectFit: 'contain', flexShrink: 0 }} />
          {!isCollapsed && (
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px' }}>FLOWER</span>
          )}
        </div>
      </div>

      {/* Search Input (Hidden in collapsed mode) */}
      {!isCollapsed && (
        <div className="sidebar-search" style={{ padding: '20px 16px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '6px', padding: '6px 12px', gap: '8px' }}>
            <Search size={16} style={{ color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search anything" 
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Menu items list */}
      <div className="sidebar-menu-wrapper" style={{ flex: '1', overflowY: 'auto', padding: isCollapsed ? '15px 0' : '10px 16px' }}>
        {!isCollapsed && (
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', margin: '15px 0 10px 8px' }}>
            Main Menu
          </span>
        )}

        <nav className="sidebar-navigation">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
            
            {/* Dashboard Link */}
            <li style={{ width: '100%' }}>
              {isCollapsed ? (
                <Link 
                  to="/" 
                  style={{ display: 'flex', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '10px', backgroundColor: location.pathname === '/' ? '#f1f5f9' : 'transparent', color: location.pathname === '/' ? '#475569' : '#94a3b8', margin: '0 auto' }}
                  className={location.pathname === '/' ? '' : 'sidebar-item-hover'}
                >
                  <LayoutGrid size={20} style={{ alignSelf: 'center', color: location.pathname === '/' ? '#475569' : '#64748b' }} />
                </Link>
              ) : (
                <Link 
                  to="/" 
                  style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', backgroundColor: location.pathname === '/' ? '#dcfce7' : 'transparent', color: location.pathname === '/' ? '#15803d' : '#475569', fontWeight: location.pathname === '/' ? '700' : '500', fontSize: '13px', textDecoration: 'none' }}
                  className={location.pathname === '/' ? '' : 'sidebar-item-hover'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LayoutGrid size={18} style={{ color: location.pathname === '/' ? '#15803d' : '#64748b' }} />
                    <span>Dashboard</span>
                  </div>
                </Link>
              )}
            </li>

            {/* E-Commerce Submenu Parent Accordion */}
            <li style={{ width: '100%' }}>
              {isCollapsed ? (
                <Link 
                  to="/ecommerce/products" 
                  style={{ display: 'flex', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '10px', backgroundColor: isEcommerceActive ? '#f1f5f9' : 'transparent', color: isEcommerceActive ? '#475569' : '#94a3b8', margin: '0 auto' }}
                  className={isEcommerceActive ? '' : 'sidebar-item-hover'}
                >
                  <ShoppingCart size={20} style={{ alignSelf: 'center', color: isEcommerceActive ? '#475569' : '#64748b' }} />
                </Link>
              ) : (
                <div>
                  <div 
                    onClick={() => setIsEcommerceExpanded(prev => !prev)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '10px 12px', 
                      borderRadius: '8px',
                      backgroundColor: isEcommerceActive ? '#dcfce7' : 'transparent',
                      color: isEcommerceActive ? '#15803d' : '#475569',
                      fontWeight: isEcommerceActive ? '700' : '500',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    className={isEcommerceActive ? '' : 'sidebar-item-hover'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShoppingCart size={18} style={{ color: isEcommerceActive ? '#15803d' : '#64748b' }} />
                      <span>E-Commerce</span>
                    </div>
                    <ChevronRight size={14} style={{ 
                      transform: isEcommerceExpanded ? 'rotate(90deg)' : 'none', 
                      transition: 'transform 0.2s',
                      color: isEcommerceActive ? '#15803d' : '#94a3b8'
                    }} />
                  </div>

                  {/* Submenu links */}
                  {isEcommerceExpanded && (
                    <ul style={{ listStyle: 'none', padding: '6px 0 0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {ecommerceSubmenu.map((sub, idx) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={idx}>
                            <Link
                              to={sub.path}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                textDecoration: 'none',
                                color: isSubActive ? '#15803d' : '#64748b',
                                backgroundColor: isSubActive ? '#e8f5e9' : 'transparent',
                                fontWeight: isSubActive ? '700' : '500',
                                transition: 'all 0.15s'
                              }}
                              className={isSubActive ? '' : 'sidebar-item-hover'}
                            >
                              <span style={{ 
                                width: '5px', 
                                height: '5px', 
                                borderRadius: '50%', 
                                backgroundColor: isSubActive ? '#15803d' : '#cbd5e1',
                                display: 'inline-block'
                              }}></span>
                              <span>{sub.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </li>

            {/* Remaining Menu Items */}
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={idx} style={{ width: '100%' }}>
                  {isCollapsed ? (
                    <Link 
                      to={item.path}
                      title={item.name}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        width: '42px', 
                        height: '42px', 
                        borderRadius: '10px',
                        backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                        color: isActive ? '#475569' : '#94a3b8',
                        margin: '0 auto'
                      }}
                      className={isActive ? '' : 'sidebar-item-hover'}
                    >
                      <Icon size={20} style={{ alignSelf: 'center', color: isActive ? '#475569' : '#64748b' }} />
                    </Link>
                  ) : (
                    <Link 
                      to={item.path}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '10px 12px', 
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#dcfce7' : 'transparent',
                        color: isActive ? '#15803d' : '#475569',
                        fontWeight: isActive ? '700' : '500',
                        fontSize: '13px',
                        textDecoration: 'none',
                        transition: 'all 0.15s'
                      }}
                      className={isActive ? '' : 'sidebar-item-hover'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={18} style={{ color: isActive ? '#15803d' : '#64748b' }} />
                        <span>{item.name}</span>
                      </div>

                      {item.badge ? (
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '10px' }}>
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CALENDARS Checklist section */}
        {!isCollapsed && location.pathname === '/calendar' && (
          <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 8px 12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Calendars
              </span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#94a3b8', cursor: 'pointer' }}>+</span>
            </div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              {[
                { name: 'Important', color: '#ef4444' },
                { name: 'Meeting', color: '#06b6d4' },
                { name: 'Event', color: '#10b981' },
                { name: 'Work', color: '#f59e0b' },
                { name: 'Other', color: '#64748b' }
              ].map((cal, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 8px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    style={{ 
                      accentColor: cal.color, 
                      width: '15px', 
                      height: '15px', 
                      cursor: 'pointer'
                    }} 
                  />
                  <span>{cal.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
