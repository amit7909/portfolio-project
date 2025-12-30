import { motion } from 'framer-motion';
import { Github, ExternalLink, Server, Trash2, Edit } from 'lucide-react'; // Added Admin Icons
import { useNavigate } from 'react-router-dom'; // Added for navigation

/**
 * PROJECT CARD COMPONENT
 * ----------------------
 * Represents a single project.
 * Updated to include ADMIN ACTIONS (Edit/Delete).
 */
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  // 1. CHECK FOR ADMIN TOKEN
  // If this token exists, we show the Edit/Delete buttons
  const isAdmin = localStorage.getItem('token');

  // 2. HANDLE DELETE
  const handleDelete = async () => {
    // Safety Check: Don't let them delete Mock Data (which has simple ID numbers like 1, 2)
    if (!project._id) {
      alert("You cannot delete 'Mock Data'. Only Database projects can be deleted.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/projects/${project._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${isAdmin}` // Send the token!
        }
      });

      if (response.ok) {
        alert('Project deleted successfully');
        window.location.reload(); // Refresh the page to show it's gone
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete project');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  // 3. HANDLE EDIT
  const handleEdit = () => {
    // Safety Check for Mock Data
    if (!project._id) {
        alert("You cannot edit 'Mock Data'. Add this project to the Database first.");
        return;
    }
    navigate(`/admin/edit/${project._id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }} 
      className="bg-secondary border border-white/5 rounded-xl p-6 hover:border-accent/50 transition-colors group relative"
    >
      
      {/* HEADER: Icon + Links + ADMIN CONTROLS */}
      <div className="flex justify-between items-start mb-4">
        {/* The Icon Box */}
        <div className="p-3 bg-primary rounded-lg text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
          <Server size={24} />
        </div>
        
        {/* Links Section */}
        <div className="flex gap-3 items-center">
          
          {/* --- ADMIN BUTTONS (Only visible if logged in) --- */}
          {isAdmin && (
            <div className="flex gap-2 mr-2 border-r border-white/10 pr-3">
               <button 
                 onClick={handleEdit} 
                 className="text-blue-400 hover:text-blue-300 transition-colors"
                 title="Edit Project"
               >
                 <Edit size={18} />
               </button>
               <button 
                 onClick={handleDelete} 
                 className="text-red-400 hover:text-red-300 transition-colors"
                 title="Delete Project"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          )}
          {/* ----------------------------------------------- */}

          {/* Standard Links */}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-white transition-colors">
                <Github size={20}/>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-white transition-colors">
                <ExternalLink size={20}/>
            </a>
          )}
        </div>
      </div>

      {/* BODY: Title & Description */}
      <h3 className="text-xl font-bold mb-2 text-textMain">{project.title}</h3>
      <p className="text-accent text-sm font-medium mb-3">{project.tagline}</p>
      
      <p className="text-textMuted text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* FOOTER: Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags?.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-primary text-xs text-textMuted rounded-full border border-white/5">
            {tag}
          </span>
        ))}
      </div>

    </motion.div>
  );
};

export default ProjectCard;