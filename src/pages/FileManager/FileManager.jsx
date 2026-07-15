import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Folder as FolderIcon,
  Trash2,
  Lock,
  ArrowDownToLine,
  FileText,
  Check,
  RotateCw,
  MoreVertical
} from 'lucide-react';

const FileManager = () => {
  // Directory lists state
  const [folders, setFolders] = useState([
    { id: 1, name: 'Design', size: '5.8 GB', sub: 12, files: 48, modified: 'Sep 15, 2020 3:12', created: 'Sep 08, 2020 1:12' },
    { id: 2, name: 'Projects', size: '3.2 GB', sub: 4, files: 24, modified: 'Sep 17, 2020 4:25', created: 'Sep 10, 2020 2:25' },
    { id: 3, name: 'Music', size: '1.5 GB', sub: 8, files: 120, modified: 'Sep 12, 2020 10:15', created: 'Sep 05, 2020 8:15', isMusic: true },
    { id: 4, name: 'Pictures', size: '1.7 GB', sub: 15, files: 210, modified: 'Sep 14, 2020 2:30', created: 'Sep 07, 2020 11:30', isPictures: true },
    { id: 5, name: 'Documents', size: '440 MB', sub: 3, files: 82, modified: 'Sep 16, 2020 1:20', created: 'Sep 09, 2020 12:20', isDocs: true },
    { id: 6, name: 'Downloads', size: '10.1 GB', sub: 2, files: 15, modified: 'Sep 18, 2020 11:40', created: 'Sep 11, 2020 9:40', isDownload: true }
  ]);

  const [activeFolderId, setActiveFolderId] = useState(2); // Projects is selected in mockup
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  
  // Settings switches
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);

  // File logo vector SVGs
  const fileLogos = {
    figma: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C5.79 2 4 3.79 4 6C4 7.21 4.54 8.29 5.39 9C4.54 9.71 4 10.79 4 12C4 13.21 4.54 14.29 5.39 15C4.54 15.71 4 16.79 4 18C4 20.21 5.79 22 8 22C10.21 22 12 20.21 12 18V15H16C18.21 15 20 13.21 20 12C20 9.79 18.21 8 16 8H12V6C12 3.79 10.21 2 8 2Z" fill="#F24E1E"/>
        <path d="M12 12C12 10.79 12.54 9.71 13.39 9C12.54 8.29 12 7.21 12 6V12Z" fill="#FF7262"/>
        <path d="M16 8C17.1 8 18 8.9 18 10C18 11.1 17.1 12 16 12H12V8H16Z" fill="#A259FF"/>
        <path d="M8 12C9.1 12 10 11.1 10 10V8H8C6.9 8 6 8.9 6 10C6 11.1 6.9 12 8 12Z" fill="#1ABC9C"/>
        <path d="M8 18C9.1 18 10 17.1 10 16V14H8C6.9 14 6 14.9 6 16C6 17.1 6.9 18 8 18Z" fill="#1ABC9C"/>
        <path d="M12 18C12 20.21 10.21 22 8 22V15H12V18Z" fill="#0ACF83"/>
      </svg>
    ),
    sketch: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 9.5L12 22L22 9.5L12 2Z" fill="#FDB300"/>
        <path d="M12 2L6.5 9.5H17.5L12 2Z" fill="#FEE100"/>
        <path d="M2 9.5L12 22V9.5H2Z" fill="#EA6C00"/>
        <path d="M22 9.5H12V22L22 9.5Z" fill="#FD9000"/>
      </svg>
    ),
    word: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#2B579A"/>
        <path d="M15.5 8.5L13.5 15.5L12 10.5L10.5 15.5L8.5 8.5H6.5L9.5 17.5H11.5L13 12.5L14.5 17.5H16.5L19.5 8.5H17.5L15.5 8.5Z" fill="#FFFFFF"/>
      </svg>
    ),
    zip: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#78909C"/>
        <path d="M12 5V8H13V9H12V11H13V12H12V14H13V15H12V18H10V15H11V14H10V12H11V11H10V9H11V8H10V5H12Z" fill="#ECEFF1"/>
      </svg>
    ),
    psd: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#001C3D"/>
        <path d="M9.5 11.5C9.5 9.5 11 9.5 11 9.5V8.5C11 8.5 9 8.5 8 10V8.5H7V15.5H8V13C9 14.5 11 14.5 11 14.5V13.5C11 13.5 9.5 13.5 9.5 11.5ZM13 13C14 13.5 15.5 13.5 15.5 12C15.5 10.5 14 10.5 13 10C12 9.5 12 9 12 8.5C12 8 13 8 14 8C15 8 15 9 15 9V8C15 8 14 7.5 13.5 7.5C12 7.5 11 8.5 11 10C11 11.5 12.5 11.5 13.5 12C14.5 12.5 14.5 13 14.5 13.5C14.5 14 13.5 14 12.5 14C11.5 14 11 13 11 13V14.5C11 14.5 12 15 13 15C14.5 15 15.5 14 15.5 12.5C15.5 11.5 14.5 11.5 13 11L13 13Z" fill="#00C8FF"/>
      </svg>
    ),
    pdf: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#E53935"/>
        <path d="M8.5 9.5C8.5 9.5 8 8 7 8.5C6 9 6.5 11.5 8 13C9 14.5 11 15 11.5 14C12 13 10.5 12.5 10.5 12.5C10.5 12.5 9.5 11 8.5 9.5Z" fill="#FFFFFF"/>
      </svg>
    )
  };

  const selectedFolder = folders.find(f => f.id === activeFolderId) || folders[1];

  const handleAddFolder = () => {
    const name = prompt('Enter Folder Name:');
    if (!name) return;
    const newFolder = {
      id: Date.now(),
      name: name,
      size: '0.0 GB',
      sub: 0,
      files: 0,
      modified: 'Just now',
      created: 'Just now'
    };
    setFolders(prev => [...prev, newFolder]);
  };

  return (
    <div className="file-manager-workspace" style={{ 
      display: 'flex', 
      margin: '-24px', 
      height: 'calc(100vh - 70px)', 
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* ==================== PANEL 1: LEFT FOLDERS NAVIGATION SIDEBAR ==================== */}
      <div style={{ 
        width: '240px', 
        borderRight: '1px solid #e2e8f0', 
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {/* Directories Navigation tree */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
            Folders
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Design Folder */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} className="sidebar-item-hover">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px', fontWeight: '600' }}>
                <FolderIcon size={16} style={{ color: '#fcd34d' }} />
                <span>Design</span>
              </div>
              <ChevronRight size={14} style={{ color: '#94a3b8' }} />
            </div>

            {/* Projects Expanded Folder */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontSize: '13px', fontWeight: '700' }}>
                  <FolderIcon size={16} style={{ color: '#fcd34d' }} fill="#fcd34d" />
                  <span>Projects</span>
                </div>
                <ChevronDown size={14} style={{ color: '#475569' }} />
              </div>

              {/* Tree lines and subdirectories */}
              <div style={{ paddingLeft: '24px', borderLeft: '1px dashed #cbd5e1', marginLeft: '20px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {['Projects_01', 'Projects_02', 'Projects_03', 'Projects_04'].map((sub, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '12px', color: '#64748b', fontWeight: '500', cursor: 'pointer' }} className="sidebar-item-hover">
                    <span style={{ position: 'absolute', left: '-24px', width: '24px', height: '1px', borderTop: '1px dashed #cbd5e1' }}></span>
                    <FolderIcon size={14} style={{ color: '#fcd34d' }} />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Directory categories */}
            {['Music', 'Pictures', 'Documents', 'Downloads'].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} className="sidebar-item-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px', fontWeight: '600' }}>
                  <FolderIcon size={16} style={{ color: '#fcd34d' }} />
                  <span>{item}</span>
                </div>
                <ChevronRight size={14} style={{ color: '#94a3b8' }} />
              </div>
            ))}

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '8px 0' }}></div>

            {/* Trash Bin */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', color: '#64748b', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }} className="sidebar-item-hover">
              <Trash2 size={16} />
              <span>Trash</span>
            </div>
          </div>
        </div>

        {/* Bottom Storage status progress bar */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
            <span>Storage</span>
            <span>70%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
          </div>
        </div>

      </div>

      {/* ==================== PANEL 2: MIDDLE MAIN CONTENT PANE ==================== */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRight: '1px solid #e2e8f0',
        backgroundColor: '#fafbfc'
      }}>
        {/* Search bar & Upload toolbar */}
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
          
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px', gap: '8px', width: '320px' }}>
            <Search size={16} style={{ color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', width: '100%' }}
            />
          </div>

          <button 
            onClick={() => setShowUploadProgress(prev => !prev)}
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
            <Upload size={14} />
            <span>Upload</span>
          </button>
        </div>

        {/* Content Lists wrapper */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '24px' }}>
          
          {/* Folders Section header */}
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 16px', textAlign: 'left' }}>Folders</h2>
          
          {/* Folders cards grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px',
            marginBottom: '32px'
          }}>
            {folders.map(folder => {
              const isActive = folder.id === activeFolderId;
              
              // Folder icon symbol decorations matching the mockup
              let decoratorSymbol = null;
              if (folder.isMusic) decoratorSymbol = '🎵';
              if (folder.isPictures) decoratorSymbol = '🖼️';
              if (folder.isDocs) decoratorSymbol = '📄';
              if (folder.isDownload) decoratorSymbol = '📥';

              return (
                <div 
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  style={{
                    backgroundColor: isActive ? '#f8fafc' : '#ffffff',
                    border: isActive ? '2px solid #3b82f6' : '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.15s ease',
                    height: '110px',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FolderIcon size={32} style={{ color: '#fcd34d' }} fill="#fcd34d" />
                    {decoratorSymbol && (
                      <span style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)', fontSize: '11px', pointerEvents: 'none' }}>
                        {decoratorSymbol}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '3px' }}>{folder.name}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{folder.size}</span>
                </div>
              );
            })}

            {/* Add Folder card */}
            <div 
              onClick={handleAddFolder}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '110px',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', marginBottom: '8px' }}>
                <Plus size={16} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b' }}>Add Folder</span>
            </div>
          </div>

          {/* Files Section header */}
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 16px', textAlign: 'left' }}>Files</h2>

          {/* Files grid layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px'
          }}>
            {[
              { name: 'Rocket – Admin...', logo: 'figma', size: '1.8 MB' },
              { name: 'Rocket – Admin...', logo: 'sketch', size: '1.5 MB' },
              { name: 'Arion – Admin...', logo: 'sketch', size: '1.2 MB' },
              { name: 'Project Brief', logo: 'word', size: '1.4 MB' },
              { name: 'Design', logo: 'zip', size: '1.9 GB' },
              { name: 'vCard – Resume...', logo: 'psd', size: '2.5 MB' },
              { name: 'Project Brief', logo: 'word', size: '1.2 MB' },
              { name: 'Brand Styles Guide', logo: 'pdf', size: '4.5 MB' }
            ].map((file, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                height: '110px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  {fileLogos[file.logo]}
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b', marginBottom: '2px', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>
                  {file.name}
                </span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>{file.size}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ==================== PANEL 3: RIGHT DETAILS/SETTINGS PANEL ==================== */}
      <div style={{ 
        width: '280px', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px', 
        overflowY: 'auto',
        flexShrink: 0
      }}>
        {/* Large Folder icon header with title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <FolderIcon size={64} style={{ color: '#fcd34d', marginBottom: '12px' }} fill="#fcd34d" />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{selectedFolder.name}</h2>
        </div>

        {/* INFO Section list */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginBottom: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.5px' }}>Info</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Type</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Folder</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Size</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{selectedFolder.size}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Owner</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>ArtTemplate</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Location</div>
              <div style={{ fontSize: '13px', color: '#10b981', fontWeight: '700' }}>My Files</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Modified</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{selectedFolder.modified}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Created</div>
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{selectedFolder.created}</div>
            </div>
          </div>
        </div>

        {/* SETTINGS Toggles Section */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.5px' }}>Settings</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* File Sharing Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>File Sharing</span>
              <div 
                onClick={() => setSharingEnabled(prev => !prev)}
                style={{ 
                  width: '38px', 
                  height: '20px', 
                  backgroundColor: sharingEnabled ? '#10b981' : '#cbd5e1', 
                  borderRadius: '10px', 
                  position: 'relative', 
                  cursor: 'pointer',
                  transition: 'background-color 0.15s' 
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  left: sharingEnabled ? '20px' : '2px', 
                  top: '2px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'left 0.15s ease'
                }}></span>
              </div>
            </div>

            {/* Backup Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Backup</span>
              <div 
                onClick={() => setBackupEnabled(prev => !prev)}
                style={{ 
                  width: '38px', 
                  height: '20px', 
                  backgroundColor: backupEnabled ? '#10b981' : '#cbd5e1', 
                  borderRadius: '10px', 
                  position: 'relative', 
                  cursor: 'pointer',
                  transition: 'background-color 0.15s' 
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  left: backupEnabled ? '20px' : '2px', 
                  top: '2px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'left 0.15s ease'
                }}></span>
              </div>
            </div>

            {/* Sync Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Sync</span>
              <div 
                onClick={() => setSyncEnabled(prev => !prev)}
                style={{ 
                  width: '38px', 
                  height: '20px', 
                  backgroundColor: syncEnabled ? '#10b981' : '#cbd5e1', 
                  borderRadius: '10px', 
                  position: 'relative', 
                  cursor: 'pointer',
                  transition: 'background-color 0.15s' 
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  left: syncEnabled ? '20px' : '2px', 
                  top: '2px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'left 0.15s ease'
                }}></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Upload Progress Popover Drawer */}
      {showUploadProgress && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '320px',
          backgroundColor: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Popover Header */}
          <div style={{ display: 'flex', height: '40px', overflow: 'hidden' }}>
            <div style={{
              flex: 1,
              backgroundColor: '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              Uploading 8 files
            </div>
            <div 
              onClick={() => setShowUploadProgress(false)}
              style={{
                width: '40px',
                backgroundColor: '#334155',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <MoreVertical size={16} />
            </div>
          </div>

          {/* List of Tasks */}
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {[
              { name: 'Rocket – Admin Dashboard & UI Kit.fig', size: '1.8 MB', logo: 'figma', status: 'completed' },
              { name: 'Rocket – Admin Dashboard & UI Kit.sketch', size: '1.5 MB', logo: 'sketch', status: 'completed' },
              { name: 'Arion – Admin Dashboard & UI Kit.sketch', size: '1.2 MB', logo: 'sketch', status: 'completed' },
              { name: 'Project Brief.docx', size: '1.2 MB', logo: 'word', status: 'failed' },
              { name: 'Design.zip', size: '1.8 MB', logo: 'zip', status: 'progress', percent: 80 },
              { name: 'vCard – Resume.psd', size: '2.5 MB', logo: 'psd', status: 'progress', percent: 70 },
              { name: 'Brand Styles Guide.pdf', size: '4.5 MB', logo: 'pdf', status: 'progress', percent: 40 }
            ].map((task, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderBottom: '1px solid #f1f5f9',
                gap: '12px'
              }}>
                {/* File logo symbol */}
                <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {fileLogos[task.logo]}
                </div>

                {/* File Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {task.name}
                  </span>
                  {task.status === 'failed' ? (
                    <span style={{ fontSize: '9px', fontWeight: '700', color: '#ef4444' }}>Upload Failed</span>
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: '500', color: '#94a3b8' }}>{task.size}</span>
                  )}
                </div>

                {/* Status indicator on the right */}
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {task.status === 'completed' && (
                    <Check size={14} style={{ color: '#16a34a', fontWeight: 'bold' }} />
                  )}
                  {task.status === 'failed' && (
                    <RotateCw size={12} style={{ color: '#94a3b8', cursor: 'pointer' }} />
                  )}
                  {task.status === 'progress' && (
                    <div style={{ width: '70px', height: '4px', backgroundColor: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${task.percent}%`, height: '100%', backgroundColor: '#15803d' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default FileManager;
