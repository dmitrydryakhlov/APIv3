import React, { Component } from 'react';
import '../App.css';
import AddSearch from '../containers/AddSearch';
import NewsList from '../containers/NewsList';

class App extends Component {
  render(){
    return(
      <div>
        <AddSearch/>
        <NewsList/>
      </div>
    );
  }
}

export default App;
