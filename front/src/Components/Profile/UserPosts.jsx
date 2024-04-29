import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP
import './UserPosts.css';

function UserPosts() {
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const [selectedTab, setSelectedTab] = useState('text'); // Estado para manejar la pestaña seleccionada
  const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los datos

  useEffect(() => {
    // Función asíncrona para obtener los posts del usuario
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://gossiphub-1.onrender.com/post/user/:postedBy'); // Cambia la URL según la configuración de tu servidor
        setPosts(response.data); // Actualiza el estado con los posts recibidos
        setLoading(false); // Indica que se han cargado los datos
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Indica que se han cargado los datos (aunque ocurra un error)
      }
    };

    try {
      fetchPosts(); // Llama a la función para obtener los posts al montar el componente
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false); // Indica que se han cargado los datos (aunque ocurra un error)
    }
  }, []); // El segundo argumento de useEffect asegura que esta función solo se ejecute una vez al montar el componente

  return (
    <div>
      <nav>
        <p onClick={() => setSelectedTab('text')}>Text</p>
        <p onClick={() => setSelectedTab('pics')}>Pics</p>
      </nav>
      {loading ? ( // Verifica si se están cargando los datos
        <p>Cargando...</p>
      ) : (
        <>
          {selectedTab === 'text' && (
            <div>
              <h2>User Posts - Text</h2>
              {posts.length === 0 ? ( // Verifica si no hay posts
                <p>Todavía no hay publicaciones</p>
              ) : (
                posts.map(post => (
                  post.description && <p key={post._id}>{post.description}</p>
                ))
              )}
            </div>
          )}
          {selectedTab === 'pics' && (
            <div>
              <h2>User Posts - Pics</h2>
              {posts.length === 0 ? ( // Verifica si no hay posts
                <p>Todavía no hay publicaciones</p>
              ) : (
                <div className="pics-grid">
                  {posts.map(post => (
                    post.image && (
                      <div key={post._id} className="pic-item">
                        <img src={post.image} alt="Post" />
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserPosts;
