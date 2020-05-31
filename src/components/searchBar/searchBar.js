import React, { Component } from 'react';
import './searchBar.css';

class SearchBar extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="searchBar-container">
        <p>Search By Name</p>
        <input onChange={this.props.searchphrase}/>
      </div>
    );
  }
}

export default SearchBar;