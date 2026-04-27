import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Rocket, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string) => void;
  isDarkMode: boolean;
}

export default function Login({ onLogin, isDarkMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (email === 'admin@codesphere.com' && password === 'admin123') {
      onLogin(email);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin@codesphere.com / admin123');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 blur-[120px] rounded-full ${isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 blur-[120px] rounded-full ${isDarkMode ? 'bg-purple-600/10' : 'bg-purple-600/5'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md relative z-10 backdrop-blur-xl border rounded-4xl p-8 md:p-12 ${isDarkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-cyan-400 to-purple-600 flex items-center justify-center mb-4">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-display">Welcome Back</h1>
          <p className={`text-sm mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Admin Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={`text-[10px] uppercase tracking-widest font-bold ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codesphere.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none focus:border-cyan-400 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] uppercase tracking-widest font-bold ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Password</label>
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none focus:border-cyan-400 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs"
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-cyan-500 text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
            <button onClick={() => navigate('/')} className={`text-xs hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Return to main site</button>
        </div>
      </motion.div>
    </div>
  );
}
