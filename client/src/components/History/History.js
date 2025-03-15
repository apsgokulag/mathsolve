import React, { useState, useEffect } from 'react';
import mathApi from '../../api/mathApi';
import { formatErrorMessage } from '../../utils/errorHandler';
import './History.css';

const History = () => {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalculations = async () => {
      try {
        const data = await mathApi.getCalculationHistory();
        setCalculations(data.calculations);
      } catch (err) {
        setError(formatErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCalculations();
  }, []);

  const formatInputs = (operation, inputsString) => {
    try {
      const inputs = JSON.parse(inputsString);
      
      switch (operation) {
        case 'addition':
          return `${inputs.num1} + ${inputs.num2}`;
        case 'factorial':
          return `${inputs.number}!`;
        case 'fibonacci':
          return `Fibonacci(${inputs.count})`;
        default:
          return inputsString;
      }
    } catch (err) {
      return inputsString;
    }
  };

  const formatResult = (operation, resultString) => {
    if (operation === 'fibonacci') {
      try {
        const sequence = JSON.parse(resultString);
        return Array.isArray(sequence) ? sequence.join(', ') : resultString;
      } catch (err) {
        return resultString;
      }
    }
    
    return resultString;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger my-3">{error}</div>;
  }

  return (
    <div className="history-container">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Calculation History</h2>
        </div>
        <div className="card-body">
          {calculations.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-0">No calculations found. Try performing some calculations first.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Operation</th>
                    <th>Inputs</th>
                    <th>Result</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((calc) => (
                    <tr key={calc.id}>
                      <td>{calc.id}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {calc.operation}
                        </span>
                      </td>
                      <td>{formatInputs(calc.operation, calc.inputs)}</td>
                      <td>{formatResult(calc.operation, calc.result)}</td>
                      <td>{formatDate(calc.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;