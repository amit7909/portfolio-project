import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link added for navigation safety
import { UserPlus, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Handle Input Change (Safe & Clean)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing (Crucial!)
    setLoading(true);
    setError(null);

    try {
      // Assuming your backend has this endpoint. If not, ask your Backend AI to create it.
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // SUCCESS: Redirect to Login so they can sign in with new credentials
      navigate('/admin/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-primary/50">
      
      {/* Background Decor (Keeps design consistent) */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md bg-secondary/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Admin</h2>
          <p className="text-textMuted text-sm">One-time setup for portfolio owner</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
              <input 
                name="name"
                type="text" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-primary border border-white/10 rounded-lg py-3 pl-10 pr-4 text-textMain focus:outline-none focus:border-accent transition-colors"
                placeholder="Amit Tiwari"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-primary border border-white/10 rounded-lg py-3 pl-10 pr-4 text-textMain focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-primary border border-white/10 rounded-lg py-3 pl-10 pr-4 text-textMain focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
            {loading ? "Creating Account..." : "Register Admin"}
          </button>
        </form>

        {/* Safe Navigation Link back to Login */}
        <div className="mt-6 text-center text-sm text-textMuted">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-accent hover:underline">
                Login here
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;