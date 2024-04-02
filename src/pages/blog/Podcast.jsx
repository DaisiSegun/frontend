// PodcastPage.js
import React from 'react';
import './Podcast.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import rootTalks from '../../images/roottalks.PNG'

const Podcast = () => {
  return (
    <div className="container">
      <Header/>
      <h1 className='h11'>Root talks: Become an infinite learner</h1>
      <img alt='root talks' src={rootTalks} className='roottalks' />
      <div className="podcast-links">
        <a href="https://podcasts.apple.com/ng/podcast/root-talks-become-an-infinite-learner/id1738531070" className="apple-podcast">Apple Podcasts</a>
        <a href="https://open.spotify.com/show/6zVGCaKm3NDZnx3x6iD3VZ?si=pRtKuPLgQYWqzaxduFZq_Q" className="spotify-podcast">Spotify</a>
      </div>
     
      <NavBar/>
    </div>
  );
};

export default Podcast;
