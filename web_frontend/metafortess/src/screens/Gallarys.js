import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import PrimarySearchAppBar from './PrimarySearchAppBar';
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
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div >
      <PrimarySearchAppBar />
      <Gallery photos={photos} onClick={openLightbox} />
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
