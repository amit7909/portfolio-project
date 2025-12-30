import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["Java", "Java-Script"]
  },
  {
    category: "Backend Engineering",
    skills: ["Node.js", "Express.js", "System Design", "Microservices", "REST APIs", "gRPC"]
  },
  {
    category: "Database & Storage",
    skills: ["MongoDB", "Mongoose"]
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS (EC2, S3)", "CI/CD (GitHub Actions)"]
  },
  {
    category: "Frontend (Bonus)",
    skills: ["React", "Tailwind CSS", "Vite", "Framer Motion"]
  },
  {
    category: "Technical Subject",
    skills: ["DSA", "DBMS", "Computer Network", "Operating System"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-secondary/30 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Arsenal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((group, index) => (
                    <motion.div 
                        key={group.category}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary border border-white/5 p-6 rounded-xl hover:border-accent/30 transition-colors"
                    >
                        <h3 className="text-xl font-bold text-accent mb-4">{group.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-secondary text-textMuted text-sm rounded-lg border border-white/5 hover:text-white hover:border-accent transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Skills;