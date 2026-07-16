import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../components/hooks/useAuth';
import AuthIllustration from '../../components/Common/AuthIllustration';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login({ name: 'Prasanth', email: formData.email });
      navigate('/');
    }
  };

  return (
    <div className="auth-split-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <AuthIllustration />

      <div className="auth-form-side" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div className="auth-card-clean" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '25px', textAlign: 'center' }}>Login To Your Account</h2>
          
          <button 
            type="button" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #cbd5e1', 
              borderRadius: '6px', 
              backgroundColor: '#ffffff', 
              color: '#334155', 
              fontSize: '13px', 
              fontWeight: '600', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.17 3.59-8.46z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.14 0-5.8-2.11-6.75-4.96H1.36v3.1c2 3.97 6.09 6.7 10.64 6.7z"/>
              <path fill="#FBBC05" d="M5.25 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.6H1.36C.49 8.24 0 10.07 0 12s.49 3.76 1.36 5.4l3.89-3.11z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0 7.45 0 3.36 2.73 1.36 6.7l3.89 3.11c.95-2.85 3.61-4.96 6.75-4.96z"/>
            </svg>
            <span>Login with Google</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>
            <div style={{ flex: '1', height: '1px', backgroundColor: '#e2e8f0' }}></div>
            <span style={{ padding: '0 10px' }}>OR LOGIN WITH EMAIL</span>
            <div style={{ flex: '1', height: '1px', backgroundColor: '#e2e8f0' }}></div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
                required
                placeholder="prasanth@examplegmail.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: '15px', position: 'relative' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={formData.password} 
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px 14px', paddingRight: '40px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#64748b', fontWeight: '600' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#138a36' }} /> Remember Me
              </label>
              <Link to="/auth/forgot-password" style={{ color: '#138a36', fontWeight: '600', textDecoration: 'none' }}>Forgot Password?</Link>
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
                transition: 'background-color 0.15s'
              }}
            >
              Log In
            </button>
          </form>

          <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            Don't have an account? <Link to="/auth/register" style={{ color: '#138a36', fontWeight: '700', textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
