import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecruiter } from '../context/RecruiterContext'; 
import ProjectCard from '../components/ProjectCard'; 
import { Search, Loader2, Lock } from 'lucide-react';

// IMPORT YOUR LOCAL DATA AS A FALLBACK
import { projects as localMockData } from '../utils/mockData';

const Projects = () => {
  const { isRecruiterMode } = useRecruiter();
  
  // INITIALIZE STATE WITH YOUR LOCAL DATA
  const [projects, setProjects] = useState(localMockData);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usingLiveData, setUsingLiveData] = useState(false);

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Backend filters data based on mode, but we can double-check on client
        const url = `https://portfolio-project-h6oi.onrender.com/api/v1/projects?recruiterMode=${isRecruiterMode}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Backend offline");

        const json = await response.json();

        if (json.success) {
          setProjects(json.data);
          setUsingLiveData(true);
        }
      } catch (err) {
        // Silent fail - keep using local data if backend dies
        console.warn("Backend unavailable, using local data.");
        setUsingLiveData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); 
    
  }, [isRecruiterMode]);

  // === 🛠️ THE FIX IS HERE 🛠️ ===
  const displayedProjects = projects.filter(project => {
    // Check 'isFeatured' (Backend) OR 'featured' (Local Data)
    const isProjectFeatured = project.isFeatured || project.featured;

    // Filter Logic
    const matchesRecruiter = isRecruiterMode ? isProjectFeatured : true;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (project.title?.toLowerCase() || "").includes(searchLower) || 
      (project.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false);

    return matchesRecruiter && matchesSearch;
  });
  // ==============================

  return (
    <section id="projects" className="py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold">
                      {isRecruiterMode ? "Top Engineering Projects" : "What I've Built"}
                  </h2>
                  
                  {/* ADMIN LOGIN LINK */}
                  <Link to="/admin/login" className="text-gray-400 hover:text-green-400 transition-colors" title="Admin Login">
                    <Lock size={16} />
                  </Link>

                  {/* LIVE DATA BADGE */}
                  <span className={`text-xs px-2 py-1 rounded border ${usingLiveData ? 'border-green-500 text-green-400' : 'border-gray-600 text-gray-500'}`}>
                    {usingLiveData ? "🟢 Live" : "⚪ Local"}
                  </span>
                </div>

                <p className="text-gray-400 max-w-xl">
                    {isRecruiterMode 
                    ? "Selected projects demonstrating backend architecture and scalability."
                    : "A collection of my experiments, full-stack apps, and open-source contributions."}
                </p>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search technology..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-green-400 transition-colors"
                />
            </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
            <div className="flex justify-center items-center py-4 text-green-400 text-sm">
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Syncing with Database...
            </div>
        )}

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
                // Use _id for MongoDB data, id for Local data
                <ProjectCard key={project._id || project.id} project={project} />
            ))
        ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
                <p>No projects found matching "{searchTerm}"</p>
            </div>
        )}
        </div>

        {/* RECRUITER HINT */}
        {isRecruiterMode && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              *Recruiter Mode is on. <button onClick={() => window.location.reload()} className="text-green-400 hover:underline">Disable it</button> to see experimental projects.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;  