import React, { Component } from 'react';
import Search from '../containers/Search';
import NewsList from './NewsList';

class App extends Component {
  render(){
    return(
      <div>
        <Search/>
        <NewsList />
      </div>
    );
  }
}

export default App;
