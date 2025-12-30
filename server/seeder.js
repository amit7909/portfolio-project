require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project'); // Ensure capital 'P' if your file is Project.js

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to DB...'))
  .catch(err => console.log(err));

const data = [
  {
    title: "Car Hub – Full Stack Web Application",
    tagline: "End-to-end car service booking & management system",
    description: "Built a full-stack web application for car service booking and vehicle listing management. Implemented secure user authentication, role-based access control, and service scheduling. Designed RESTful APIs using Node.js and Express.js and developed an admin dashboard to manage users, services, and bookings efficiently.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "FullStack",
    isFeatured: true, // Recruiter Mode: ON
    repositoryUrl: "https://github.com/amit7909/car-hub",
    liveUrl: "" 
  },
  {
    title: "Health and Care – Web Application",
    tagline: "Healthcare platform for patients, doctors & hospitals",
    description: "Designed and developed a healthcare web application connecting patients, doctors, hospitals, and administrators. Implemented multi-role registration and login, appointment scheduling, prescription management, and digital health cards with a focus on clean UI and organized client-side logic.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    isFeatured: true, // Recruiter Mode: ON
    repositoryUrl: "https://github.com/amit7909/health-and-care",
    liveUrl: ""
  },
  {
    title: "Smart Portfolio (This Website)",
    tagline: "Production-grade React App with 'Recruiter Mode'",
    description: "You are looking at it! A personal portfolio designed as a product. Features a custom 'Recruiter Mode' built with React Context API that dynamically filters content to respect the recruiter's time. Implemented scalable folder structure and Framer Motion animations.",
    tags: ["React", "Tailwind", "Framer Motion", "Vite"],
    category: "Frontend",
    isFeatured: true, // Recruiter Mode: ON
    repositoryUrl: "https://github.com/amit7909/portfolio-frontend",
    liveUrl: "/"
  },
  {
    title: "DevOps Pipeline Dashboard",
    tagline: "Automated CI/CD visualization",
    description: "A dashboard to monitor Jenkins builds and Docker container health in real-time. Reduces debugging time by 40%.",
    tags: ["React", "Go", "AWS"],
    category: "DevOps",
    isFeatured: false, // Recruiter Mode: OFF (Hidden when toggled)
    repositoryUrl: "https://github.com",
    liveUrl: "https://demo.com"
  }
];

const importData = async () => {
  try {
    // 1. Clear old data
    await Project.deleteMany();
    console.log('🗑️  Old Data Cleared...');

    // 2. Insert new data
    await Project.insertMany(data);
    console.log('✅ New Projects Imported Successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();