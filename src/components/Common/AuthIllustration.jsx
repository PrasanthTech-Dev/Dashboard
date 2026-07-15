import React from 'react';
import authIllustration from '../../assets/images/auth/Illustration.png';

const AuthIllustration = () => {
  return (
    <div className="auth-illustration-side" style={{ backgroundColor: '#138a36', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '100vh', padding: '40px', boxSizing: 'border-box' }}>
      <img 
        src={authIllustration} 
        alt="Auth Illustration" 
        style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }} 
      />
    </div>
  );
};

export default AuthIllustration;
