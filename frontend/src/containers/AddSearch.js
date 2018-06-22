import React from 'react';
import { connect } from 'react-redux';
import { addSearch, changeKeyword } from '../actions/indexAction';


const AddSearch = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(changeKeyword(input.value));
        dispatch(addSearch(input.value));
        input.value = '';
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Search
        </button>
      </form>
    </div>
  );
};

export default connect()(AddSearch);
