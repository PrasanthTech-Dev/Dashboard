import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon 
} from 'lucide-react';

const Calendar = () => {
  const [viewMode, setViewMode] = useState('Week'); // Defaults to Week view matching mockup screenshot
  const [currentMonth, setCurrentMonth] = useState('September');
  const [currentYear, setCurrentYear] = useState(2020);

  // Day cells structure for September 2020 (Month view)
  const calendarCells = [
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true, eventStart: 'priscilla' },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true, isToday: true }, 
    { day: 9, isCurrentMonth: true, eventStart: 'judith', eventStart2: 'meetingShort' },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true, eventStart: 'rocket' },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true, showExtra: true }, 
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true, eventStart: 'presentation1', eventStart2: 'presentation2' },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false }
  ];

  return (
    <div className="calendar-page" style={{ paddingBottom: '30px' }}>
      
      {/* Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Calendar</h1>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#15803d', 
          color: '#ffffff', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontWeight: '600',
          fontSize: '13px'
        }}>
          <Plus size={16} />
          <span>Add Event</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'flex', gap: '30px' }}>
        
        {/* Left Column: Calendars list checkboxes */}
        <div style={{
          width: '220px',
          flexShrink: 0,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px',
          height: 'fit-content',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calendars</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <Plus size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Important', color: '#ef4444', defaultChecked: true },
              { name: 'Meeting', color: '#0284c7', defaultChecked: true },
              { name: 'Event', color: '#16a34a', defaultChecked: true },
              { name: 'Work', color: '#ca8a04', defaultChecked: true },
              { name: 'Other', color: '#64748b', defaultChecked: true }
            ].map((cal) => (
              <label key={cal.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  defaultChecked={cal.defaultChecked} 
                  style={{ accentColor: cal.color, width: '15px', height: '15px', cursor: 'pointer' }} 
                />
                <span>{cal.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Main Calendar Views */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Calendar Navigation Toolbar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: '#ffffff', 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px 12px 0 0', 
            padding: '16px 24px',
            borderBottom: 'none'
          }}>
            
            {/* Navigation triggers */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                <button style={{ border: 'none', background: 'none', padding: '8px 12px', borderRight: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}>
                  <ChevronLeft size={16} />
                </button>
                <button style={{ border: 'none', background: 'none', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <button style={{ 
                padding: '8px 16px', 
                backgroundColor: '#f1f5f9', 
                border: 'none', 
                borderRadius: '6px', 
                color: '#475569', 
                fontWeight: '600', 
                fontSize: '13px', 
                cursor: 'pointer' 
              }}>
                Today
              </button>
            </div>

            {/* Current Month display */}
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
              <span>{currentMonth}</span> <span style={{ fontWeight: '500', color: '#94a3b8', marginLeft: '4px' }}>{currentYear}</span>
            </h2>

            {/* View Switcher segment */}
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              {['Month', 'Week', 'Day'].map(mode => {
                const isActive = viewMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '6px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: isActive ? '#15803d' : 'transparent',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Panels */}
          {viewMode === 'Month' ? (
            
            /* MONTH CALENDAR CONTAINER */
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              {/* Days of the Week header row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafbfc' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} style={{ padding: '12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.5px' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Month Calendar Grid cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '110px' }}>
                {calendarCells.map((cell, idx) => {
                  const hasHashedBg = !cell.isCurrentMonth;
                  
                  return (
                    <div 
                      key={idx}
                      style={{
                        borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid #e2e8f0',
                        borderBottom: idx >= 28 ? 'none' : '1px solid #e2e8f0',
                        padding: '8px',
                        position: 'relative',
                        background: hasHashedBg 
                          ? 'repeating-linear-gradient(-45deg, #fcfdfe, #fcfdfe 6px, #ffffff 6px, #ffffff 12px)'
                          : '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                      }}
                    >
                      {/* Date Badge */}
                      <div style={{ marginBottom: '8px' }}>
                        {cell.isToday ? (
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: '#15803d',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>
                            {cell.day}
                          </div>
                        ) : (
                          <span style={{ 
                            fontSize: '13px', 
                            fontWeight: '600', 
                            color: cell.isCurrentMonth ? '#64748b' : '#cbd5e1' 
                          }}>
                            {cell.day}
                          </span>
                        )}
                      </div>

                      {/* Absolute positioned spanning events inside relative cell containers */}
                      
                      {/* 1. Call Back Priscilla: Sept 1 to Sept 3 (Spans 3 columns) */}
                      {cell.eventStart === 'priscilla' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(300% - 16px)', 
                          top: '40px',
                          zIndex: 10,
                          backgroundColor: '#ccfbf1',
                          borderLeft: '4px solid #0d9488',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#0d9488',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span>Call Back Priscilla</span>
                          <span>10:00</span>
                        </div>
                      )}

                      {/* 2. Meeting with Judith: Sept 9 to Sept 10 (Spans 2 columns) */}
                      {cell.eventStart === 'judith' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(200% - 16px)', 
                          top: '40px',
                          zIndex: 10,
                          backgroundColor: '#e0f2fe',
                          borderLeft: '4px solid #0284c7',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#0284c7',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span>Meeting with Judith</span>
                          <span>10:00</span>
                        </div>
                      )}

                      {/* 3. Meeting... (Second event on Sept 9, stays in Sept 9) */}
                      {cell.eventStart2 === 'meetingShort' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(100% - 16px)', 
                          top: '72px',
                          zIndex: 9,
                          backgroundColor: '#e0f2fe',
                          borderLeft: '4px solid #0284c7',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#0284c7',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span>Meeting...</span>
                          <span>10:00</span>
                        </div>
                      )}

                      {/* 4. Project 'Rocket': Sept 14 to Sept 16 (Spans 3 columns) */}
                      {cell.eventStart === 'rocket' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(300% - 72px)', 
                          top: '40px',
                          zIndex: 10,
                          backgroundColor: '#fef9c3',
                          borderLeft: '4px solid #ca8a04',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#ca8a04',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Project "Rocket"</span>
                          <span>10:00</span>
                        </div>
                      )}

                      {/* 5. Extra +5 Badge on Sept 16 */}
                      {cell.showExtra && (
                        <div style={{
                          position: 'absolute',
                          right: '8px',
                          top: '40px',
                          zIndex: 11,
                          backgroundColor: '#fef3c7',
                          color: '#d97706',
                          borderRadius: '4px',
                          padding: '5px 8px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          +5
                        </div>
                      )}

                      {/* 6. Presentation 1: Sept 23 to Sept 25 (Spans 3 columns) */}
                      {cell.eventStart === 'presentation1' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(300% - 16px)', 
                          top: '40px',
                          zIndex: 10,
                          backgroundColor: '#dcfce7',
                          borderLeft: '4px solid #16a34a',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#16a34a',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span>Presentation</span>
                          <span>10:00</span>
                        </div>
                      )}

                      {/* 7. Presentation 2: Sept 23 to Sept 25 (Spans 3 columns) */}
                      {cell.eventStart2 === 'presentation2' && (
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          width: 'calc(300% - 16px)', 
                          top: '72px',
                          zIndex: 9,
                          backgroundColor: '#dcfce7',
                          borderLeft: '4px solid #16a34a',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          color: '#16a34a',
                          fontSize: '11px',
                          fontWeight: '700',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <span>Presentation</span>
                          <span>10:00</span>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>

          ) : viewMode === 'Week' ? (
            
            /* WEEK CALENDAR CONTAINER */
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Week view header row */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafbfc' }}>
                {/* Left corner spacer for hour labels */}
                <div style={{ width: '60px', flexShrink: 0, borderRight: '1px solid #e2e8f0' }} />
                
                {/* 7 Columns for weekdays */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>
                  {[
                    { label: 'MO', date: 6 },
                    { label: 'TU', date: 7 },
                    { label: 'WE', date: 8, isToday: true },
                    { label: 'TH', date: 9 },
                    { label: 'FR', date: 10 },
                    { label: 'SA', date: 11 },
                    { label: 'SU', date: 12 }
                  ].map((day) => (
                    <div key={day.label} style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: day.label === 'SU' ? 'none' : '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>{day.label}</span>
                      {day.isToday ? (
                        <span style={{ display: 'flex', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                          {day.date}
                        </span>
                      ) : (
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
                          {day.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scrollable hours grid body */}
              <div style={{ position: 'relative', height: '600px', overflowY: 'auto' }}>
                
                {/* Horizontal Hour rows */}
                {['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'].map((hour, idx) => (
                  <div key={hour} style={{ display: 'flex', height: '80px', borderBottom: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
                    {/* Time label */}
                    <div style={{ 
                      width: '60px', 
                      flexShrink: 0, 
                      fontSize: '11px', 
                      color: '#94a3b8', 
                      fontWeight: '600', 
                      textAlign: 'right', 
                      paddingRight: '12px', 
                      paddingTop: '8px', 
                      boxSizing: 'border-box',
                      borderRight: '1px solid #e2e8f0' 
                    }}>
                      {hour}
                    </div>
                    
                    {/* Day column slots grids grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, height: '100%' }}>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => (
                        <div key={dayIdx} style={{ borderRight: dayIdx === 6 ? 'none' : '1px solid #f1f5f9', height: '100%' }} />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Red active timeline at 06:30 (5.5 * 80px = 440px down) */}
                <div style={{ position: 'absolute', top: '440px', left: '60px', right: 0, height: '1.5px', backgroundColor: '#ef4444', zIndex: 10, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '428px', left: '8px', backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '9px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', zIndex: 11, pointerEvents: 'none' }}>
                  06:30
                </div>
                {/* Red circle dot on Wednesday (active day WE 8, index 2) */}
                <div style={{ 
                  position: 'absolute', 
                  top: '436px', 
                  left: 'calc(60px + 2 * (100% - 60px) / 7 + (100% - 60px) / 14 - 5px)', 
                  width: '9px', 
                  height: '9px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ef4444', 
                  border: '2px solid #ffffff', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                  zIndex: 12, 
                  pointerEvents: 'none' 
                }} />

                {/* WEEK VIEW EVENT CARDS */}
                {/* TU (Col 1) - Event 1: Meeting with... (01:00 to 02:00) */}
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  left: 'calc(60px + 1 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '80px',
                  backgroundColor: '#e0f2fe',
                  borderLeft: '4px solid #0284c7',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#0284c7',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Meeting with...</span>
                </div>

                {/* TU (Col 1) - Event 2: New Event (02:00 to 05:40) */}
                <div style={{
                  position: 'absolute',
                  top: '80px',
                  left: 'calc(60px + 1 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '293px',
                  backgroundColor: '#e0f2fe',
                  borderLeft: '4px solid #0284c7',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#0284c7',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>New Event</span>
                </div>

                {/* WE (Col 2) - Event 1: Project Rocket (04:30 to 06:00) */}
                <div style={{
                  position: 'absolute',
                  top: '280px',
                  left: 'calc(60px + 2 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '120px',
                  backgroundColor: '#fef9c3',
                  borderLeft: '4px solid #ca8a04',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#ca8a04',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Project "Rocket"</span>
                </div>

                {/* TH (Col 3) - Event 1: Call Back Priscilla (07:00 to 11:30) */}
                <div style={{
                  position: 'absolute',
                  top: '480px',
                  left: 'calc(60px + 3 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '360px',
                  backgroundColor: '#ccfbf1',
                  borderLeft: '4px solid #0d9488',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#0d9488',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>Call Back Priscilla</span>
                </div>

                {/* FR (Col 4) - Event 1: Presentation (03:30 to 07:30) */}
                <div style={{
                  position: 'absolute',
                  top: '200px',
                  left: 'calc(60px + 4 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '320px',
                  backgroundColor: '#dcfce7',
                  borderLeft: '4px solid #16a34a',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#16a34a',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>Presentation</span>
                </div>

                {/* FR (Col 4) - Event 2: Presentation 2 (07:30 to 09:30) */}
                <div style={{
                  position: 'absolute',
                  top: '520px',
                  left: 'calc(60px + 4 * (100% - 60px) / 7 + 4px)',
                  width: 'calc((100% - 60px) / 7 - 8px)',
                  height: '160px',
                  backgroundColor: '#dcfce7',
                  borderLeft: '4px solid #16a34a',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#16a34a',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>Presentation</span>
                </div>

              </div>
            </div>

          ) : (
            
            /* DAY CALENDAR CONTAINER */
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Day view header row */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafbfc', justifyContent: 'center', padding: '16px 0' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tuesday 7
                </span>
              </div>

              {/* Scrollable hours grid body */}
              <div style={{ position: 'relative', height: '600px', overflowY: 'auto' }}>
                
                {/* Horizontal Hour rows */}
                {['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'].map((hour) => (
                  <div key={hour} style={{ display: 'flex', height: '80px', borderBottom: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
                    {/* Time label */}
                    <div style={{ 
                      width: '60px', 
                      flexShrink: 0, 
                      fontSize: '11px', 
                      color: '#94a3b8', 
                      fontWeight: '600', 
                      textAlign: 'right', 
                      paddingRight: '12px', 
                      paddingTop: '8px', 
                      boxSizing: 'border-box',
                      borderRight: '1px solid #e2e8f0' 
                    }}>
                      {hour}
                    </div>
                    
                    {/* Day slot */}
                    <div style={{ flex: 1, height: '100%' }} />
                  </div>
                ))}

                {/* Red active timeline at 06:30 (5.5 * 80px = 440px down) */}
                <div style={{ position: 'absolute', top: '440px', left: '60px', right: 0, height: '1.5px', backgroundColor: '#ef4444', zIndex: 10, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '428px', left: '8px', backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '9px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px', zIndex: 11, pointerEvents: 'none' }}>
                  06:30
                </div>

                {/* DAY VIEW EVENT CARDS */}
                {/* Event 1 (Yellow): Project "Rocket" (01:30 to 03:00) */}
                <div style={{
                  position: 'absolute',
                  top: '120px',
                  left: '64px',
                  width: 'calc(100% - 72px)',
                  height: '120px',
                  backgroundColor: '#fef9c3',
                  borderLeft: '4px solid #ca8a04',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#ca8a04',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>Project "Rocket"</span>
                </div>

                {/* Event 2 (Blue): New Event (04:20 to 06:30) */}
                <div style={{
                  position: 'absolute',
                  top: '266px',
                  left: '64px',
                  width: 'calc(100% - 72px)',
                  height: '173px',
                  backgroundColor: '#e0f2fe',
                  borderLeft: '4px solid #0284c7',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#0284c7',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>New Event</span>
                </div>

                {/* Event 3 (Teal): Call Back Priscilla (07:00 to 07:45) */}
                <div style={{
                  position: 'absolute',
                  top: '480px',
                  left: '64px',
                  width: 'calc(100% - 72px)',
                  height: '60px',
                  backgroundColor: '#ccfbf1',
                  borderLeft: '4px solid #0d9488',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#0d9488',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Call Back Priscilla</span>
                </div>

                {/* Event 4 (Green): Presentation (10:20 to 11:40) */}
                <div style={{
                  position: 'absolute',
                  top: '746px',
                  left: '64px',
                  width: 'calc(100% - 72px)',
                  height: '107px',
                  backgroundColor: '#dcfce7',
                  borderLeft: '4px solid #16a34a',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: '#16a34a',
                  zIndex: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800' }}>10:00 - 11:30</span>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>Presentation</span>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Calendar;
