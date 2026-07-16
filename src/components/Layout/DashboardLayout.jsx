import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/avatar.png';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const toggleSettings = () => {
    setShowSettingsDrawer(prev => !prev);
  };

  // Mockup data for recent activities
  const recentActivities = [
    { id: 1, dateGroup: '12 September', items: [
      { name: 'Priscilla Russell', action: 'Added new project', project: '#443', time: '2 min ago' },
      { name: 'Regina Cooper', action: 'Updated project', project: '#488', time: '4 min ago' },
      { name: 'Ricardo Black', action: 'Completed project', project: '#389', time: '5 min ago' },
      { name: 'Ronald Watson', action: 'Added new project', project: '#442', time: '8 min ago' }
    ]},
    { id: 2, dateGroup: '16 September', items: [
      { name: 'Priscilla Russell', action: 'Added new project', project: '#443', time: '2 min ago' },
      { name: 'Regina Cooper', action: 'Updated project', project: '#488', time: '4 min ago' },
      { name: 'Ricardo Black', action: 'Completed project', project: '#389', time: '5 min ago' },
      { name: 'Priscilla Russell', action: 'Added new project', project: '#442', time: '8 min ago' }
    ]}
  ];

  return (
    <div className="app-layout" style={{ 
      display: 'flex', 
      height: '100vh', 
      maxHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Backdrop overlay for settings drawer */}
      {showSettingsDrawer && (
        <div 
          onClick={toggleSettings}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.15)',
            zIndex: 1999,
            cursor: 'pointer'
          }}
        />
      )}

      {/* Fixed sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      {/* Scroll-contained content block */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        minWidth: '0',
        overflow: 'hidden'
      }}>
        {/* Fixed navbar */}
        <Navbar onToggleSidebar={toggleSidebar} onToggleSettings={toggleSettings} />
        
        {/* Independently scrollable content viewport */}
        <main className="content-pane" style={{ 
          flex: '1', 
          padding: '24px', 
          overflowY: 'auto', 
          minWidth: '0' 
        }}>
          <Outlet />
        </main>
      </div>

      {/* Settings Drawer Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '320px',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.05)',
        zIndex: 2000,
        transition: 'transform 0.3s ease-in-out',
        transform: showSettingsDrawer ? 'translateX(0)' : 'translateX(100%)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Scrollable container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* User Header Block */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                  <img src={defaultAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '9px', fontWeight: '800', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>8</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>ArtTemplate</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>example@mail.com</span>
              </div>
            </div>

            <button 
              onClick={toggleSettings}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <SettingsIcon size={18} />
            </button>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9' }} />

          {/* Calendar Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><ChevronLeft size={16} /></button>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>September <span style={{ color: '#94a3b8', fontWeight: '500' }}>2020</span></span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><ChevronRight size={16} /></button>
            </div>

            {/* Weekdays */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>
              <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
            </div>

            {/* Days grid matching mockup */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '11px', fontWeight: '600' }}>
              {/* Row 1 */}
              <span style={{ color: '#cbd5e1' }}>28</span><span style={{ color: '#cbd5e1' }}>29</span><span style={{ color: '#cbd5e1' }}>30</span><span style={{ color: '#cbd5e1' }}>31</span><span style={{ color: '#475569' }}>1</span><span style={{ color: '#475569' }}>2</span><span style={{ color: '#475569' }}>3</span>
              {/* Row 2 */}
              <span style={{ color: '#475569' }}>4</span><span style={{ color: '#475569' }}>5</span><span style={{ color: '#475569' }}>6</span><span style={{ color: '#475569' }}>7</span><span style={{ color: '#475569' }}>8</span><span style={{ color: '#475569' }}>9</span><span style={{ color: '#475569' }}>10</span>
              {/* Row 3 with day 12 green circle */}
              <span style={{ color: '#475569' }}>11</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'flex', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>12</span>
              </span>
              <span style={{ color: '#475569' }}>13</span><span style={{ color: '#475569' }}>14</span><span style={{ color: '#475569' }}>15</span><span style={{ color: '#475569' }}>16</span><span style={{ color: '#475569' }}>17</span>
              {/* Row 4 */}
              <span style={{ color: '#475569' }}>18</span><span style={{ color: '#475569' }}>19</span><span style={{ color: '#475569' }}>20</span><span style={{ color: '#475569' }}>21</span><span style={{ color: '#475569' }}>22</span><span style={{ color: '#475569' }}>23</span><span style={{ color: '#475569' }}>24</span>
              {/* Row 5 */}
              <span style={{ color: '#475569' }}>25</span><span style={{ color: '#475569' }}>26</span><span style={{ color: '#475569' }}>27</span><span style={{ color: '#475569' }}>28</span><span style={{ color: '#475569' }}>29</span><span style={{ color: '#475569' }}>30</span><span style={{ color: '#cbd5e1' }}>1</span>
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9' }} />

          {/* Recent Activity Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Activity</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {recentActivities.map((group) => (
                <div key={group.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>{group.dateGroup}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {group.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f1f5f9', flexShrink: 0 }}>
                          <img src={defaultAvatar} alt="Activity User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4', wordBreak: 'break-word' }}>
                            <strong style={{ color: '#1e293b', fontWeight: '600' }}>{item.name} </strong>
                            <span>{item.action} </span>
                            <span style={{ color: '#16a34a', fontWeight: '600' }}>{item.project}</span>
                          </div>
                          <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
