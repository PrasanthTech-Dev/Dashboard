import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  Settings,
  Archive,
  AlertOctagon,
  Trash2,
  FolderOpen,
  Tag,
  Paperclip,
  Star,
  Bookmark,
  Plus,
  Mail,
  X
} from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/avatar.png';

const Inbox = () => {
  // Folder & label states
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection checkmark lists (Theresa Robertson, Brandon Pena, Jacob Hawkins checked in mockup)
  const [selectedIds, setSelectedIds] = useState([2, 4, 5]);

  // Emails list state
  const [emails, setEmails] = useState([
    { id: 1, name: 'Regina Cooper', subject: 'Creative Director Resume', snippet: 'The Arts play a large role in the expression of inner thoughts and bea...', time: '10:45', isStarred: true, isFlagged: true, avatar: defaultAvatar },
    { id: 2, name: 'Dustin Williamson', subject: 'Meeting with friends', snippet: 'We use the Arts as a means of touching that part of us that we cannot rea...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 3, name: 'Jane Wilson', subject: 'UX Conference in New York', snippet: 'The arts allow us to be as specific or as abstract as we please. It hel...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 4, name: 'Brandon Pena', subject: "Muzli's weekly design #236", snippet: 'From dance and music to abstract art our concept of life is shown t...', time: '10:45', isStarred: false, isFlagged: true, avatar: defaultAvatar },
    { id: 5, name: 'Jacob Hawkins', subject: 'Weekly project report', snippet: 'The arts teach us how to communicate through creative expressions of n...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 6, name: 'Shane Black', subject: 'Order Status #24197118', snippet: 'Music, singing, dancing, poetry, and sketching are just a few of the differ...', time: '10:45', isStarred: true, isFlagged: false, avatar: defaultAvatar },
    { id: 7, name: 'Regina Cooper', subject: 'Welcome to Dribbble!', snippet: 'Prepare us to adapt to and respect the ways others think, work, and expr...', time: '10:45', isStarred: true, isFlagged: false, avatar: defaultAvatar },
    { id: 8, name: 'Jane Wilson', subject: 'Creative Director Resume', snippet: 'Show us how to understand human experiences, past and present th...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 9, name: 'Jacob Hawkins', subject: 'Weekly project report', snippet: 'The arts teach us how to communicate through creative expressions of n...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 10, name: 'Dustin Williamson', subject: 'Meeting with friends', snippet: 'We use the Arts as a means of touching that part of us that we cannot rea...', time: '10:45', isStarred: false, isFlagged: true, avatar: defaultAvatar },
    { id: 11, name: 'Regina Cooper', subject: 'Creative Director Resume', snippet: 'The Arts play a large role in the expression of inner thoughts and bea...', time: '10:45', isStarred: true, isFlagged: true, avatar: defaultAvatar },
    { id: 12, name: 'Shane Black', subject: 'Order Status #24197120', snippet: 'Music, singing, dancing, poetry, and sketching are just a few of the differ...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
    { id: 13, name: 'Brandon Pena', subject: "Muzli's weekly design #236", snippet: 'From dance and music to abstract art our concept of life is shown t...', time: '10:45', isStarred: true, isFlagged: false, avatar: defaultAvatar },
    { id: 14, name: 'Jane Wilson', subject: 'Creative Director Resume', snippet: 'Show us how to understand human experiences, past and present th...', time: '10:45', isStarred: false, isFlagged: false, avatar: defaultAvatar },
  ]);

  // Combined filters
  const filteredEmails = emails.filter(email => {
    // 1. Text Search matching sender name or subject
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSender = email.name.toLowerCase().includes(q);
      const matchesSubject = email.subject.toLowerCase().includes(q);
      if (!matchesSender && !matchesSubject) return false;
    }

    // 2. Folder Selection filters
    if (activeFolder === 'Marked' && !email.isStarred) return false;
    if (activeFolder === 'Important' && !email.isFlagged) return false;

    return true;
  });

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredEmails.length && filteredEmails.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmails.map(e => e.id));
    }
  };

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const toggleFlag = (id, e) => {
    e.stopPropagation();
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isFlagged: !email.isFlagged } : email
    ));
  };

  return (
    <div className="mail-page" style={{ 
      display: 'flex', 
      margin: '-24px', // Bleeds layout padding to fit borders full height
      height: 'calc(100vh - 70px)', 
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* 1. INNER MAIL SIDEBAR */}
      <div className="mail-sidebar" style={{ 
        width: '240px', 
        borderRight: '1px solid #e2e8f0', 
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0
      }}>
        {/* New Message Button */}
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#15803d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '700',
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(21, 128, 61, 0.15)'
        }}>
          <Plus size={16} />
          <span>NEW MESSAGE</span>
        </button>

        {/* Folder items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'Inbox', label: 'Inbox', badge: 5 },
            { id: 'Marked', label: 'Marked' },
            { id: 'Drafts', label: 'Drafts' },
            { id: 'Sent', label: 'Sent' },
            { id: 'Important', label: 'Important', badge: 4 },
            { id: 'Deleted', label: 'Deleted' },
          ].map(folder => {
            const isActive = activeFolder === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                  color: isActive ? '#1e293b' : '#64748b',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.1s'
                }}
              >
                <span>{folder.label}</span>
                {folder.badge && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    backgroundColor: isActive ? '#ffffff' : '#fee2e2',
                    color: '#ef4444',
                    padding: '2px 8px',
                    borderRadius: '20px'
                  }}>
                    {folder.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Labels list */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Labels
            </span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#94a3b8', cursor: 'pointer' }}>+</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
            {[
              { name: 'Personal', color: '#0d9488' },
              { name: 'Work', color: '#3b82f6' },
              { name: 'Friends', color: '#10b981' },
              { name: 'Family', color: '#f59e0b' },
              { name: 'Social', color: '#166534' }
            ].map((label, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', fontSize: '13px', color: '#475569', fontWeight: '500', cursor: 'pointer' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: label.color }}></span>
                <span>{label.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. MAIN MAIL CONTENT AREA */}
      <div className="mail-content" style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: '0' 
      }}>
        
        {/* Main Toolbar */}
        <div className="mail-toolbar" style={{
          height: '60px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          backgroundColor: '#fafbfc'
        }}>
          
          {/* Action triggers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#94a3b8' }}>
              <input 
                type="checkbox" 
                checked={selectedIds.length === filteredEmails.length && filteredEmails.length > 0}
                onChange={toggleSelectAll}
                style={{ accentColor: '#15803d', cursor: 'pointer', width: '15px', height: '15px' }}
              />
              <ChevronDown size={14} />
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }}></div>

            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Archive">
              <Archive size={18} />
            </button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Spam">
              <AlertOctagon size={18} />
            </button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Delete">
              <Trash2 size={18} />
            </button>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }}></div>

            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Move folder">
              <FolderOpen size={18} />
            </button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Label tags">
              <Tag size={18} />
            </button>
          </div>

          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px', gap: '8px', width: '300px' }}>
            <Search size={16} style={{ color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}><X size={13} /></button>
            )}
          </div>

          {/* Pagination & Config settings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '13px', color: '#64748b' }}>
            <span>1 of 200</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#cbd5e1' }}><ChevronLeft size={16} /></button>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><ChevronRight size={16} /></button>
            </div>
            
            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }}></div>
            
            <SlidersHorizontal size={16} style={{ cursor: 'pointer', color: '#64748b' }} />
            <Settings size={16} style={{ cursor: 'pointer', color: '#64748b' }} />
          </div>

        </div>

        {/* Mail rows ledger table list */}
        <div style={{ flex: '1', overflowY: 'auto' }}>
          {filteredEmails.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
              No messages found.
            </div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = selectedIds.includes(email.id);
              return (
                <div 
                  key={email.id} 
                  onClick={() => toggleSelectRow(email.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 24px',
                    borderBottom: '1px solid #f1f5f9',
                    gap: '16px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                    transition: 'background-color 0.1s ease',
                    userSelect: 'none'
                  }}
                  className="mail-row"
                >
                  {/* Checkbox */}
                  <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleSelectRow(email.id)}
                      style={{ accentColor: '#15803d', width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                  </div>

                  {/* Star Toggle */}
                  <div onClick={(e) => toggleStar(email.id, e)} style={{ display: 'flex', alignItems: 'center', color: email.isStarred ? '#fbbf24' : '#cbd5e1', cursor: 'pointer' }}>
                    <Star size={16} fill={email.isStarred ? '#fbbf24' : 'none'} strokeWidth={2} />
                  </div>

                  {/* Bookmark Flag Toggle */}
                  <div onClick={(e) => toggleFlag(email.id, e)} style={{ display: 'flex', alignItems: 'center', color: email.isFlagged ? '#ef4444' : '#cbd5e1', cursor: 'pointer' }}>
                    <Bookmark size={16} fill={email.isFlagged ? '#ef4444' : 'none'} strokeWidth={2} />
                  </div>

                  {/* Sender Avatar */}
                  <img 
                    src={email.avatar} 
                    alt={email.name} 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                  />

                  {/* Sender Name */}
                  <div style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: '#1e293b', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {email.name}
                  </div>

                  {/* Subject and Snippet */}
                  <div style={{ flex: '1', minWidth: '0', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>{email.subject}</span>
                    <span style={{ color: '#94a3b8', margin: '0 8px' }}>—</span>
                    <span style={{ color: '#64748b' }}>{email.snippet}</span>
                  </div>

                  {/* Paperclip attachment icon */}
                  <div style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center' }}>
                    <Paperclip size={14} />
                  </div>

                  {/* Timestamp */}
                  <div style={{ width: '50px', fontSize: '12px', color: '#94a3b8', textAlign: 'right', flexShrink: 0 }}>
                    {email.time}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};

export default Inbox;
