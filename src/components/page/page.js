import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import "./page.css";
import mockData from "../../data/mockdata.json";
import SearchBar from "../searchBar/searchBar";

// set to false when creating build
const LOCAL = process.env.NODE_ENV !== "production" ? true : false;

const Page = () => {
  const [isLoading, setLoading] = useState(true);
  const [renderedImages, setRenderedImages] = useState([]);
  const [imageNameSearchInput, setImageNameSearchInput] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [bucketName, setBucketName] = useState("");
  const [error, setError] = useState(null);

  function getUrlParams() {
    const bucketName = window.location.search;
    return bucketName;
  }

  function filterImages() {
    if (imageNameSearchInput.length < 1) {
      setRenderedImages(allImages);
    }
    let filteredImagesData = allImages
      .map(image => {
        return { src: image.src };
      })
      .filter(image => image.src.toLowerCase().includes(imageNameSearchInput.toLowerCase()));
    setRenderedImages(filteredImagesData);
  }

  function handleSearch(event) {
    setImageNameSearchInput(event.currentTarget.value);
    filterImages();
  }

  useEffect(() => {
    // Update the document title using the browser API
    if (!LOCAL) {
      let bucketName = getUrlParams();
      fetch(`https://5p22w2mvsh.execute-api.us-west-2.amazonaws.com/api/images${bucketName}`)
        .then(results => {
          return results.json();
        })
        .then(responseImages => {
          setRenderedImages(responseImages);
          setLoading(false);
          setAllImages(responseImages);
        });
    } else {
      setRenderedImages(mockData);
      setLoading(false);
      setAllImages(mockData);
    }
  }, [isLoading]);

  if (!isLoading) {
    return (
      <>
        <SearchBar searchphrase={handleSearch} expanded={imageNameSearchInput} />
        <p>Results: {renderedImages.length}</p>
        <div className="grid-container">
          {renderedImages.map(function (image, index) {
            const divStyle = {
              backgroundImage: "url(" + image.src + ")"
            };

            return (
              <div className="grid-item" key={index}>
                <div className="grid-item__image" style={divStyle} />
                <span className="grid-item__image-name">{image.src.split("/").pop()}</span>
                <Button imageURL={image.src} bucketName={bucketName} />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div className="loader">
        <FontAwesomeIcon icon={faCircleNotch} spin />
        <div className="loader__text">Loading...</div>
      </div>
    );
  }
};

export default Page;
