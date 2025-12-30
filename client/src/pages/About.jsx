import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: YOUR STORY */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {/* [CHANGE THIS]: Your Main Headline */}
            Logic over Luck. <br />
            <span className="text-accent">Systems over Syntax.</span>
          </h2>
          
          {/* [CHANGE THIS]: Your Bio Paragraph 1 */}
          <p className="text-textMuted leading-relaxed mb-6 text-lg">
            I am Amit, a Backend Engineer who loves looking "under the hood." 
            While others focus on how a website looks, I focus on how fast it loads 
            and how it handles <span className="text-white font-semibold">10,000 concurrent users</span>.
          </p>
          
          {/* [CHANGE THIS]: Your Bio Paragraph 2 */}
          <p className="text-textMuted leading-relaxed mb-8">
            My engineering journey started with MERN stack, but quickly evolved into deep system design.
            I don't just write code that works; I write code that is maintainable, testable, and scalable.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary border border-white/5 rounded-lg hover:border-accent/30 transition-colors">
              <h4 className="text-2xl font-bold text-accent mb-1">5+</h4>
              <p className="text-xs text-textMuted uppercase tracking-wide">Projects Built</p>
            </div>
            <div className="p-4 bg-primary border border-white/5 rounded-lg hover:border-green-500/30 transition-colors">
              <h4 className="text-2xl font-bold text-white mb-1">99%</h4>
              <p className="text-xs text-textMuted uppercase tracking-wide">Code Efficiency</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: WHAT YOU DO (The 3 Cards) */}
        <div className="grid grid-cols-1 gap-6">
            {/* Card 1: Backend Focus */}
            <FeatureCard 
              icon={<Cpu size={24} />} 
              title="System Architecture"
              desc="Designing microservices and event-driven systems that don't crash under pressure."
            />
            {/* Card 2: Performance */}
            <FeatureCard 
              icon={<Zap size={24} />} 
              title="Database Optimization"
              desc="Indexing, caching with Redis, and writing aggregation pipelines that run in milliseconds."
            />
            {/* Card 3: Code Quality */}
            <FeatureCard 
              icon={<Code2 size={24} />} 
              title="Clean Code"
              desc="Writing maintainable software using MVC patterns, proper error handling, and TypeScript."
            />
        </div>

      </div>
    </section>
  );
};

// Helper Component (Don't change this unless you want to change the design)
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
  >
    <div className="p-3 bg-primary text-accent rounded-lg border border-white/5">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-textMuted text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default About;