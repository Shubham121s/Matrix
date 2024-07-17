import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const initialMatrix = Array(3).fill().map(() => Array(3).fill('white'));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleBoxClick = (row, col) => {
    if (matrix[row][col] === 'white') {
      const newMatrix = matrix.map((r, rowIndex) =>
        r.map((color, colIndex) =>
          rowIndex === row && colIndex === col ? 'green' : color
        )
      );
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, { row, col }]);
    }

    if (clickOrder.length === 8) {
      setTimeout(() => {
        clickOrder.forEach(({ row, col }, index) => {
          setTimeout(() => {
            setMatrix(prevMatrix => {
              const updatedMatrix = prevMatrix.map(r => r.slice());
              updatedMatrix[row][col] = 'orange';
              return updatedMatrix;
            });
          }, index * 500);
        });
      }, 500);
    }
  };

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleBoxClick(rowIndex, colIndex)}
            className="matrix-box"
            style={{
              backgroundColor: color,
            }}
          >
          </div>
        ))
      )}
    </div>
  );
};

export default Matrix;


