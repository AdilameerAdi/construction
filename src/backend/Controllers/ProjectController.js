const Project = require('../MODELS/Project');
const Task = require('../MODELS/Task');

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('activities');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('activities');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Fetch tasks for each activity
    const activitiesWithTasks = await Promise.all(
      project.activities.map(async (activity) => {
        const tasks = await Task.find({ activity: activity._id });
        return {
          ...activity.toObject(),
          tasks
        };
      })
    );

    const projectWithTasks = {
      ...project.toObject(),
      activities: activitiesWithTasks
    };

    res.json(projectWithTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById };