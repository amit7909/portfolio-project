import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react'; // Import LogOut icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if Admin is logged in when component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAdmin(!!token); // !! converts string to boolean (true if token exists)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete the key
    window.location.reload(); // Refresh page to update UI
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-textMain flex items-center gap-2">
          <span className="text-accent">&lt;</span>
          Amit
          <span className="text-accent">/&gt;</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-textMuted hover:text-accent transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}

          {/* LOGOUT BUTTON (Only visible if Admin) */}
          {isAdmin && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold ml-4"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-textMain" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary border-b border-white/10 absolute w-full">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-textMuted hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Logout Button */}
            {isAdmin && (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 font-bold"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;