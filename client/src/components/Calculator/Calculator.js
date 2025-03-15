import React, { useState } from 'react';
import mathApi from '../../api/mathApi';
import { formatErrorMessage } from '../../utils/errorHandler';
import './Calculator.css';

const Calculator = () => {
  const [operation, setOperation] = useState('addition');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [number, setNumber] = useState('');
  const [count, setCount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      let response;
      
      switch (operation) {
        case 'addition':
          response = await mathApi.addition(parseFloat(num1), parseFloat(num2));
          break;
        case 'factorial':
          response = await mathApi.factorial(parseInt(number));
          break;
        case 'fibonacci':
          response = await mathApi.fibonacci(parseInt(count));
          break;
        default:
          throw new Error('Invalid operation');
      }
      
      setResult(response.result);
    } catch (err) {
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const renderOperationFields = () => {
    switch (operation) {
      case 'addition':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="num1" className="form-label">First Number</label>
              <input
                type="number"
                id="num1"
                className="form-control"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="num2" className="form-label">Second Number</label>
              <input
                type="number"
                id="num2"
                className="form-control"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                required
              />
            </div>
          </>
        );
      case 'factorial':
        return (
          <div className="mb-3">
            <label htmlFor="number" className="form-label">Number</label>
            <input
              type="number"
              id="number"
              className="form-control"
              min="0"
              step="1"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        );
      case 'fibonacci':
        return (
          <div className="mb-3">
            <label htmlFor="count" className="form-label">Count</label>
            <input
              type="number"
              id="count"
              className="form-control"
              min="1"
              step="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (loading) {
      return (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="alert alert-danger my-3">{error}</div>;
    }

    if (result !== null) {
      if (Array.isArray(result)) {
        return (
          <div className="result-container my-3">
            <h4>Result:</h4>
            <div className="result-array">
              {result.join(', ')}
            </div>
          </div>
        );
      }
      
      return (
        <div className="result-container my-3">
          <h4>Result:</h4>
          <div className="result-value">{result}</div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="calculator-container">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Math Calculator</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleCalculate}>
            <div className="mb-3">
              <label htmlFor="operation" className="form-label">Operation</label>
              <select
                id="operation"
                className="form-select"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
              >
                <option value="addition">Addition</option>
                <option value="factorial">Factorial</option>
                <option value="fibonacci">Fibonacci Sequence</option>
              </select>
            </div>
            
            {renderOperationFields()}
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </form>
          
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default Calculator;