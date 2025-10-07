import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyButtonIslands() {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <div className="button-island" onClick={() => navigate('/create')}>
        <h2>Preserve Your Story</h2>
        <p>Mint your daily struggles as eternal NFTs. Never forget the moments that shaped you.</p>
        <div className="tagline">Never Forget</div>
      </div>
      <div className="button-island" onClick={() => navigate('/buy')}>
        <h2>Discover Stories</h2>
        <p>Connect with others' experiences. Own a piece of real human struggle and resilience.</p>
        <div className="tagline">Never Forget</div>
      </div>
    </div>
  );
}

export default MyButtonIslands;
