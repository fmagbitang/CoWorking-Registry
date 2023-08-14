const Workspace = require('../models/workspaceModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new workspace
const createWorkspace = async (req, res, next) => {
  const { name, photos, capacity, availability, user_id, property_id, ratings, description } = req.body;
  const userId = req.user.userId;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const workspace = await Workspace.create({ 
        name,
        capacity,
        photos,
        availability,
        user_id: userId,
        property_id,
        ratings,
        description,
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
    console.log(err.message);
    next(err);
  }
};

Workspace.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Workspace, { foreignKey: 'user_id' });

Workspace.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Workspace, { foreignKey: 'property_id' });

// Get a workspace and property by ID
const getWorkspaceByPropertyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const workspacebyPropertyID = await Workspace.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Property,
        },
      ],
    });
    if (!workspacebyPropertyID) {
      return res.status(404).json({ message: 'Property ID in workspace not found' });
    }
    res.status(200).json(workspacebyPropertyID);
  } catch (err) {
    next(err);
  }
};

// Get all property of owner
const getAllWorkspaceByOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ownerWorkspace = await Workspace.findAll({
      where: {
        user_id: id
      }
    });
    res.status(200).json(ownerWorkspace);
  } catch (err) {
    next(err);
  }
};

// update workspace availability
const updateWorkspace = async (req, res, next) => {
  const { id } = req.params;
  const { name, capacity, photos, availability, user_id, property_id } = req.body;
  try {
    const workspace = await Workspace.findByPk(id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    if (workspace.availability === 0) {
      return res.status(200).json({ message: 'Workspace is not available for rent.' });
    } else {
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
    }
  } catch (err) {
    next(err);
  }
};

module.exports =  {
  createWorkspace,
  getAllWorkspace,
  updateWorkspace,
  getWorkspaceByPropertyId,
  getAllWorkspaceByOwner,
}