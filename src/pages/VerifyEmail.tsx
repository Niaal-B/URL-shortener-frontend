import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader, Shield, Sparkles, Zap } from 'lucide-react';

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

// Animated Checkmark Component
const AnimatedCheckmark = () => {
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#2E6F40"
          strokeWidth="3"
          style={{
            strokeDasharray: 283,
            strokeDashoffset: 283,
            animation: 'drawCircle 0.6s ease-out forwards'
          }}
        />
        <path
          d="M 30 50 L 45 65 L 70 35"
          fill="none"
          stroke="#2E6F40"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 60,
            strokeDashoffset: 60,
            animation: 'drawCheck 0.4s 0.6s ease-out forwards'
          }}
        />
      </svg>
      <style>{`
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

// Progress Dots Component
const ProgressDots = () => {
  return (
    <div className="flex gap-2 justify-center mb-8">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: '#2E6F40',
            animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

// Email Verification Page Component
const VerifyEmailPage = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const verifyEmail = async () => {
      // Extract uid and token from URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const uid = urlParams.get('uid');
      const token = urlParams.get('token');

      if (!uid || !token) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        return;
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      try {
        const response = await fetch(`${API_BASE_URL}/verify-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        });

        const data = await response.json();
        clearInterval(progressInterval);
        setProgress(100);

        setTimeout(() => {
          if (response.ok) {
            setStatus('success');
            setMessage('Your email has been verified successfully! You can now log in to your account.');
          } else {
            setStatus('error');
            setMessage(data.message || 'Verification failed. The link may be expired or invalid.');
          }
        }, 300);
      } catch (err) {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => {
          setStatus('error');
          setMessage('Network error. Please check your connection and try again.');
        }, 300);
      }
    };

    verifyEmail();
  }, []);

  const handleLogin = () => {
    // Navigate to login page - modify this URL as needed
    window.location.href = '/login';
  };

  const handleRegister = () => {
    // Navigate to register page - modify this URL as needed
    window.location.href = '/register';
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a4d2e 0%, #2E6F40 50%, #68BA7F 100%)' }}>
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
          
          {/* Progress Bar */}
          {status === 'verifying' && (
            <div className="h-2 bg-gray-100 relative overflow-hidden">
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #2E6F40, #68BA7F)',
                  boxShadow: '0 0 10px rgba(46, 111, 64, 0.5)'
                }}
              />
            </div>
          )}

          <div className="p-12">
            <div className="text-center">
              
              {/* Verifying State */}
              {status === 'verifying' && (
                <div className="animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-8 relative" style={{ backgroundColor: '#CFFFDC' }}>
                    <div className="absolute inset-0 rounded-full" style={{
                      backgroundColor: '#2E6F40',
                      opacity: 0.1,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }} />
                    <Mail className="w-16 h-16 relative z-10" style={{ color: '#2E6F40' }} />
                  </div>
                  
                  <ProgressDots />
                  
                  <h1 className="text-4xl font-bold mb-4" style={{ color: '#253D2C' }}>
                    Verifying Your Email
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Please wait while we confirm your email address...
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                      <div className="flex-shrink-0">
                        <Loader className="w-6 h-6 animate-spin" style={{ color: '#2E6F40' }} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold" style={{ color: '#253D2C' }}>
                          Processing verification
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          This should only take a moment
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <style>{`
                    @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(10px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes ping {
                      75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                      }
                    }
                    @keyframes shimmer {
                      to { transform: translateX(100%); }
                    }
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      25% { transform: translateX(-10px); }
                      75% { transform: translateX(10px); }
                    }
                    .animate-fadeIn {
                      animation: fadeIn 0.5s ease-out;
                    }
                    .animate-shake {
                      animation: shake 0.5s;
                    }
                  `}</style>
                </div>
              )}

              {/* Success State */}
              {status === 'success' && (
                <div className="animate-fadeIn">
                  <div className="inline-flex items-center justify-center mb-8">
                    <AnimatedCheckmark />
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#CFFFDC' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#2E6F40' }} />
                    <span className="text-sm font-semibold" style={{ color: '#2E6F40' }}>
                      Verification Complete
                    </span>
                  </div>
                  
                  <h1 className="text-5xl font-bold mb-4" style={{ color: '#2E6F40' }}>
                    All Set! 🎉
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    {message}
                  </p>
                  
                  <div className="max-w-md mx-auto mb-8">
                    <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#CFFFDC' }}>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2E6F40' }}>
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-semibold" style={{ color: '#253D2C' }}>Secure</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2E6F40' }}>
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-semibold" style={{ color: '#253D2C' }}>Verified</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2E6F40' }}>
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-semibold" style={{ color: '#253D2C' }}>Ready</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogin}
                    className="group relative px-10 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                    style={{ backgroundColor: '#2E6F40' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                         style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }} />
                    <span className="relative flex items-center gap-2">
                      Continue to Login
                      <Zap className="w-5 h-5" />
                    </span>
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-6">
                    You can now access all features of your account
                  </p>
                </div>
              )}

              {/* Error State */}
              {status === 'error' && (
                <div className="animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-8 relative bg-red-50 animate-shake">
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-10 animate-ping" />
                    <AlertCircle className="w-16 h-16 text-red-600 relative z-10" />
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-red-600">
                      Verification Failed
                    </span>
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4 text-red-600">
                    Something Went Wrong
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    {message}
                  </p>
                  
                  <div className="max-w-md mx-auto mb-8 p-6 rounded-2xl bg-red-50 text-left">
                    <h3 className="font-semibold text-red-900 mb-3">Common reasons:</h3>
                    <ul className="space-y-2 text-sm text-red-800">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>The verification link has expired</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>The link has already been used</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>The link was copied incorrectly</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl"
                      style={{ backgroundColor: '#2E6F40' }}
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleRegister}
                      className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 border-2 hover:shadow-xl hover:bg-gray-50"
                      style={{ color: '#2E6F40', borderColor: '#2E6F40' }}
                    >
                      Register Again
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Need help?{' '}
                      <button className="font-semibold hover:underline" style={{ color: '#2E6F40' }}>
                        Contact Support
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;