import React from 'react';
import Mix from './Mix';

const Home = props =>  (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-1">
    <div className="mix mb4">
      <Mix name='Aphex Twin' id='/TheVinylFactory/vf-mix-63-aphex-twin-by-μ-ziq/' {...props} />
    </div>
    <div className="mix mb4">
      <Mix name='Debonair' id='/TheVinylFactory/the-vinyl-factory-radio-debonair/' {...props} />
    </div>
  </div>
);

export default Home;