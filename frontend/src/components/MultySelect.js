import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';

const STATES = require('../data/states');

class StatesField extends Component {

  constructor (props) {
    super(props);

    this.clearValue = this.clearValue.bind(this);
    this.switchSource = this.switchSource.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);

    this.state = {
      label: 'States:',
      source: 'country',
      disabled: false,
      searchable: this.props.searchable,
      selectValue: 'new-south-wales',
      clearable: true,
      rtl: false,
    };
  }

  clearValue (e) {
    this.select.setInputValue('');
  }
  switchSource (e) {
    // var newCountry = e.target.value;
    this.setState({
      source: e.target.value,
      selectValue: null,
    });
    console.log( e.target.value);
  }
  updateValue (newValue) {
    this.setState({
      selectValue: newValue,
    });
  }
  focusStateSelect () {
    this.select.focus();
  }
  toggleCheckbox (e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState(newState);
  }
  render () {
    console.log(this.props);
    var options = [];
    if(this.state.source === 'resource'){
      for (let item in this.props.country){
        options.push({value: this.props.source[item], label: this.props.source[item], className: this.props.source[item]});
      }
    }else{
      for (let item in this.props.source){
        options.push({value: this.props.country[item], label: this.props.country[item], className: this.props.country[item]});
      }
    }
    return (
      <div className="section">
        <Select
          id="state-select"
          ref={(ref) => { this.select = ref; }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus
          options={options}
          simpleValue
          clearable={this.state.clearable}
          name="selected-state"
          disabled={this.state.disabled}
          value={this.state.selectValue}
          onChange={this.updateValue}
          rtl={this.state.rtl}
          searchable={this.state.searchable}
        />
        <div className="checkbox-list">
          <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={this.state.source === 'resource'} value="resource" onChange={this.switchSource}/>
            <span className="checkbox-label">Get News by resource</span>
          </label>
          <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={this.state.source === 'country'} value="country" onChange={this.switchSource}/>
            <span className="checkbox-label">Get News by country</span>
          </label>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  country: state.country,
  source: state.resource,
});

export default connect (mapStateToProps)(StatesField);

/* <div className="checkbox-list">
          <label className="checkbox">
            <input type="checkbox" className="checkbox-control" name="searchable" checked={this.state.searchable} onChange={this.toggleCheckbox}/>
            <span className="checkbox-label">Searchable</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" className="checkbox-control" name="disabled" checked={this.state.disabled} onChange={this.toggleCheckbox}/>
            <span className="checkbox-label">Disabled</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" className="checkbox-control" name="clearable" checked={this.state.clearable} onChange={this.toggleCheckbox}/>
            <span className="checkbox-label">Clearable</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" className="checkbox-control" name="rtl" checked={this.state.rtl} onChange={this.toggleCheckbox}/>
            <span className="checkbox-label">rtl</span>
          </label>
        </div>*/