import React from 'react';
import Button from '../button/button';
import './page.css';
import mockData from '../../data/mockdata.json';
import SearchBar from '../searchBar/searchBar';
// set to false when creating build
const LOCAL = true;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: [],
      imageNameSearchInput: '',
      originalImageData: [],
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
    let filteredImagesData = this.state.originalImageData.map(image => { return { src: image.src } })
      .filter(image => image.src.toLowerCase()
        .includes(this.state.imageNameSearchInput.toLowerCase()));
    this.setState({
      images: filteredImagesData,
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
      this.setState({images: responseImages, isLoading: false, originalImageData: responseImages})
    })
   }
   else {
     this.setState({ images: mockData, isLoading: false, originalImageData: mockData});
   }
  }

  render() {
    let bucketName = this.getUrlParams();
    if (this.state.isLoading === false) {
        return (
        <div>
          <SearchBar searchphrase={this.searchText} expanded={this.state.imageNameSearchInput}></SearchBar>
          <div className="grid-container">
            {
              this.state.images.map(function (image, index) {
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
        <div>
          Loading...
        </div>
      )
  }
}


export default Page;