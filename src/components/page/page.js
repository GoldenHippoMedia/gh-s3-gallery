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
      error: null
    }
    this.getUrlParams = this.getUrlParams.bind(this);
    this.searchText = this.searchText.bind(this);
  }

  getUrlParams() {
    const bucketName = window.location.search;
    return bucketName;
  }

  searchText(event) {
    this.setState({imageNameSearchInput: event.target.value})
  }

 componentDidMount() {
   if (!LOCAL) {
    let bucketName = this.getUrlParams();
    fetch(`https://5p22w2mvsh.execute-api.us-west-2.amazonaws.com/api/images${bucketName}`)
    .then(results => {
      return results.json()
    })
    .then(responseImages => {
      this.setState({images: responseImages, isLoading: false})
    })
   }
   else {
     this.setState({images: mockData, isLoading: false});
   }
  }

  render() {
    let bucketName = this.getUrlParams();
    if (this.state.isLoading === false) {
        return (
        <div>
          <SearchBar searchphrase={this.searchText}></SearchBar>
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