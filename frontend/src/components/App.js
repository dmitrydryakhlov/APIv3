import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import AddSearch from '../containers/AddSearch';
import NewsList from '../containers/NewsList';

const App = () => (
  <div>
    <AddSearch/>
    <NewsList/>
  </div>
);

export default App;
