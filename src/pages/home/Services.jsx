import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.scss';
import Header from '../../components/header/Header';

import CatCard2 from '../../components/CatCard/CatCard2';

import CatCard4 from '../../components/CatCard/CatCard4';


import NavBar from '../../components/navBar/NavBar';
import staticCatData from './StaticData';

import staticCatData3 from './StaticData3';


function Services() {
  useEffect(() => {
    document.title = 'Root';
  }, []);

 

  const [sliderSettings] = useState({
    dots: false,
infinite: false,
speed: 200,
slidesToShow: 4,
slidesToScroll: 1,
prevArrow: <button className="slick-prev"></button>,
nextArrow: <button className="slick-next"></button>,
swipeToSlide: true,

responsive: [
  {
    breakpoint: 1300,
    settings: {
      slidesToShow: 2.5,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
     
    },
  },
  {
    breakpoint: 600,
    settings: {

      slidesToShow: 2.4,
        slidesToScroll: 1,
        swipeToSlide: true,
        
        
     
    },
  },
],

  });

  return (
    <div className='home'>
      <Header showSearch={true} />

      <div className='root-services-section'>

   <div>
          
      <div className='see-all-con'>
          <h1 className='header-new'>Freelance services</h1>

          <Link className='link' to='/all-freelance-service'>
          <button className='see-all'>See all</button>
          </Link>

      </div>

        <Slider className='custom-slider' {...sliderSettings}>
          {staticCatData.map((cat) => (
            <CatCard2 className='slide-card'  key={cat.id} categoryId={cat.id} />
          ))}
        </Slider>
    </div>



   <div>
        <div className='see-all-con'>
          <h1 className='header-new'>Local services</h1>

          <Link className='link' to='/all-local'>
          <button className='see-all'>See all</button>
          </Link>
      </div>

        <Slider className='custom-slider' {...sliderSettings}>
          {staticCatData3.map((cat) => (
            <CatCard4 className='slide-card'  key={cat.id} categoryId={cat.id} />
          ))}
        </Slider>

       
      </div>

  </div>
         
     

   
  <div className='sace'></div>
      <NavBar />
    </div>
  );
}

export default Services;
