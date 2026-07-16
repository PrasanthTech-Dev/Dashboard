import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Printer,
  FileSpreadsheet,
  FileText,
  FileDown,
  X,
  Plus
} from 'lucide-react';

import defaultAvatar from '../../assets/images/profile/avatar.png';

const Customers = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeExportHover, setActiveExportHover] = useState('Excel');
  
  // Tab states
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Add Customer Modal states
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [addCustomerStep, setAddCustomerStep] = useState('PROFILE');
  const [newCustomer, setNewCustomer] = useState({
    firstName: 'Regina',
    lastName: 'Cooper',
    email: 'regina_cooper@mail.com',
    phoneCode: '+1',
    phoneNumber: '(070) 4567-8800',
    status: 'Active',
    avatar: defaultAvatar,
    addressLine1: '993 E. Brewer St. Holtsville',
    addressLine2: '',
    city: 'New York',
    country: 'United States',
    stateRegion: 'New York',
    postcode: '11742',
    paymentMethod: 'Credit Card',
    cardNumber: '5890 - 6858 - 6332 - 9843',
    cardHolder: 'Regina Cooper',
    expiryMonth: '12',
    expiryYear: '2023'
  });

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (addCustomerStep === 'PROFILE') setAddCustomerStep('ADDRESS');
    else if (addCustomerStep === 'ADDRESS') setAddCustomerStep('PAYMENT');
    else if (addCustomerStep === 'PAYMENT') setAddCustomerStep('SUBMISSION');
  };

  const handlePrevStep = () => {
    if (addCustomerStep === 'ADDRESS') setAddCustomerStep('PROFILE');
    else if (addCustomerStep === 'PAYMENT') setAddCustomerStep('ADDRESS');
    else if (addCustomerStep === 'SUBMISSION') setAddCustomerStep('PAYMENT');
  };

  const handleSubmitCustomer = () => {
    const newlyCreated = {
      id: customersList.length + 1,
      name: `${newCustomer.firstName} ${newCustomer.lastName}`,
      email: newCustomer.email,
      location: `${newCustomer.city}, ${newCustomer.country}`,
      phone: `${newCustomer.phoneCode} ${newCustomer.phoneNumber}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.'),
      status: newCustomer.status,
      avatar: defaultAvatar
    };
    setCustomersList(prev => [...prev, newlyCreated]);
    setShowAddCustomerModal(false);
    // Reset to default pre-filled data to match the mockup again
    setNewCustomer({
      firstName: 'Regina',
      lastName: 'Cooper',
      email: 'regina_cooper@mail.com',
      phoneCode: '+1',
      phoneNumber: '(070) 4567-8800',
      status: 'Active',
      avatar: defaultAvatar,
      addressLine1: '993 E. Brewer St. Holtsville',
      addressLine2: '',
      city: 'New York',
      country: 'United States',
      stateRegion: 'New York',
      postcode: '11742',
      paymentMethod: 'Credit Card',
      cardNumber: '5890 - 6858 - 6332 - 9843',
      cardHolder: 'Regina Cooper',
      expiryMonth: '12',
      expiryYear: '2023'
    });
    setAddCustomerStep('PROFILE');
  };

  // Customers data list
  const [customersList, setCustomersList] = useState([
    { id: 1, name: 'Prasanth', email: 'prasanth@gmail.com', location: 'Tirupattur, TN', phone: '+91 5533557771', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 2, name: 'Judith Black', email: 'black@example.com', location: 'France, Paris', phone: '+1 (070) 123-8459', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 3, name: 'Ronald Robertson', email: 'robe@example.com', location: 'Sydney, Australia', phone: '+1 (070) 123-9221', date: '12.09.20', status: 'Blocked', avatar: defaultAvatar },
    { id: 4, name: 'Dustin Williamson', email: 'williams@example.com', location: 'Germany, Berlin', phone: '+1 (070) 123-0507', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 5, name: 'Calvin Flores', email: 'flores@example.com', location: 'New York, USA', phone: '+1 (070) 123-3791', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 6, name: 'Robert Edwards', email: 'edwards@example.com', location: 'Shanghai, China', phone: '+1 (070) 123-1147', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 7, name: 'Colleen Warren', email: 'warren@example.com', location: 'Canada, Ottawa', phone: '+1 (070) 123-9127', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
    { id: 8, name: 'Nathan Fox', email: 'fox@example.com', location: 'London, UK', phone: '+1 (070) 123-5073', date: '12.09.20', status: 'Active', avatar: defaultAvatar },
  ]);

  // Combined filters
  const filteredCustomers = customersList.filter(customer => {
    // 1. Text Search matching name, email, phone or location
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = customer.name.toLowerCase().includes(q);
      const matchesEmail = customer.email.toLowerCase().includes(q);
      const matchesLocation = customer.location.toLowerCase().includes(q);
      if (!matchesName && !matchesEmail && !matchesLocation) return false;
    }

    // 2. Tab Selection matching status
    if (activeTab === 'Active' && customer.status !== 'Active') return false;
    if (activeTab === 'Blocked' && customer.status !== 'Blocked') return false;

    return true;
  });

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCustomers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCustomers.map(c => c.id));
    }
  };

  return (
    <div className="customers-page" style={{ paddingBottom: '30px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Customers</h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Export Dropdown Trigger */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowExportMenu(prev => !prev)}
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #cbd5e1', 
                borderRadius: '6px', 
                backgroundColor: '#ffffff', 
                color: '#64748b', 
                fontSize: '13px', 
                fontWeight: '600', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <Download size={16} />
              <span>Export</span>
              <ChevronDown size={14} />
            </button>

            {showExportMenu && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                width: '160px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                padding: '6px 0',
                zIndex: 999
              }}>
                {[
                  { name: 'Print', icon: Printer },
                  { name: 'Excel', icon: FileSpreadsheet },
                  { name: 'PDF', icon: FileText },
                  { name: 'CSV', icon: FileDown }
                ].map(item => {
                  const Icon = item.icon;
                  const isHovered = activeExportHover === item.name;
                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setActiveExportHover(item.name)}
                      onClick={() => setShowExportMenu(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        backgroundColor: isHovered ? '#f1f5f9' : 'transparent',
                        color: isHovered ? '#15803d' : '#475569',
                        fontWeight: isHovered ? '600' : '500'
                      }}
                    >
                      <Icon size={15} style={{ color: isHovered ? '#15803d' : '#64748b' }} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

           {/* Green plus header trigger */}
          <button 
            onClick={() => setShowAddCustomerModal(true)}
            style={{ 
              width: '36px', 
              height: '36px', 
              backgroundColor: '#15803d', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Tabs Menu capsules */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'All', label: 'All', count: 983 },
          { id: 'Active', label: 'Active', count: 968 },
          { id: 'Blocked', label: 'Blocked', count: 15 }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '30px',
                backgroundColor: isActive ? '#ffffff' : '#f1f5f9',
                color: isActive ? '#1e293b' : '#64748b',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
                border: isActive ? '1.5px solid #e2e8f0' : '1.5px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                backgroundColor: isActive ? '#f1f5f9' : '#ffffff',
                color: '#64748b',
                padding: '2px 8px',
                borderRadius: '20px'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and actions panel wrapper */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
        
        {/* Search input box */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px', gap: '10px', width: '320px' }}>
          <Search size={18} style={{ color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
            >
              <X size={14} />
            </button>
          )}
          <SlidersHorizontal size={16} style={{ color: '#64748b', cursor: 'pointer' }} />
        </div>

        {/* Actions Button */}
        <button style={{ 
          padding: '8px 16px', 
          border: '1px solid #cbd5e1', 
          borderRadius: '6px', 
          backgroundColor: '#ffffff', 
          color: '#475569', 
          fontSize: '13px', 
          fontWeight: '600', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>Actions</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Customers List Table Card */}
      <div className="card" style={{ padding: '0', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafbfc' }}>
                <th style={{ padding: '14px 20px', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#15803d', cursor: 'pointer' }} 
                  />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Customer Name <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Location <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Phone <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Date <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Status <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                    No customers found matching your selection.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isSelected ? '#f8fafc' : 'transparent' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item.id)}
                          style={{ accentColor: '#15803d', cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={item.avatar} 
                            alt={item.name} 
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} 
                          />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.name}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.location}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.phone}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.date}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          backgroundColor: item.status === 'Active' ? '#dcfce7' : '#ffedd5',
                          color: item.status === 'Active' ? '#15803d' : '#ea580c'
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right', color: '#94a3b8', cursor: 'pointer' }}>
                        <MoreVertical size={18} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#fafbfc', border: '1px solid #e2e8f0', borderRadius: '0 0 10px 10px', marginTop: '-1px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748b' }}>
          <div style={{ position: 'relative' }}>
            <select style={{ 
              padding: '6px 24px 6px 12px', 
              border: '1px solid #cbd5e1', 
              borderRadius: '6px', 
              backgroundColor: '#ffffff',
              appearance: 'none', 
              outline: 'none', 
              cursor: 'pointer',
              fontWeight: '600',
              color: '#475569'
            }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          </div>
          <span>Showing 1 - {filteredCustomers.length} of {filteredCustomers.length}</span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { label: <ChevronsLeft size={14} />, active: false },
            { label: <ChevronLeft size={14} />, active: false },
            { label: '1', active: true },
            { label: '2', active: false },
            { label: '3', active: false },
            { label: '...', active: false, disabled: true },
            { label: '5', active: false },
            { label: <ChevronRight size={14} />, active: false },
            { label: <ChevronsRight size={14} />, active: false },
          ].map((btn, idx) => (
            <button 
              key={idx}
              disabled={btn.disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                height: '32px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                backgroundColor: btn.active ? '#15803d' : '#ffffff',
                color: btn.active ? '#ffffff' : btn.disabled ? '#cbd5e1' : '#475569',
                fontSize: '13px',
                fontWeight: btn.active ? '700' : '600',
                cursor: btn.disabled ? 'default' : 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Customer Modal Overlay */}
      {showAddCustomerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: '20px'
        }}>
          {/* Modal Container */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
          }}>
            
            {/* Modal Header Tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 20px',
              height: '56px',
              backgroundColor: '#ffffff'
            }}>
              <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
                {['PROFILE', 'ADDRESS', 'PAYMENT', 'SUBMISSION'].map(step => {
                  const isActive = addCustomerStep === step;
                  return (
                    <button
                      key={step}
                      onClick={() => setAddCustomerStep(step)}
                      style={{
                        border: 'none',
                        background: 'none',
                        padding: '0',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: isActive ? '#15803d' : '#64748b',
                        borderBottom: isActive ? '3px solid #15803d' : '3px solid transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        letterSpacing: '0.5px',
                        transition: 'all 0.15s'
                      }}
                    >
                      {step}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => {
                  setShowAddCustomerModal(false);
                  setAddCustomerStep('PROFILE');
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              
              {/* STEP 1: PROFILE */}
              {addCustomerStep === 'PROFILE' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>Profile</h2>
                  
                  {/* Profile Avatar with Edit pencil overlay */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={newCustomer.avatar} 
                        alt="Profile Avatar" 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          border: '2px dashed #cbd5e1',
                          padding: '4px'
                        }} 
                      />
                      <div 
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          right: 0, 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #cbd5e1', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={newCustomer.firstName}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={newCustomer.lastName}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={newCustomer.email}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Phone</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select 
                        name="phoneCode"
                        value={newCustomer.phoneCode}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '80px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
                      >
                        <option value="+1">+1</option>
                        <option value="+91">+91</option>
                        <option value="+44">+44</option>
                        <option value="+33">+33</option>
                      </select>
                      <input 
                        type="text" 
                        name="phoneNumber"
                        value={newCustomer.phoneNumber}
                        onChange={handleNewCustomerInputChange}
                        style={{ flex: 1, padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Status</label>
                    <select 
                      name="status"
                      value={newCustomer.status}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <button 
                      onClick={handleNextStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: ADDRESS */}
              {addCustomerStep === 'ADDRESS' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>Address</h2>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Address Line 1</label>
                    <input 
                      type="text" 
                      name="addressLine1"
                      value={newCustomer.addressLine1}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Address Line 2</label>
                    <input 
                      type="text" 
                      name="addressLine2"
                      placeholder="Optional"
                      value={newCustomer.addressLine2}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={newCustomer.city}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Country</label>
                    <select 
                      name="country"
                      value={newCustomer.country}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="India">India</option>
                      <option value="France">France</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>State/Region</label>
                      <input 
                        type="text" 
                        name="stateRegion"
                        value={newCustomer.stateRegion}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Postcode</label>
                      <input 
                        type="text" 
                        name="postcode"
                        value={newCustomer.postcode}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                    <button 
                      onClick={handlePrevStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={handleNextStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {addCustomerStep === 'PAYMENT' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>Payment</h2>
                  
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '12px', display: 'block' }}>Choose payment method:</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    {/* Credit Card Block */}
                    <div 
                      onClick={() => setNewCustomer(prev => ({ ...prev, paymentMethod: 'Credit Card' }))}
                      style={{
                        border: newCustomer.paymentMethod === 'Credit Card' ? '2px solid #138a36' : '1.5px solid #cbd5e1',
                        padding: '12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '1.5px solid #138a36',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: newCustomer.paymentMethod === 'Credit Card' ? '#138a36' : 'transparent'
                      }}>
                        {newCustomer.paymentMethod === 'Credit Card' && (
                          <svg viewBox="0 0 24 24" width="10" height="10" stroke="#ffffff" strokeWidth="3" fill="none">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Credit Card</span>
                    </div>

                    {/* PayPal Block */}
                    <div 
                      onClick={() => setNewCustomer(prev => ({ ...prev, paymentMethod: 'PayPal' }))}
                      style={{
                        border: newCustomer.paymentMethod === 'PayPal' ? '2px solid #138a36' : '1.5px solid #cbd5e1',
                        padding: '12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.15s',
                        opacity: newCustomer.paymentMethod === 'PayPal' ? 1 : 0.8
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '1.5px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: newCustomer.paymentMethod === 'PayPal' ? '#138a36' : 'transparent'
                      }}>
                        {newCustomer.paymentMethod === 'PayPal' && (
                          <svg viewBox="0 0 24 24" width="10" height="10" stroke="#ffffff" strokeWidth="3" fill="none">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>PayPal</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px', position: 'relative' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        name="cardNumber"
                        value={newCustomer.cardNumber}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 40px 10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                      
                      {/* MasterCard CSS Logo Icon overlay */}
                      <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#eb001b', display: 'inline-block' }}></span>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f79e1b', display: 'inline-block', marginLeft: '-6px', opacity: 0.95 }}></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Card Holder</label>
                    <input 
                      type="text" 
                      name="cardHolder"
                      value={newCustomer.cardHolder}
                      onChange={handleNewCustomerInputChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Month</label>
                      <select 
                        name="expiryMonth"
                        value={newCustomer.expiryMonth}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
                      >
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Year</label>
                      <select 
                        name="expiryYear"
                        value={newCustomer.expiryYear}
                        onChange={handleNewCustomerInputChange}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
                      >
                        {Array.from({ length: 10 }, (_, i) => String(2023 + i)).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                    <button 
                      onClick={handlePrevStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={handleNextStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SUBMISSION */}
              {addCustomerStep === 'SUBMISSION' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>Submission</h2>
                  
                  {/* Summary Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    {/* Profile details summary */}
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>Profile Details</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Name:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.firstName} {newCustomer.lastName}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Email:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.email}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Phone:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.phoneCode} {newCustomer.phoneNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Address details summary */}
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>Address Details</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Address Line 1:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.addressLine1}</span>
                        </div>
                        {newCustomer.addressLine2 && (
                          <div style={{ display: 'flex', fontSize: '13px' }}>
                            <span style={{ color: '#64748b', width: '100px' }}>Address Line 2:</span>
                            <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.addressLine2}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>City:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.city}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Country:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.country}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>State/Region:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.stateRegion}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Postcode:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.postcode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment details summary */}
                    <div style={{ paddingBottom: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>Payment Details</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Card Number:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.cardNumber}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Card Name:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.cardHolder}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: '13px' }}>
                          <span style={{ color: '#64748b', width: '100px' }}>Card Expiry:</span>
                          <span style={{ color: '#1e293b', fontWeight: '600' }}>{newCustomer.expiryMonth}/{newCustomer.expiryYear}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                    <button 
                      onClick={handlePrevStep}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={handleSubmitCustomer}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Customers;
