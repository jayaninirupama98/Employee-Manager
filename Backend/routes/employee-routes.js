const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create an employee
router.post("/addemployee", async (req, res) => {
  try {
    await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
    console.log(err)
    return res.json(errorFunction(true, "Error Creating Employee"));
  }
});

// Read all employees
router.get('/getemployees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Read a specific employee by ID
router.get('/employee/:empId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee by ID
router.put('/employee/:empId', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.empId,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee by ID
router.delete('/employee/:empId', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;