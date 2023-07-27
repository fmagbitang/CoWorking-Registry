const Workspace = require('../models/workspaceModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new workspace
const createWorkspace = async (req, res, next) => {
  const { name } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const workspace = await Workspace.create({ name, created_at, updated_at });
    res.status(201).json(workspace);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all users
const getAllWorkspace = async (req, res, next) => {
    try {
      const workspaces = await Workspace.findAll();
      res.status(200).json(workspaces);
    } catch (err) {
      next(err);
    }
  };

module.exports =  {
  createWorkspace,
  getAllWorkspace,
}