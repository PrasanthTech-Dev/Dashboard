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
import defaultAvatar from '../../assets/images/profile/avatar.png';

const TaskBoard = () => {
  const [subtasksOpen, setSubtasksOpen] = useState({
    updating: false,
    template: true
  });

  // Filter sidebar states
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filterDueDate, setFilterDueDate] = useState('Due anytime');
  const [filterStatus, setFilterStatus] = useState('Completed');

  // Board Labels state
  const [boardLabels, setBoardLabels] = useState([
    { id: 1, name: 'Wireframing', color: '#06b6d4' },
    { id: 2, name: 'Design', color: '#10b981' },
    { id: 3, name: 'Frontend', color: '#3b82f6' },
    { id: 4, name: 'Backend', color: '#ef4444' }
  ]);
  const [showAddLabelModal, setShowAddLabelModal] = useState(false);
  const [activeColorPickerLabelId, setActiveColorPickerLabelId] = useState(null);
  
  // Details Modal Labels Dropdown states
  const [showLabelsDropdown, setShowLabelsDropdown] = useState(false);
  const [labelSearchQuery, setLabelSearchQuery] = useState('');

  const toggleTaskTag = (tagColor) => {
    if (!selectedTask) return;
    
    const updateList = (prev) => prev.map(t => {
      if (t.id === selectedTask.id) {
        const hasTag = t.tags.includes(tagColor);
        const updatedTags = hasTag 
          ? t.tags.filter(tg => tg !== tagColor) 
          : [...t.tags, tagColor];
        
        // Update selected task in-place for active details modal
        setSelectedTask(prevSelected => ({ ...prevSelected, tags: updatedTags }));
        return { ...t, tags: updatedTags };
      }
      return t;
    });

    setTodoTasks(updateList);
    setInProgressTasks(updateList);
    setCompletedTasks(updateList);
  };

  // Assignee & Due Date states
  const [showAssignToDropdown, setShowAssignToDropdown] = useState(false);
  const [assignToSearchQuery, setAssignToSearchQuery] = useState('');
  const [showDueDateDropdown, setShowDueDateDropdown] = useState(false);
  const [dueDateTime, setDueDateTime] = useState('10:00 AM');

  // Assignee toggler
  const toggleTaskAssignee = (picUrl) => {
    if (!selectedTask) return;
    const updateList = (prev) => prev.map(t => {
      if (t.id === selectedTask.id) {
        const hasAssignee = t.assignees.includes(picUrl);
        const updatedAssignees = hasAssignee
          ? t.assignees.filter(pic => pic !== picUrl)
          : [...t.assignees, picUrl];
        
        setSelectedTask(prevSelected => ({ ...prevSelected, assignees: updatedAssignees }));
        return { ...t, assignees: updatedAssignees };
      }
      return t;
    });

    setTodoTasks(updateList);
    setInProgressTasks(updateList);
    setCompletedTasks(updateList);
  };

  // Due date toggler
  const updateTaskDueDate = (newDateStr) => {
    if (!selectedTask) return;
    const updateList = (prev) => prev.map(t => {
      if (t.id === selectedTask.id) {
        setSelectedTask(prevSelected => ({ ...prevSelected, date: newDateStr }));
        return { ...t, date: newDateStr };
      }
      return t;
    });
    setTodoTasks(updateList);
    setInProgressTasks(updateList);
    setCompletedTasks(updateList);
  };

  const handleUpdateLabelName = (id, newName) => {
    setBoardLabels(prev => prev.map(l => l.id === id ? { ...l, name: newName } : l));
  };

  const handleUpdateLabelColor = (id, newColor) => {
    setBoardLabels(prev => prev.map(l => l.id === id ? { ...l, color: newColor } : l));
    setActiveColorPickerLabelId(null);
  };

  const handleDeleteLabel = (id) => {
    setBoardLabels(prev => prev.filter(l => l.id !== id));
  };

  const handleAddNewLabel = () => {
    setBoardLabels(prev => [
      ...prev,
      { id: Date.now(), name: '', color: '#10b981' }
    ]);
  };

  // Task Details Modal states
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetailTab, setTaskDetailTab] = useState('COMMENTS');
  const [taskComments, setTaskComments] = useState([
    { id: 1, author: 'Jane Wilson', time: '5 min ago', text: 'Hi Cody, any progress on the project? 😰', avatar: defaultAvatar },
    { id: 2, author: 'Jacob Hawkins', time: '1 day ago', text: "Hi Jane!\nYes. I just finished developing the 'Chat' template.", avatar: defaultAvatar, images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=80&auto=format&fit=crop&q=80'
    ]},
    { id: 3, author: 'Regina Cooper', time: '5 min ago', text: 'Hi Jacob. Will you be able to finish the last item of the task by tomorrow?', avatar: defaultAvatar }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [taskAttachments, setTaskAttachments] = useState([
    { id: 1, name: 'Wireframe UI Kit.zip', size: '5.8 MB', type: 'zip' },
    { id: 2, name: 'Picture 01.png', size: '1.2 MB', type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=80&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Picture 02.png', size: '1.4 MB', type: 'image', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=80&auto=format&fit=crop&q=80' }
  ]);
  const [newChecklistItemText, setNewChecklistItemText] = useState('');
  const [showAddChecklistItemInput, setShowAddChecklistItemInput] = useState(false);

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'Shane Black',
      time: 'Just now',
      text: newCommentText,
      avatar: defaultAvatar
    };
    setTaskComments(prev => [...prev, newComment]);
    setNewCommentText('');
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistItemText.trim()) return;
    setChecklistItems(prev => [
      ...prev,
      { id: Date.now(), text: newChecklistItemText, completed: false }
    ]);
    setNewChecklistItemText('');
    setShowAddChecklistItemInput(false);
  };

  const toggleLabelFilter = (label) => {
    setSelectedLabels(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const getFilteredTasks = (tasksList) => {
    return tasksList.filter(task => {
      // 1. Search filter
      if (filterSearch) {
        const query = filterSearch.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.desc || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      // 2. Labels filter
      if (selectedLabels.length > 0) {
        const labelColors = selectedLabels.map(lName => {
          const match = boardLabels.find(bl => bl.name === lName);
          return match ? match.color : null;
        }).filter(Boolean);
        const hasMatchingTag = task.tags.some(tag => labelColors.includes(tag));
        if (!hasMatchingTag) return false;
      }
      return true;
    });
  };

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
          <button 
            onClick={() => setShowFilterSidebar(prev => !prev)}
            style={{ 
              width: '36px', 
              height: '36px', 
              border: showFilterSidebar ? '1px solid #15803d' : '1px solid #cbd5e1', 
              borderRadius: '6px', 
              backgroundColor: showFilterSidebar ? '#dcfce7' : '#ffffff', 
              color: showFilterSidebar ? '#15803d' : '#64748b', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
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
      <div style={{ display: 'flex', gap: '24px', alignItems: 'start' }}>
        
        <div style={{ 
          flex: 1,
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
                {getFilteredTasks(todoTasks).length}
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
            {getFilteredTasks(todoTasks).map(task => (
              <div key={task.id} 
                onClick={() => setSelectedTask(task)}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
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
                {getFilteredTasks(inProgressTasks).length}
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
            {getFilteredTasks(inProgressTasks).map(task => (
              <div key={task.id} 
                onClick={() => setSelectedTask(task)}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
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
                        onClick={(e) => { e.stopPropagation(); toggleCollapse('updating'); }}
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
                        onClick={(e) => { e.stopPropagation(); toggleCollapse('template'); }}
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
                            onClick={(e) => { e.stopPropagation(); toggleChecklistItem(item.id); }}
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
                {getFilteredTasks(completedTasks).length}
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
            {getFilteredTasks(completedTasks).map(task => (
              <div key={task.id} 
                onClick={() => setSelectedTask(task)}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
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

        {/* Filter Side Panel */}
        {showFilterSidebar && (
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            fontFamily: 'Inter, sans-serif',
            boxSizing: 'border-box'
          }}>
            {/* Filter Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>Filter</span>
              <button 
                onClick={() => setShowFilterSidebar(false)}
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
                <X size={14} />
              </button>
            </div>

            {/* Search Tasks Input */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              padding: '8px 12px', 
              gap: '8px' 
            }}>
              <Search size={16} style={{ color: '#cbd5e1' }} />
              <input 
                type="text" 
                placeholder="Search Tasks..." 
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
              />
            </div>

            {/* Labels Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Labels</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {boardLabels.map(lbl => {
                  const isSelected = selectedLabels.includes(lbl.name);
                  return (
                    <button
                      key={lbl.id}
                      onClick={() => toggleLabelFilter(lbl.name)}
                      style={{
                        backgroundColor: lbl.color,
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'opacity 0.15s',
                        boxShadow: isSelected ? '0 0 0 2px #ffffff, 0 0 0 4px ' + lbl.color : 'none'
                      }}
                    >
                      <span>{lbl.name || 'Untitled'}</span>
                      {isSelected && <span style={{ fontSize: '10px' }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Members Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Members</div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '6px 10px', 
                justifyContent: 'space-between',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedMembers.length > 0 ? (
                    selectedMembers.map(m => (
                      <div key={m} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', marginRight: '4px' }}>
                        <img 
                          src={defaultAvatar} 
                          alt={m} 
                          style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginLeft: '6px' }}>{m}</span>
                        <button 
                          onClick={() => setSelectedMembers(prev => prev.filter(item => item !== m))}
                          style={{ border: 'none', background: 'none', padding: '0 0 0 6px', fontSize: '10px', cursor: 'pointer', color: '#94a3b8' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Search members...</span>
                  )}
                </div>
                <Search size={14} style={{ color: '#cbd5e1', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Due Date Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Due Date</div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '8px 12px', 
                justifyContent: 'space-between', 
                cursor: 'pointer',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon size={14} style={{ color: '#64748b', marginRight: '8px' }} />
                  <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '700' }}>{filterDueDate}</span>
                </div>
                <ChevronDown size={14} style={{ color: '#64748b' }} />
              </div>
            </div>

            {/* Status Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Status</div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                padding: '8px 12px', 
                justifyContent: 'space-between', 
                cursor: 'pointer',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#15803d', fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '700' }}>{filterStatus}</span>
                </div>
                <ChevronDown size={14} style={{ color: '#64748b' }} />
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
              <button 
                style={{
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                Apply Filters
              </button>
              <button 
                onClick={() => {
                  setFilterSearch('');
                  setSelectedLabels([]);
                  setSelectedMembers([]);
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#15803d',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Reset all Filters
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Task Details Modal Overlay */}
      {selectedTask && (
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
          {/* Modal Container Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '820px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            maxHeight: '90vh',
            display: 'flex',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
          }}>
            
            {/* LEFT COLUMN (65% width) */}
            <div style={{
              flex: 1.8,
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              
              {/* Header Top actions row */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '6px 14px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ fontSize: '14px' }}>✓</span>
                  <span>Complete</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 12px', gap: '6px', cursor: 'pointer', backgroundColor: '#ffffff' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="#64748b" strokeWidth="2" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>2</span>
                  <ChevronDown size={12} style={{ color: '#94a3b8' }} />
                </div>

                <button style={{ border: '1px solid #cbd5e1', background: 'none', borderRadius: '6px', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="#64748b" strokeWidth="2" fill="none">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>

                <button style={{ border: '1px solid #cbd5e1', background: 'none', borderRadius: '6px', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <MoreHorizontal size={14} style={{ color: '#64748b' }} />
                </button>
              </div>

              {/* Title */}
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0', textAlign: 'left' }}>
                  {selectedTask.title}
                </h2>
                
                {/* Description */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', textAlign: 'left' }}>Description</div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0, textAlign: 'left' }}>
                    {selectedTask.desc || 'We need to develop several options (Inbox template, Chat template, tasks template, Projects template) of cool user interface design templates - to carefully work out the smallest details.'}
                  </p>
                </div>
              </div>

              {/* Checklist Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Checklist ({percentageCompleted}%)</span>
                </div>
                {/* Progress bar */}
                <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginBottom: '16px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentageCompleted}%`, height: '100%', backgroundColor: '#15803d', borderRadius: '3px', transition: 'width 0.2s ease' }} />
                </div>

                {/* Checklist List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {checklistItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#f8fafc',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.completed ? (
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                          </div>
                        ) : (
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #cbd5e1' }} />
                        )}
                        <span style={{ fontSize: '13px', fontWeight: '600', color: item.completed ? '#94a3b8' : '#334155', textDecoration: item.completed ? 'line-through' : 'none' }}>
                          {item.text}
                        </span>
                      </div>
                      
                      {/* drag handle + trash row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '16px', cursor: 'grab' }}>⠿</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setChecklistItems(prev => prev.filter(i => i.id !== item.id));
                          }}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Checklist Item input toggle */}
                {showAddChecklistItemInput ? (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <input 
                      type="text" 
                      placeholder="Add checklist item..." 
                      value={newChecklistItemText}
                      onChange={(e) => setNewChecklistItemText(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddChecklistItem();
                        if (e.key === 'Escape') setShowAddChecklistItemInput(false);
                      }}
                    />
                    <button 
                      onClick={handleAddChecklistItem}
                      style={{ padding: '8px 16px', backgroundColor: '#15803d', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Add
                    </button>
                    <button 
                      onClick={() => setShowAddChecklistItemInput(false)}
                      style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#64748b', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowAddChecklistItemInput(true)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#15803d',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>+</span> Add Checklist Item
                  </button>
                )}
              </div>

              {/* Attachments Section */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', textAlign: 'left' }}>Attachments</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {taskAttachments.map(att => (
                    <div 
                      key={att.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '10px 14px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {att.type === 'zip' ? (
                          <div style={{ width: '36px', height: '36px', borderRadius: '6px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                            <FileText size={16} style={{ color: '#64748b' }} />
                          </div>
                        ) : (
                          <img 
                            src={att.url} 
                            alt={att.name} 
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }} 
                          />
                        )}
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{att.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{att.size}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setTaskAttachments(prev => prev.filter(i => i.id !== att.id))}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    const name = prompt('Enter attachment file name:');
                    if (name) {
                      setTaskAttachments(prev => [
                        ...prev,
                        { id: Date.now(), name: name, size: '2.5 MB', type: name.endsWith('.zip') ? 'zip' : 'image', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=80&auto=format&fit=crop&q=80' }
                      ]);
                    }
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: '#15803d',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    padding: 0,
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>+</span> Add Attachment
                </button>
              </div>

              {/* COMMENTS AND ACTIVITY TABS */}
              <div>
                <div style={{ display: 'flex', gap: '20px', borderBottom: '1.5px solid #f1f5f9', marginBottom: '16px' }}>
                  {['COMMENTS', 'ACTIVITY'].map(tab => {
                    const isActive = taskDetailTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setTaskDetailTab(tab)}
                        style={{
                          border: 'none',
                          background: 'none',
                          padding: '0 0 8px 0',
                          fontSize: '11px',
                          fontWeight: '800',
                          color: isActive ? '#15803d' : '#94a3b8',
                          borderBottom: isActive ? '2px solid #15803d' : '2px solid transparent',
                          cursor: 'pointer',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {taskDetailTab === 'COMMENTS' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Write Comment Box */}
                    <div style={{
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden'
                    }}>
                      <textarea 
                        placeholder="Add Comment..." 
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        style={{
                          border: 'none',
                          outline: 'none',
                          padding: '12px 14px',
                          fontSize: '13px',
                          color: '#1e293b',
                          resize: 'none',
                          height: '60px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fafbfc',
                        borderTop: '1px solid #cbd5e1',
                        padding: '8px 12px'
                      }}>
                        <button 
                          onClick={handleAddComment}
                          style={{
                            padding: '6px 14px',
                            backgroundColor: '#15803d',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Comment
                        </button>
                        <div style={{ display: 'flex', gap: '10px', color: '#cbd5e1' }}>
                          <span style={{ cursor: 'pointer' }}>📎</span>
                          <span style={{ cursor: 'pointer' }}>☺</span>
                          <span style={{ cursor: 'pointer' }}>🖼</span>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {taskComments.map(c => (
                        <div key={c.id} style={{ display: 'flex', gap: '12px' }}>
                          <img 
                            src={c.avatar} 
                            alt={c.author} 
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                          <div style={{ textAlign: 'left', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                              <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{c.author}</span>
                              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{c.time}</span>
                            </div>
                            
                            <p style={{ fontSize: '13px', color: '#475569', margin: '6px 0 0 0', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                              {c.text}
                            </p>

                            {/* Attached images layout inside Jacob Hawkins comment */}
                            {c.images && (
                              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                                {c.images.map((img, i) => (
                                  <img key={i} src={img} alt="comment image" style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                                ))}
                                <div style={{
                                  width: '56px',
                                  height: '56px',
                                  borderRadius: '6px',
                                  backgroundColor: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  color: '#64748b',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  +3
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {taskDetailTab === 'ACTIVITY' && (
                  <div style={{ fontSize: '13px', color: '#64748b', padding: '10px 0', textAlign: 'left' }}>
                    No recent activity to display.
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN (SIDEBAR) - 35% width */}
            <div style={{
              flex: 1,
              backgroundColor: '#f8fafc',
              borderLeft: '1px solid #cbd5e1',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative'
            }}>
              
              {/* Close Button X */}
              <button 
                onClick={() => setSelectedTask(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <X size={15} />
              </button>

              {/* CREATED BY */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Created By</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={defaultAvatar} 
                    alt="Shane Black" 
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Shane Black</span>
                </div>
              </div>

              {/* ASSIGNED TO */}
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned To</span>
                  <span 
                    onClick={() => setShowAssignToDropdown(prev => !prev)}
                    style={{ fontSize: '14px', color: '#15803d', fontWeight: 'bold', cursor: 'pointer', padding: '2px 6px' }}
                  >
                    +
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {selectedTask.assignees.map((pic, idx) => (
                    <img 
                      key={idx} 
                      src={pic} 
                      alt="assignee" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #ffffff' }} 
                    />
                  ))}
                  <div 
                    onClick={() => setShowAssignToDropdown(prev => !prev)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1.5px dashed #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#94a3b8',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    +
                  </div>
                </div>

                {/* Assign To Dropdown Popover */}
                {showAssignToDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    left: 0,
                    width: '220px',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>Assign To</span>
                      <button 
                        onClick={() => setShowAssignToDropdown(false)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}
                      >
                        ×
                      </button>
                    </div>

                    {/* Find Person search box */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      gap: '8px',
                      backgroundColor: '#ffffff'
                    }}>
                      <Search size={13} style={{ color: '#cbd5e1' }} />
                      <input 
                        type="text"
                        placeholder="Find Person..."
                        value={assignToSearchQuery}
                        onChange={(e) => setAssignToSearchQuery(e.target.value)}
                        style={{
                          border: 'none',
                          outline: 'none',
                          fontSize: '12px',
                          color: '#334155',
                          width: '100%'
                        }}
                      />
                    </div>

                    {/* Members List */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxHeight: '160px',
                      overflowY: 'auto'
                    }}>
                      {[
                        { name: 'Regina Cooper', avatar: defaultAvatar },
                        { name: 'Jacob Hawkins', avatar: defaultAvatar },
                        { name: 'Jane Wilson', avatar: defaultAvatar },
                        { name: 'Shane Black', avatar: defaultAvatar }
                      ]
                      .filter(m => m.name.toLowerCase().includes(assignToSearchQuery.toLowerCase()))
                      .map(m => {
                        const isAssigned = selectedTask.assignees.includes(m.avatar);
                        return (
                          <div 
                            key={m.name}
                            onClick={() => toggleTaskAssignee(m.avatar)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              padding: '4px 0'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <img src={m.avatar} alt={m.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                              <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                                {m.name}
                              </span>
                            </div>
                            {isAssigned && (
                              <span style={{ color: '#15803d', fontSize: '14px', fontWeight: '900' }}>✓</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* DUE DATE */}
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Due Date</div>
                <div 
                  onClick={() => setShowDueDateDropdown(prev => !prev)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #cbd5e1', 
                    borderRadius: '8px', 
                    padding: '8px 12px', 
                    justifyContent: 'space-between', 
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon size={14} style={{ color: '#64748b', marginRight: '8px' }} />
                    <span style={{ fontSize: '12px', color: '#1e293b', fontWeight: '700' }}>
                      {selectedTask.date}
                    </span>
                  </div>
                  <ChevronDown size={12} style={{ color: '#94a3b8' }} />
                </div>

                {/* Due Date Calendar Popover */}
                {showDueDateDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: 0,
                    width: '260px',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Calendar Month Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#334155' }}>September 2026</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>&lt;</button>
                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>&gt;</button>
                      </div>
                    </div>

                    {/* Weekday headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>
                      <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
                    </div>

                    {/* Days grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                      {/* Previous month padding days */}
                      {[28, 29, 30, 31].map(d => (
                        <span key={`prev-${d}`} style={{ fontSize: '11px', color: '#cbd5e1', padding: '4px 0' }}>{d}</span>
                      ))}
                      {/* Current month days */}
                      {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                        const isSelected = selectedTask.date.includes(`Sep ${d}`) || (d === 4 || d === 10);
                        return (
                          <span 
                            key={`curr-${d}`}
                            onClick={() => {
                              const newDate = `Sep ${d}, 2026, ${dueDateTime}`;
                              updateTaskDueDate(newDate);
                            }}
                            style={{
                              fontSize: '11px',
                              fontWeight: '700',
                              color: isSelected ? '#ffffff' : '#334155',
                              backgroundColor: isSelected ? '#15803d' : 'transparent',
                              borderRadius: '50%',
                              padding: '4px 0',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              margin: 'auto',
                              transition: 'all 0.15s'
                            }}
                          >
                            {d}
                          </span>
                        );
                      })}
                    </div>

                    {/* Due time settings */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Due at</span>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', gap: '4px' }}>
                        <span style={{ fontSize: '12px' }}>⏰</span>
                        <input 
                          type="text" 
                          value={dueDateTime}
                          onChange={(e) => {
                            setDueDateTime(e.target.value);
                            if (selectedTask.date.startsWith('Sep')) {
                              const dayMatch = selectedTask.date.match(/Sep (\d+)/);
                              const day = dayMatch ? dayMatch[1] : '17';
                              updateTaskDueDate(`Sep ${day}, 2026, ${e.target.value}`);
                            }
                          }}
                          style={{ border: 'none', outline: 'none', fontSize: '11px', color: '#334155', width: '60px', fontWeight: '700' }}
                        />
                      </div>
                    </div>

                    {/* Clear Due Date Button */}
                    <button 
                      onClick={() => {
                        updateTaskDueDate('No Due Date');
                        setShowDueDateDropdown(false);
                      }}
                      style={{
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        marginTop: '4px'
                      }}
                    >
                      Clear Due Date
                    </button>
                  </div>
                )}
              </div>

              {/* LABELS */}
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Labels</span>
                  <span 
                    onClick={() => setShowLabelsDropdown(prev => !prev)}
                    style={{ fontSize: '14px', color: '#15803d', fontWeight: 'bold', cursor: 'pointer', padding: '2px 6px' }}
                  >
                    +
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {boardLabels
                    .filter(lbl => selectedTask.tags.includes(lbl.color))
                    .map(lbl => (
                      <span 
                        key={lbl.id} 
                        style={{ 
                          backgroundColor: lbl.color, 
                          color: '#ffffff', 
                          padding: '4px 10px', 
                          borderRadius: '4px', 
                          fontSize: '11px', 
                          fontWeight: '700' 
                        }}
                      >
                        {lbl.name || 'Untitled'}
                      </span>
                    ))}
                </div>

                {/* Labels Dropdown Overlay Popover */}
                {showLabelsDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '28px',
                    left: 0,
                    width: '220px',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>Labels</span>
                      <button 
                        onClick={() => setShowLabelsDropdown(false)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}
                      >
                        ×
                      </button>
                    </div>

                    {/* Search box */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      gap: '8px',
                      backgroundColor: '#ffffff'
                    }}>
                      <Search size={13} style={{ color: '#cbd5e1' }} />
                      <input 
                        type="text"
                        placeholder="Search Label..."
                        value={labelSearchQuery}
                        onChange={(e) => setLabelSearchQuery(e.target.value)}
                        style={{
                          border: 'none',
                          outline: 'none',
                          fontSize: '12px',
                          color: '#334155',
                          width: '100%'
                        }}
                      />
                    </div>

                    {/* Labels list */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxHeight: '160px',
                      overflowY: 'auto'
                    }}>
                      {boardLabels
                        .filter(lbl => (lbl.name || '').toLowerCase().includes(labelSearchQuery.toLowerCase()))
                        .map(lbl => {
                          const isAssigned = selectedTask.tags.includes(lbl.color);
                          return (
                            <div 
                              key={lbl.id}
                              onClick={() => toggleTaskTag(lbl.color)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                padding: '4px 0'
                              }}
                            >
                              <span style={{
                                backgroundColor: lbl.color,
                                color: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '700'
                              }}>
                                {lbl.name || 'Untitled'}
                              </span>
                              {isAssigned && (
                                <span style={{ color: '#15803d', fontSize: '14px', fontWeight: '900' }}>✓</span>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Add New Label button */}
                    <button 
                      onClick={() => {
                        setShowLabelsDropdown(false);
                        setShowAddLabelModal(true);
                      }}
                      style={{
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166534'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                    >
                      Add New Label
                    </button>
                  </div>
                )}
              </div>

              {/* Dates Audit info */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>Created</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginTop: '2px' }}>January 2, 2020 4:30 PM</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>Updated</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginTop: '2px' }}>January 2, 2020 4:55 PM</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add New Label Modal Overlay */}
      {showAddLabelModal && (
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
          zIndex: 1100, // higher than details modal
          backdropFilter: 'blur(4px)',
          padding: '20px'
        }}>
          {/* Modal Container Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            fontFamily: 'Inter, sans-serif'
          }}>
            
            {/* Close Button X */}
            <button 
              onClick={() => {
                setShowAddLabelModal(false);
                setActiveColorPickerLabelId(null);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9'
              }}
            >
              <X size={14} />
            </button>

            {/* Title */}
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0, textAlign: 'left' }}>
              Add New Label
            </h3>

            {/* Labels Editor List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {boardLabels.map(lbl => (
                <div key={lbl.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                  
                  {/* Color Circle indicator */}
                  <span style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: lbl.color,
                    flexShrink: 0
                  }} />

                  {/* Name Input */}
                  <input 
                    type="text"
                    value={lbl.name}
                    placeholder="Type an name label..."
                    onChange={(e) => handleUpdateLabelName(lbl.id, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#334155',
                      outline: 'none'
                    }}
                  />

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Color palette icon */}
                    <button 
                      onClick={() => setActiveColorPickerLabelId(activeColorPickerLabelId === lbl.id ? null : lbl.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#15803d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C4.94939 19.0908 5.09351 19.1242 5.21545 19.088C5.3374 19.0519 5.42152 18.951 5.42152 18.8235V18.1765C5.42152 16.9745 6.39597 16 7.59797 16H8.56066C8.82588 16 9.0802 16.1054 9.26773 16.2929L10.7071 17.7322C11.5362 18.5613 12 19.686 12 20.8579V22Z" />
                        <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
                        <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
                        <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                      </svg>
                    </button>

                    {/* Trash icon */}
                    <button 
                      onClick={() => handleDeleteLabel(lbl.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Change Color Popover */}
                  {activeColorPickerLabelId === lbl.id && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      right: '10px',
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      zIndex: 1200,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      width: '160px'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textAlign: 'left' }}>Change Color</div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '6px'
                      }}>
                        {[
                          '#ef4444', // Coral Red
                          '#06b6d4', // Cyan
                          '#fbbf24', // Yellow
                          '#22c55e', // Green
                          '#3b82f6', // Blue
                          '#10b981', // Teal
                          '#84cc16', // Lime
                          '#a855f7', // Purple
                          '#ec4899', // Pink
                          '#cbd5e1'  // Gray
                        ].map(c => {
                          const isSelected = lbl.color.toLowerCase() === c.toLowerCase();
                          return (
                            <span 
                              key={c}
                              onClick={() => handleUpdateLabelColor(lbl.id, c)}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: c,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                              }}
                            >
                              {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Add Label Link */}
            <button 
              onClick={handleAddNewLabel}
              style={{
                border: 'none',
                background: 'none',
                color: '#15803d',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px'
              }}
            >
              <span>+</span> Add Label
            </button>

            {/* Bottom Actions done */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button 
                onClick={() => {
                  setShowAddLabelModal(false);
                  setActiveColorPickerLabelId(null);
                }}
                style={{
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 22px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TaskBoard;
