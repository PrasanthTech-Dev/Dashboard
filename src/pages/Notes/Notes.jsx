import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Calendar as CalendarIcon, 
  Pin 
} from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: true
    },
    {
      id: 2,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: true
    },
    {
      id: 3,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: true
    },
    {
      id: 4,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    },
    {
      id: 5,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    },
    {
      id: 6,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    },
    {
      id: 7,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    },
    {
      id: 8,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    },
    {
      id: 9,
      title: 'The title of a note',
      text: 'Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnaresls aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.',
      date: '12 June, 2020',
      isPinned: false
    }
  ]);

  const togglePin = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const handleAddNote = () => {
    const title = prompt('Enter Note Title:');
    if (!title) return;
    const body = prompt('Enter Note Body Text:');
    if (!body) return;

    const newNote = {
      id: Date.now(),
      title: title,
      text: body,
      date: '12 June, 2020',
      isPinned: false
    };

    setNotes(prev => [newNote, ...prev]);
  };

  return (
    <div className="notes-page" style={{ paddingBottom: '30px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Notes</h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
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
          
          <button 
            onClick={handleAddNote}
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
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Grid of Notes cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px' 
      }}>
        {notes.map(note => (
          <div 
            key={note.id} 
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '200px'
            }}
          >
            {/* Top-left corner diagonal folded tag (when pinned) */}
            {note.isPinned && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '24px',
                height: '24px',
                backgroundColor: '#fbbf24',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                zIndex: 2
              }}></div>
            )}

            {/* Header row details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>
                <CalendarIcon size={14} />
                <span>{note.date}</span>
              </div>

              {/* Pin trigger */}
              <button 
                onClick={() => togglePin(note.id)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: note.isPinned ? '#1e293b' : '#cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                  transition: 'color 0.15s ease'
                }}
              >
                <Pin size={16} fill={note.isPinned ? '#1e293b' : 'none'} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            {/* Note Title */}
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: '0 0 12px', textAlign: 'left' }}>
              {note.title}
            </h3>

            {/* Note Body content */}
            <p style={{ 
              fontSize: '13px', 
              color: '#64748b', 
              lineHeight: '1.6', 
              margin: 0, 
              textAlign: 'left',
              display: '-webkit-box',
              WebkitLineClamp: 7,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {note.text}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Notes;
