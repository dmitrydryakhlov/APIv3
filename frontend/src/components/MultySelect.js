import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { searchNews } from '../actions/indexAction';


class StatesField extends Component {

  constructor(props) {
    super(props);

    this.clearValue = this.clearValue.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateResource = this.updateResource.bind(this);

    const country = (name, shortName) => ({ name, shortName });
    const ListOfCountries = [
      country('Россия', 'ru'),
      country('Italy', 'it'),
      country('France', 'fr'),
      country('United Kingdom', 'gb'),
      country('United States', 'us'),
    ];

    const resource = (name, id) => ({ name, id });
    const ListOfResource = [
      resource('Football Italia', 'football-italia'),
      resource('BBC News', 'bbc-news'),
      resource('BBC Sport', 'bbc-sport'),
      resource('Business Insider (UK)', 'business-insider-uk'),
      resource('Metro', 'metro'),
    ];

    this.state = {
      news: [],
      resources: ListOfResource,
      countries: ListOfCountries,
      disabled: false,
      searchable: this.props.searchable,
      selectedCountry: null,
      selectedResource: null,
      clearable: true,
    };
  }

  clearValue() {
    this.select.setInputValue('');
  }

  updateCountry(country) {
    this.setState({
      selectedCountry: country,
      selectedResource: undefined,
    });
    this.searchNews(country, undefined);
  }

  updateResource(resource) {
    this.setState({
      selectedResource: resource,
      selectedCountry: undefined,
    });
    this.searchNews(undefined, resource);
  }

  searchNews(selectedCountry, selectedResource) {
    if (selectedCountry) {
      const data = JSON.stringify({
        type: 'country',
        selectedCountry: selectedCountry,
        selectedResource: selectedResource
      });
      this.props.searchNews('country', data);
    } else if (selectedResource) {
      const data = JSON.stringify({
        type: 'resource',
        selectedCountry: selectedCountry,
        selectedResource: selectedResource
      });
      this.props.searchNews('resource', data);
    }
  }

  focusStateSelect() {
    this.select.focus();
  }

  render() {
    let options = [];
    for (let i = 0; i < 2; i++) {
      options[i] = [];
    }
    if (this.state.countries.length !== 0) {
      for (let item in this.state.countries) {
        options[0].push({ value: this.state.countries[item].shortName, label: this.state.countries[item].name, className: this.state.countries[item].name });
      }
    }
    if (this.state.resources.length !== 0) {
      for (let item in this.state.resources) {
        options[1].push({ value: this.state.resources[item].id, label: this.state.resources[item].name, className: this.state.resources[item].name });
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
  searchNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatesField);