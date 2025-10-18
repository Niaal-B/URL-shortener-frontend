import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

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

// Login Page Component
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    setSuccess(false);
  
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      // Check if the API call was successful
      if (!response.ok || !data.access) {
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }
  
      // Store tokens based on "Remember Me"
        localStorage.setItem('access_token', data.access);

  
      // Optional: store user info
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
  
      console.log('Access token stored:', rememberMe ? localStorage.getItem('access_token') : sessionStorage.getItem('access_token'));
  
      // Set success state
      setSuccess(true);
  
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
  
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
      <FloatingParticles />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Branding & Welcome */}
          <div className="hidden lg:block space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
              </div>
              <p className="text-xl text-white text-opacity-90 leading-relaxed">
                Sign in to your account and continue your journey with us. Access your personalized dashboard and unlock all premium features.
              </p>
            </div>

            <div className="space-y-4">
              <FeatureCard
                icon={Shield}
                title="Secure Access"
                description="Your account is protected with advanced security measures"
              />
              <FeatureCard
                icon={Zap}
                title="Instant Access"
                description="Sign in instantly and pick up right where you left off"
              />
              <FeatureCard
                icon={Sparkles}
                title="Premium Features"
                description="Access all your personalized content and settings"
              />
            </div>

            <div className="p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#2E6F40' }}>
                  ⭐
                </div>
                <div className="text-white">
                  <p className="font-semibold">Trusted by thousands</p>
                  <p className="text-sm text-opacity-80">Join our growing community</p>
                </div>
              </div>
              <p className="text-sm text-white text-opacity-80 italic">
                "The best platform I've ever used. Simple, secure, and incredibly powerful."
              </p>
              <p className="text-xs text-white text-opacity-60 mt-2">- Sarah Johnson, Premium User</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              {success ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-bounce" style={{ backgroundColor: '#CFFFDC' }}>
                    <CheckCircle className="w-10 h-10" style={{ color: '#2E6F40' }} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#2E6F40' }}>
                    Welcome Back! 🎉
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Login successful! Redirecting you to your dashboard...
                  </p>
                  <Loader className="w-8 h-8 mx-auto animate-spin" style={{ color: '#2E6F40' }} />
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative overflow-hidden" style={{ backgroundColor: '#2E6F40' }}>
                      <Lock className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#253D2C' }}>
                      Sign In
                    </h2>
                    <p className="text-gray-600">Enter your credentials to continue</p>
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold" style={{ color: '#253D2C' }}>
                          Password
                        </label>
                        <button
                          onClick={handleForgotPassword}
                          className="text-sm font-semibold hover:underline transition-colors duration-200"
                          style={{ color: '#2E6F40' }}
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200" 
                          style={{ color: focusedField === 'password' ? '#2E6F40' : '#9ca3af' }}
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-all duration-200"
                          style={{ 
                            borderColor: focusedField === 'password' ? '#2E6F40' : '#e5e7eb',
                            boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(46, 111, 64, 0.1)' : 'none'
                          }}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="sr-only"
                          />
                          <div 
                            className="w-5 h-5 border-2 rounded transition-all duration-200"
                            style={{ 
                              borderColor: rememberMe ? '#2E6F40' : '#d1d5db',
                              backgroundColor: rememberMe ? '#2E6F40' : 'transparent'
                            }}
                          >
                            {rememberMe && (
                              <CheckCircle className="w-full h-full text-white" style={{ padding: '1px' }} />
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                          Remember me
                        </span>
                      </label>
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
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
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

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">Google</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">GitHub</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <button 
                        onClick={handleRegister} 
                        className="font-bold hover:underline transition-colors duration-200"
                        style={{ color: '#2E6F40' }}
                      >
                        Create Account
                      </button>
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500">
                      Protected by industry-standard encryption. Your data is secure with us.
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

export default LoginPage;