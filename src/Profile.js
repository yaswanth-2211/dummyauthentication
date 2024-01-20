import React, { useEffect, useState } from 'react';
import './Profile.css'

const Profile = ({ user }) => {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${user.id}`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfileInfo(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          alert('Failed to fetch user details.');
        }
      }
    };

    fetchProfileInfo();

    return () => {
      abortController.abort();
    };
  }, [user.id, user.token]);

  return (
    <div className='profile'>
      {profileInfo && (
        <div>
          <h2>Welcome {profileInfo.firstName} !</h2>
          <p>Age: {profileInfo.age}</p>
          <p>Email: {profileInfo.email}</p>
          <p>Gender: {profileInfo.gender}</p>
          <p>Phone: {profileInfo.phone}</p>
          <p>Blood Group: {profileInfo.bloodGroup}</p>
          <p>DOB: {profileInfo.birthDate}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
