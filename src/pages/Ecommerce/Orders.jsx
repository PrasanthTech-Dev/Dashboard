import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  ChevronDown, 
  ChevronUp,
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
import defaultAvatar from '../../assets/images/profile/avatar.png';


const Orders = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeExportHover, setActiveExportHover] = useState('Excel');
  
  // Tab states
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedIds, setSelectedIds] = useState([2, 3, 4]); // Pre-selected rows matching mockup (Theresa Robertson, Nathan Hawkins, Lily Williamson)

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('ORDER DETAILS');
  const [showModalExportMenu, setShowModalExportMenu] = useState(false);
  const [billingOpen, setBillingOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  const handleRowClick = (item) => {
    setSelectedOrder({
      orderNo: item.orderNo,
      customer: item.customer,
      email: `${item.customer.toLowerCase().replace(/\s+/g, '')}@examplemail.com`,
      phone: '+1(070) 4567-8800',
      location: '993 E. Brewer St. Holtsville',
      payment: item.payment,
      shipping: 'Carrier',
      transactionId: `00000${item.id}-TXHQ`,
      amount: item.total,
      trackingCode: `FX-01234${item.id}-6`,
      date: '12.09.2019',
      fulfilmentStatus: item.status === 'Shipped' ? 'Delivered' : item.status === 'Processing' ? 'In Progress' : 'Cancelled',
      paymentStatus: item.status === 'Refunded' ? 'Refunded' : item.status === 'Cancelled' ? 'Unpaid' : 'Paid'
    });
    setActiveModalTab('ORDER DETAILS');
  };

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
                    <tr 
                      key={item.id} 
                      onClick={() => handleRowClick(item)}
                      style={{ 
                        borderBottom: '1px solid #f1f5f9', 
                        backgroundColor: isSelected ? '#f8fafc' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td style={{ padding: '14px 20px' }} onClick={(e) => e.stopPropagation()}>
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
                      <td style={{ padding: '14px 20px', textAlign: 'right', color: '#94a3b8' }} onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={18} style={{ cursor: 'pointer' }} />
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

      {/* Order Details Modal Overlay */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)', // sleek dark overlay
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
            maxWidth: '900px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
          }}>
            
            {/* Modal Header Tabs Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 24px',
              height: '56px',
              backgroundColor: '#ffffff'
            }}>
              <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
                {['ORDER DETAILS', 'PRODUCTS', 'INVOICE'].map(tab => {
                  const isActive = activeModalTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveModalTab(tab)}
                      style={{
                        border: 'none',
                        background: 'none',
                        padding: '0',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: isActive ? '#15803d' : '#64748b',
                        borderBottom: isActive ? '3px solid #15803d' : '3px solid transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => setSelectedOrder(null)}
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
                <X size={16} />
              </button>
            </div>

            {/* Modal Content Scrollable area */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              
              {activeModalTab === 'ORDER DETAILS' && (
                <div>
                  {/* Order ID & Export Trigger */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                      Orders <span style={{ color: '#64748b' }}>{selectedOrder.orderNo}</span>
                    </h2>
                    
                    {/* Modal Export Button */}
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={() => setShowModalExportMenu(prev => !prev)}
                        style={{ 
                          padding: '8px 16px', 
                          border: '1px solid #cbd5e1', 
                          borderRadius: '6px', 
                          backgroundColor: '#ffffff', 
                          color: '#334155', 
                          fontSize: '13px', 
                          fontWeight: '600', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px' 
                        }}
                      >
                        <Download size={14} />
                        <span>Export</span>
                        <ChevronDown size={12} />
                      </button>

                      {showModalExportMenu && (
                        <div style={{
                          position: 'absolute',
                          top: '38px',
                          right: 0,
                          width: '140px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          padding: '4px 0',
                          zIndex: 1010
                        }}>
                          {[
                            { name: 'Print', icon: Printer },
                            { name: 'Excel', icon: FileSpreadsheet },
                            { name: 'PDF', icon: FileText },
                            { name: 'CSV', icon: FileDown }
                          ].map(item => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={item.name}
                                onClick={() => setShowModalExportMenu(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '8px 14px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  color: '#334155',
                                  fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                                  e.currentTarget.style.color = '#15803d';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#334155';
                                }}
                              >
                                <Icon size={14} />
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer Section */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Customer</h3>
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#fafbfc', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Name</th>
                            <th style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Email</th>
                            <th style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Phone</th>
                            <th style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img 
                                src={defaultAvatar} 
                                alt={selectedOrder.customer} 
                                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                              />
                              <span style={{ fontWeight: '600', color: '#1e293b' }}>{selectedOrder.customer}</span>
                            </td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{selectedOrder.email}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{selectedOrder.phone}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{selectedOrder.location}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment & Shipping & Status Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.4fr', gap: '20px', marginBottom: '24px' }}>
                    
                    {/* Payment Method Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Payment method</span>
                      <div style={{
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '13px',
                        color: '#334155',
                        fontWeight: '500',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff'
                      }}>
                        <span>{selectedOrder.payment}</span>
                        <ChevronDown size={14} style={{ color: '#94a3b8' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        <div><span style={{ fontWeight: '600', color: '#475569' }}>Transaction ID:</span> {selectedOrder.transactionId}</div>
                        <div><span style={{ fontWeight: '600', color: '#475569' }}>Amount:</span> {selectedOrder.amount}</div>
                      </div>
                    </div>

                    {/* Shipping Method Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Shipping method</span>
                      <div style={{
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '13px',
                        color: '#334155',
                        fontWeight: '500',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff'
                      }}>
                        <span>{selectedOrder.shipping}</span>
                        <ChevronDown size={14} style={{ color: '#94a3b8' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        <div><span style={{ fontWeight: '600', color: '#475569' }}>Tracking Code:</span> {selectedOrder.trackingCode}</div>
                        <div><span style={{ fontWeight: '600', color: '#475569' }}>Date:</span> {selectedOrder.date}</div>
                      </div>
                    </div>

                    {/* Status Card Block */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      border: '1px solid #f1f5f9'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Fulfilment status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{selectedOrder.fulfilmentStatus}</span>
                          <ChevronDown size={12} style={{ color: '#94a3b8' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Payment status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{selectedOrder.paymentStatus}</span>
                          <ChevronDown size={12} style={{ color: '#94a3b8' }} />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Accordion Panels */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    {/* Billing Address Accordion */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setBillingOpen(prev => !prev)}
                        style={{
                          padding: '14px 20px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          userSelect: 'none'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Billing address</span>
                        {billingOpen ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
                      </div>
                      
                      {billingOpen && (
                        <div style={{
                          padding: '20px',
                          borderTop: '1px solid #e2e8f0',
                          backgroundColor: '#fafbfc',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                          gap: '20px',
                          fontSize: '13px',
                          color: '#475569'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>First name:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.customer.split(' ')[0] || ''}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Last name:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.customer.split(' ')[1] || ''}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Address:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.location}</strong></div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>State/Region:</span> <strong style={{ color: '#1e293b' }}>New York</strong></div>
                            <div><span style={{ color: '#64748b' }}>City:</span> <strong style={{ color: '#1e293b' }}>New York</strong></div>
                            <div><span style={{ color: '#64748b' }}>Country:</span> <strong style={{ color: '#1e293b' }}>United States</strong></div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>Phone:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.phone}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Email:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.email}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Postcode:</span> <strong style={{ color: '#1e293b' }}>11742</strong></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shipping Address Accordion */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setShippingOpen(prev => !prev)}
                        style={{
                          padding: '14px 20px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          userSelect: 'none'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Shipping address</span>
                        {shippingOpen ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
                      </div>
                      
                      {shippingOpen && (
                        <div style={{
                          padding: '20px',
                          borderTop: '1px solid #e2e8f0',
                          backgroundColor: '#fafbfc',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                          gap: '20px',
                          fontSize: '13px',
                          color: '#475569'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>First name:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.customer.split(' ')[0] || ''}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Last name:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.customer.split(' ')[1] || ''}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Address:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.location}</strong></div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>State/Region:</span> <strong style={{ color: '#1e293b' }}>New York</strong></div>
                            <div><span style={{ color: '#64748b' }}>City:</span> <strong style={{ color: '#1e293b' }}>New York</strong></div>
                            <div><span style={{ color: '#64748b' }}>Country:</span> <strong style={{ color: '#1e293b' }}>United States</strong></div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div><span style={{ color: '#64748b' }}>Phone:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.phone}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Email:</span> <strong style={{ color: '#1e293b' }}>{selectedOrder.email}</strong></div>
                            <div><span style={{ color: '#64748b' }}>Postcode:</span> <strong style={{ color: '#1e293b' }}>11742</strong></div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {activeModalTab === 'PRODUCTS' && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Ordered Products</h3>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#fafbfc', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Product</th>
                          <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Price</th>
                          <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Quantity</th>
                          <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Wireless Noise-Cancelling Headphones', price: '$250.00', qty: 2, total: '$500.00' },
                          { name: 'Mechanical Gaming Keyboard RGB', price: '$150.00', qty: 1, total: '$150.00' },
                          { name: 'Ultra-wide Curved Desktop Monitor 34"', price: '$650.00', qty: 2, total: '$1,300.00' },
                          { name: 'Ergonomic Premium Office Chair', price: '$550.00', qty: 1, total: '$550.00' },
                        ].map((prod, index) => (
                          <tr key={index} style={{ borderBottom: index < 3 ? '1px solid #e2e8f0' : 'none' }}>
                            <td style={{ padding: '12px 16px', fontWeight: '600', color: '#1e293b' }}>{prod.name}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{prod.price}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{prod.qty}</td>
                            <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1e293b' }}>{prod.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingRight: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '200px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Subtotal:</span>
                        <span>$2,500.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Tax (0%):</span>
                        <span>$0.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                        <span>Total:</span>
                        <span>$2,500.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'INVOICE' && (
                <div>
                  {/* Invoice Header Title & Export Menu */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                      Invoice
                    </h2>
                    
                    {/* Modal Export Button */}
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={() => setShowModalExportMenu(prev => !prev)}
                        style={{ 
                          padding: '8px 16px', 
                          border: '1px solid #cbd5e1', 
                          borderRadius: '6px', 
                          backgroundColor: '#ffffff', 
                          color: '#334155', 
                          fontSize: '13px', 
                          fontWeight: '600', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px' 
                        }}
                      >
                        <Download size={14} />
                        <span>Export</span>
                        <ChevronDown size={12} />
                      </button>

                      {showModalExportMenu && (
                        <div style={{
                          position: 'absolute',
                          top: '38px',
                          right: 0,
                          width: '140px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          padding: '4px 0',
                          zIndex: 1010
                        }}>
                          {[
                            { name: 'Print', icon: Printer },
                            { name: 'Excel', icon: FileSpreadsheet },
                            { name: 'PDF', icon: FileText },
                            { name: 'CSV', icon: FileDown }
                          ].map(item => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={item.name}
                                onClick={() => setShowModalExportMenu(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '8px 14px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  color: '#334155',
                                  fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                                  e.currentTarget.style.color = '#15803d';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#334155';
                                }}
                              >
                                <Icon size={14} />
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clean Invoice Paper */}
                  <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '30px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}>
                    {/* Top Row: Invoice Red Box | Company | Date & Logo */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                      {/* Left: Invoice Red Block */}
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '130px',
                          height: '130px',
                          backgroundColor: '#ff7675', // exact coral red color
                          borderRadius: '4px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: '6px',
                          color: '#ffffff',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', opacity: 0.95 }}>INVOICE</span>
                          <span style={{ fontSize: '18px', fontWeight: '800' }}>{selectedOrder.orderNo}</span>
                        </div>

                        {/* Middle: Rocket Inc. Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#64748b', lineHeight: '1.4', marginTop: '10px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>ROCKET INC.</span>
                          <span>Russell st. 50, Boston, MA, USA, 02199</span>
                          <span>+1 (070) 123-4567</span>
                          <span>info@rocket.com</span>
                          <span>www.rocketboard.com</span>
                        </div>
                      </div>

                      {/* Right: Date & Flower Logo */}
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>September 12, 2019</span>
                        
                        {/* FLOWER Logo SVG */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                          <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                            <span style={{ position: 'absolute', top: 0, left: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ec4899', opacity: 0.85 }}></span>
                            <span style={{ position: 'absolute', bottom: 0, left: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1', opacity: 0.85 }}></span>
                            <span style={{ position: 'absolute', top: '6px', left: 0, width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', opacity: 0.85 }}></span>
                            <span style={{ position: 'absolute', top: '6px', right: 0, width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', opacity: 0.85 }}></span>
                          </div>
                          <span style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px' }}>FLOWER</span>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '30px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left', fontWeight: '700' }}>
                          <th style={{ padding: '12px 0', fontSize: '11px', textTransform: 'uppercase' }}>Product</th>
                          <th style={{ padding: '12px 0', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Price</th>
                          <th style={{ padding: '12px 0', fontSize: '11px', textTransform: 'uppercase', textAlign: 'center' }}>Quantity</th>
                          <th style={{ padding: '12px 0', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'MacBook Pro 15 Retina Touch Bar MV902', price: '$2.500', qty: 1, total: '$2.500' },
                          { name: 'Apple Watch Series 5 Edition GPS + Cellular', price: '$1.500', qty: 2, total: '$3.000' },
                          { name: 'Apple iPhone 11 Pro Max 256GB Space Gray', price: '$1.100', qty: 1, total: '$1.100' }
                        ].map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '16px 0', color: '#1e293b', fontWeight: '600' }}>{item.name}</td>
                            <td style={{ padding: '16px 0', color: '#475569', textAlign: 'right' }}>{item.price}</td>
                            <td style={{ padding: '16px 0', color: '#475569', textAlign: 'center' }}>{item.qty}</td>
                            <td style={{ padding: '16px 0', color: '#1e293b', fontWeight: '700', textAlign: 'right' }}>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals Box */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '11px', letterSpacing: '0.5px' }}>SUBTOTAL</span>
                          <span style={{ fontWeight: '600', color: '#475569' }}>$6.600</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '11px', letterSpacing: '0.5px' }}>TAX(20%)</span>
                          <span style={{ fontWeight: '600', color: '#475569' }}>$7.920</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '11px', letterSpacing: '0.5px' }}>DISCOUNT</span>
                          <span style={{ fontWeight: '600', color: '#475569' }}>-$792</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #e2e8f0', paddingTop: '10px', marginTop: '4px' }}>
                          <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '13px', letterSpacing: '0.5px' }}>TOTAL</span>
                          <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '16px' }}>$7.128</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Print & Download Action buttons below card */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                    <button 
                      onClick={() => window.print()}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Invoice</span>
                    </button>
                    <button 
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#15803d',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={15} />
                      <span>Download PDF</span>
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

export default Orders;
