import { useRecruiter } from '../context/RecruiterContext';

const experiences = [
  {
    id: 1,
    role: "Backend Engineering Intern",
    company: "Mutanex Genomics Pvt. Ltd., Ahmedabad",
    date: "Jul 2025 – Sep 2025",
    desc: "Contributed to backend system design and development using Node.js and Express. Worked on RESTful APIs, database integration, and performance optimization while collaborating with the team on scalable product features."
  },
  {
    id: 2,
    role: "Head Coordinator – Training & Placement Cell",
    company: "Radharaman Group of Institutes, Bhopal",
    date: "Jun 2024 – Present",
    desc: "Leading training and placement operations by coordinating campus recruitment drives, managing student data, and acting as a liaison between recruiters, students, and faculty. Overseeing coordinators and ensuring smooth execution of placement activities."
  },
  {
    id: 3,
    role: "Coordinator – Training & Placement Cell",
    company: "Radharaman Group of Institutes, Bhopal",
    date: "May 2023 – Jun 2024",
    desc: "Supported campus placement activities by managing candidate communication, interview scheduling, and data tracking. Developed strong skills in professional communication, teamwork, and campus operations management."
  }
];


const Experience = () => {
    const { isRecruiterMode } = useRecruiter();

    return (
        <section id="experience" className="py-20 px-6 md:px-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                Experience
                {isRecruiterMode && <span className="text-xs bg-accent text-primary px-2 py-1 rounded">Resumé View</span>}
            </h2>

            <div className="space-y-8 border-l-2 border-white/10 ml-3 pl-8 relative">
                {experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 bg-accent rounded-full border-4 border-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                        
                        <h3 className="text-xl font-bold text-textMain">{exp.role}</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-accent font-medium">{exp.company}</span>
                            <span className="text-sm text-textMuted">{exp.date}</span>
                        </div>
                        <p className="text-textMuted leading-relaxed max-w-2xl">
                            {exp.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;