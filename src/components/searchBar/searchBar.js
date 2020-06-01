import React, { Component } from 'react';
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className={this.props.expanded ? 'search__filled' : 'search__empty'}>
        <div className="search__container">
          <div className="search">
            <input onChange={this.props.searchphrase} placeholder="Search" className="search__bar"/>
            <span className="search__button">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;