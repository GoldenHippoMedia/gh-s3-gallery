import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/button';
import './page.css';
import mockData from '../../data/mockdata.json';
import SearchBar from '../searchBar/searchBar';
// set to false when creating build
const LOCAL = false;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      renderedImages: [],
      imageNameSearchInput: '',
      allImages: [],
      error: null, 

    }
    this.getUrlParams = this.getUrlParams.bind(this);
    this.searchText = this.searchText.bind(this);
    this.filterImages = this.filterImages.bind(this);
  }

  getUrlParams() {
    const bucketName = window.location.search;
    return bucketName;
  }

  filterImages() {
    let filteredImagesData = this.state.allImages.map(image => { return { src: image.src } })
      .filter(image => image.src.toLowerCase()
        .includes(this.state.imageNameSearchInput.toLowerCase()));
    this.setState({
      renderedImages: filteredImagesData,
    });
  }

  searchText(event) {
    this.setState({
      imageNameSearchInput: event.target.value},  
      () => this.filterImages()
    )
  }

 componentDidMount() {
   if (!LOCAL) {
    let bucketName = this.getUrlParams();
    fetch(`https://5p22w2mvsh.execute-api.us-west-2.amazonaws.com/api/images${bucketName}`)
    .then(results => {
      return results.json()
    })
    .then(responseImages => {
      this.setState({renderedImages: responseImages, isLoading: false, allImages: responseImages})
    })
   }
   else {
     this.setState({ renderedImages: mockData, isLoading: false, allImages: mockData});
   }
  }

  render() {
    let bucketName = this.getUrlParams();
    if (this.state.isLoading === false) {
        return (
        <div>
          <SearchBar searchphrase={this.searchText} expanded={this.state.imageNameSearchInput} />
          <div className="grid-container">
            {
              this.state.renderedImages.map(function (image, index) {
                const divStyle = {
                  backgroundImage: 'url(' + image.src + ')'
                }

                return (
                  <div className="grid-item" key={index} >
                    <div className="grid-item__image" style={divStyle} />
                      <span className="grid-item__image-name">{image.src.split('/').pop()}</span>
                      <Button imageURL={image.src} bucketName={bucketName} />
                  </div >
                )

              })
            }
          </div>
        </div>
        );
      }
      return (
        <div className="loader">
          <FontAwesomeIcon icon={faCircleNotch} spin/>
          <div className="loader__text">Loading...</div>
        </div>
      )
  }
}


export default Page;