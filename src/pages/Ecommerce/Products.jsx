import React, { useState } from 'react';
import { 
  Download, 
  Plus, 
  Search, 
  ChevronDown, 
  MoreHorizontal, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Printer,
  FileSpreadsheet,
  FileText,
  FileDown,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  X,
  UploadCloud,
  GripVertical,
  Trash2,
  Move
} from 'lucide-react';

const Products = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeExportHover, setActiveExportHover] = useState('Excel');
  
  // Interactive layout states
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dropdown suggestions states
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeSuggestionHover, setActiveSuggestionHover] = useState('Apple iPhone 11 Pro Max 64GB Midnight Green');

  // Filter states
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [draftCategory, setDraftCategory] = useState('All');
  const [draftStatus, setDraftStatus] = useState('Available');
  const [priceMin, setPriceMin] = useState(500);
  const [priceMax, setPriceMax] = useState(5500);

  const [selectedIds, setSelectedIds] = useState([2, 3]); // Matches selected rows in mockup

  // Modal Dialog states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [modalTab, setModalTab] = useState('SHIPPING'); // Defaults to SHIPPING tab matching mockup screenshot
  const [newProductName, setNewProductName] = useState('Apple iPhone 11 Pro Max 64GB Midnight Green');
  const [newProductCategory, setNewProductCategory] = useState('Phone');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [tags, setTags] = useState(['Apple', 'iPhone', '64GB']);
  const [newTagInput, setNewTagInput] = useState('');

  // Image list inside modal
  const [uploadedImages, setUploadedImages] = useState([
    { id: 1, position: 1, isCover: true },
    { id: 2, position: 2, isCover: false },
    { id: 3, position: 3, isCover: false }
  ]);

  // Pricing states inside modal
  const [taxExcludedPrice, setTaxExcludedPrice] = useState('2.500');
  const [taxIncludedPrice, setTaxIncludedPrice] = useState('2.600'); 
  const [taxRule, setTaxRule] = useState('US-AL Rate (4%)');
  const [unitPrice, setUnitPrice] = useState('0.00');
  const [unitPer, setUnitPer] = useState(0);

  // Inventory states inside modal
  const [inventorySKU, setInventorySKU] = useState('0');
  const [inventoryQuantity, setInventoryQuantity] = useState(0);

  // Shipping states inside modal
  const [shippingWidth, setShippingWidth] = useState('0cm');
  const [shippingHeight, setShippingHeight] = useState('0cm');
  const [shippingDepth, setShippingDepth] = useState('0cm');
  const [shippingWeight, setShippingWeight] = useState('0kg');
  const [shippingExtraFee, setShippingExtraFee] = useState('0.00');

  const [productsList, setProductsList] = useState([
    { id: 9, name: 'Apple iPhone 11 64GB Purple', productNo: '#0547081', category: 'Phone', date: '12.09.20', price: '$699', status: 'Available' },
    { id: 1, name: 'MacBook Pro 15 Retina Touch Bar MV902', productNo: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Available' },
    { id: 2, name: 'Apple iPhone 11 Pro Max 256GB Space Gray', productNo: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Available' },
    { id: 3, name: 'Apple Watch Series 5 Edition GPS + Cellular', productNo: '#790841', category: 'Watch', date: '12.09.20', price: '$2.500', status: 'Available' },
    { id: 4, name: 'Apple iPhone 11 Pro Max 512GB Space Gray', productNo: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Available' },
    { id: 5, name: 'MacBook Pro 15 Retina Touch Bar MV902', productNo: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Disabled' },
    { id: 6, name: 'Apple iPhone 11 Pro Max 64GB Midnight Green', productNo: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Disabled' },
    { id: 7, name: 'MacBook Pro 15 Retina Touch Bar MV902', productNo: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Available' },
    { id: 8, name: 'Apple Watch Series 5 Edition GPS + Cellular', productNo: '#790841', category: 'Watch', date: '12.09.20', price: '$2.500', status: 'Available' },
  ]);

  // Dynamically compute the filtered list combining all criteria (Tabs, Search, and Dropdowns)
  const filteredProducts = productsList.filter(product => {
    // 1. Text Search matching name or product number
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesNo = product.productNo.toLowerCase().includes(q);
      if (!matchesName && !matchesNo) return false;
    }

    // 2. Tab Selection matching status
    if (activeTab === 'Available' && product.status !== 'Available') return false;
    if (activeTab === 'Disabled' && product.status !== 'Disabled') return false;

    // 3. Dropdown Category filter (applied on save click)
    if (categoryFilter !== 'All' && product.category !== categoryFilter) return false;

    // 4. Dropdown Status filter (applied on save click)
    if (statusFilter !== 'All' && product.status !== statusFilter) return false;

    return true;
  });

  const allSuggestions = [
    'Apple iPhone 11 Pro Max 256GB Space Gray',
    'Apple iPhone 11 Pro Max 64GB Midnight Green',
    'Apple Watch Series 5 Edition GPS + Cellular',
    'Apple iPhone 11 Pro Max 512GB Space Gray',
  ];

  const matchedSuggestions = searchQuery 
    ? allSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : allSuggestions;

  const handleApplyFilter = () => {
    setCategoryFilter(draftCategory);
    setStatusFilter(draftStatus);
    setShowFilterMenu(false);
  };

  const handleClearFilters = () => {
    setCategoryFilter('All');
    setStatusFilter('All');
    setDraftCategory('All');
    setDraftStatus('Available');
  };

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const handleCreateProduct = () => {
    if (!newProductName.trim()) return;

    const newProd = {
      id: productsList.length + 1,
      name: newProductName,
      productNo: `#79${Math.floor(1000 + Math.random() * 9000)}`,
      category: newProductCategory,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.'),
      price: `$${taxExcludedPrice}`,
      status: 'Available'
    };

    setProductsList(prev => [newProd, ...prev]);
    setShowAddProductModal(false);
    
    // Reset modal inputs
    setNewProductName('Apple iPhone 11 Pro Max 64GB Midnight Green');
    setNewProductCategory('Phone');
    setNewProductDescription('');
    setTags(['Apple', 'iPhone', '64GB']);
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags(prev => [...prev, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const handleOpenDetails = (product) => {
    setSelectedProductDetails(product);
    setProductQuantity(1);
    setShowProductDetailsModal(true);
  };

  // Image actions inside modal
  const handleSetCoverImage = (id) => {
    setUploadedImages(prev => prev.map(img => ({
      ...img,
      isCover: img.id === id
    })));
  };

  const handleDeleteImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id).map((img, index) => ({
      ...img,
      position: index + 1
    })));
  };

  const handleBrowseUpload = () => {
    const newImg = {
      id: Date.now(),
      position: uploadedImages.length + 1,
      isCover: uploadedImages.length === 0
    };
    setUploadedImages(prev => [...prev, newImg]);
  };

  // Pricing actions
  const handlePriceChange = (val) => {
    setTaxExcludedPrice(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const rate = taxRule.includes('4%') ? 1.04 : taxRule.includes('15%') ? 1.15 : 1.0;
      setTaxIncludedPrice((num * rate).toFixed(3));
    } else {
      setTaxIncludedPrice('0.000');
    }
  };

  const handleTaxRuleChange = (rule) => {
    setTaxRule(rule);
    const num = parseFloat(taxExcludedPrice);
    if (!isNaN(num)) {
      const rate = rule.includes('4%') ? 1.04 : rule.includes('15%') ? 1.15 : 1.0;
      setTaxIncludedPrice((num * rate).toFixed(3));
    }
  };

  return (
    <div className="products-page" style={{ paddingBottom: '30px', position: 'relative' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Products</h1>
        
        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          
          {/* Export Button dropdown */}
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

          {/* Plus Add button (Opens modal overlay) */}
          <button 
            onClick={() => setShowAddProductModal(true)}
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

      {/* Tabs & View Mode Toggles */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #e2e8f0', 
        paddingBottom: '0px', 
        marginBottom: '20px' 
      }}>
        <div style={{ display: 'flex', gap: '25px' }}>
          {[
            { id: 'All', label: 'All', count: 283 },
            { id: 'Available', label: 'Available', count: 268 },
            { id: 'Disabled', label: 'Disabled', count: 15 },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 4px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#15803d' : '#64748b',
                  borderBottom: isActive ? '2px solid #15803d' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.label}</span>
                <span style={{ 
                  fontSize: '11px', 
                  backgroundColor: isActive ? '#dcfce7' : '#f1f5f9', 
                  color: isActive ? '#15803d' : '#64748b',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontWeight: '700'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* List & Grid switcher */}
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '6px' }}>
          <button 
            onClick={() => setViewMode('list')}
            style={{ 
              border: 'none', 
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer', 
              backgroundColor: viewMode === 'list' ? '#15803d' : 'transparent',
              color: viewMode === 'list' ? '#ffffff' : '#64748b' 
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            style={{ 
              border: 'none', 
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer', 
              backgroundColor: viewMode === 'grid' ? '#15803d' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : '#64748b' 
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>

      {/* Search panel container */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', position: 'relative' }}>
        
        {/* Search input field */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px', gap: '10px', width: '320px', position: 'relative' }}>
          <Search size={18} style={{ color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchSuggestions(true);
            }}
            onFocus={() => setShowSearchSuggestions(true)}
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
          />

          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setShowSearchSuggestions(false); }}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0 4px', display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>
          )}

          <button 
            onClick={() => setShowFilterMenu(prev => !prev)}
            style={{ border: 'none', background: 'none', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <SlidersHorizontal size={16} />
          </button>

          {/* Autocomplete Suggestion Panel Dropdown */}
          {showSearchSuggestions && matchedSuggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '40px',
              left: 0,
              width: '540px', 
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              padding: '6px 0',
              zIndex: 99999,
              textAlign: 'left'
            }}>
              {matchedSuggestions.map((item, idx) => {
                const isHovered = activeSuggestionHover === item;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveSuggestionHover(item)}
                    onClick={() => {
                      setSearchQuery(item);
                      setShowSearchSuggestions(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      fontSize: '13px',
                      color: '#1e293b',
                      cursor: 'pointer',
                      backgroundColor: isHovered ? '#f1f5f9' : 'transparent',
                      fontWeight: isHovered ? '600' : '500'
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {(categoryFilter !== 'All' || statusFilter !== 'All') && (
            <button 
              onClick={handleClearFilters}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #fee2e2', 
                borderRadius: '6px', 
                backgroundColor: '#fef2f2', 
                color: '#ef4444', 
                fontSize: '12px', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              Clear Filters
            </button>
          )}
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
      </div>

      {/* Filter Overlay Card */}
      {showFilterMenu && (
        <div className="filter-dropdown-overlay" style={{
          position: 'absolute',
          top: '185px',
          left: '0px',
          width: '380px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          zIndex: 9999,
          padding: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Filter</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Category</label>
            <div style={{ position: 'relative' }}>
              <select 
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', fontSize: '13px', color: '#475569', appearance: 'none', outline: 'none', fontWeight: '500', cursor: 'pointer' }}
              >
                <option value="All">All</option>
                <option value="Notebook">Notebook</option>
                <option value="Watch">Watch</option>
                <option value="Phone">Phone</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Status</label>
            <div style={{ position: 'relative' }}>
              <select 
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', fontSize: '13px', color: '#475569', appearance: 'none', outline: 'none', fontWeight: '500', cursor: 'pointer' }}
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Disabled">Disabled</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Date</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', flex: '1', fontSize: '13px', color: '#475569' }}>
                <CalendarIcon size={14} style={{ color: '#94a3b8' }} />
                <span>12.07.2020</span>
                <ChevronDown size={14} style={{ color: '#94a3b8', marginLeft: 'auto' }} />
              </div>
              <span style={{ color: '#cbd5e1' }}>-</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', flex: '1', fontSize: '13px', color: '#475569' }}>
                <CalendarIcon size={14} style={{ color: '#94a3b8' }} />
                <span>12.07.2020</span>
                <ChevronDown size={14} style={{ color: '#94a3b8', marginLeft: 'auto' }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '12px' }}>Price</label>
            <div style={{ position: 'relative', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', margin: '15px 10px 12px' }}>
              <div style={{ position: 'absolute', left: '10%', right: '10%', height: '100%', backgroundColor: '#15803d', borderRadius: '3px' }}></div>
              <div style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translate(-50%, -50%)', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '1px', height: '8px', backgroundColor: '#15803d' }}></div><div style={{ width: '1px', height: '8px', backgroundColor: '#15803d' }}></div></div>
              </div>
              <div style={{ position: 'absolute', left: '90%', top: '50%', transform: 'translate(-50%, -50%)', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '1px', height: '8px', backgroundColor: '#15803d' }}></div><div style={{ width: '1px', height: '8px', backgroundColor: '#15803d' }}></div></div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#475569', marginTop: '10px' }}>
              <span>${priceMin.toLocaleString()}</span>
              <span>${priceMax.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleApplyFilter} style={{ padding: '10px 24px', backgroundColor: '#15803d', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* View Conditional display */}
      {viewMode === 'grid' ? (
        
        /* Grid card list */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', fontSize: '14px' }}>
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => toggleSelectRow(product.id)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isSelected ? '2px solid #15803d' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', backgroundColor: product.status === 'Available' ? '#dcfce7' : '#fee2e2', color: product.status === 'Available' ? '#15803d' : '#ef4444' }}>
                      {product.status}
                    </span>
                    {isSelected ? (
                      <CheckCircle2 size={20} style={{ color: '#15803d' }} />
                    ) : (
                      <Circle size={20} style={{ color: '#cbd5e1' }} />
                    )}
                  </div>

                  <div style={{ height: '130px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#94a3b8' }}>
                    <ImageIcon size={40} strokeWidth={1} />
                  </div>

                  <h4 
                    onClick={(e) => { e.stopPropagation(); handleOpenDetails(product); }}
                    style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', margin: '0 0 16px', lineHeight: '1.4', height: '36px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', cursor: 'pointer' }}
                    className="hover-underline"
                  >
                    {product.name}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <span>{product.date}</span>
                    <span style={{ fontWeight: '500' }}>{product.category}</span>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>{product.price}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      ) : (

        /* Classic Table List */
        <div className="card" style={{ padding: '0', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafbfc' }}>
                  <th style={{ padding: '14px 20px', width: '40px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === filteredProducts.length}
                      onChange={toggleSelectAll}
                      style={{ accentColor: '#15803d', cursor: 'pointer' }} 
                    />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Product Name <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Product No. <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Category <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Date <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Price <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                    Status <ChevronDown size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </th>
                  <th style={{ padding: '14px 20px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                      No products found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => {
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
                        <td 
                          onClick={() => handleOpenDetails(item)}
                          style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#1e293b', cursor: 'pointer' }}
                          className="hover-underline"
                        >
                          {item.name}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                          {item.productNo}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                          {item.category}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                          {item.date}
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                          {item.price}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ 
                            fontSize: '11px', 
                            fontWeight: '700', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            backgroundColor: item.status === 'Available' ? '#dcfce7' : '#fee2e2',
                            color: item.status === 'Available' ? '#15803d' : '#ef4444'
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right', color: '#94a3b8', cursor: 'pointer' }}>
                          <MoreHorizontal size={18} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
          <span>Showing 1 - {filteredProducts.length} of {filteredProducts.length}</span>
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

      {/* Product Details Modal */}
      {showProductDetailsModal && selectedProductDetails && (() => {
        const isIPhone11Purple = selectedProductDetails.name === 'Apple iPhone 11 64GB Purple';
        
        const specs = isIPhone11Purple ? [
          { name: 'Display', value: '6.1 inch' },
          { name: 'Chip', value: 'A13 Bionic chip' },
          { name: 'Camera', value: 'Dual 12MP Ultra Wide' },
          { name: 'OS', value: 'iOS 13' },
          { name: 'Capacity', value: '64GB' }
        ] : selectedProductDetails.category === 'Notebook' ? [
          { name: 'Display', value: '15.4 inch Retina' },
          { name: 'Chip', value: 'Intel Core i7' },
          { name: 'Camera', value: '720p FaceTime HD' },
          { name: 'OS', value: 'macOS Big Sur' },
          { name: 'Capacity', value: '256GB' }
        ] : selectedProductDetails.category === 'Watch' ? [
          { name: 'Display', value: '44mm LTPO OLED' },
          { name: 'Chip', value: 'Apple S5 SiP' },
          { name: 'Camera', value: 'N/A' },
          { name: 'OS', value: 'watchOS 6' },
          { name: 'Capacity', value: '32GB' }
        ] : [
          { name: 'Display', value: '6.5 inch Super Retina' },
          { name: 'Chip', value: 'A13 Bionic chip' },
          { name: 'Camera', value: 'Triple 12MP Ultra Wide' },
          { name: 'OS', value: 'iOS 13' },
          { name: 'Capacity', value: '256GB' }
        ];

        const descriptionText = isIPhone11Purple 
          ? "A new dual-camera system captures more of what you see and love. The fastest chip ever in a smartphone and all-day battery life let you do more and charge less. And the highest-quality video in a smartphone, so your memories look better than ever."
          : "Premium high-performance Apple device featuring advanced hardware integration, stellar display quality, and industry-leading software performance benchmarks designed for modern workflows.";

        return (
          <div className="product-details-modal-backdrop" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(30, 41, 59, 0.4)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999, 
          }}>
            <div className="product-details-modal-card" style={{
              width: '840px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              display: 'flex',
              gap: '30px',
              padding: '30px',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}>
              {/* Close button */}
              <button 
                onClick={() => setShowProductDetailsModal(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <X size={16} />
              </button>

              {/* Left Column (Images) */}
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  height: '350px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#cbd5e1'
                }}>
                  <ImageIcon size={80} strokeWidth={0.5} style={{ color: '#94a3b8' }} />
                </div>
                
                {/* Thumbnails Row */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} style={{
                      width: '75px',
                      height: '75px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#cbd5e1'
                    }}>
                      <ImageIcon size={22} strokeWidth={0.7} style={{ color: '#cbd5e1' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Details) */}
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px', lineHeight: '1.3' }}>
                  {selectedProductDetails.name}
                </h2>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px' }}>
                  SKU: {selectedProductDetails.productNo.replace('#', '')}
                </div>
                
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px' }}>
                  {descriptionText}
                </p>

                {/* Quantity and Price */}
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Quantity</span>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', height: '36px', width: '108px', backgroundColor: '#ffffff' }}>
                      <button 
                        onClick={() => setProductQuantity(q => Math.max(1, q - 1))}
                        style={{ width: '36px', height: '100%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#64748b', fontWeight: '600' }}
                      >
                        —
                      </button>
                      <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                        {productQuantity}
                      </span>
                      <button 
                        onClick={() => setProductQuantity(q => q + 1)}
                        style={{ width: '36px', height: '100%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#64748b', fontWeight: '600' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>
                    {selectedProductDetails.price}
                  </div>
                </div>

                {/* Actions row */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button style={{ flex: '1', height: '42px', backgroundColor: '#138a36', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '8px' }}>
                    Add to Cart
                  </button>
                  <button style={{ width: '42px', height: '42px', backgroundColor: '#2dd4bf', color: '#ffffff', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>

                {/* Specifications */}
                <div>
                  <h4 style={{ fontSize: '11px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', marginBottom: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                    Specifications
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {specs.map((spec) => (
                      <div key={spec.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{spec.name}</span>
                        <span style={{ fontSize: '12px', color: '#334155', fontWeight: '700' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit/Add Product Modal overlay backdrop */}
      {showAddProductModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(30, 41, 59, 0.4)', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999, 
        }}>
          {/* Modal Card */}
          <div className="modal-card" style={{
            width: '640px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            
            {/* Modal tabs */}
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #e2e8f0', 
              backgroundColor: '#fafbfc', 
              padding: '0 24px' 
            }}>
              {['INFORMATION', 'IMAGES', 'PRICING', 'INVENTORY', 'SHIPPING'].map((tab) => {
                const isActive = modalTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    style={{
                      padding: '16px 12px',
                      border: 'none',
                      background: 'none',
                      fontSize: '11px',
                      fontWeight: '800',
                      color: isActive ? '#15803d' : '#94a3b8',
                      borderBottom: isActive ? '3.5px solid #15803d' : '3.5px solid transparent',
                      cursor: 'pointer',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Modal form details */}
            <div style={{ padding: '30px', textAlign: 'left', overflowY: 'auto', maxHeight: '70vh' }}>
              
              {/* INFORMATION TAB SECTION */}
              {modalTab === 'INFORMATION' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 24px' }}>Information</h2>
                  
                  {/* Product Name input */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Product Name</label>
                    <input 
                      type="text" 
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#1e293b',
                        outline: 'none',
                        fontWeight: '500'
                      }}
                    />
                  </div>

                  {/* Description editor */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Description</label>
                    <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1', padding: '8px 12px', color: '#64748b' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>A <ChevronDown size={10} /></span>
                        <span style={{ fontSize: '13px', fontWeight: '900', cursor: 'pointer' }}>B</span>
                        <span style={{ fontSize: '13px', fontStyle: 'italic', cursor: 'pointer', fontFamily: 'serif' }}>I</span>
                        <span style={{ fontSize: '13px', textDecoration: 'underline', cursor: 'pointer' }}>U</span>
                        <span style={{ width: '1px', height: '14px', backgroundColor: '#e2e8f0' }}></span>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ cursor: 'pointer' }}><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ cursor: 'pointer' }}><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ cursor: 'pointer' }}><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ cursor: 'pointer' }}><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
                      </div>
                      <textarea 
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        placeholder="Type something"
                        style={{ width: '100%', border: 'none', outline: 'none', padding: '12px', fontSize: '13px', color: '#1e293b', minHeight: '120px', resize: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Category select */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Category</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', fontSize: '13px', color: '#475569', appearance: 'none', outline: 'none', fontWeight: '500', cursor: 'pointer' }}
                      >
                        <option value="Phone">Phone</option>
                        <option value="Notebook">Notebook</option>
                        <option value="Watch">Watch</option>
                      </select>
                      <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  {/* Tags list */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Tags</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', alignItems: 'center', backgroundColor: '#ffffff' }}>
                      {tags.map((tag, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                          <span>{tag}</span>
                          <button onClick={() => removeTag(tag)} style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}><X size={12} /></button>
                        </span>
                      ))}
                      <input 
                        type="text" 
                        placeholder="Add tag..."
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', flex: '1', minWidth: '80px' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* IMAGES TAB SECTION */}
              {modalTab === 'IMAGES' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Images</h2>
                  
                  {/* Upload Box */}
                  <div 
                    onClick={handleBrowseUpload}
                    style={{
                      border: '1px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '28px',
                      textAlign: 'center',
                      backgroundColor: '#fafbfc',
                      marginBottom: '24px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s'
                    }}
                  >
                    <UploadCloud size={32} style={{ color: '#94a3b8', marginBottom: '8px' }} />
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      Drag and Drop or <span style={{ color: '#15803d', fontWeight: '700' }}>Browse</span> to upload
                    </div>
                  </div>

                  {/* Header Labels */}
                  <div style={{ display: 'flex', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '10px', padding: '0 16px' }}>
                    <span style={{ flex: '1.5' }}>Image</span>
                    <span style={{ flex: '1', textAlign: 'center' }}>Position</span>
                    <span style={{ flex: '1', textAlign: 'center' }}>Cover</span>
                    <span style={{ width: '40px' }}></span>
                  </div>

                  {/* Uploaded Images List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {uploadedImages.map((img) => (
                      <div key={img.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        backgroundColor: '#ffffff'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', flex: '0.4', color: '#94a3b8', cursor: img.id === 2 ? 'move' : 'grab' }}>
                          {img.id === 2 ? <Move size={16} /> : <GripVertical size={16} />}
                        </div>

                        <div style={{ flex: '1.1' }}>
                          <div style={{
                            width: '42px',
                            height: '42px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#cbd5e1'
                          }}>
                            <ImageIcon size={20} strokeWidth={1.5} />
                          </div>
                        </div>

                        <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#475569'
                          }}>
                            {img.position}
                          </div>
                        </div>

                        <div 
                          style={{ flex: '1', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                          onClick={() => handleSetCoverImage(img.id)}
                        >
                          {img.isCover ? (
                            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                          ) : (
                            <Circle size={18} style={{ color: '#cbd5e1' }} />
                          )}
                        </div>

                        <button 
                          onClick={() => handleDeleteImage(img.id)}
                          style={{ width: '40px', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRICING TAB SECTION */}
              {modalTab === 'PRICING' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Pricing</h2>
                  
                  {/* Tax Excluded Price */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Tax Excluded Price</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 14px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px', marginRight: '10px', fontWeight: '600' }}>$</span>
                      <input 
                        type="text" 
                        value={taxExcludedPrice}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', fontWeight: '600' }}
                      />
                    </div>
                  </div>

                  {/* Tax Included Price */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Tax Included Price</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 14px', backgroundColor: '#fafbfc' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '10px' }}>$</span>
                      <input 
                        type="text" 
                        value={taxIncludedPrice}
                        readOnly
                        style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: '13px', color: '#64748b', backgroundColor: 'transparent' }}
                      />
                    </div>
                  </div>

                  {/* Tax Rule */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8' }}>Tax Rule</label>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#15803d', cursor: 'pointer' }}>Create New Tax</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <select 
                        value={taxRule}
                        onChange={(e) => handleTaxRuleChange(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          fontSize: '13px',
                          color: '#475569',
                          appearance: 'none',
                          outline: 'none',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="US-AL Rate (4%)">US-AL Rate (4%)</option>
                        <option value="No Tax (0%)">No Tax (0%)</option>
                        <option value="VAT (15%)">VAT (15%)</option>
                      </select>
                      <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  {/* Unit Price and Per column */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px' }}>
                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Unit Price</label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 14px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '13px', marginRight: '10px' }}>$</span>
                        <input 
                          type="text" 
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                          style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b' }}
                        />
                      </div>
                    </div>
                    
                    <span style={{ color: '#cbd5e1', marginTop: '25px' }}>-</span>

                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Per</label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 14px', position: 'relative' }}>
                        <input 
                          type="number" 
                          value={unitPer}
                          onChange={(e) => setUnitPer(parseInt(e.target.value) || 0)}
                          style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INVENTORY TAB SECTION */}
              {modalTab === 'INVENTORY' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Inventory</h2>
                  
                  {/* SKU Input */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>SKU</label>
                    <input 
                      type="text" 
                      value={inventorySKU}
                      onChange={(e) => setInventorySKU(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#1e293b',
                        outline: 'none',
                        fontWeight: '500'
                      }}
                    />
                  </div>

                  {/* Quantity Input */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Quantity</label>
                    <input 
                      type="number" 
                      value={inventoryQuantity}
                      onChange={(e) => setInventoryQuantity(parseInt(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#1e293b',
                        outline: 'none',
                        fontWeight: '500'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* SHIPPING TAB SECTION */}
              {modalTab === 'SHIPPING' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Shipping</h2>
                  
                  {/* Width & Height Row */}
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Width</label>
                      <input 
                        type="text" 
                        value={shippingWidth}
                        onChange={(e) => setShippingWidth(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#1e293b',
                          outline: 'none',
                          fontWeight: '500'
                        }}
                      />
                    </div>
                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Height</label>
                      <input 
                        type="text" 
                        value={shippingHeight}
                        onChange={(e) => setShippingHeight(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#1e293b',
                          outline: 'none',
                          fontWeight: '500'
                        }}
                      />
                    </div>
                  </div>

                  {/* Depth & Weight Row */}
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Depth</label>
                      <input 
                        type="text" 
                        value={shippingDepth}
                        onChange={(e) => setShippingDepth(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#1e293b',
                          outline: 'none',
                          fontWeight: '500'
                        }}
                      />
                    </div>
                    <div style={{ flex: '1' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Weight</label>
                      <input 
                        type="text" 
                        value={shippingWeight}
                        onChange={(e) => setShippingWeight(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#1e293b',
                          outline: 'none',
                          fontWeight: '500'
                        }}
                      />
                    </div>
                  </div>

                  {/* Extra Shipping Fee */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>Extra Shipping Fee</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 14px' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '10px' }}>$</span>
                      <input 
                        type="text" 
                        value={shippingExtraFee}
                        onChange={(e) => setShippingExtraFee(e.target.value)}
                        style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons footer */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleCreateProduct}
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
                  Save
                </button>
                <button 
                  onClick={() => setShowAddProductModal(false)}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Products;
