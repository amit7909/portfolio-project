import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 border-t border-white/5 bg-gradient-to-b from-primary to-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-bold mb-6">Let's Build Something Scalable.</h2>
        <p className="text-textMuted mb-10 text-lg">
          I am currently looking for Backend or Full-stack roles. <br/>
          If you have an interesting problem to solve, let's talk.
        </p>

        <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=amittiwari79099@gmail.com&su=Backend%20Opportunity&body=Hi%20Amit,%0D%0A%0D%0AI%20visited%20your%20portfolio..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-bold hover:bg-white transition-all"
            >
              <Mail size={20} /> Send Email
            </a>

            <a href="https://www.linkedin.com/in/amit060/" target="_blank" className="p-3 bg-secondary rounded-lg text-textMuted hover:text-white hover:bg-white/10 transition-all">
                <Linkedin size={24}/>
            </a>
            <a href="https://github.com/amit7909" target="_blank" className="p-3 bg-secondary rounded-lg text-textMuted hover:text-white hover:bg-white/10 transition-all">
                <Github size={24}/>
            </a>
        </div>

        <footer className="text-textMuted text-sm">
            <p>
               © {new Date().getFullYear()} Amit Tiwari. Engineering scalable solutions with React & Node.js.
            </p>
        </footer>

      </div>
    </section>
  );
};

export default Contact;