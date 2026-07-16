import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/avatar.png';
import authIllustration from '../../assets/images/auth/Illustration.png';

const LockScreen = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Unlocking session...');
    navigate('/');
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#1b8e3f', 
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        maxWidth: '1000px', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '48px'
      }}>
        {/* Left Side: Illustration */}
        <div style={{ 
          flex: 1.2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          maxHeight: '80vh'
        }}>
          <img 
            src={authIllustration} 
            alt="Auth Illustration" 
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} 
          />
        </div>

        {/* Right Side: White Card */}
        <div style={{ 
          width: '420px', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '40px', 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          
          {/* Circular Avatar */}
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #f1f5f9', marginBottom: '24px' }}>
            <img 
              src={defaultAvatar} 
              alt="Prasanth" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0', textAlign: 'center' }}>Prasanth</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 32px 0', textAlign: 'center' }}>Enter your password to access the admin.</p>
          
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '12px 40px 12px 14px', 
                    borderRadius: '6px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none',
                    color: '#334155',
                    boxSizing: 'border-box'
                  }}
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '12px', 
                    color: '#94a3b8', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#1b8e3f', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '14px', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1b8e3f'}
            >
              Unlock
            </button>
          </form>

          {/* Bottom link */}
          <div style={{ marginTop: '36px', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
            Not you? <span onClick={() => navigate('/auth/login')} style={{ color: '#1b8e3f', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }}>Sign In</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LockScreen;
