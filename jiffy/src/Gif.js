import React, {Component} from 'react';

class Gif extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  render() {
    const {images} = this.props
    const loaded = this.state
    return (
      <video 
            // when we have the loaded state as true we add a loaded class
            className={`grid-item video ${loaded && 'loaded'}`} autoPlay loop muted 
            src={images.original.mp4} onLoadedData={() => this.setState({loaded: true})} />
    )
  }
}

export default Gif;