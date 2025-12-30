const projectService = require('../services/projectService');
const Project = require('../models/Project'); // <--- IMPORT YOUR MODEL

// @desc    Get all projects (Supports Recruiter Mode)
// @route   GET /api/v1/projects?recruiterMode=true
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { recruiterMode } = req.query;
    const projects = await projectService.getProjects(recruiterMode);
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Project (Fixes the "Failed to fetch" error)
// @route   GET /api/v1/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Project
// @route   PUT /api/v1/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated object
      runValidators: true // Ensure data is valid
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Project
// @route   DELETE /api/v1/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  getProjectById, // <--- Exported
  updateProject,  // <--- Exported
  deleteProject   // <--- Exported
};