import React, { useState } from 'react';
import './SignUpSp.scss';
import logo from '../../images/rootlogo.svg';
import { Link } from 'react-router-dom';
import { CircleLoader } from "react-spinners";

function Term2() {
  const [loading, setLoading] = useState(false);

  return (
    <div className='sign-in'>
      <Link className='link' to="/">
        <img src={logo} className='logo-1' alt='logo' />
      </Link>
      <div className='sign-in-containr'>
      <div className='sign-in-header' style={{ fontSize: '1.2rem' }}>Revised terms & conditions</div>

        <p className='sign-up-now'>We get it, reading T&C isn't for everyone! 😄❤️</p>

        <div className='term1'>
            <p className='term1-text'>
            <span style={{ fontWeight: 'bold' }}>Seller Removal:</span> Your work is valuable, and we want to ensure a positive experience for all. If you happen to receive consecutive 1-2 star reviews (we all have those days!), we'll reach out to discuss how we can improve together. If there are ongoing challenges, we may need to part ways, but we'll always communicate openly and respectfully
            </p>
        </div>

        <Link
  className='button3'
  to='/welcomeSp'
  onClick={() => setLoading(true)}  // Set loading to true when the Link is clicked
  style={{ textDecoration: 'none' }}  // Inline CSS to remove text decoration
>
  {loading ? (
    <CircleLoader color={"#36D7B7"} size={20} />
  ) : (
    'Finish'
  )}
</Link>

      </div>
    </div>
  );
}

export default Term2;
