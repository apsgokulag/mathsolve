const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper functions for mathematical operations
const calculateFactorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
};

const generateFibonacci = (count) => {
  const sequence = [0, 1];
  for (let i = 2; i < count; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence.slice(0, count);
};

// Controller functions
// Make sure the addition handler properly parses the input
exports.addition = async (req, res, next) => {
  try {
    const { num1, num2 } = req.body;
    
    if (num1 === undefined || num2 === undefined) {
      return res.status(400).json({ error: 'Both numbers are required' });
    }
    
    if (isNaN(parseFloat(num1)) || isNaN(parseFloat(num2))) {
      return res.status(400).json({ error: 'Both inputs must be valid numbers' });
    }
    
    const sum = parseFloat(num1) + parseFloat(num2);
    
    // Save the calculation to the database
    await prisma.calculation.create({
      data: {
        operation: 'addition',
        inputs: JSON.stringify({ num1, num2 }),
        result: sum.toString()
      }
    });
    
    res.status(200).json({ result: sum });
  } catch (error) {
    console.error('Addition error:', error);
    next(error);
  }
};

exports.factorial = async (req, res, next) => {
  try {
    const number = parseInt(req.params.number);
    
    if (isNaN(number) || number < 0) {
      return res.status(400).json({ error: 'Input must be a non-negative integer' });
    }
    
    const result = calculateFactorial(number);
    
    // Save the calculation to the database
    await prisma.calculation.create({
      data: {
        operation: 'factorial',
        inputs: JSON.stringify({ number }),
        result: result.toString()
      }
    });
    
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

exports.fibonacci = async (req, res, next) => {
  try {
    const count = parseInt(req.params.count);
    
    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ error: 'Count must be a positive integer' });
    }
    
    const sequence = generateFibonacci(count);
    
    // Save the calculation to the database
    await prisma.calculation.create({
      data: {
        operation: 'fibonacci',
        inputs: JSON.stringify({ count }),
        result: JSON.stringify(sequence)
      }
    });
    
    res.status(200).json({ result: sequence });
  } catch (error) {
    next(error);
  }
};

exports.getCalculationHistory = async (req, res, next) => {
  try {
    const calculations = await prisma.calculation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json({ calculations });
  } catch (error) {
    next(error);
  }
};

exports.getCalculationById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    
    const calculation = await prisma.calculation.findUnique({
      where: { id }
    });
    
    if (!calculation) {
      return res.status(404).json({ error: 'Calculation not found' });
    }
    
    res.status(200).json({ calculation });
  } catch (error) {
    next(error);
  }
};