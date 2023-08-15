const Lease = require('../models/leaseModel');
const Workspace = require('../models/workspaceModel');
const Property = require('../models/propertyModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new lease
const createLease = async (req, res, next) => {
  const { user_id, property_id, workspace_id } = req.body;
  try {
    updated_at = today.toISOString();

    const lease = await Lease.findOne({
      where: {
        workspace_id: workspace_id,
        property_id: property_id
      }
    });

    if(!lease){
      return res.status(404).json({ message: 'Lease not found' });
    }

    lease.update({
       user_id: user_id,
       updated_at: updated_at
    })

    const workspace = await Workspace.findOne({
      where: {
        id: workspace_id
      }
    });
    workspace.update({ availability: 0 });
    res.status(201).json(lease);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all lease
const getAllLease = async (req, res, next) => {
  try {
    const lease = await Lease.findAll();
    res.status(200).json(lease);
  } catch (err) {
    next(err);
  }
};

Workspace.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Workspace, { foreignKey: 'property_id' });

Lease.belongsTo(Workspace, { foreignKey: 'workspace_id' });
Workspace.hasMany(Lease, { foreignKey: 'workspace_id' });

Lease.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Lease, { foreignKey: 'property_id' });


// Get a workspace and property by ID
const getAllLeaseUserID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const leaseWorkspaceProperty = await Lease.findAll({
      where: {
        user_id: id
      },
      include: [
        {
          model: Workspace,
        },
        {
          model: Property,
        },
      ],
    });
    if (!leaseWorkspaceProperty) {
      return res.status(404).json({ message: 'No lease found' });
    }
    res.status(200).json(leaseWorkspaceProperty);
  } catch (err) {
    next(err);
  }
};

// post all workspace, property and lease by workspace ID
const getWPL = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allwpl = await Workspace.findAll({
      include: [
        {
          model: Property,
        },
        {
          model: Lease,
        }
      ]
    })
    res.status(200).json(allwpl);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// update lease availability// Update a user by ID
const updateLease = async (req, res, next) => {
  const { id } = req.params;
  const { lease_term, price, user_id, property_id } = req.body;
  try {
    const lease = await Lease.findByPk(id);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }
    if (lease_term) {
      lease.lease_term = lease_term;
    }
    if (price) {
      lease.price = price;
    }
    if (user_id) {
      lease.user_id = user_id;
    }
    if (property_id) {
      lease.property_id = property_id;
    }
    lease.updated_at = today.toISOString();
    await lease.save();
    res.status(200).json(lease);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLease,
  getAllLease,
  updateLease,
  getAllLeaseUserID,
  getWPL,
};