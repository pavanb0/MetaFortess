import React from 'react';

const VideoComponent = ({ videoUrl }) => {
  return (
    <video width="400" controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
