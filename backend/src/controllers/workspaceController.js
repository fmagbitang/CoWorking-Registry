const Workspace = require('../models/workspaceModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');
const Lease = require('../models/leaseModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new workspace
const createWorkspace = async (req, res, next) => {
  const { name, photos, capacity, availability, user_id, property_id, ratings, description, lease_term, price } = req.body;
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
      property_id: property_id,
      ratings,
      description,
      created_at,
      updated_at
    });

    const lease = await Lease.create({
      lease_term,
      price,
      property_id: property_id,
      workspace_id: workspace.id,
      created_at,
      updated_at
    });

    response = {
      workspace,
      lease
    };

    res.status(201).json(response);
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
  const { name, capacity, photos, availability, property_id, ratings, description, workspace_id, lease_id, lease_term, price, user_id } = req.body;
  try {
    const workspace = await Workspace.findOne({
      where: {
        id: id
      }
    });
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    workspace.update({
      name: name,
      capacity: capacity,
      photos: photos,
      availability: availability,
      ratings: ratings,
      description: description,
      updated_at: today.toISOString()
    })

    workspace.name = name;
    workspace.capacity = capacity;
    workspace.photos = photos;
    workspace.availability = availability;
    workspace.property_id = property_id;
    workspace.ratings = ratings;
    workspace.description = description;
    workspace.user_id = user_id;
    workspace.created_at = today.toISOString();
    workspace.updated_at = today.toISOString();

    await workspace.save();
    res.status(200).json(workspace);
    const leaseUpdate = await Lease.findByPk(lease_id);
    if (leaseUpdate) {
      leaseUpdate.update({
        lease_term: lease_term,
        price: price,
      });
    }
  } catch (err) {
    next(err);
  }
};

// Delete a workspace by ID
const deleteWorkspace = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteWorkspace = await Workspace.findByPk(id);
    if (!deleteWorkspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const deleteLease = await Lease.findAll({
      where: {
        workspace_id: id
      }
    });
    if (deleteLease) {
      await Lease.destroy({
        where: {
          workspace_id: id
        }
      });
    }
    await deleteWorkspace.destroy();
    console.log('Workspace has been deleted.');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createWorkspace,
  getAllWorkspace,
  updateWorkspace,
  getWorkspaceByPropertyId,
  getAllWorkspaceByOwner,
  deleteWorkspace,
};