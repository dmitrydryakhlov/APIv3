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

    getResource('')().then(data=>{
      console.log(data);
      let resourceName = [];
      let resourceNameId = [];
      for (let item in data){
        resourceName.push(data[item].sourceName);
        resourceNameId.push(data[item].sourceNameId);
      }
      this.setState(
        {resourceName: resourceName,
        resourceId: resourceNameId}
      );
    });

    getCountry('')().then(data=>{
      console.log(data);
      let countryName = [];
      let countryId = [];
      for (let item in data){
        countryName.push(data[item].countryName);
        countryId.push(data[item].countryNameId);
      }
      this.setState(
        {countryName: countryName,
        countryId: countryId}
      );
    });

    this.state = {
      label: 'States:',
      news:[],
      resourceName: [],
      resourceId: [],
      countryName: [],
      countryId: [],
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
    if(this.state.resourceName.length!==0){
      for (let item in this.state.countryName){
        options[1].push({value: this.state.countryName[item], label: this.state.countryName[item], className: this.state.countryName[item]});
      }
    }
    if(this.state.countryName.length!==0){
      for (let item in this.state.resourceName){
        options[0].push({value: this.state.resourceName[item], label: this.state.resourceName[item], className: this.state.resourceName[item]});
     }
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