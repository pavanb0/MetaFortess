import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import PrimarySearchAppBar from './PrimarySearchAppBar';
import TemporaryDrawer from './TemporaryDrawer';
import { Button } from '@mui/material';
import VideoComponent from './VideoComponent';
import FileComponent from './FileComponent';

const localip = require('../localip');
const ip = localip.sysip;
const sessions = require('./sessions');



function Gallerys() {
  if (sessions.email === '' || sessions.password === '') {
    window.location.href = '/login';
  }
  const head = {
    'email': sessions.email,
    'password': sessions.password,
  }
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [videurl, setVideurl] = useState([]);
  const [fileurl, setFileurl] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [images, setImages] = React.useState(true);
  const [videos, setVideos] = React.useState(false);
  const [files, setFiles] = React.useState(false);



  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const [userName, setUserName] = useState('');
  useEffect(() => {
    // console.log(headers);
    axios.get(`http://${ip}:3030/gallary`, { headers: head })
      .then((res) => {
        // console.log(res);
        setUserName(res.data.name);
        sessions.user = res.data.name;
      }
      ).catch((err) => {
        console.log(err);

      });
  });
  // refresh api every 5 seconds

  useEffect(() => {
   if (images) {
    const fetchimg =()=>{
    axios.get(`http://${ip}:3030/images`, { headers: head })
      .then((res) => {
        setPhotos(res.data);
      }
      ).catch((err) => {
        console.log(err);
      });
    }
    fetchimg();
    const interval = setInterval(() => {
      fetchimg();
    }
      , 5000);
    return () => clearInterval(interval);}
    else if(videos){
      const fetchvid =()=>{
        axios.get(`http://${ip}:3030/videos`, { headers: head })
          .then((res) => {
            setVideurl(res.data);
          }
          ).catch((err) => {
            console.log(err);
          });
        }
        fetchvid();
        const interval = setInterval(() => {
          fetchvid();
        }
          , 5000);
        return () => clearInterval(interval);
    }
    else if(files){
      const fetchfile =()=>{
        axios.get(`http://${ip}:3030/files`, { headers: head })
          .then((res) => {
            setFileurl(res.data);
          }
          ).catch((err) => {
            console.log(err);
          });
        }
        fetchfile();
        const interval = setInterval(() => {
          fetchfile();
        }
          , 5000);
        return () => clearInterval(interval);
    }


  }, []);
 
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
    <div >
      <PrimarySearchAppBar 
      setImage={setImages}
      setVideo={setVideos}
      setFile={setFiles}
      />
      {images?
      (<Gallery photos={photos} onClick={openLightbox} />
      ):null}
      {videos ? (
        <div>
          {videurl.map((src, index) => (
            <VideoComponent key={index} videoUrl={src} />
          ))}
        </div>
      ) : null}
      {files ? (
        <div>
          {fileurl.map((src, index) => (
            <FileComponent key={index} fileUrl={src} />
          ))}
        </div>
      ) : null}

      
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
     
    </div>

    </>

  );
}

export default Gallerys;
