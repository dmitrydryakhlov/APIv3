import React, { Component } from 'react';
import Search from '../containers/Search';
import NewsList from './NewsList';
import MyMultiSelect from './MultySelect';

class App extends Component {
  render(){
    return(
      <div>
        <Search/>
        <MyMultiSelect />
        <NewsList />
      </div>
    );
  }
}

export default App;
