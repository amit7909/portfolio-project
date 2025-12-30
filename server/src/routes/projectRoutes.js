const express = require('express');
const router = express.Router();
// Import all the new functions we just created
const { 
  getProjects, 
  createProject, 
  getProjectById, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');

const { protect } = require('../middlewares/authMiddleware');

// Route for "/" (Get All, Create New)
router.route('/')
  .get(getProjects)
  .post(protect, createProject);

// Route for "/:id" (Get One, Update One, Delete One)
// This handles requests like: localhost:5000/api/v1/projects/658c...
router.route('/:id')
  .get(getProjectById)             // Public: Fetch details for Edit form
  .put(protect, updateProject)     // Private: Update
  .delete(protect, deleteProject); // Private: Delete

module.exports = router;