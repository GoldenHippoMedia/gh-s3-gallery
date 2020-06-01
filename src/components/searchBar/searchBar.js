import React, { Component } from 'react';
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="search__container grid-container">
        <div className="search grid-item">
          <input onChange={this.props.searchphrase} placeholder="Search" className="search__bar"/>
          <span className="search__button">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBar;