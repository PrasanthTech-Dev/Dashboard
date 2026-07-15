import React, { useState } from 'react';
import { 
  ChevronDown, 
  SlidersHorizontal, 
  Plus, 
  MoreHorizontal,
  Calendar as CalendarIcon,
  Paperclip,
  MessageSquare,
  ChevronUp,
  CheckCircle2,
  Circle,
  FileText,
  Layers,
  UserPlus,
  X,
  Search,
  Move,
  ArrowUpDown,
  Check,
  Archive,
  Trash2,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/#2.png';

const TaskBoard = () => {
  // Collapsible sub-task lists states
  const [subtasksOpen, setSubtasksOpen] = useState({
    updating: false,
    template: true
  });

  // Dropdown overlay triggers (only one visible at a time)
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [activeColumnMenu, setActiveColumnMenu] = useState(null);

  const toggleProjectSelector = () => {
    setShowProjectSelector(prev => !prev);
    setShowAddMenu(false);
    setActiveColumnMenu(null);
  };

  const toggleAddMenu = () => {
    setShowAddMenu(prev => !prev);
    setShowProjectSelector(false);
    setActiveColumnMenu(null);
  };

  const toggleColumnMenu = (col) => {
    setActiveColumnMenu(activeColumnMenu === col ? null : col);
    setShowProjectSelector(false);
    setShowAddMenu(false);
  };

  // Dynamic board lists
  const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      title: 'Brand Logo Design',
      desc: 'Make a redesign of the logo in corporate colors.',
      tags: ['#10b981', '#3b82f6'],
      date: 'Jun 17',
      clips: 2,
      comments: 5,
      assignees: [defaultAvatar, defaultAvatar]
    },
    {
      id: 2,
      title: 'New Header Image',
      desc: '',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
      tags: ['#10b981'],
      date: 'Jun 17',
      clips: 1,
      comments: 3,
      assignees: [defaultAvatar]
    },
    {
      id: 3,
      title: 'Wireframe for App',
      desc: 'Make a wramework for an app for a pre-presentation.',
      tags: ['#10b981', '#3b82f6'],
      date: 'Jun 17',
      clips: 0,
      comments: 1,
      assignees: [defaultAvatar, defaultAvatar]
    }
  ]);

  const [inProgressTasks, setInProgressTasks] = useState([
    {
      id: 4,
      title: 'Updating Modules',
      desc: 'Step-by-step update of modules.',
      tags: ['#10b981', '#3b82f6'],
      date: 'Jun 17',
      clips: 2,
      comments: 5,
      isUpdatingModules: true, 
      assignees: [defaultAvatar, defaultAvatar]
    },
    {
      id: 5,
      title: 'Template Progress',
      desc: 'Designing cool UI design templates.',
      tags: ['#10b981'],
      date: 'Jun 17',
      clips: 2,
      comments: 5,
      isTemplateProgress: true,
      assignees: [defaultAvatar, defaultAvatar]
    }
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 6,
      title: 'Refresh Photo Slider',
      desc: '',
      images: [
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&auto=format&fit=crop&q=80'
      ],
      tags: ['#10b981'],
      date: 'Jun 17',
      clips: 3,
      comments: 2,
      assignees: [defaultAvatar, defaultAvatar]
    },
    {
      id: 7,
      title: 'Server Startup',
      desc: 'Running the server in test mode and configuring.',
      tags: ['#10b981', '#3b82f6'],
      date: 'Jun 17',
      clips: 0,
      comments: 17,
      assignees: [defaultAvatar, defaultAvatar]
    },
    {
      id: 8,
      title: 'New Background',
      desc: '',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
      tags: ['#10b981'],
      date: 'Jun 17',
      clips: 1,
      comments: 2,
      assignees: [defaultAvatar]
    }
  ]);

  // Interactive Checklist inside Template Progress card
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: 'Inbox Template', completed: true },
    { id: 2, text: 'Chat Template', completed: true },
    { id: 3, text: 'Tasks Template', completed: true },
    { id: 4, text: 'Projects Template', completed: false }
  ]);

  // Compute checklist calculations reactively
  const totalSubtasks = checklistItems.length;
  const completedSubtasks = checklistItems.filter(i => i.completed).length;
  const percentageCompleted = Math.round((completedSubtasks / totalSubtasks) * 100);

  const toggleChecklistItem = (id) => {
    setChecklistItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleCollapse = (card) => {
    setSubtasksOpen(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const handleAddNewTask = (column) => {
    const title = prompt('Enter Task Title:');
    if (!title) return;
    
    const newTask = {
      id: Date.now(),
      title: title,
      desc: 'Description details...',
      tags: ['#3b82f6'],
      date: 'Jun 17',
      clips: 0,
      comments: 0,
      assignees: [defaultAvatar]
    };

    if (column === 'todo') setTodoTasks(prev => [...prev, newTask]);
    if (column === 'progress') setInProgressTasks(prev => [...prev, newTask]);
    if (column === 'completed') setCompletedTasks(prev => [...prev, newTask]);
  };

  const handleColumnAction = (col, action) => {
    if (action === 'delete') {
      if (confirm(`Are you sure you want to delete all tasks in ${col.toUpperCase()} column?`)) {
        if (col === 'todo') setTodoTasks([]);
        if (col === 'progress') setInProgressTasks([]);
        if (col === 'completed') setCompletedTasks([]);
      }
    }
    setActiveColumnMenu(null);
  };

  // Render Column dropdown action panel
  const renderColumnMenu = (colName) => {
    return (
      <div style={{
        position: 'absolute',
        top: '48px',
        right: '16px',
        backgroundColor: '#ffffff',
        border: '1.5px solid #cbd5e1',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        zIndex: 9999,
        width: '170px',
        padding: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'left'
      }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', width: '100%' }}>
          <Move size={13} style={{ color: '#64748b' }} />
          <span>Move</span>
        </button>
        <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={13} style={{ color: '#64748b' }} />
            <span>Sort Tasks</span>
          </div>
          <ChevronRight size={12} style={{ color: '#94a3b8' }} />
        </button>
        <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', width: '100%' }}>
          <Check size={13} style={{ color: '#64748b' }} />
          <span>Complete Tasks</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', width: '100%' }}>
          <Archive size={13} style={{ color: '#64748b' }} />
          <span>Archive Tasks</span>
        </button>
        <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }} />
        <button 
          onClick={() => handleColumnAction(colName, 'delete')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#ef4444', width: '100%' }}
        >
          <Trash2 size={13} style={{ color: '#ef4444' }} />
          <span>Delete Tasks</span>
        </button>
        
        <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '6px 0' }} />
        <div style={{ padding: '4px 16px', fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Label Color</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', padding: '8px 16px' }}>
          {['#ef4444', '#06b6d4', '#f59e0b', '#10b981', '#3b82f6', '#84cc16', '#a855f7', '#ec4899', '#94a3b8'].map((colorCode) => (
            <button 
              key={colorCode}
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: colorCode,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="taskboard-page" style={{ paddingBottom: '40px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        
        {/* Project Selector Trigger */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={toggleProjectSelector}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Design Plan</h1>
            <ChevronDown size={20} style={{ color: '#64748b', marginTop: '4px' }} />
          </div>

          {/* Project Switcher Dropdown */}
          {showProjectSelector && (
            <div style={{
              position: 'absolute',
              top: '36px',
              left: 0,
              backgroundColor: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              zIndex: 99999,
              width: '240px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</span>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#ffffff', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '6px 12px', 
                gap: '8px' 
              }}>
                <Search size={14} style={{ color: '#cbd5e1' }} />
                <input 
                  type="text" 
                  placeholder="Search Project..." 
                  style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#1e293b', width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                {[
                  { name: 'Design Plans', active: true },
                  { name: 'Wireframe UI Kit' },
                  { name: 'Admin Dashboard' },
                  { name: 'Sochi – Hotel Booking' }
                ].map((proj) => (
                  <div key={proj.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '600', color: proj.active ? '#15803d' : '#475569', cursor: 'pointer', padding: '4px 0' }}>
                    <span>{proj.name}</span>
                    {proj.active && <Check size={14} style={{ color: '#16a34a' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toolbar controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ 
            width: '36px', 
            height: '36px', 
            border: '1px solid #cbd5e1', 
            borderRadius: '6px', 
            backgroundColor: '#ffffff', 
            color: '#64748b', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <SlidersHorizontal size={16} />
          </button>
          
          {/* Add Dropdown Actions wrapper */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={toggleAddMenu}
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
                gap: '6px'
              }}
            >
              <span>Add</span>
              <ChevronDown size={14} />
            </button>

            {showAddMenu && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)',
                zIndex: 99999,
                width: '130px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                textAlign: 'left'
              }}>
                {[
                  { name: 'Task', icon: <FileText size={13} style={{ color: '#64748b' }} /> },
                  { name: 'Board', icon: <LayoutGrid size={13} style={{ color: '#64748b' }} /> },
                  { name: 'Project', icon: <Layers size={13} style={{ color: '#64748b' }} /> },
                  { name: 'Invite', icon: <UserPlus size={13} style={{ color: '#64748b' }} /> }
                ].map((act) => (
                  <button 
                    key={act.name} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '10px 14px', 
                      border: 'none', 
                      background: 'none', 
                      cursor: 'pointer', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#475569',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {act.icon}
                    <span>{act.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Board columns wrapper */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* ==================== TODO COLUMN ==================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Banner */}
          <div style={{ 
            backgroundColor: '#15803d', 
            color: '#ffffff', 
            borderRadius: '10px', 
            padding: '12px 16px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>TODO</span>
              <span style={{ fontSize: '11px', fontWeight: '900', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px' }}>
                {todoTasks.length}
              </span>
            </div>
            <MoreHorizontal 
              size={18} 
              onClick={() => toggleColumnMenu('todo')}
              style={{ cursor: 'pointer' }} 
            />

            {activeColumnMenu === 'todo' && renderColumnMenu('todo')}
          </div>

          {/* Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {todoTasks.map(task => (
              <div key={task.id} style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {task.tags.map((tagColor, idx) => (
                      <span key={idx} style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: tagColor }}></span>
                    ))}
                  </div>
                  {/* Date indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>
                    <CalendarIcon size={12} />
                    <span>{task.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px', textAlign: 'left' }}>
                  {task.title}
                </h3>
                
                {task.desc && (
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.5', textAlign: 'left' }}>
                    {task.desc}
                  </p>
                )}

                {task.image && (
                  <img src={task.image} alt={task.title} style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover', marginBottom: '16px' }} />
                )}

                {/* Footer details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: task.desc || task.image ? '0' : '8px' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <Paperclip size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.clips}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <MessageSquare size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.comments}</span>
                    </div>
                  </div>

                  {/* Assignees stacking */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {task.assignees.map((pic, idx) => (
                      <img 
                        key={idx} 
                        src={pic} 
                        alt="Assignee" 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid #ffffff', 
                          marginLeft: idx > 0 ? '-8px' : '0',
                          objectFit: 'cover' 
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plus Add button */}
          <button 
            onClick={() => handleAddNewTask('todo')}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#15803d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              boxShadow: '0 4px 6px -1px rgba(21, 128, 61, 0.2)'
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* ==================== IN PROGRESS COLUMN ==================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Banner */}
          <div style={{ 
            backgroundColor: '#15803d', 
            color: '#ffffff', 
            borderRadius: '10px', 
            padding: '12px 16px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>IN PROGRESS</span>
              <span style={{ fontSize: '11px', fontWeight: '900', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px' }}>
                {inProgressTasks.length}
              </span>
            </div>
            <MoreHorizontal 
              size={18} 
              onClick={() => toggleColumnMenu('progress')}
              style={{ cursor: 'pointer' }} 
            />

            {activeColumnMenu === 'progress' && renderColumnMenu('progress')}
          </div>

          {/* Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {inProgressTasks.map(task => (
              <div key={task.id} style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {task.tags.map((tagColor, idx) => (
                      <span key={idx} style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: tagColor }}></span>
                    ))}
                  </div>
                  {/* Date indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>
                    <CalendarIcon size={12} />
                    <span>{task.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px', textAlign: 'left' }}>
                  {task.title}
                </h3>
                
                {task.desc && (
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.5', textAlign: 'left' }}>
                    {task.desc}
                  </p>
                )}

                {/* Sub-Tasks checklist details */}
                {task.isUpdatingModules && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>
                      <span>SUB-TASKS: 4</span>
                      <span>50%</span>
                    </div>
                    {/* Progress track bar */}
                    <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginBottom: '8px', overflow: 'hidden' }}>
                      <div style={{ width: '50%', height: '100%', backgroundColor: '#15803d', borderRadius: '3px' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button 
                        onClick={() => toggleCollapse('updating')}
                        style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                      >
                        {subtasksOpen.updating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {task.isTemplateProgress && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>
                      <span>SUB-TASKS: {totalSubtasks}</span>
                      <span>{percentageCompleted}%</span>
                    </div>
                    {/* Progress track bar */}
                    <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginBottom: '12px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentageCompleted}%`, height: '100%', backgroundColor: '#15803d', borderRadius: '3px', transition: 'width 0.2s ease' }}></div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                      <button 
                        onClick={() => toggleCollapse('template')}
                        style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                      >
                        {subtasksOpen.template ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                    {/* Sub-task items checklist */}
                    {subtasksOpen.template && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        {checklistItems.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => toggleChecklistItem(item.id)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '12px', 
                              backgroundColor: '#f8fafc', 
                              padding: '8px 12px', 
                              borderRadius: '6px', 
                              fontSize: '12px',
                              color: '#475569',
                              fontWeight: '600',
                              cursor: 'pointer',
                              userSelect: 'none'
                            }}
                          >
                            {item.completed ? (
                              <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                            ) : (
                              <Circle size={16} style={{ color: '#cbd5e1', flexShrink: 0 }} />
                            )}
                            <span style={{ textDecoration: item.completed ? 'none' : 'none' }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <Paperclip size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.clips}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <MessageSquare size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.comments}</span>
                    </div>
                  </div>

                  {/* Assignees stacking */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {task.assignees.map((pic, idx) => (
                      <img 
                        key={idx} 
                        src={pic} 
                        alt="Assignee" 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid #ffffff', 
                          marginLeft: idx > 0 ? '-8px' : '0',
                          objectFit: 'cover' 
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plus Add button */}
          <button 
            onClick={() => handleAddNewTask('progress')}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#15803d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              boxShadow: '0 4px 6px -1px rgba(21, 128, 61, 0.2)'
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* ==================== COMPLETED COLUMN ==================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Banner */}
          <div style={{ 
            backgroundColor: '#15803d', 
            color: '#ffffff', 
            borderRadius: '10px', 
            padding: '12px 16px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>COMPLETED</span>
              <span style={{ fontSize: '11px', fontWeight: '900', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px' }}>
                {completedTasks.length}
              </span>
            </div>
            <MoreHorizontal 
              size={18} 
              onClick={() => toggleColumnMenu('completed')}
              style={{ cursor: 'pointer' }} 
            />

            {activeColumnMenu === 'completed' && renderColumnMenu('completed')}
          </div>

          {/* Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {completedTasks.map(task => (
              <div key={task.id} style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {task.tags.map((tagColor, idx) => (
                      <span key={idx} style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: tagColor }}></span>
                    ))}
                  </div>
                  {/* Date indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>
                    <CalendarIcon size={12} />
                    <span>{task.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px', textAlign: 'left' }}>
                  {task.title}
                </h3>
                
                {task.desc && (
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.5', textAlign: 'left' }}>
                    {task.desc}
                  </p>
                )}

                {/* Media banner image */}
                {task.image && (
                  <img src={task.image} alt={task.title} style={{ width: '100%', height: '140px', borderRadius: '8px', objectFit: 'cover', marginBottom: '16px' }} />
                )}

                {/* Multiple side-by-side images thumb list */}
                {task.images && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                    {task.images.map((imgUrl, i) => (
                      <img key={i} src={imgUrl} alt="Thumbnail" style={{ width: '100%', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}

                {/* Footer details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: task.desc || task.image || task.images ? '0' : '8px' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <Paperclip size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.clips}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                      <MessageSquare size={14} style={{ color: '#cbd5e1' }} />
                      <span>{task.comments}</span>
                    </div>
                  </div>

                  {/* Assignees stacking */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {task.assignees.map((pic, idx) => (
                      <img 
                        key={idx} 
                        src={pic} 
                        alt="Assignee" 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '2px solid #ffffff', 
                          marginLeft: idx > 0 ? '-8px' : '0',
                          objectFit: 'cover' 
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plus Add button */}
          <button 
            onClick={() => handleAddNewTask('completed')}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#15803d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              boxShadow: '0 4px 6px -1px rgba(21, 128, 61, 0.2)'
            }}
          >
            <Plus size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default TaskBoard;
