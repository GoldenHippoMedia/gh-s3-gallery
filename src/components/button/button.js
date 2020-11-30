import React, { Component } from "react";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const Button = ({ imageURL, bucketName }) => {
  function getCDNfromURL(url) {
    const params = new URLSearchParams(document.location.search).get("region");
    const region = params ? params.region : "us-west-2";
    const newURL = url.replace(`s3-${region}.amazonaws.com/`, "");
    return newURL;
  }
  function copyURL() {
    const formattedUrl = getCDNfromURL(imageURL);
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", formattedUrl);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    console.log(`URL copied: ${formattedUrl}`);
  }
  return (
    <div className="actions">
      <div onClick={copyURL} className="actions_button">
        <FontAwesomeIcon icon={faClipboard} />
      </div>
      <a href={imageURL} className="actions_button" target="_blank">
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>
    </div>
  );
};

export default Button;
