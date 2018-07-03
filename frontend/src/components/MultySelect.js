import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import { searchNews ,getCountry, getResource, getNewsByFilter } from '../actions/indexAction';


class StatesField extends Component {

  constructor (props) {
    super(props);

    this.clearValue = this.clearValue.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateResource = this.updateResource.bind(this);

    //getNewsByFilter('')().then(data=>{
    //  this.setState({news: data});
    //  console.log(data);
    //});

    getResource('')().then(data=>{
      this.setState({resource: data});
    });

    getCountry('')().then(data=>{
      this.setState({country: data});
    });

    this.state = {
      label: 'States:',
      news:[],
      resource: [],
      country: [],
      disabled: false,
      searchable: this.props.searchable,
      selectedCountry: '',
      selectedResource: '',
      clearable: true,
    };
    //console.log(this.state);
  }
    
  clearValue (e) {
    this.select.setInputValue('');
  }

  updateCountry (event) {
    console.log(event);
    this.setState({
      selectedCountry: event,
    });
    this.searchNews(this.state.selectedCountry, this.state.selectedResource);
  }

  updateResource (event) {
    console.log(event);
    this.setState({
      selectedResource: event,
    });
    this.searchNews(this.state.selectedCountry, this.state.selectedResource);
  }

  searchNews = (selectedCountry, selectedResource ) => {
    const data = JSON.stringify({
        type: 'filter',
        selectedCountry: selectedCountry,
        selectedResource: selectedResource
      });
    this.props.getNewsByFilter(data);
  };

  focusStateSelect () {
    this.select.focus();
  }

  render () {
    let options = [];
    for (let i = 0; i< 2; i++){
     options[i] = [];
    }
    if(this.state.resource.length!==0){
      for (let item in this.state.resource){
        options[1].push({value: this.state.resource[item], label: this.state.resource[item], className: this.state.resource[item]});
      }
    }
    
    for (let item in this.state.country){
      options[0].push({value: this.state.country[item], label: this.state.country[item], className: this.state.country[item]});
    }
    
    return (
      <div>
      <Select
      options={options[0]}
      simpleValue
      clearable={this.state.clearable}
      name="selected-state"
      disabled={this.state.disabled}
      value={this.state.selectedCountry}
      onChange={this.updateCountry}
      searchable={this.state.searchable}
    />
    <Select
          options={options[1]}
          simpleValue
          clearable={this.state.clearable}
          name="selected-state"
          disabled={this.state.disabled}
          value={this.state.selectedResource}
          onChange={this.updateResource}
          searchable={this.state.searchable}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
  filter: state.filter
});

const mapDispatchToProps = {
  getNewsByFilter,
};

export default connect (mapStateToProps, mapDispatchToProps)(StatesField);