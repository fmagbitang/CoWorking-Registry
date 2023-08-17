const Property = require('../models/propertyModel');
const Workspace = require('../models/workspaceModel');
const Lease = require('../models/leaseModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new property
const createProperty = async (req, res, next) => {
  const { address, neighborhood, squarefoot, parking, transportation, user_id, name, photos, capacity, availability, ratings, description, lease_term, price } = req.body;
  const userId = req.user.userId;
  console.log('userId');
  console.log(userId);
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const property = await Property.create({
      address,
      neighborhood,
      squarefoot,
      parking,
      transportation,
      user_id: userId,
      created_at,
      updated_at
    });

    const workspace = await Workspace.create({
      name,
      capacity,
      photos,
      availability,
      user_id: userId,
      property_id: property.id,
      ratings,
      description,
      created_at,
      updated_at
    });

    const lease = await Lease.create({
      lease_term,
      price,
      property_id: property.id,
      workspace_id: workspace.id,
      created_at,
      updated_at
    });

    const response = {
      property,
      workspace,
      lease
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all property
const getAllProperty = async (req, res, next) => {
  try {
    const propertys = await Property.findAll();
    res.status(200).json(propertys);
  } catch (err) {
    next(err);
  }
};

// Get all property of owner
const getAllPropertyByOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ownerProperty = await Property.findAll({
      where: {
        user_id: id
      }
    });
    res.status(200).json(ownerProperty);
  } catch (err) {
    next(err);
  }
};

// Update property of owner
const updateProperty = async (req, res, next) => {
  const { id } = req.params;
  const { address, neighborhood, squarefoot, parking, smoking, transportation, user_id } = req.body;
  try {
    updated_at = today.toISOString();

    const propertyUpdate = await Property.findOne({
      where: {
        id: id
      }
    });
    if (!propertyUpdate) {
      return res.status(404).json({ message: 'Property not found' });
    }
    propertyUpdate.address = address;
    propertyUpdate.neighborhood = neighborhood;
    propertyUpdate.squarefoot = squarefoot;
    propertyUpdate.parking = parking;
    propertyUpdate.user_id = user_id;
    propertyUpdate.transportation = transportation;
    propertyUpdate.smoking = smoking;
    propertyUpdate.created_at = today.toISOString();
    propertyUpdate.updated_at = today.toISOString();
    await propertyUpdate.save();
    res.status(200).json(propertyUpdate);
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
};

// Delete a property by ID
const deleteProperty = async (req, res, next) => {
  const { id } = req.params;
  try {
    const propertyDelete = await Property.findByPk(id);
    if (!propertyDelete) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const deleteWorkspace = await Workspace.findOne({
      where: {
        property_id: id
      }
    });
    console.log(deleteWorkspace);
    if (!deleteWorkspace) {
      console.log('Deleting property only.');
      await propertyDelete.destroy();
      console.log('Property has been deleted.');
    } else {
      const deleteLease = await Lease.findOne({
        where: {
          property_id: id,
          workspace_id: deleteWorkspace.id
        }
      });
      if (deleteLease){
          console.log('Deleting Lease.');
          await Lease.destroy({
            where: {
              property_id: id
            }
          });
          console.log('Lease has beend deleted.');
      }
      console.log('Deliting workspaces.');
      await Workspace.destroy({
        where: {
          property_id: id
        }
      });
      console.log('Workspace has been deleted.');
      console.log('Deliting property.');
      await propertyDelete.destroy();
      console.log('Property has been deleted.');
    }
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

const { Op } = require('sequelize');
const User = require('../models/userModel');

Workspace.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Workspace, { foreignKey: 'user_id' });

Workspace.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Workspace, { foreignKey: 'property_id' });

const searchProperty = async (req, res, next) => {
    const { search } = req.params;
    try {
      const searchProperty = await Property.findAll({
        where: {
          [Op.or]: [
            { address: { [Op.like]: `%${search}%` } },
            { squarefoot: { [Op.like]: `%${search}%` } },
            { neighborhood: { [Op.like]: `%${search}%` } }
          ]
        }
      })
      if (!searchProperty) {
        return res.status(404).json({ message: 'Nothing found.' });
      }
      res.status(200).json(searchProperty);
    } catch (error) {
       console.log(error);
       next(error);
    }
};

const searchWorkspace = async (req, res, next) => {
    const { search } = req.params;
    try {
      var status;
      if (search == 'available'){
        status = 1;
      } else {
        status = 0;
      }
      const searchWorkspace = await Workspace.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { capacity: { [Op.like]: `%${search}%` } },
            { availability: { [Op.like]: `%${status}%` } },
            { ratings: { [Op.like]: `%${search}%` } }
          ]
        },
        include: [
          {
            model: Property,
          },
        ],
      })
      if (!searchWorkspace) {
        return res.status(404).json({ message: 'Nothing found.' });
      }
      res.status(200).json(searchWorkspace);
    } catch (error) {
       console.log(error);
       next(error);
    }
};

module.exports = {
  createProperty,
  getAllProperty,
  getAllPropertyByOwner,
  updateProperty,
  deleteProperty,
  searchProperty,
  searchWorkspace,
};