import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.scss';
import Header from '../../components/header/Header';
// import homeImg from '../../images/homegif.gif';
import Search2 from '../../components/search/Search2';
import CatCard2 from '../../components/CatCard/CatCard2';
import CatCard3 from '../../components/CatCard/CatCard3';
import CatCard4 from '../../components/CatCard/CatCard4';


import Testimonial from '../../components/testimonial/Testimonial';
import NavBar from '../../components/navBar/NavBar';
import staticCatData from './StaticData';
import staticCatData2 from './StaticData2';
import staticCatData3 from './StaticData3';


function Home() {
  useEffect(() => {
    document.title = 'Root';
    setMetaTags();
  }, []);

  function setMetaTags() {
    const title = 'Services & handmade items in Lagos';
    const description = 'Explore services & handmade items in Lagos';
    const imageUrl = 'https://res.cloudinary.com/dsddxqtss/image/upload/v1708709908/l7rhpnk2geahdmvrc5r7.png';

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
    ];

    metaTags.forEach(tag => {
      const metaTag = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => metaTag.setAttribute(key, value));
      document.head.appendChild(metaTag);
    });
  }
 

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
    
      <Header showSearch={false} />
      {/* <img className='home-img' src={homeImg} alt='Home' /> */}
      <h1 className='header-32px'>Services & handmade items in Lagos</h1>
      <div className='search6'>
        <Search2 />
      </div>

      <div className='root-services-section'>

   <div>
          
      <div className='see-all-con'>
          <h1 className='header-new'>Freelance services</h1>
          {/* <button className='see-all'>See all</button> */}
      </div>

        <Slider className='custom-slider' {...sliderSettings}>
          {staticCatData.map((cat) => (
            <CatCard2 className='slide-card'  key={cat.id} categoryId={cat.id} />
          ))}
        </Slider>
    </div>

   <div>

        <div className='see-all-con'>
          <h1 className='header-new'>Handmade items</h1>
          {/* <button className='see-all'>See all</button> */}
      </div>

        <Slider className='custom-slider' {...sliderSettings}>
          {staticCatData2.map((cat) => (
            <CatCard3 className='slide-card'  key={cat.id} categoryId={cat.id} />
          ))}
        </Slider>

    </div>


   <div>
        <div className='see-all-con'>
          <h1 className='header-new'>Local services</h1>

          <Link className='link' to='more-service'>
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
         
     

      <h1 className='header-28px'>See what customers are saying about Root</h1>
      <div className='testimonial-container'>
        <Testimonial
          title='Oyindamola Sanusi'
          text='Thanks so much on helping fix my phone without having to stress me at all. No single trace of the repair, it literally looks just as new!'
        />
        <Testimonial
          title='Jumoke'
          text="Arise Kitchen's chef service on the platform was a lifesaver! Delicious meal, saved me time and effort. My husband loved it too. Will definitely use her again. Thanks"
        />
        <Testimonial
          title='Kene Oleah'
          text='Good service. What i got fixed is still working perfectly well'
        />
      </div>

      <div style={{ marginBottom: '3rem' }}></div>


      <NavBar />
    </div>
  );
}

export default Home;
