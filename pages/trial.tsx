// YourComponent.jsx or pages/YourPage.jsx
import React, { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    // Reading from local storage
    const storedData = localStorage.getItem('yourKey');
    console.log('Data from local storage:', storedData);

    // Writing to local storage
    localStorage.setItem('yourKey', 'yourValue');
  }, []);

  return <div>Your component content here</div>;
};

export default YourComponent;
