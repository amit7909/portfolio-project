/**
 * MOCK DATA STORE
 * ----------------
 * WHY THIS EXISTS:
 * Ideally, this data comes from a backend API (MongoDB).
 * However, in frontend development, we "mock" (fake) the data first
 * so we can build the UI without waiting for the backend to be ready.
 * * SCHEMA EXPLANATION:
 * - id: Unique identifier (used for React keys).
 * - featured: CRITICAL for "Recruiter Mode". If true, this project shows up
 * when the recruiter toggle is ON.
 * - category: Used for filtering (Backend vs Fullstack).
 */

export const projects = [
    {
      id: 1,
      title: "Car Hub – Full Stack Web Application",
      tagline: "End-to-end car service booking & management system",
      description: "Built a full-stack web application for car service booking and vehicle listing management. Implemented secure user authentication, role-based access control, and service scheduling. Designed RESTful APIs using Node.js and Express.js and developed an admin dashboard to manage users, services, and bookings efficiently.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
      category: "FullStack",
      featured: true, // Recruiter-facing main project
      repo: "https://github.com/amit7909/car-hub",
      demo: ""
    },
    {
      id: 2,
      title: "Health and Care – Web Application",
      tagline: "Healthcare platform for patients, doctors & hospitals",
      description: "Designed and developed a healthcare web application connecting patients, doctors, hospitals, and administrators. Implemented multi-role registration and login, appointment scheduling, prescription management, and digital health cards with a focus on clean UI and organized client-side logic.",
      tags: ["HTML", "CSS", "JavaScript"],
      category: "Frontend",
      featured: true, // Still strong for recruiters
      repo: "https://github.com/amit7909/health-and-care",
      demo: ""
    },
    {
      id: 4, // ID 4 to keep unique order
      title: "Smart Portfolio (This Website)",
      tagline: "Production-grade React App with 'Recruiter Mode'",
      description: "You are looking at it! A personal portfolio designed as a product. Features a custom 'Recruiter Mode' built with React Context API that dynamically filters content to respect the recruiter's time. Implemented scalable folder structure and Framer Motion animations.",
      tags: ["React", "Tailwind", "Framer Motion", "Vite"],
      category: "Frontend",
      featured: true, // <--- SHOW THIS TO RECRUITERS! It proves you can build clean UI.
      repo: "https://github.com/amit7909/portfolio-frontend",
      demo: "/" // Links to the current page
    },
    {
      id: 3,
      title: "DevOps Pipeline Dashboard",
      tagline: "Automated CI/CD visualization",
      description: "A dashboard to monitor Jenkins builds and Docker container health in real-time. Reduces debugging time by 40%.",
      tags: ["React", "Go", "AWS"],
      category: "DevOps",
      featured: false, // <--- RECRUITER MODE: This will be HIDDEN to save their time
      repo: "https://github.com",
      demo: "https://demo.com"
    }
  ];