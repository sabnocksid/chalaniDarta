import React, { useState } from 'react';
import { deleteDarta } from './utils/api'; 

const DeleteDarta = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteDarta(id)
      .then(() => {
        setLoading(false);
        alert('Darta deleted successfully!');
      })
      .catch((error) => {
        setLoading(false);
        alert('Error deleting Darta.');
      });
  };

  return (
    <div>
      <h3>Are you sure you want to delete this Darta?</h3>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Darta'}
      </button>
    </div>
  );
};

export default DeleteDarta;
