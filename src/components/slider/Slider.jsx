import React from 'react'
import img1 from '../../images/avatar-test.jpg'
import img2 from '../../images/tec-samuel.jpg'
import './Slider.scss'
import ImageSlider from '../imageSlider/ImageSlider'

const slides = [
  { url: "https://res.cloudinary.com/dsddxqtss/image/upload/v1703236669/Root/avwav6v0sigumudik0e8.jpg", title: "beach" },
  { url: "https://res.cloudinary.com/dsddxqtss/image/upload/v1702562541/Root/bkvoo8q6po0udc5clf9x.png", title: "boat" },
  { url: "https://res.cloudinary.com/dsddxqtss/image/upload/v1703236669/Root/avwav6v0sigumudik0e8.jpg", title: "forest" },
  { url: "https://res.cloudinary.com/dsddxqtss/image/upload/v1702562541/Root/bkvoo8q6po0udc5clf9x.png", title: "city" },
  { url: "https://res.cloudinary.com/dsddxqtss/image/upload/v1702562541/Root/bkvoo8q6po0udc5clf9x.png", title: "italy" },
];


function Slider() {
  return (
    <div className='slider'>

      <div className='slider-c'>
        <ImageSlider/>
      </div>
      
    </div>
  )
}

export default Slider