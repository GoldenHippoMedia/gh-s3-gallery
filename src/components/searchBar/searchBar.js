import React, { Component } from "react";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ expanded, searchphrase, resultsLength }) => {
  return (
    <div className={expanded ? "search__filled" : "search__empty"}>
      <div className="search__container">
        <div className="search">
          <input onChange={searchphrase} placeholder="Search" className="search__bar" />
          <span className="search__button">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>
      <p className="search__results">Results: {resultsLength}</p>
    </div>
  );
};

export default SearchBar;
