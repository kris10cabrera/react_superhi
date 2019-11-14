import React, {Component} from 'react';
import FeaturedMix from './FeaturedMix';
import Header from './Header';



function App() {
  return (
  <div>
    <div>
    <FeaturedMix />
      <div>
        <Header/>
        {/* Routed page */}
      </div>
    </div>
    <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Filly_live%2Fola-favela%2F" frameBorder="0" ></iframe>
  </div>
  );
}

export default App;
