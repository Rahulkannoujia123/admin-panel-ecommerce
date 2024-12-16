import React from 'react';
import Button from '../components/button';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button text="Click Me" onClick={() => alert('Button clicked!')} />
    </div>
  );
};

export default Home;