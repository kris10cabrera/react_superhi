import React from 'react';

// this component wraps around anything that when we click it'll start playing a mix for us. provides functionality, not design
const PlayMix = ({playMix, id, currentMix, children}) => (
  // when our currently plkaying mix equals the ID of the mix
  // that this component refers to, we will add a classname of playing
  <div className={`pointer ${id === currentMix && 'playing'}`} onClick={() => playMix(id)}>
    {children}
  </div>
);

export default PlayMix; 

