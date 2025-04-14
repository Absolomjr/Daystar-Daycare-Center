const Payment = require('../models/Payment');
const User = require('../models/User');
const { Op } = require('sequelize');

const paymentController = {
  createPayment: async (req, res) => {
    try {
      const { parentId, amount, paymentMethod } = req.body;

      const payment = await Payment.create({
        parentId,
        amount,
        paymentDate: new Date(),
        paymentMethod,
        status: 'completed'
      });

      res.status(201).json({
        message: 'Payment recorded successfully',
        payment
      });
    } catch (error) {
      res.status(500).json({ message: 'Error recording payment' });
    }
  },

  getPaymentHistory: async (req, res) => {
    try {
      const { startDate, endDate, parentId } = req.query;
      const whereClause = {};

      if (parentId) {
        whereClause.parentId = parentId;
      }

      if (startDate && endDate) {
        whereClause.paymentDate = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const payments = await Payment.findAll({
        where: whereClause,
        include: [{
          model: User,
          as: 'parent',
          attributes: ['firstName', 'lastName', 'email']
        }],
        order: [['paymentDate', 'DESC']]
      });

      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment history' });
    }
  },

  getPaymentStats: async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const monthlyTotal = await Payment.sum('amount', {
        where: {
          paymentDate: {
            [Op.between]: [startOfMonth, endOfMonth]
          },
          status: 'completed'
        }
      });

      const pendingPayments = await Payment.findAll({
        where: { status: 'pending' },
        include: [{
          model: User,
          as: 'parent',
          attributes: ['firstName', 'lastName', 'email']
        }]
      });

      res.json({
        monthlyTotal,
        pendingPayments
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment statistics' });
    }
  }
};

module.exports = paymentController;
