import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  MoreHorizontal, 
  FileText, 
  MessageSquare, 
  Clock, 
  LayoutGrid, 
  AlignJustify,
  X,
  Search,
  Pencil,
  UserPlus,
  Trash2,
  Check,
  Calendar as CalendarIcon,
  ChevronRight
} from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/#2.png';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('Grid');
  
  // Modal & Sidebars trigger states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [activeCardMenuId, setActiveCardMenuId] = useState(null);

  // Form states prefilled to match mockup image
  const [projectName, setProjectName] = useState('App Development');
  const [clientName, setClientName] = useState('Dropbox, Inc.');
  const [description, setDescription] = useState('Create a mobile application on iOS and Android devices.');
  const [startTime, setStartTime] = useState('00:00');
  const [startDate, setStartDate] = useState('12.07.2020');
  const [endTime, setEndTime] = useState('00:00');
  const [endDate, setEndDate] = useState('12.07.2020');
  const [budget, setBudget] = useState('$ 2.500.000');
  const [showMemberPill, setShowMemberPill] = useState(true);

  // Filter sidebar temporary/draft inputs states
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const [filterShowMemberPill, setFilterShowMemberPill] = useState(true);
  const [filterDueDate, setFilterDueDate] = useState('Due anytime');
  const [filterStatus, setFilterStatus] = useState('Completed'); // Mock preselected completed status in sidebar

  // Applied filter states
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('All'); // Show all by default initially
  const [appliedDueDate, setAppliedDueDate] = useState('Due anytime');
  const [appliedShowMemberPill, setAppliedShowMemberPill] = useState(true);

  // Tech Brand SVG Logos
  const logos = {
    dropbox: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L1 5.5L6 9L11 5.5L6 2Z" fill="#0061FE"/>
        <path d="M18 2L13 5.5L18 9L23 5.5L18 2Z" fill="#0061FE"/>
        <path d="M6 16L1 12.5L6 9L11 12.5L6 16Z" fill="#0061FE"/>
        <path d="M18 16L13 12.5L18 9L23 12.5L18 16Z" fill="#0061FE"/>
        <path d="M6 17.5L12 21.5L18 17.5L12 14L6 17.5Z" fill="#0061FE"/>
      </svg>
    ),
    gitlab: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 12.5L12 2.5L1.5 12.5L3.5 18.5L12 22.5L20.5 18.5L22.5 12.5Z" fill="#E24329"/>
        <path d="M12 2.5L1.5 12.5L3.5 18.5L12 22.5V2.5Z" fill="#FC6D26"/>
        <path d="M12 22.5L20.5 18.5L22.5 12.5L12 2.5V22.5Z" fill="#FCA326"/>
      </svg>
    ),
    bitbucket: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 2H2.5L4.5 20L12 22L19.5 20L21.5 2Z" fill="#205081"/>
        <path d="M15.5 8H8.5L9.5 14H14.5L15.5 8Z" fill="#FFFFFF"/>
      </svg>
    ),
    python: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 6 4.5 6 6V8H12V9H5C3.34 9 2 10.34 2 12C2 13.66 3.34 15 5 15H6V17C6 19.5 8.5 22 12 22C17.52 22 18 19.5 18 18V16H12V15H19C20.66 15 22 13.66 22 12C22 10.34 20.66 9 19 9H18V7C18 4.5 15.5 2 12 2ZM9 5.5C9.55 5.5 10 5.95 10 6.5C10 7.05 9.55 7.5 9 7.5C8.45 7.5 8 7.05 8 6.5C8 5.95 8.45 5.5 9 5.5ZM15 16.5C15.55 16.5 16 16.95 16 17.5C16 18.05 15.55 18.5 15 18.5C14.45 18.5 14 18.05 14 17.5C14 16.95 14.45 16.5 15 16.5Z" fill="#3776AB"/>
      </svg>
    ),
    slack: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10.5C5 9.12 6.12 8 7.5 8C8.88 8 10 9.12 10 10.5V13H7.5C6.12 13 5 11.88 5 10.5Z" fill="#36C5F0"/>
        <path d="M7.5 5C6.12 5 5 6.12 5 7.5V10H7.5C8.88 10 10 8.88 10 7.5C10 6.12 8.88 5 7.5 5Z" fill="#ECB22E"/>
        <path d="M19 13.5C19 14.88 17.88 16 16.5 16C15.12 16 14 14.88 14 13.5V11H16.5C17.88 11 19 12.12 19 13.5Z" fill="#2EB67D"/>
        <path d="M16.5 19C17.88 19 19 17.88 19 16.5V14H16.5C15.12 14 14 15.12 14 16.5C14 17.88 15.12 19 16.5 19Z" fill="#E01E5A"/>
      </svg>
    ),
    google: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.52 22.5 10.83 22.38 10.15H12V14.12H17.92C17.67 15.49 16.89 16.65 15.73 17.42V20H19.27C21.34 18.1 22.56 15.28 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.46 22.02 19.27 20L15.73 17.42C14.75 18.08 13.48 18.47 12 18.47C9.13 18.47 6.7 16.54 5.83 13.95H2.17V16.79C3.99 20.4 7.7 23 12 23Z" fill="#34A853"/>
        <path d="M5.83 13.95C5.61 13.29 5.48 12.58 5.48 11.85C5.48 11.12 5.61 10.41 5.83 9.75V6.91H2.17C1.43 8.4 1 10.07 1 11.85C1 13.63 1.43 15.3 2.17 16.79L5.83 13.95Z" fill="#FBBC05"/>
        <path d="M12 5.25C13.62 5.25 15.07 5.81 16.22 6.91L19.35 3.78C17.45 2.01 14.97 1 12 1C7.7 1 3.99 3.6 2.17 7.21L5.83 10.05C6.7 7.46 9.13 5.25 12 5.25Z" fill="#EA4335"/>
      </svg>
    ),
    angular: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 5.5L3.5 18L12 22.5L20.5 18L22 5.5L12 2Z" fill="#DD0031"/>
        <path d="M12 2V22.5L20.5 18L22 5.5L12 2Z" fill="#C3002F"/>
        <path d="M12 6L6.5 16.5H8.8L10 13.5H14L15.2 16.5H17.5L12 6ZM12 8.5L13.2 11.5H10.8L12 8.5Z" fill="#FFFFFF"/>
      </svg>
    ),
    vue: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 1L12 21.5L0 1H5L12 13L19 1H24Z" fill="#41B883"/>
        <path d="M19 1L12 13L5 1H0L12 21.5L24 1H19Z" fill="#35495E"/>
      </svg>
    ),
    facebook: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.13 2 11.23C2 14.13 3.42 16.7 5.66 18.34V22L9.12 20.1C10.04 20.35 11 20.48 12 20.48C17.52 20.48 22 16.35 22 11.23C22 6.13 17.52 2 12 2Z" fill="#0084FF"/>
        <path d="M6.5 13.5L11 9L15 13.5L17.5 11L13 15.5L9 11L6.5 13.5Z" fill="#FFFFFF"/>
      </svg>
    )
  };

  // Projects list matching mockup cards
  const [projectsList, setProjectsList] = useState([
    { id: 1, title: 'App Development', company: 'Dropbox, Inc.', logo: 'dropbox', desc: 'Create a mobile application on iOS and Android devices.', status: 'Started', progress: 50, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar, defaultAvatar] },
    { id: 2, title: 'Website Redesign', company: 'GitLab Inc.', logo: 'gitlab', desc: 'It is necessary to develop a website redesign in a corporate style.', status: 'Started', progress: 75, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar, defaultAvatar] },
    { id: 3, title: 'Landing Page', company: 'Bitbucket, Inc.', logo: 'bitbucket', desc: 'It is necessary to create a landing together with the development of design.', status: 'Completed', progress: 100, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar] },
    { id: 4, title: 'Parser Development', company: 'Drivewat, Inc.', logo: 'python', desc: 'It is necessary to develop a ticket site parser in python.', status: 'Started', progress: 50, files: 8, comments: 40, timeLeft: '5 days left', isUrgent: true, assignees: [defaultAvatar, defaultAvatar, defaultAvatar] },
    { id: 5, title: 'App Development', company: 'Slack Technologies, Inc.', logo: 'slack', desc: 'Create a mobile application on iOS and Android devices.', status: 'Started', progress: 50, files: 8, comments: 40, timeLeft: '5 days left', isUrgent: true, assignees: [defaultAvatar, defaultAvatar] },
    { id: 6, title: 'App Development', company: 'Google, Inc.', logo: 'google', desc: 'Create a mobile application on iOS and Android devices.', status: 'On Hold', progress: 25, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar] },
    { id: 7, title: 'Admin Dashboard', company: 'ArtTemplate, Inc.', logo: 'angular', desc: 'Develop a modern dashboard with full customization settings panels.', status: 'Started', progress: 60, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar] },
    { id: 8, title: 'Web App on Vue.js', company: 'ArtTemplate, Inc.', logo: 'vue', desc: 'Building responsive Single Page Applications inside Vue ecosystem.', status: 'Started', progress: 80, files: 8, comments: 40, timeLeft: '5 days left', isUrgent: true, assignees: [defaultAvatar, defaultAvatar] },
    { id: 9, title: 'App Development', company: 'Facebook, Inc.', logo: 'facebook', desc: 'Create a mobile application on iOS and Android devices.', status: 'On Hold', progress: 10, files: 8, comments: 40, timeLeft: '1 week left', assignees: [defaultAvatar, defaultAvatar] }
  ]);

  // Tab Filtering & Sidebar Filtering logic combined
  const filteredProjects = projectsList.filter(project => {
    // 1. Tab Status filters
    if (activeTab === 'Started' && project.status !== 'Started') return false;
    if (activeTab === 'On Hold' && project.status !== 'On Hold') return false;
    if (activeTab === 'Completed' && project.status !== 'Completed') return false;

    // 2. Sidebar Search Filter
    if (appliedSearchQuery.trim()) {
      const query = appliedSearchQuery.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesCompany = project.company.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCompany) return false;
    }

    // 3. Sidebar Status Filter
    if (appliedStatus && appliedStatus !== 'All') {
      if (appliedStatus === 'Completed' && project.status !== 'Completed') return false;
      if (appliedStatus === 'Started' && project.status !== 'Started') return false;
      if (appliedStatus === 'On Hold' && project.status !== 'On Hold') return false;
    }

    return true;
  });

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim() || !clientName.trim()) return;

    const newProject = {
      id: Date.now(),
      title: projectName,
      company: clientName,
      logo: 'dropbox', 
      desc: description,
      status: 'Started',
      progress: 30,
      files: 0,
      comments: 0,
      timeLeft: '1 week left',
      assignees: [defaultAvatar]
    };

    setProjectsList(prev => [newProject, ...prev]);
    setShowAddModal(false);

    // Reset fields to defaults
    setProjectName('App Development');
    setClientName('Dropbox, Inc.');
    setDescription('Create a mobile application on iOS and Android devices.');
    setStartTime('00:00');
    setStartDate('12.07.2020');
    setEndTime('00:00');
    setEndDate('12.07.2020');
    setBudget('$ 2.500.000');
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjectsList(prev => prev.filter(p => p.id !== id));
      setActiveCardMenuId(null);
    }
  };

  const handleApplyFilters = () => {
    setAppliedSearchQuery(filterSearchQuery);
    setAppliedStatus(filterStatus);
    setAppliedDueDate(filterDueDate);
    setAppliedShowMemberPill(filterShowMemberPill);
  };

  const handleResetFilters = () => {
    setFilterSearchQuery('');
    setFilterStatus('All');
    setFilterDueDate('Due anytime');
    setFilterShowMemberPill(false);

    setAppliedSearchQuery('');
    setAppliedStatus('All');
    setAppliedDueDate('Due anytime');
    setAppliedShowMemberPill(false);
  };

  return (
    <div className="projects-page" style={{ paddingBottom: '30px' }}>
      
      {/* Outer row wrapper to support Filter Sidebar layout */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Main Left Side Content Column */}
        <div style={{ flex: 1 }}>
          
          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Projects</h1>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowFilterSidebar(prev => !prev)}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '6px', 
                  backgroundColor: showFilterSidebar ? '#f1f5f9' : '#ffffff', 
                  color: showFilterSidebar ? '#15803d' : '#64748b', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <SlidersHorizontal size={16} />
              </button>
              
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
                <span>Add Project</span>
              </button>
            </div>
          </div>

          {/* Tabs Menu & Layout view togglers */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid #e2e8f0', 
            marginBottom: '28px',
            paddingBottom: '8px' 
          }}>
            {/* Navigation list */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { id: 'All', label: 'All', count: projectsList.length + 142 },
                { id: 'Started', label: 'Started', count: projectsList.filter(p => p.status === 'Started').length + 120 },
                { id: 'On Hold', label: 'On Hold', count: projectsList.filter(p => p.status === 'On Hold').length + 13 },
                { id: 'Completed', label: 'Completed', count: projectsList.filter(p => p.status === 'Completed').length + 5 }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: '8px 4px',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? '#15803d' : '#64748b',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      outline: 'none'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span style={{ 
                      fontSize: '10px', 
                      padding: '1px 5px', 
                      borderRadius: '10px', 
                      backgroundColor: isActive ? '#dcfce7' : '#f1f5f9',
                      color: isActive ? '#15803d' : '#64748b',
                      fontWeight: '700'
                    }}>
                      {tab.count}
                    </span>
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-9px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#15803d'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Layout Mode switchers */}
            <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                onClick={() => setViewMode('Grid')}
                style={{ 
                  border: 'none', 
                  backgroundColor: viewMode === 'Grid' ? '#f1f5f9' : '#ffffff', 
                  padding: '6px 10px', 
                  cursor: 'pointer', 
                  color: viewMode === 'Grid' ? '#15803d' : '#64748b',
                  borderRight: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('List')}
                style={{ 
                  border: 'none', 
                  backgroundColor: viewMode === 'List' ? '#f1f5f9' : '#ffffff', 
                  padding: '6px 10px', 
                  cursor: 'pointer', 
                  color: viewMode === 'List' ? '#15803d' : '#64748b',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <AlignJustify size={16} />
              </button>
            </div>
          </div>

          {/* Grid wrapper */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: viewMode === 'Grid' ? 'repeat(2, 1fr)' : '1fr', // Stretched columns when sidebar is open
            gap: '24px' 
          }}>
            {filteredProjects.map(project => {
              const isCardMenuOpen = activeCardMenuId === project.id;
              
              return (
                <div 
                  key={project.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    position: 'relative'
                  }}
                >
                  {/* Header: Logo, Company & Menu */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {logos[project.logo] || <FileText size={20} style={{ color: '#94a3b8' }} />}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: '0 0 2px' }}>
                          {project.title}
                        </h3>
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
                          {project.company}
                        </span>
                      </div>
                    </div>

                    <MoreHorizontal 
                      size={18} 
                      onClick={() => setActiveCardMenuId(isCardMenuOpen ? null : project.id)}
                      style={{ color: '#cbd5e1', cursor: 'pointer' }} 
                    />

                    {/* Card action dropdown menu matching mockup options */}
                    {isCardMenuOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '50px',
                        right: '24px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)',
                        zIndex: 99,
                        width: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        textAlign: 'left'
                      }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                          <Pencil size={12} />
                          <span>Edit</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                          <UserPlus size={12} />
                          <span>Add Member</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                          <Clock size={12} />
                          <span>Add Due Date</span>
                        </button>
                        <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#ef4444' }}
                        >
                          <Trash2 size={12} style={{ color: '#ef4444' }} />
                          <span>Delete Project</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description Text */}
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px', textAlign: 'left', minHeight: '38px' }}>
                    {project.desc}
                  </p>

                  {/* Progress Bar widget */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${project.progress}%`, 
                        height: '100%', 
                        backgroundColor: project.progress === 100 ? '#10b981' : '#15803d',
                        borderRadius: '3px' 
                      }} />
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    {/* Assignees avatars list row */}
                    <div style={{ display: 'flex', paddingLeft: '8px' }}>
                      {project.assignees.map((avatar, index) => (
                        <img 
                          key={index}
                          src={avatar} 
                          alt="assignee" 
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%', 
                            border: '2px solid #ffffff', 
                            marginLeft: '-8px',
                            objectFit: 'cover'
                          }}
                        />
                      ))}
                    </div>

                    {/* Countdown time left indicator */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 8px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: project.isUrgent ? '#fff7ed' : '#f1f5f9',
                      color: project.isUrgent ? '#ea580c' : '#64748b'
                    }}>
                      <Clock size={12} style={{ color: project.isUrgent ? '#ea580c' : '#94a3b8' }} />
                      <span>{project.timeLeft}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ==================== RIGHT SIDEBAR: PROJECT FILTER PANEL ==================== */}
        {showFilterSidebar && (
          <div style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Filter</h3>
              <button 
                onClick={() => setShowFilterSidebar(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* 1. Search projects box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#ffffff', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '8px 12px', 
                gap: '8px' 
              }}>
                <Search size={16} style={{ color: '#cbd5e1' }} />
                <input 
                  type="text" 
                  placeholder="Search Projects..." 
                  value={filterSearchQuery}
                  onChange={(e) => setFilterSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
                />
              </div>
            </div>

            {/* 2. Members checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Members</label>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '5px 12px', 
                gap: '8px',
                backgroundColor: '#ffffff',
                minHeight: '38px',
                boxSizing: 'border-box'
              }}>
                {filterShowMemberPill && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    backgroundColor: '#f1f5f9', 
                    padding: '2px 8px', 
                    borderRadius: '16px', 
                    fontSize: '12px', 
                    color: '#475569',
                    fontWeight: '600'
                  }}>
                    <img 
                      src={defaultAvatar} 
                      alt="Shane Black" 
                      style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <span>Shane Black</span>
                    <button 
                      type="button"
                      onClick={() => setFilterShowMemberPill(false)}
                      style={{ border: 'none', background: 'none', padding: 0, color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <input 
                  type="text" 
                  placeholder={filterShowMemberPill ? "" : "Search members..."}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', background: 'none' }}
                />
                <Search size={14} style={{ color: '#cbd5e1' }} />
              </div>
            </div>

            {/* 3. Due Date dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Due Date</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={filterDueDate}
                  onChange={(e) => setFilterDueDate(e.target.value)}
                  style={{ 
                    width: '100%', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '8px', 
                    padding: '8px 12px 8px 36px', 
                    fontSize: '13px', 
                    color: '#475569', 
                    fontWeight: '600',
                    outline: 'none', 
                    backgroundColor: '#ffffff',
                    appearance: 'none'
                  }}
                >
                  <option value="Due anytime">Due anytime</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
                <CalendarIcon size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: '#64748b' }} />
                <ChevronRight size={14} style={{ position: 'absolute', right: '12px', top: '11px', color: '#94a3b8', transform: 'rotate(90deg)' }} />
              </div>
            </div>

            {/* 4. Status selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ 
                    width: '100%', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '8px', 
                    padding: '8px 12px 8px 36px', 
                    fontSize: '13px', 
                    color: '#475569', 
                    fontWeight: '600',
                    outline: 'none', 
                    backgroundColor: '#ffffff',
                    appearance: 'none'
                  }}
                >
                  <option value="Completed">Completed</option>
                  <option value="Started">Started</option>
                  <option value="On Hold">On Hold</option>
                  <option value="All">All Projects</option>
                </select>
                <Check size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: '#64748b' }} />
                <ChevronRight size={14} style={{ position: 'absolute', right: '12px', top: '11px', color: '#94a3b8', transform: 'rotate(90deg)' }} />
              </div>
            </div>

            {/* Footer triggers */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <button 
                type="button"
                onClick={handleApplyFilters}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Apply Filters
              </button>
              <button 
                type="button"
                onClick={handleResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#15803d',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginLeft: '12px'
                }}
              >
                Reset all Filters
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Add Project Modal Overlay Dialog */}
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
            {/* Header / Close button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Add Project</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Dashed Circle Logo Uploader Placeholder */}
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

            {/* Add Project Form */}
            <form onSubmit={handleAddProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Project Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Project Name</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Client Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Client Name</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', height: '70px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Start Date & End Date (Side-by-side row) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Start Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Start Date</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      style={{ width: '55px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', textAlign: 'center', color: '#1e293b' }}
                      required
                    />
                    <select 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                    >
                      <option value="12.07.2020">12.07.2020</option>
                    </select>
                  </div>
                </div>

                {/* End Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>End Date</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{ width: '55px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', textAlign: 'center', color: '#1e293b' }}
                      required
                    />
                    <select 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', backgroundColor: '#fafbfc' }}
                    >
                      <option value="12.07.2020">12.07.2020</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Members */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Members</label>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '8px', 
                  padding: '5px 12px', 
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  minHeight: '38px',
                  boxSizing: 'border-box'
                }}>
                  {showMemberPill && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      backgroundColor: '#f1f5f9', 
                      padding: '2px 8px', 
                      borderRadius: '16px', 
                      fontSize: '12px', 
                      color: '#475569',
                      fontWeight: '600'
                    }}>
                      <img 
                        src={defaultAvatar} 
                        alt="Shane Black" 
                        style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <span>Shane Black</span>
                      <button 
                        type="button"
                        onClick={() => setShowMemberPill(false)}
                        style={{ border: 'none', background: 'none', padding: 0, color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  <input 
                    type="text" 
                    placeholder={showMemberPill ? "" : "Search member..."}
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', background: 'none' }}
                  />
                  <Search size={14} style={{ color: '#cbd5e1' }} />
                </div>
              </div>

              {/* Budget */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Budget</label>
                <input 
                  type="text" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#1e293b' }}
                  required
                />
              </div>

              {/* Submit / Create Button */}
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
                  Create
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;
