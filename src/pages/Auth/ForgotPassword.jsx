import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthIllustration from '../../components/Common/AuthIllustration';
import lockIcon from '../../assets/images/auth/Lock.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('prasanth@gmail.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending recovery code to...', email);
    navigate('/auth/reset-password');
  };

  return (
    <div className="auth-split-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <AuthIllustration />

      <div className="auth-form-side" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div className="auth-card-clean" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#f8fafc', marginBottom: '25px' }}>
            <img 
              src={lockIcon} 
              alt="Lock Icon" 
              style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
            />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Recover Your Password</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '25px' }}>Please specify your email address to recover your credentials.</p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="prasanth@gmail.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#138a36', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '14px', 
                fontWeight: '600', 
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              Recover Password
            </button>
          </form>

          <Link to="/auth/login" style={{ color: '#138a36', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
