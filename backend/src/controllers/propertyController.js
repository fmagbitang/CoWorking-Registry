const Property = require('../models/propertyModel');
const Workspace = require('../models/workspaceModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new property
const createProperty = async (req, res, next) => {
  const { address, neighborhood, squarefoot, parking, transportation, user_id, name, photos, capacity, availability, ratings } = req.body;
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
      created_at,
      updated_at
    });

    const response = {
      property,
      workspace
    }

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
    const ownerProperty = await Property.findAll({ 'user_id': id });
    res.status(200).json(ownerProperty);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  getAllPropertyByOwner,
};