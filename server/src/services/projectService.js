// src/services/projectService.js
const Project = require('../models/Project');

// Service: Fetch projects based on "Recruiter Mode"
const getProjects = async (isRecruiterMode) => {
  let query = {};

  // If Recruiter Mode is ON ('true'), fetch ONLY featured projects.
  // If OFF, we send an empty query {} which fetches EVERYTHING.
  if (isRecruiterMode === 'true' || isRecruiterMode === true) {
    query = { isFeatured: true };
  } 

  // Sort by newest first (-1)
  const projects = await Project.find(query).sort({ createdAt: -1 });
  return projects;
};

// Service: Create a new project (For Admin use later)
const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

module.exports = {
  getProjects,
  createProject
};