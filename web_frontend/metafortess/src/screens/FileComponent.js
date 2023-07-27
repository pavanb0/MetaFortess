import React from 'react';
import { Typography, Link } from '@mui/material';
const FileComponent = ({ fileUrl,fileName }) => {

const downloadFile = () => {
    fetch(fileUrl)
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();
        });
      })
      .catch(err => console.log(err));
}

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <Typography variant="h6" component="div" gutterBottom style={{ marginRight: '10px' }}>
        {fileName}
      </Typography>
      <Link href={fileUrl} download onClick={downloadFile} style={{ color: '#1976d2' }}>
        Download
      </Link>
    </div>
  );
};

export default FileComponent;
