const Property = require('../models/propertyModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new property
const createProperty = async (req, res, next) => {
  const { address, neighborhood, squarefoot, parking, transportation, user_id } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const property = await Property.create({ 
        address,
        neighborhood,
        squarefoot,
        parking,
        transportation,
        user_id,
        created_at,
        updated_at
    });
    res.status(201).json(property);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all users
const getAllProperty = async (req, res, next) => {
    try {
      const propertys = await Property.findAll();
      res.status(200).json(propertys);
    } catch (err) {
      next(err);
    }
  };

module.exports =  {
  createProperty,
  getAllProperty,
}