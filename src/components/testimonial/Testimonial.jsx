import React from 'react';
import './Testimonila.scss';

function Testimonial(props) {
  const { title, text } = props;

  return (
    <div className='testimonial'>
      <h1 className='title-text'>{title}</h1>
      <p className='text-medium'>{text}</p>
    </div>
  );
}

export default Testimonial;
