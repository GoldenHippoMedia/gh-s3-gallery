import React, { Component } from 'react';
import './button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

class Button extends Component {

  copyURL = () => {
    console.log("URL copied");
    const searchParams = new URLSearchParams(this.props.bucketName);
    const bucketName = searchParams.get('bucket');
    const formattedUrl = `https://${bucketName}/images/${this.props.imageURL.split('/').pop()}`
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', formattedUrl);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  openNewWindow = () => {
    console.log('Open in new window');
    window.open(this.props.imageURL);
  }

  render() {
    return (
      <div className="actions">
        <div onClick={this.copyURL} className="actions_button">
          <FontAwesomeIcon icon={faClipboard} />
        </div>
        <div onClick={this.openNewWindow} className="actions_button">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
        </div>
      </div>
    );
  }
}

export default Button;