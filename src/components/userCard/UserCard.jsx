import React, { useState } from 'react';

import './UserCard.scss';
import newRequest from '../../utils/newRequest';

const UserCard = ({ user, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (isConfirmed) {
      newRequest.delete(`/users/${user._id}`, {
        data: { userId: user._id } // Send user._id in the request body
      })
        .then(response => {
          console.log('User deleted successfully');
          setIsDeleted(true); // Set the state to show the success message
          setTimeout(() => setIsDeleted(false), 5000); // Hide the message after 3 seconds
          window.location.reload(); // Refresh the page
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const joinedDate = new Date(user.createdAt);

  // Format the date in a more human-readable way
  const formattedJoinedDate = joinedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });

  return (
    <div className="user9">
      <div className="user-info">
        {user.isSeller && <div className="seller-badge">Seller</div>}
        {!user.isSeller && <div className="user-badge">Non-seller</div>}
        <p>{index + 1}.<strong> Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Joined:</strong> {formattedJoinedDate}</p>
        
        {isDeleted && <p style={{ color: 'green' }}>User deleted successfully</p>}
        <button onClick={handleDelete} style={{
          backgroundColor: 'gray', // Darker red color
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '8px',
        }}>
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserCard;
