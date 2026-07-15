import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  X,
  Pencil,
  Trash2
} from 'lucide-react';

import defaultAvatar from '../../assets/images/profile/#2.png';

const ContactList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  
  // Card menu dropdown toggle state
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Contacts list data with locations, dob and notes matching mockup
  const [contacts, setContacts] = useState([
    { 
      id: 1, 
      name: 'Prasanth', 
      role: 'User', 
      email: 'prasanth@gmail.com', 
      phone: '+91 5533557771', 
      avatar: defaultAvatar,
      location: 'Tirupattur, TN',
      dobDay: '17',
      dobMonth: 'March',
      dobYear: '1995',
      notes: 'Leadership: An experienced team leader\nInfluencing, leading, and delegating abilities\nPlanning and organizing – Organizational abilities.\nAbility to achieve the target within given time.\nCritical thinking, decision making and problem solving skills.'
    },
    { 
      id: 2, 
      name: 'Judith Black', 
      role: 'Creative Director', 
      email: 'black@example.com', 
      phone: '+1 (070) 123-8459', 
      avatar: defaultAvatar,
      location: 'London, UK',
      dobDay: '12',
      dobMonth: 'June',
      dobYear: '1992',
      notes: 'Creative designs and art directing expertise.'
    },
    { 
      id: 3, 
      name: 'Ronald Robertson', 
      role: 'Manager', 
      email: 'robe@example.com', 
      phone: '+1 (070) 123-9221', 
      avatar: defaultAvatar,
      location: 'Paris, France',
      dobDay: '17',
      dobMonth: 'March',
      dobYear: '1995',
      notes: 'Leadership: An experienced team leader\nInfluencing, leading, and delegating abilities\nPlanning and organizing – Organizational abilities.\nAbility to achieve the target within given time.\nCritical thinking, decision making and problem solving skills.'
    },
    { 
      id: 4, 
      name: 'Dustin Williamson', 
      role: 'Designer', 
      email: 'williams@example.com', 
      phone: '+1 (070) 123-0507', 
      avatar: defaultAvatar,
      location: 'Sydney, Australia',
      dobDay: '24',
      dobMonth: 'October',
      dobYear: '1996',
      notes: 'UI/UX layout layouts and interface mockup prototyping.'
    },
    { 
      id: 5, 
      name: 'Calvin Flores', 
      role: 'Manager', 
      email: 'flores@example.com', 
      phone: '+1 (070) 123-4567', 
      avatar: defaultAvatar,
      location: 'Berlin, Germany',
      dobDay: '05',
      dobMonth: 'January',
      dobYear: '1994',
      notes: 'Product sprints and engineering operations management.'
    },
    { 
      id: 6, 
      name: 'Robert Edwards', 
      role: 'Developer', 
      email: 'edwards@example.com', 
      phone: '+1 (070) 123-1147', 
      avatar: defaultAvatar,
      location: 'New York, USA',
      dobDay: '30',
      dobMonth: 'August',
      dobYear: '1990',
      notes: 'Fullstack web application engineering and logic architecture.'
    },
    { 
      id: 7, 
      name: 'Colleen Warren', 
      role: 'Manager', 
      email: 'warren@example.com', 
      phone: '+1 (070) 123-9127', 
      avatar: defaultAvatar,
      location: 'London, UK',
      dobDay: '14',
      dobMonth: 'April',
      dobYear: '1993',
      notes: 'Project coordination and sprint scheduling systems.'
    },
    { 
      id: 8, 
      name: 'Bessie Henry', 
      role: 'Designer', 
      email: 'henry@example.com', 
      phone: '+1 (070) 123-4567', 
      avatar: defaultAvatar,
      location: 'New York, USA',
      dobDay: '20',
      dobMonth: 'December',
      dobYear: '1997',
      notes: 'Graphic assets creation and brand identity design systems.'
    }
  ]);

  // Add form states
  const [firstName, setFirstName] = useState('Prasanth');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('prasanth@gmail.com');
  const [phoneCode, setPhoneCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('(070) 123-4567');
  const [jobTitle, setJobTitle] = useState('Manager');
  const [address, setAddress] = useState('Sochi, Russia');
  const [dobDay, setDobDay] = useState('17');
  const [dobMonth, setDobMonth] = useState('March');
  const [dobYear, setDobYear] = useState('1995');
  const [notes, setNotes] = useState('Type something');

  // Edit form states
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoneCode, setEditPhoneCode] = useState('+1');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editJobTitle, setEditJobTitle] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editDobDay, setEditDobDay] = useState('1');
  const [editDobMonth, setEditDobMonth] = useState('January');
  const [editDobYear, setEditDobYear] = useState('2000');
  const [editNotes, setEditNotes] = useState('');

  // Role Badge Color mapper
  const roleColors = {
    'Manager': { bg: '#dcfce7', text: '#15803d' },
    'User': { bg: '#e0f2fe', text: '#0284c7' },
    'Creative Director': { bg: '#fef9c3', text: '#ca8a04' },
    'Designer': { bg: '#fee2e2', text: '#ef4444' },
    'Developer': { bg: '#e0f2fe', text: '#0284c7' }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    const newContact = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      role: jobTitle || 'Manager',
      email: email || 'user@example.com',
      phone: `${phoneCode} ${phoneNumber}`,
      avatar: defaultAvatar,
      location: address,
      dobDay: dobDay,
      dobMonth: dobMonth,
      dobYear: dobYear,
      notes: notes
    };

    setContacts(prev => [newContact, ...prev]);
    setShowAddModal(false);

    // Reset fields to default mockup values
    setFirstName('Prasanth');
    setLastName('');
    setEmail('prasanth@gmail.com');
    setPhoneCode('+1');
    setPhoneNumber('(070) 123-4567');
    setJobTitle('Manager');
    setAddress('Sochi, Russia');
    setDobDay('17');
    setDobMonth('March');
    setDobYear('1995');
    setNotes('Type something');
  };

  const handleOpenEdit = (contact) => {
    setEditingContactId(contact.id);
    const names = contact.name.split(' ');
    setEditFirstName(names[0] || '');
    setEditLastName(names.slice(1).join(' ') || '');
    setEditEmail(contact.email || '');
    
    const phoneParts = contact.phone.split(' ');
    if (phoneParts.length > 1) {
      setEditPhoneCode(phoneParts[0]);
      setEditPhoneNumber(phoneParts.slice(1).join(' '));
    } else {
      setEditPhoneCode('+1');
      setEditPhoneNumber(contact.phone);
    }
    
    setEditJobTitle(contact.role || '');
    setEditAddress(contact.location || '');
    setEditDobDay(contact.dobDay || '1');
    setEditDobMonth(contact.dobMonth || 'January');
    setEditDobYear(contact.dobYear || '2000');
    setEditNotes(contact.notes || '');
    
    setShowEditModal(true);
    setActiveDropdownId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFirstName.trim() || !editLastName.trim()) return;

    setContacts(prev => prev.map(c => {
      if (c.id === editingContactId) {
        return {
          ...c,
          name: `${editFirstName} ${editLastName}`,
          role: editJobTitle,
          email: editEmail,
          phone: `${editPhoneCode} ${editPhoneNumber}`,
          location: editAddress,
          dobDay: editDobDay,
          dobMonth: editDobMonth,
          dobYear: editDobYear,
          notes: editNotes
        };
      }
      return c;
    }));
    
    setShowEditModal(false);
  };

  const handleDeleteContact = (id) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(prev => prev.filter(c => c.id !== id));
      setActiveDropdownId(null);
    }
  };

  return (
    <div className="contacts-page" style={{ paddingBottom: '30px' }}>
      
      {/* Page Header toolbar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '28px',
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '10px',
        padding: '16px 20px'
      }}>
        
        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 12px', gap: '8px', width: '320px' }}>
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search contact..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
          />
        </div>

        {/* Add Contact Button */}
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#15803d', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: '700', 
            fontSize: '13px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={16} />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Grid of Contacts cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '24px' 
      }}>
        {filteredContacts.length === 0 ? (
          <div style={{ colSpan: '4', padding: '40px', color: '#94a3b8', fontSize: '14px', textAlign: 'center', width: '100%' }}>
            No contacts found matching your search query.
          </div>
        ) : (
          filteredContacts.map(c => {
            const badge = roleColors[c.role] || { bg: '#f1f5f9', text: '#475569' };
            const isDropdownOpen = activeDropdownId === c.id;
            
            return (
              <div 
                key={c.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {/* Dots trigger */}
                <MoreHorizontal 
                  size={18} 
                  onClick={() => setActiveDropdownId(isDropdownOpen ? null : c.id)}
                  style={{ position: 'absolute', right: '16px', top: '16px', color: '#cbd5e1', cursor: 'pointer' }} 
                />

                {/* Dropdown Action Menu */}
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    zIndex: 99,
                    width: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <button 
                      onClick={() => handleOpenEdit(c)}
                      style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: 'none',
                        background: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#475569',
                        hover: { backgroundColor: '#f1f5f9' }
                      }}
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteContact(c.id)}
                      style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: 'none',
                        background: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#ef4444',
                        borderTop: '1px solid #f1f5f9'
                      }}
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                {/* Highly rounded squircle Avatar */}
                <img 
                  src={c.avatar} 
                  alt={c.name} 
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '30px', 
                    objectFit: 'cover',
                    marginBottom: '16px',
                    border: '1px solid #f1f5f9'
                  }}
                />

                {/* Name */}
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>
                  {c.name}
                </h3>

                {/* Role Badge */}
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  backgroundColor: badge.bg,
                  color: badge.text,
                  marginBottom: '14px'
                }}>
                  {c.role}
                </span>

                {/* Contact detail texts */}
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{c.email}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>{c.phone}</div>

                {/* Action buttons footer */}
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    backgroundColor: '#ffffff',
                    color: '#64748b',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Profile
                  </button>
                  
                  <button 
                    onClick={() => navigate('/chat')}
                    style={{
                      flex: '1',
                      padding: '8px 12px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      color: '#64748b',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Message
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* New Contact Dialog Overlay Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(30, 41, 59, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999
        }}>
          <div style={{
            width: '460px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}>
            {/* Header / Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>New Contact</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Circular Photo Uploader Frame */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                border: '2px dashed #e2e8f0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                backgroundColor: '#fafbfc',
                cursor: 'pointer'
              }}>
                <Plus size={20} />
              </div>
            </div>

            {/* Modal Input Form */}
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* First Name & Last Name (Grid row) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Phone</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select 
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    style={{ width: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+7">+7</option>
                  </select>
                  <input 
                    type="text" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
              </div>

              {/* Job Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Job Title</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Address</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                />
              </div>

              {/* Date of Birth */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Date of Birth</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
                  <select 
                    value={dobDay}
                    onChange={(e) => setDobDay(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select 
                    value={dobMonth}
                    onChange={(e) => setDobMonth(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select 
                    value={dobYear}
                    onChange={(e) => setDobYear(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {Array.from({ length: 80 }, (_, i) => String(2026 - i)).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', height: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', color: '#1e293b' }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Add Contact
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Edit Contact Dialog Overlay Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(30, 41, 59, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999
        }}>
          <div style={{
            width: '460px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}>
            {/* Header / Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Edit Contact</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Circular Avatar Frame with pencil icon overlay */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#e2f0fe',
                  border: '2px dashed #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {/* Clean SVG avatar vector matching the mockup placeholder */}
                  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#e0f7fa"/>
                    <path d="M32 38c-8.837 0-16 7.163-16 16h32c0-8.837-7.163-16-16-16z" fill="#0284c7"/>
                    <circle cx="32" cy="22" r="10" fill="#ffb74d"/>
                    <path d="M22 22c0 5.523 4.477 10 10 10s10-4.477 10-10H22z" fill="#f57c00"/>
                  </svg>
                </div>
                {/* Pencil edit badge */}
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  color: '#64748b'
                }}>
                  <Pencil size={11} />
                </div>
              </div>
            </div>

            {/* Modal Input Form */}
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* First Name & Last Name (Grid row) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>First Name</label>
                  <input 
                    type="text" 
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Last Name</label>
                  <input 
                    type="text" 
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Email</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Phone</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select 
                    value={editPhoneCode}
                    onChange={(e) => setEditPhoneCode(e.target.value)}
                    style={{ width: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+7">+7</option>
                  </select>
                  <input 
                    type="text" 
                    value={editPhoneNumber}
                    onChange={(e) => setEditPhoneNumber(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                    required
                  />
                </div>
              </div>

              {/* Job Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Job Title</label>
                <input 
                  type="text" 
                  value={editJobTitle}
                  onChange={(e) => setEditJobTitle(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Address</label>
                <input 
                  type="text" 
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                />
              </div>

              {/* Date of Birth */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Date of Birth</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
                  <select 
                    value={editDobDay}
                    onChange={(e) => setEditDobDay(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select 
                    value={editDobMonth}
                    onChange={(e) => setEditDobMonth(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select 
                    value={editDobYear}
                    onChange={(e) => setEditDobYear(e.target.value)}
                    style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                  >
                    {Array.from({ length: 80 }, (_, i) => String(2026 - i)).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Notes</label>
                <textarea 
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  style={{ width: '100%', height: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', color: '#1e293b' }}
                />
              </div>

              {/* Submit Button (says "Add Contact" to match mockup exactly) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Add Contact
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactList;
