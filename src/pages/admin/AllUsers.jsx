import React, { useState, useEffect } from 'react';

import './Admin.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import UserCard from '../../components/userCard/UserCard';
import newRequest from '../../utils/newRequest';
import getCurrentUser from '../../utils/getCurrentUser';
import { useNavigate } from 'react-router-dom';

function AllUsers() {

  const currentUser = getCurrentUser();
  const navigate = useNavigate();


  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  

  useEffect(() => {
    newRequest.get('/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);


  if (!currentUser || !currentUser.user.isAdmin) {
    // Redirect to a different page if the user is not an admin
    navigate('/');
    return null; // Render nothing while redirecting
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sellerCount = users.reduce((count, user) => user.isSeller ? count + 1 : count, 0);
  const nonSellerCount = users.length - sellerCount;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='menu'>

      <Header/>
      
      <div className="menu-con">

      <h4>All Root users ({users.length})</h4>
      
      <p style={{ fontSize: '0.9rem', color: '#333', margin: '10px 0' }}>
  Sellers: <strong>{sellerCount}</strong> <span style={{ borderLeft: '1px solid #333', margin: '0 5px', height: '1em', display: 'inline-block' }}></span> Non-Sellers: <strong>{nonSellerCount}</strong>
</p>



    
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={handleChange} 
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />

      <div className="user-list">
        {filteredUsers.map((user, index) => (
          <UserCard key={user.id} user={user} index={index} />
        ))}
      </div>

      </div>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/> 

    </div>
  );
}

export default AllUsers;
