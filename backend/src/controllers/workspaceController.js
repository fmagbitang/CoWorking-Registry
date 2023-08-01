const Workspace = require('../models/workspaceModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new workspace
const createWorkspace = async (req, res, next) => {
  const { name, photos, capacity, availability, user_id, property_id } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const workspace = await Workspace.create({ 
        name,
        capacity,
        photos,
        availability,
        user_id,
        property_id,
        created_at,
        updated_at
    });
    res.status(201).json(workspace);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all workspace
const getAllWorkspace = async (req, res, next) => {
  try {
    const workspaces = await Workspace.findAll();
    res.status(200).json(workspaces);
  } catch (err) {
    next(err);
  }
};

// update workspace availability// Update a user by ID
const updateWorkspace = async (req, res, next) => {
  const { id } = req.params;
  const { name, capacity, photos, availability, user_id, property_id } = req.body;
  try {
    const workspace = await Workspace.findByPk(id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    if (name){
      workspace.name = name;
    }
    if (capacity){
      workspace.capacity = capacity;
    }
    if (photos){
      workspace.photos = photos;
    }
    workspace.availability = availability;
    workspace.user_id = user_id;
    workspace.property_id = property_id;
    workspace.updated_at = today.toISOString();
    await workspace.save();
    res.status(200).json(workspace);
  } catch (err) {
    next(err);
  }
};

module.exports =  {
  createWorkspace,
  getAllWorkspace,
  updateWorkspace,
}