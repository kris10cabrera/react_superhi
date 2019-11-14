import React, {Component} from 'react';
import loader from './images/loader.svg';
import Gif from './Gif';
import clear from './images/close-icon.svg';


const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};


/* we pick out our props inside the header component
we can pass down functions as props as well as things
like numbers, strings, arrays, or objects 
*/
const Header = ({clearSearch, hasResults}) => (
  <div className="header grid">
    {hasResults ? <img onClick={clearSearch} src={clear} /> : <h1 className="title">Jiffy</h1>}
  </div>
);

// has loading state and hint text 
const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
    {loading ? <img src={loader} className="block mx-auto" /> : hintText}
  </div>
)

class App extends Component {
  // with create-react-applicationCache, we can write our methods as arrow functions and don't need custructor and bind 
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      searchTerm: '',
      hintText: '',
      gifs: [],
      loading: false
    };
  }

  // function to search the giphy api using fetch and puts the search term into the query url 
  searchGiphy = async searchTerm => {
    // set loading spinner to true 
    this.setState({
      loading: true
    });

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=qFZOhBg9IrSH1O1kVK1fmWkhhE0tlDQP&q=${
          searchTerm
        }&limit=50&offset=0&rating=PG-13&lang=en`);
      const {data} = await response.json();
      // check if array of results is empty, if so throw an error which will stop the code here and handle it in the catch 

      if(!data.length) {
        throw `nothing found for ${searchTerm}`
      }
      const randomGif = randomChoice(data);

      this.setState((prevState) => ({
        // using a spread here allows the new states to override the rest while the others stay as they are
        ...prevState,
        // using spread to take previous gifs and spread them out and add our new random ont the end
        gifs: [...prevState.gifs, randomGif],
        loading: false, 
        hintText: `Hit enter to see more ${searchTerm}`
      }));

    
    } catch(error) {
      console.log(error);
      this.setState(() => ({
        hintText: error,
        loading: false
      }))
    }
  }

  handleChange = event => {
    // const value = event.target.value;
    const {value} = event.target;
    this.setState((prevState) => ({
      // take old props and spread them here and overwrite the ones we want
      ...prevState, 
      searchTerm: value,
      hintText: value.length > 2 ?`Hit enter to search ${value}` : ''
    }))
  }

  handleKeyPress = event => {
    const {value} = event.target;
    if (value.length > 2 && event.key === 'Enter') {
      this.searchGiphy(value);
    }
  };

  // reset our state w/ a function ~ to original state
  clearSearch = () => {
    this.setState((prevState) => ({
      ...prevState, 
      searchTerm: '',
      hintText: '',
      gifs: []
    }));
    this.textInput.current.focus();
  };


  // when we have 2 or more characters in the search box and we pressed enter, run a search
  render() {
    const {searchTerm, gifs} = this.state;
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults}/>
        <div className="search grid">
          {/* here we loop over our array of gif images from our state and we create multiple videos from it */}
          {/* spread out gif info */}
          {this.state.gifs.map(gif => <Gif {...gif}/>)}

          <input className="input grid-item" placeholder="Type something" 
          onChange={this.handleChange} 
          onKeyPress={this.handleKeyPress} 
          value={searchTerm}
          ref={this.textInput} 
          />
        </div>

        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
