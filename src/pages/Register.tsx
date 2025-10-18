import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, CheckCircle, AlertCircle, Loader, Sparkles, Shield, Zap } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/users/api';

// Animated background particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
      `}</style>
    </div>
  );
};

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (!password) return { level: 0, text: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Weak', color: '#ef4444' },
      { level: 2, text: 'Fair', color: '#f59e0b' },
      { level: 3, text: 'Good', color: '#68BA7F' },
      { level: 4, text: 'Strong', color: '#2E6F40' },
      { level: 5, text: 'Very Strong', color: '#2E6F40' }
    ];
    return levels[strength];
  };

  const strength = getStrength();
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= strength.level ? strength.color : '#e5e7eb'
            }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: strength.color }}>
        {strength.text}
      </p>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="p-2 rounded-lg" style={{ backgroundColor: '#CFFFDC' }}>
      <Icon className="w-5 h-5" style={{ color: '#2E6F40' }} />
    </div>
    <div>
      <h3 className="font-semibold text-black mb-1">{title}</h3>
      <p className="text-sm text-black text-opacity-80">{description}</p>
    </div>
  </div>
);

// Registration Page Component
const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password1: '',
    password2: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/registers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          email: '',
          name: '',
          password1: '',
          password2: ''
        });
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
      <FloatingParticles />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Branding & Features */}
     <div className="hidden lg:block space-y-8">
  <div>
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white">Simplify Your Links</h1>
    </div>
    <p className="text-xl text-white text-opacity-90 leading-relaxed">
      Create, manage, and track your short links effortlessly. Make every share smarter with analytics, reliability, and a touch of style.
    </p>
  </div>

  <div className="space-y-4">
    <FeatureCard
      icon={Zap}
      title="Instant Short Links"
      description="Generate short URLs in seconds — quick, clean, and ready to share."
    />
    <FeatureCard
      icon={Shield}
      title="Track Every Click"
      description="Get real-time analytics and insights for all your shared links."
    />
    <FeatureCard
      icon={Shield}
      title="Secure & Reliable"
      description="Every link is protected and backed by a secure, scalable system."
    />
  </div>
</div>


          {/* Right side - Registration Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              {success ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-bounce" style={{ backgroundColor: '#CFFFDC' }}>
                    <CheckCircle className="w-10 h-10" style={{ color: '#2E6F40' }} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#2E6F40' }}>
                    Welcome Aboard! 🎉
                  </h2>
                  <p className="text-gray-600 mb-2">
                    We've sent a verification email to
                  </p>
                  <p className="font-semibold mb-6" style={{ color: '#2E6F40' }}>
                    {formData.email}
                  </p>
                  <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#CFFFDC' }}>
                    <p className="text-sm" style={{ color: '#253D2C' }}>
                      Please check your inbox and click the verification link to activate your account.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: '#2E6F40' }}
                  >
                    Register Another Account
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative overflow-hidden" style={{ backgroundColor: '#2E6F40' }}>
                      <User className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#253D2C' }}>
                      Create Account
                    </h2>
                    <p className="text-gray-600">Start your journey with us today</p>
                  </div>

                  <div className="space-y-5">
                    {error && (
                      <div className="rounded-xl p-4 animate-shake" style={{ backgroundColor: '#FFE5E5' }}>
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#253D2C' }}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200" 
                          style={{ color: focusedField === 'name' ? '#2E6F40' : '#9ca3af' }}
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-200"
                          style={{ 
                            borderColor: focusedField === 'name' ? '#2E6F40' : '#e5e7eb',
                            boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(46, 111, 64, 0.1)' : 'none'
                          }}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#253D2C' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200" 
                          style={{ color: focusedField === 'email' ? '#2E6F40' : '#9ca3af' }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-200"
                          style={{ 
                            borderColor: focusedField === 'email' ? '#2E6F40' : '#e5e7eb',
                            boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(46, 111, 64, 0.1)' : 'none'
                          }}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#253D2C' }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200" 
                          style={{ color: focusedField === 'password1' ? '#2E6F40' : '#9ca3af' }}
                        />
                        <input
                          type="password"
                          name="password1"
                          value={formData.password1}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password1')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-200"
                          style={{ 
                            borderColor: focusedField === 'password1' ? '#2E6F40' : '#e5e7eb',
                            boxShadow: focusedField === 'password1' ? '0 0 0 3px rgba(46, 111, 64, 0.1)' : 'none'
                          }}
                          placeholder="••••••••"
                        />
                      </div>
                      <PasswordStrength password={formData.password1} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#253D2C' }}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200" 
                          style={{ color: focusedField === 'password2' ? '#2E6F40' : '#9ca3af' }}
                        />
                        <input
                          type="password"
                          name="password2"
                          value={formData.password2}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password2')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-200"
                          style={{ 
                            borderColor: focusedField === 'password2' ? '#2E6F40' : '#e5e7eb',
                            boxShadow: focusedField === 'password2' ? '0 0 0 3px rgba(46, 111, 64, 0.1)' : 'none'
                          }}
                          placeholder="••••••••"
                        />
                        {formData.password2 && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {formData.password1 === formData.password2 ? (
                              <CheckCircle className="w-5 h-5" style={{ color: '#2E6F40' }} />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-4 px-4 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      style={{ backgroundColor: '#2E6F40' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                           style={{ transform: 'translateX(-100%)', animation: loading ? 'none' : 'shimmer 2s infinite' }} />
                      {loading ? (
                        <>
                          <Loader className="w-6 h-6 mr-2 animate-spin" />
                          Creating Your Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <Sparkles className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>

                    <style>{`
                      @keyframes shimmer {
                        to { transform: translateX(100%); }
                      }
                      @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                      }
                      .animate-shake { animation: shake 0.5s; }
                    `}</style>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <button 
                        onClick={() => onNavigate('login')} 
                        className="font-bold hover:underline transition-colors duration-200"
                        style={{ color: '#2E6F40' }}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500">
                      By creating an account, you agree to our{' '}
                      <button className="underline hover:text-gray-700">Terms of Service</button>
                      {' '}and{' '}
                      <button className="underline hover:text-gray-700">Privacy Policy</button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Verification Page Component
const VerifyEmailPage = ({ uid, token, onNavigate }) => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!uid || !token) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/verify-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Your email has been verified successfully! You can now log in to your account.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. The link may be expired or invalid.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
      }
    };

    verifyEmail();
  }, [uid, token]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            {status === 'verifying' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#CFFFDC' }}>
                  <Loader className="w-10 h-10 animate-spin" style={{ color: '#2E6F40' }} />
                </div>
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#253D2C' }}>Verifying Email</h1>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-bounce" style={{ backgroundColor: '#CFFFDC' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: '#2E6F40' }} />
                </div>
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#2E6F40' }}>Email Verified! 🎉</h1>
                <p className="text-gray-600 mb-8">{message}</p>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:shadow-xl"
                  style={{ backgroundColor: '#2E6F40' }}
                >
                  Go to Login
                </button>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-red-100 animate-shake">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-red-600">Verification Failed</h1>
                <p className="text-gray-600 mb-8">{message}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => onNavigate('register')}
                    className="px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: '#2E6F40' }}
                  >
                    Register Again
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-2 hover:shadow-lg"
                    style={{ color: '#2E6F40', borderColor: '#2E6F40' }}
                  >
                    Retry
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Home/Landing Page
const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
      <FloatingParticles />
      
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome</h1>
        <p className="text-2xl mb-12 text-opacity-90">Get started by creating your account</p>
        <button
          onClick={() => onNavigate('register')}
          className="inline-flex items-center gap-2 px-10 py-5 bg-white rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          style={{ color: '#2E6F40' }}
        >
          Create Account
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Main App Component with Client-Side Routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [verificationParams, setVerificationParams] = useState({ uid: null, token: null });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');
    
    if (uid && token) {
      setVerificationParams({ uid, token });
      setCurrentPage('verify');
    }
  }, []);

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    if (params.uid && params.token) {
      setVerificationParams(params);
    }
  };

  return (
    <div>
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'register' && <RegisterPage onNavigate={navigate} />}
      {currentPage === 'verify' && (
        <VerifyEmailPage 
          uid={verificationParams.uid} 
          token={verificationParams.token} 
          onNavigate={navigate} 
        />
      )}
      {currentPage === 'login' && (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
          <FloatingParticles />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Login Page</h1>
            <p className="text-xl mb-6">This is a placeholder for your login page</p>
            <button
              onClick={() => navigate('register')}
              className="px-6 py-3 bg-white rounded-xl font-semibold transition-all duration-200 hover:shadow-2xl"
              style={{ color: '#2E6F40' }}
            >
              Back to Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;