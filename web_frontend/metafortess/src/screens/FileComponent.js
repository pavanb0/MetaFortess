import React from 'react';

const FileComponent = ({ fileUrl }) => {
  return (
    <div>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
    </div>
  );
};

export default FileComponent;
