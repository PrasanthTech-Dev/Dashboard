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
  X
} from 'lucide-react';

const Orders = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeExportHover, setActiveExportHover] = useState('Excel');
  
  // Tab states
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedIds, setSelectedIds] = useState([2, 3, 4]); // Pre-selected rows matching mockup (Theresa Robertson, Nathan Hawkins, Lily Williamson)

  // Orders data list
  const [ordersList, setOrdersList] = useState([
    { id: 1, orderNo: '#790841', customer: 'Claire Warren', date: '12.09.20', total: '$145.85', payment: 'PayPal', status: 'Shipped' },
    { id: 2, orderNo: '#790841', customer: 'Theresa Robertson', date: '12.09.20', total: '$225.15', payment: 'Credit Card', status: 'Shipped' },
    { id: 3, orderNo: '#790841', customer: 'Nathan Hawkins', date: '12.09.20', total: '$45.55', payment: 'PayPal', status: 'Shipped' },
    { id: 4, orderNo: '#790841', customer: 'Lily Williamson', date: '12.09.20', total: '$305.25', payment: 'Credit Card', status: 'Processing' },
    { id: 5, orderNo: '#790841', customer: 'Brooklyn Steward', date: '12.09.20', total: '$483.80', payment: 'Credit Card', status: 'Shipped' },
    { id: 6, orderNo: '#790841', customer: 'Norma Flores', date: '12.09.20', total: '$128.79', payment: 'Payoneer', status: 'Processing' },
    { id: 7, orderNo: '#790841', customer: 'Leslie Mckinney', date: '12.09.20', total: '$105.05', payment: 'Credit Card', status: 'Cancelled' },
    { id: 8, orderNo: '#790841', customer: 'Gregory Black', date: '12.09.20', total: '$1028.15', payment: 'PayPal', status: 'Shipped' },
    { id: 9, orderNo: '#790841', customer: 'Arthur Pendelton', date: '11.09.20', total: '$85.00', payment: 'PayPal', status: 'Pending' },
    { id: 10, orderNo: '#790841', customer: 'Emma Watson', date: '11.09.20', total: '$310.20', payment: 'Credit Card', status: 'Refunded' },
  ]);

  // Combined react filter matching Search Query & Tabs
  const filteredOrders = ordersList.filter(order => {
    // 1. Text Search matching customer name or order number
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesCustomer = order.customer.toLowerCase().includes(q);
      const matchesNo = order.orderNo.toLowerCase().includes(q);
      if (!matchesCustomer && !matchesNo) return false;
    }

    // 2. Tab Selection matching status
    if (activeTab === 'Pending' && order.status !== 'Pending') return false;
    if (activeTab === 'Processing' && order.status !== 'Processing') return false;
    if (activeTab === 'Refunded' && order.status !== 'Refunded') return false;

    return true;
  });

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map(o => o.id));
    }
  };

  return (
    <div className="orders-page" style={{ paddingBottom: '30px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Orders</h1>
        
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
      </div>

      {/* Tabs Menu capsules */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'All', label: 'All', count: 983 },
          { id: 'Pending', label: 'Pending', count: 128 },
          { id: 'Processing', label: 'Processing', count: 15 },
          { id: 'Refunded', label: 'Refunded', count: 8 }
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
            placeholder="Search order..." 
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

      {/* Orders List Table Card */}
      <div className="card" style={{ padding: '0', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafbfc' }}>
                <th style={{ padding: '14px 20px', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredOrders.length}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#15803d', cursor: 'pointer' }} 
                  />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Order No. <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Customer <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Date <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Total <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Payment <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Status <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                </th>
                <th style={{ padding: '14px 20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                    No orders found matching your selection.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((item) => {
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
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.orderNo}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                        {item.customer}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.date}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                        {item.total}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                        {item.payment}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          backgroundColor: item.status === 'Shipped' ? '#dcfce7' 
                                          : item.status === 'Processing' ? '#ffedd5' 
                                          : item.status === 'Cancelled' ? '#fee2e2' 
                                          : item.status === 'Pending' ? '#f1f5f9'
                                          : '#fee2e2',
                          color: item.status === 'Shipped' ? '#15803d' 
                                 : item.status === 'Processing' ? '#ea580c' 
                                 : item.status === 'Cancelled' ? '#ef4444' 
                                 : item.status === 'Pending' ? '#475569'
                                 : '#ef4444'
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
          <span>Showing 1 - {filteredOrders.length} of {filteredOrders.length}</span>
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

export default Orders;
