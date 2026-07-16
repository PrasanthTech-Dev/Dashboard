import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthIllustration from '../../components/Common/AuthIllustration';
import lockIcon from '../../assets/images/auth/Lock.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Resetting password details...');
    navigate('/auth/login');
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

          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Reset Your Password</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '25px' }}>Provide your email and a new password security key.</p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password} 
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '10px 14px', paddingRight: '40px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Confirm Password</label>
              <input 
                type="password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
              {error && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{error}</span>}
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
              Reset Password
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

export default ResetPassword;
