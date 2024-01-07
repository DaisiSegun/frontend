import React from 'react';


const CustomCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const CustomNextArrow = (props) => <div className="custom-next-arrow" {...props}></div>;
  const CustomPrevArrow = (props) => <div className="custom-prev-arrow" {...props}></div>;

  return (
   
      <div>
     
      </div>
      
   
  );
};

export default CustomCarousel;
