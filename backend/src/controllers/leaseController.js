const Lease = require('../models/leaseModel');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

// Create a new lease
const createLease = async (req, res, next) => {
  const { lease_term, price, user_id, property_id } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const lease = await Lease.create({ 
        lease_term,
        price,
        user_id,
        property_id,
        created_at,
        updated_at
    });
    res.status(201).json(lease);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Get all users
const getAllLease = async (req, res, next) => {
    try {
      const lease = await Lease.findAll();
      res.status(200).json(lease);
    } catch (err) {
      next(err);
    }
  };

module.exports =  {
  createLease,
  getAllLease,
}