import React from 'react';
import Button from '../button/button';
import './page.css';
import mockData from '../../data/mockdata.json';
// set to false when creating build
const LOCAL = true;



class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: [],
      error: null
    }
    this.getUrlParams = this.getUrlParams.bind(this);
  }

  getUrlParams() {
    const bucketName = window.location.search;
    return bucketName;
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
        return (<div className="grid-container">
          {
            this.state.images.map(function (image, index) {
              const divStyle = {
                backgroundImage: 'url(' + image.src + ')'
              }

              return (
                <div className="grid-item" key={index} >
                  <div className="grid-item__image" style={divStyle} />
                    <div className="bigDiv">
                      <div style={divStyle} />
                        <span>{image.src.split('/').pop()}</span>
                        <Button imageURL={image.src} bucketName={bucketName}/> 
                      </div>
                </div >
              )

            })
          }
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