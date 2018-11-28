import { Button, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { searchNews } from '../actions/indexAction';
import { connect } from 'react-redux';
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
        </FormGroup>
      </Panel>);
  }

  searchNews = () => {
    if (this.keywordInput.value) {
      const data = JSON.stringify({ type: 'keyword', keyword: this.keywordInput.value });
      this.props.searchNews('search', data);
    }
  };
}

const mapStateToProps = state => ({
  searchError: state.err,
});

const mapDispatchToProps = {
  searchNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
