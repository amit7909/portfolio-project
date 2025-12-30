// src/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  tagline: {
    type: String,
    required: [true, 'Please add a short tagline']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  tags: {
    type: [String], // Example: ['React', 'Node', 'Redux']
    required: true
  },
  category: {
    type: String,
    enum: ['Backend', 'FullStack', 'DevOps', 'Frontend'], // Strict categories
    required: true
  },
  liveUrl: {
    type: String
  },
  repositoryUrl: {
    type: String
  },
  
  // === CRITICAL: RECRUITER MODE TOGGLE ===
  isFeatured: {
    type: Boolean,
    default: false,
    index: true // Makes searching for "Featured" projects very fast
  },

  // === EDUCATIONAL: SYSTEM DESIGN ===
  systemDesignParams: {
    diagramCode: { type: String, default: '' }, // For Mermaid.js
    explanation: { type: String, default: '' }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Project', projectSchema);