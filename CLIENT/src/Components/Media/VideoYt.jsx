import React from "react";


const VideoYt = () => (
  <div className="video-yt-container">
    <iframe
      className="video-yt"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/cpBNIcBSS6k?si=-dPTCIw5TR_o9ixh" 
      title="Explication optimisation de CV" 
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);

export default VideoYt;
