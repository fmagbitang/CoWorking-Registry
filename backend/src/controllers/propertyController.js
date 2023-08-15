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

    res.status(201).json(response);
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
    const propertyUpdate = await Property.findOne(id);

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
    const deleteWorkspace = await Workspace.findAll({
      where: {
        property_id: id
      }
    });
    if (!deleteWorkspace) {
      await propertyDelete.destroy();
      console.log('Property has been deleted.');
    } else {
      await Lease.destroy({
        where: {
          property_id: id
        }
      });
      console.log('Lease has been deleted.');
      await Workspace.destroy({
        where: {
          property_id: id
        }
      });
      console.log('Workspace has been deleted.');
      await propertyDelete.destroy();
      console.log('Property has been deleted.');
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  getAllPropertyByOwner,
  updateProperty,
  deleteProperty,
};