import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Paperclip, 
  Smile, 
  Send, 
  Download, 
  FileText, 
  Edit3, 
  Trash2,
  X
} from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/#2.png';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'incoming', text: 'Hi Cody, any progress on the project? 😳', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80' },
    { 
      id: 2, 
      type: 'outgoing', 
      text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.', 
      time: '1 day ago', 
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150&auto=format&fit=crop&q=80'
      ],
      extraImages: '+3',
      avatar: defaultAvatar 
    },
    { id: 3, type: 'incoming', text: 'It looks amazing. 🤪\nThe customer will be very satisfied.', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80' },
    { id: 4, type: 'outgoing', text: 'Thank you, glad you liked it.\nSend me Styles Guide.', time: '1 day ago', avatar: defaultAvatar },
    { id: 5, type: 'incoming', file: 'StylesGuide.pdf', size: 'StylesGuide.pdf', time: '2 min ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80' },
    { id: 6, type: 'outgoing', text: "I'll see later", time: '1 min ago', avatar: defaultAvatar }
  ]);

  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom helper
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      type: 'outgoing',
      text: inputText,
      time: 'Just now',
      avatar: defaultAvatar
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const appendEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
  };

  const handleDeleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="chat-workspace" style={{ 
      display: 'flex', 
      margin: '-24px', 
      height: 'calc(100vh - 70px)', 
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* ==================== PANEL 1: LEFT SIDEBAR (CONTACTS) ==================== */}
      <div style={{ 
        width: '280px', 
        borderRight: '1px solid #e2e8f0', 
        display: 'flex', 
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Search Input */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px', gap: '8px' }}>
            <Search size={16} style={{ color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
            />
          </div>
        </div>

        {/* Scrollable contact lists */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '16px 8px' }}>
          
          {/* TEAMS */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 8px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Teams</span>
              <Plus size={14} style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* #Managers */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.1s' }} className="sidebar-item-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                    M
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>#Managers</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hello, Mark! I am writing to introduce...</div>
                  </div>
                </div>
              </div>

              {/* #Designers */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.1s' }} className="sidebar-item-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                    D
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>#Designers</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hello. Can you drop the photos...</div>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '10px' }}>4</span>
              </div>
            </div>
          </div>

          {/* PEOPLE */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 8px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>People</span>
              <Plus size={14} style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { name: 'Dustin Williamson', desc: 'Hello, Mark! I am writing to introduce...', online: true, avatar: defaultAvatar },
                { name: 'Jane Wilson', desc: 'We use the Arts as a means of touc...', online: true, unread: 4, active: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80' },
                { name: 'Regina Cooper', desc: 'The Arts play a large role in the expr...', online: true, avatar: defaultAvatar },
                { name: 'Brandon Pena', desc: 'The arts allow us to be as specific or...', online: false, avatar: defaultAvatar },
                { name: 'Jacob Hawkins', desc: 'From dance and music to abstract...', online: true, avatar: defaultAvatar },
                { name: 'Shane Black', desc: 'The arts teach us how to communic...', online: false, avatar: defaultAvatar },
                { name: 'Priscilla Edwards', desc: 'Concept of life is shown through the...', online: true, avatar: defaultAvatar },
                { name: 'Kristin Mccoy', desc: 'Inner thoughts and beauty in my life...', online: false, avatar: defaultAvatar }
              ].map((person, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    backgroundColor: person.active ? '#f1f5f9' : 'transparent',
                    transition: 'background-color 0.1s' 
                  }} 
                  className={person.active ? '' : 'sidebar-item-hover'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={person.avatar} alt={person.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      {person.online && (
                        <span style={{ position: 'absolute', right: 0, bottom: 0, width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid #ffffff' }}></span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{person.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', width: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{person.desc}</div>
                    </div>
                  </div>
                  {person.unread && (
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#ef4444', padding: '2px 6px', borderRadius: '10px' }}>{person.unread}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== PANEL 2: MIDDLE CHAT AREA ==================== */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRight: '1px solid #e2e8f0',
        backgroundColor: '#fafbfc'
      }}>
        {/* Chat Header */}
        <div style={{ 
          height: '70px', 
          borderBottom: '1px solid #e2e8f0', 
          backgroundColor: '#ffffff', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80" alt="Jane Wilson" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', right: 0, bottom: 0, width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid #ffffff' }}></span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Jane Wilson</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8' }}>
            <Plus size={20} style={{ cursor: 'pointer' }} />
            <MoreHorizontal size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Message Stream */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg) => {
            const isIncoming = msg.type === 'incoming';
            return (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', alignSelf: isIncoming ? 'flex-start' : 'flex-end', flexDirection: isIncoming ? 'row' : 'row-reverse', maxWidth: '75%', group: 'true' }} className="message-wrapper">
                <img src={msg.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isIncoming ? 'flex-start' : 'flex-end' }}>
                  
                  {/* Text bubble */}
                  {msg.text && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      
                      {/* Side Actions (Pencil, Trash) on Outgoing Row */}
                      {!isIncoming && (
                        <div style={{ display: 'flex', gap: '8px', color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.15s' }}>
                          <Edit3 size={14} className="hover-action" style={{ color: '#94a3b8' }} />
                          <Trash2 size={14} onClick={() => handleDeleteMessage(msg.id)} style={{ color: '#ef4444' }} />
                        </div>
                      )}

                      <div style={{ 
                        backgroundColor: isIncoming ? '#15803d' : '#ffffff', 
                        color: isIncoming ? '#ffffff' : '#334155', 
                        border: isIncoming ? 'none' : '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '13px',
                        fontWeight: '500',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-line',
                        textAlign: 'left'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  )}

                  {/* Images attachments block */}
                  {msg.images && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
                      {msg.images.map((img, i) => (
                        <img key={i} src={img} alt="Attachment" style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                      ))}
                      {msg.extraImages && (
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>
                          {msg.extraImages}
                        </div>
                      )}
                    </div>
                  )}

                  {/* File Attachment card style */}
                  {msg.file && (
                    <div style={{ 
                      backgroundColor: '#e8f5e9', 
                      border: '1px solid #a7f3d0',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginTop: '8px',
                      width: '280px'
                    }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#15803d', color: '#ffffff', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                        <FileText size={18} />
                      </div>
                      <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.file}</span>
                      </div>
                      <button style={{ border: 'none', backgroundColor: '#15803d', color: '#ffffff', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Download size={14} />
                      </button>
                    </div>
                  )}

                  {/* Timestamp */}
                  <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ 
          padding: '16px 24px', 
          backgroundColor: '#ffffff', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '14px',
          position: 'relative',
          flexShrink: 0
        }}>
          
          <Paperclip size={20} style={{ color: '#94a3b8', cursor: 'pointer' }} />
          
          {/* Smiley emoji trigger */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Smile 
              size={20} 
              onClick={() => setShowEmojiPicker(prev => !prev)}
              style={{ color: showEmojiPicker ? '#15803d' : '#94a3b8', cursor: 'pointer' }} 
            />

            {/* EMOJI PICKER POPUP OVERLAY */}
            {showEmojiPicker && (
              <div style={{
                position: 'absolute',
                bottom: '36px',
                left: 0,
                width: '280px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                padding: '12px',
                zIndex: 999
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', outline: 'none' }} 
                  />
                </div>
                
                {/* Popular section */}
                <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Popular</div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '18px', cursor: 'pointer' }}>
                    {['😳', '😜', '😂', '😎', '👍'].map(emoji => (
                      <span key={emoji} onClick={() => appendEmoji(emoji)} style={{ cursor: 'pointer' }}>{emoji}</span>
                    ))}
                  </div>
                </div>

                {/* Smileys section grid */}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Smileys</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', fontSize: '18px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                    {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓'].map(emoji => (
                      <span key={emoji} onClick={() => appendEmoji(emoji)} style={{ cursor: 'pointer', textAlign: 'center' }}>{emoji}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Typing input */}
          <input 
            type="text" 
            placeholder="Type a message here..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              flex: '1', 
              border: 'none', 
              outline: 'none', 
              fontSize: '13px', 
              color: '#334155' 
            }}
          />

          {/* Green Send Trigger */}
          <button 
            onClick={handleSendMessage}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#15803d',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(21, 128, 61, 0.2)'
            }}
          >
            <Send size={14} fill="#ffffff" />
          </button>
        </div>
      </div>

      {/* ==================== PANEL 3: RIGHT SIDEBAR (PROFILE DETAILS) ==================== */}
      <div style={{ 
        width: '280px', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px', 
        overflowY: 'auto',
        flexShrink: 0
      }}>
        {/* Large Avatar within teal border ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            border: '4px solid #0d9488', 
            padding: '4px',
            position: 'relative',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&fit=crop&q=80" 
              alt="Jane Wilson" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <span style={{ position: 'absolute', right: '6px', bottom: '6px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid #ffffff' }}></span>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>Jane Wilson</h2>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Creative Director</span>
        </div>

        {/* INFO Section */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.5px' }}>Info</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Email</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>example@mail.com</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Phone</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>+123-4567-8800</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Birthday</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>17 March, 1995</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Location</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>New York, NY</div>
            </div>
          </div>
        </div>

        {/* MEDIA Section */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', margin: 0, letterSpacing: '0.5px' }}>Media</h3>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#15803d', cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=120&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=120&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1448375240586-882707db888b?w=120&auto=format&fit=crop&q=80',
            ].map((thumb, idx) => (
              <img 
                key={idx} 
                src={thumb} 
                alt="Attachment thumb" 
                style={{ width: '100%', height: '60px', borderRadius: '6px', objectFit: 'cover' }} 
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Chat;
