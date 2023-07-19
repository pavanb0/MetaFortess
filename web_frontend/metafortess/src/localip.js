function getLocalIpAddress() {
    return new Promise((resolve, reject) => {
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
  
      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          resolve(pc.localDescription.sdp.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)[0]);
          pc.close();
        }
      };
  
      pc.createOffer().then((desc) => {
        pc.setLocalDescription(desc);
      }).catch(reject);
    });
  }
module.exports = {getLocalIpAddress};
  


