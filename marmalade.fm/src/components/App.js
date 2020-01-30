/* global Mixcloud */
import React, {Component} from 'react';
import FeaturedMix from './FeaturedMix';
import Header from './Header';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import Home from './Home';

const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // whether a mix is currently playing 
      playing: false,
      // the id of the currentMix
      currentMix: 'Some groovy mix'
    }
  }
  mountAudio = async () => {
    // have to write this.widget to make it accessible everywhere inside of our component and access it among different methods
    this.widget = Mixcloud.PlayerWidget(this.player);
    // wait for our widget to be ready before continuing
    await this.widget.ready;

    // using the mixcloud wiedget events, we can detect when our audio has been paused
    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );

    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );
  }

  componentDidMount() {
    // run this method after everything is ready
    this.mountAudio();
  }

  // group these methods together inside an object
  actions = {
    togglePlay: () => {
      this.widget.togglePlay();
    },
    playMix: mixName => {
      // update the currentMix in our state with the mixname
      this.setState({
        currentMix: mixName
      });
  
      // load a mix by its name and start playing it immediately
      this.widget.load(mixName, true);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flex-l justify-end">
            <FeaturedMix />
              <div className="w-50-l relative z-1">
                <Header/>
                {/* we pass our state and actions down to the home component so that we can use them :) with the spread operator! */}
                <Route exact path="/" component={() => <Home {...this.state}
                {...this.actions} />}/>
                {/* whenever the path is /archive, render the Archive component 👇 */}
                <Route path="/archive" component={Archive}/>
                <Route path="/about" component={About}/>
                {/* Routed page */}
              </div>
          </div>
          <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Filly_live%2Fola-favela%2F" 
          frameBorder="0" className="player db fixed bottom-0"
          // this allows us to get the actual html element inside react 
        
          ref={player => (this.player = player)}
          ></iframe>
        </div>
      </Router>
    )
  }
}

export default App;
