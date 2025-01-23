import React, { useState } from 'react';
import { deleteChalani } from './utils/api';

const RemoveChalani = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteChalani(id)
      .then(() => {
        setLoading(false);
        alert('Chalani deleted successfully!');
      })
      .catch((error) => {
        setLoading(false);
        alert('Error deleting Chalani.');
      });
  };

  return (
    <div>
      <h3>Are you sure you want to delete this Chalani?</h3>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Chalani'}
      </button>
    </div>
  );
};

export default RemoveChalani;
