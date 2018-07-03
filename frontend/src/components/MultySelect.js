import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import { getCountry, getResource } from '../actions/indexAction';


class StatesField extends Component {

  constructor (props) {
    super(props);

    this.clearValue = this.clearValue.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateResource = this.updateResource.bind(this);

    let resource = [];
    getResource('')().then(data=>{
      this.setState({resource: data});
    });

    let country =[];
    getCountry('')().then(data=>{
      this.setState({country: data});
    });

    this.state = {
      label: 'States:',
      resource: {resource},
      country: {country},
      disabled: false,
      searchable: this.props.searchable,
      selectedCountry: '',
      selectedResource: '',
      clearable: true,
      rtl: false,
    };
    //console.log(this.state);
  }
    
  clearValue (e) {
    this.select.setInputValue('');
  }
  updateCountry (e, params) {
    console.log(e);
    console.log(e.key);
    //console.log(e);
    this.setState({
      //selectedCountry: newValue,
    });
  }
  updateResource (newValue) {
    this.setState({
      selectedResource: newValue,
    });
  }

  focusStateSelect () {
    this.select.focus();
  }

  render () {
    //console.log(this.props);
    let options = [];
    for (let i = 0; i< 2; i++){
      options[i] = [];
    }
    if(this.state.resource.length!=0){
      for (let item in this.state.resource){
        options[1].push({value: this.state.resource[item], label: this.state.resource[item], className: this.state.resource[item]});
      }
    }
    
    for (let item in this.state.country){
      options[0].push({value: this.state.country[item], label: this.state.country[item], className: this.state.country[item]});
    }
    let sections = []; 
    for( let i = 0; i< 2; i++ ){
      sections.push(
        <Select
          key = {i}
          options={options[i]}
          simpleValue
          clearable={this.state.clearable}
          name="selected-state"
          disabled={this.state.disabled}
          value={this.state.selectedCountry}
          params = {i}
          onChange={this.updateCountry}
          searchable={this.state.searchable}
        />
      );
    }
    console.log(this.state);
    return (
      <div>
        {sections}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  country: state.country,
  source: state.resource,
  news: state.news
});

export default connect (mapStateToProps)(StatesField);