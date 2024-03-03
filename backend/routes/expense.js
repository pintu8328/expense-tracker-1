const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.post('/', expenseController.addExpense);
router.get('/', expenseController.getAllExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
