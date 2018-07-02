import { Button, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { searchNews, getCountry, getResource } from '../actions/indexAction';
import {connect} from 'react-redux';
import React, { Component } from 'react';


class Search extends Component {

  render() {
    let error;
    if (this.props.searchError) {
      error = (
        <Panel header='error' bsStyle='danger'>
          {this.props.searchError.toString()}
        </Panel>
      );
    }

    return (
      <Panel header="Search">
        {error}
        <FormGroup>
          <FormControl
              type="text"
              inputRef={input => this.keywordInput = input}
              placeholder="Search fresh news"
          ></FormControl>
          <Button onClick={() => this.searchNews()}>Search</Button>
          <Button onClick={() => this.getCountry()}>GetCountry</Button>
          <Button onClick={() => this.getResource()}>getResource</Button>
        </FormGroup>
      </Panel>);
  }

  searchNews = () => {
    const data = JSON.stringify({type: 'keyword', keyword: this.keywordInput.value});
    this.props.searchNews(data);
  };
  getCountry = () => {
    console.log(this.props);
    this.props.getCountry('dima');
  };
  getResource = () => {
    console.log(this.props);
    this.props.getResource('dima');
  };

}

const mapStateToProps = state => ({
  searchError: state.err,
});

const mapDispatchToProps = {
  searchNews,
  getCountry,
  getResource
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
