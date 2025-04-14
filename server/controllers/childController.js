const Child = require('../models/Child');
const User = require('../models/User');

const childController = {
  registerChild: async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, allergies, specialNeeds, parentId } = req.body;

      const child = await Child.create({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        allergies,
        specialNeeds,
        parentId
      });

      res.status(201).json({
        message: 'Child registered successfully',
        child
      });
    } catch (error) {
      console.error('Child registration error:', error);
      res.status(500).json({ message: 'Error registering child' });
    }
  },

  getAllChildren: async (req, res) => {
    try {
      const children = await Child.findAll({
        include: [{
          model: User,
          as: 'parent',
          attributes: ['firstName', 'lastName', 'email']
        }]
      });
      res.json(children);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching children' });
    }
  },

  getChildById: async (req, res) => {
    try {
      const child = await Child.findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'parent',
          attributes: ['firstName', 'lastName', 'email']
        }]
      });

      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }

      res.json(child);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching child details' });
    }
  },

  updateChild: async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, allergies, specialNeeds } = req.body;
      const child = await Child.findByPk(req.params.id);

      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }

      await child.update({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        allergies,
        specialNeeds
      });

      res.json({
        message: 'Child information updated successfully',
        child
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating child information' });
    }
  },

  deleteChild: async (req, res) => {
    try {
      const child = await Child.findByPk(req.params.id);

      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }

      await child.destroy();
      res.json({ message: 'Child removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing child' });
    }
  }
};

module.exports = childController;
