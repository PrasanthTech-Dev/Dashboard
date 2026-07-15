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

import defaultAvatar from '../../assets/images/profile/#2.png';

const Customers = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeExportHover, setActiveExportHover] = useState('Excel');
  
  // Tab states
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedIds, setSelectedIds] = useState([]);

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

    </div>
  );
};

export default Customers;
