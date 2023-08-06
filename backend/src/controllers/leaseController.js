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

// Get all lease
const getAllLease = async (req, res, next) => {
    try {
      const lease = await Lease.findAll();
      res.status(200).json(lease);
    } catch (err) {
      next(err);
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
      if (lease_term){
        lease.lease_term = lease_term;
      }
      if (price){
        lease.price = price;
      }
      if (user_id){
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

module.exports =  {
  createLease,
  getAllLease,
  updateLease,
}