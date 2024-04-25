import React, { useState } from 'react';
import './home.css';
import Navbar from '../../Components/NavBar/NavBar';
import PostList from '../../Components/Posts/PostList';


const Home = () => {


  return (
    <main>
        <Navbar/>
<PostList />
    </main>
  );
}

export default Home;
