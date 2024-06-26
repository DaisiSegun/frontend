import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { HelmetProvider } from 'react-helmet-async'; // Use HelmetProvider
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
import MetaDecorator from '../../utils/MetaDecorator';
import metaImage from '../../images/meta5.png'
import AllCategory from '../../components/allCategory/AllCategory';
const root = require("../../data/root.json");



function Home() {
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
    <HelmetProvider>
      <MetaDecorator
        description={root.pageDescription}
        title={root.pageTitle}
        imageUrl={metaImage}
        imageAlt={root.metaImageAlt}
      />
      <div className='home'>
        <Header showSearch={false} />
        {/* <img className='home-img' src={homeImg} alt='Home' /> */}
        <h1 className='header-32px'>African products & services in Lagos</h1>
        <div className='search6'>
          <Search2 />
        </div>

        <div className='root-services-section'>
          <div>
            <div className='see-all-con'>
              <h1 className='header-new'>Freelance services</h1>
              <a className='link' href='https://roothq.africa/all-freelance-service'>
              <button className='see-all'>See all</button>
              </a>
            </div>
            <Slider className='custom-slider' {...sliderSettings}>
              {staticCatData.map((cat) => (
                <CatCard2 className='slide-card' key={cat.id} categoryId={cat.id} />
              ))}
            </Slider>
          </div>

          <div>
            <div className='see-all-con'>
              <h1 className='header-new'>Handmade items</h1>
              <a className='link' href='https://roothq.africa/all-handmade'>
              <button className='see-all'>See all</button>
              </a>
            </div>
            <Slider className='custom-slider' {...sliderSettings}>
              {staticCatData2.map((cat) => (
                <CatCard3 className='slide-card' key={cat.id} categoryId={cat.id} />
              ))}
            </Slider>
          </div>

          <div>
            <div className='see-all-con'>
              <h1 className='header-new'>Local services</h1>
              <a className='link'href='https://roothq.africa/all-local'>
                <button className='see-all'>See all</button>
              </a>
            </div>
            <Slider className='custom-slider' {...sliderSettings}>
              {staticCatData3.map((cat) => (
                <CatCard4 className='slide-card' key={cat.id} categoryId={cat.id} />
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

        <h1 className='all-header-28px'>Browse all categories</h1>

        <AllCategory/>

        <div style={{ marginBottom: '5rem' }}></div>

        <NavBar />
      </div>
    </HelmetProvider>
  );
}

export default Home;
