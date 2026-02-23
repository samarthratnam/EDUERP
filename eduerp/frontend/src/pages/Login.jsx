import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const mockEmails = {
    student: 'student@eduerp.com',
    teacher: 'teacher@eduerp.com',
    admin: 'admin@eduerp.com',
    administrator: 'administrator@eduerp.com',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (login(email, password, role)) {
        navigate(`/${role}/dashboard`);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  const fillDemo = () => {
    setEmail(mockEmails[role]);
    setPassword(role === 'administrator' ? 'admin123' : `${role}123`);
    setError('');
  };

  const getRoleLabel = () => {
    const labels = {
      student: '01 / STUDENT',
      teacher: '02 / TEACHER',
      admin: '03 / ADMIN',
      administrator: '04 / ADMINISTRATOR',
    };
    return labels[role] || role;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-black border border-[#222] p-8">
        <div className="mb-6">
          <div className="font-mono text-xs text-accent tracking-widest uppercase font-bold mb-4">
            {getRoleLabel()}
          </div>
          <h1 className="font-syne text-3xl font-bold text-white">Sign In</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-red-900 bg-red-950/20 text-red-400 font-mono text-xs">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black border border-white text-white font-mono text-sm tracking-widest uppercase py-2 hover:bg-accent hover:text-black hover:border-accent transition-all disabled:opacity-50 mb-3"
        >
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className="w-full bg-black border border-[#555] text-[#555] font-mono text-xs tracking-widest uppercase py-2 hover:border-accent hover:text-accent transition-colors"
        >
          Demo Credentials
        </button>

        <div className="mt-6 text-center">
          <Link to="/" className="font-mono text-xs text-accent hover:text-white transition-colors">
            ← Back to role select
          </Link>
        </div>
      </form>
    </div>
  );
};
