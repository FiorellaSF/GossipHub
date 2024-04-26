// AddPost.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddPost = ({ onSuccess }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/posts/post',
        { description },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      onSuccess(); // Llama a onSuccess para actualizar los posts en el componente Profile
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error de conexión');
    }
  };

  return (
    <div>
      <h2>Crear un nuevo post</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default AddPost;
