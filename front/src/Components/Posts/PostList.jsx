import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {posts.length === 0 ? (
        <p>Aún no hay publicaciones</p>
      ) : (
        posts.map(post => (
          <div key={post._id}>
            <h3>{post.description[0]}</h3>
            {post.image && <img src={post.image} alt="Post" />}
          </div>
        ))
      )}
  
    <section className='posts'>
    <div class="post">
        < class=""> 
        
        <div class="post-content profile-picture"> 
             <img src="./spring.png" alt="Foto de perfil"/>
            <div class="username">
                <strong>NombreDeUsuario</strong>
            </div>
            <div class="image">
                <img src="./oveja.png" alt="Imagen de la publicación"/>
            </div>
            <div class="description">
                Descripción de la publicación...
            </div>
        </div>
    </div>
    </section> 
     </main>
  );
};

export default PostList;
