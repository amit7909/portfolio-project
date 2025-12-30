import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Loader2, AlertCircle } from 'lucide-react';

const EditProject = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., /admin/edit/123)
  const navigate = useNavigate();

  // Initial State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    tags: '', // We'll manage this as a comma-separated string in the UI
    category: 'FullStack',
    liveUrl: '',
    repositoryUrl: '',
    isFeatured: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 1. FETCH EXISTING DATA ON LOAD
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // NOTE: We assume your backend has a GET /projects/:id endpoint.
        // If not, you might need to fetch all and find the one matching the ID.
        const response = await fetch(`https://portfolio-project-h6oi.onrender.com/api/v1/projects/${id}`);
        const json = await response.json();

        if (json.success) {
          const project = json.data;
          // Pre-fill form. We convert the tags array ['React', 'Node'] back to string "React, Node"
          setFormData({
            ...project,
            tags: project.tags ? project.tags.join(', ') : '' 
          });
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // 2. HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 3. SUBMIT UPDATED DATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Convert comma string back to array for the API
    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://portfolio-project-h6oi.onrender.com/api/v1/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Protect this route!
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        alert('Project updated successfully!');
        navigate('/'); // Go back to homepage
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Update failed');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-accent">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-primary">
      <div className="max-w-2xl mx-auto bg-secondary/30 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Edit Project</h2>
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Project Title</label>
                <input 
                    type="text" name="title" required
                    value={formData.title} onChange={handleChange}
                    className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                />
            </div>

            {/* Tagline */}
            <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Tagline (Short Summary)</label>
                <input 
                    type="text" name="tagline" required
                    value={formData.tagline} onChange={handleChange}
                    className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Full Description</label>
                <textarea 
                    name="description" rows="4" required
                    value={formData.description} onChange={handleChange}
                    className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Tags (comma separated)</label>
                <input 
                    type="text" name="tags" 
                    placeholder="React, Node.js, MongoDB"
                    value={formData.tags} onChange={handleChange}
                    className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                />
            </div>

            {/* Category & Featured */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-textMuted mb-2">Category</label>
                    <select 
                        name="category" 
                        value={formData.category} onChange={handleChange}
                        className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="FullStack">FullStack</option>
                        <option value="DevOps">DevOps</option>
                    </select>
                </div>
                
                <div className="flex items-center pt-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox" name="isFeatured"
                            checked={formData.isFeatured} onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-textMain font-medium">Recruiter Mode (Featured)</span>
                    </label>
                </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-textMuted mb-2">Live Demo URL</label>
                    <input 
                        type="url" name="liveUrl"
                        value={formData.liveUrl} onChange={handleChange}
                        className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-textMuted mb-2">GitHub Repo URL</label>
                    <input 
                        type="url" name="repositoryUrl"
                        value={formData.repositoryUrl} onChange={handleChange}
                        className="w-full bg-primary border border-white/10 rounded-lg p-3 focus:border-accent outline-none"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button 
                    type="submit" disabled={saving}
                    className="flex-1 bg-accent text-primary font-bold py-3 rounded-lg hover:bg-white transition-all flex justify-center items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Update Project
                </button>
                <button 
                    type="button" 
                    onClick={() => navigate('/')}
                    className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5"
                >
                    Cancel
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default EditProject;