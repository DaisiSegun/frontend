import React, { useState } from 'react';
import './SignUpSp.scss';
import logo from '../../images/rootlogo.svg';
import { Link } from 'react-router-dom';
import { CircleLoader } from "react-spinners";

function Term1() {
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
            <span style={{ fontWeight: 'bold' }}>Damages & Risks:</span>  Your services/products are a reflection of your expertise, and your responsibility. If there are any issues or risks with your services, please address them promptly. While we're not responsible for disputes between users and sellers, we're here to support and guide you through any challenges.
            </p>
        </div>

        <Link
  className='button3'
  to='/term2'
  onClick={() => setLoading(true)}  // Set loading to true when the Link is clicked
  style={{ textDecoration: 'none' }}  // Inline CSS to remove text decoration
>
  {loading ? (
    <CircleLoader color={"#36D7B7"} size={20} />
  ) : (
    'Continue'
  )}
</Link>

      </div>
    </div>
  );
}

export default Term1;
