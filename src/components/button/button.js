import React, { Component } from 'react';
import './button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

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
      <div onClick={this.clickedMe} className="image_button">
        <FontAwesomeIcon icon={faClipboard} />
        <span className="image_button_copy">Copy URL</span>
      </div>
    );
  }
}

export default Button;