import React, { Component } from 'react';

class Button extends Component {

  clickedMe = () => {
    const searchParams = new URLSearchParams(this.props.bucketName);
    const bucketName = searchParams.get('bucket');
    const text = `https://${bucketName}/images/${this.props.imageURL.split('/').pop()}`
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
  
  render() {
    return (
      <button onClick={this.clickedMe}>
        Copy URL
      </button>
    );
  }
}

export default Button;