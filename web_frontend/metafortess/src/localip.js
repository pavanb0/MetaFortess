// function getLocalIpAddress() {
//     return new Promise((resolve, reject) => {
//       const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
//       const pc = new RTCPeerConnection({ iceServers: [] });
//       pc.createDataChannel('');
  
//       pc.onicecandidate = (e) => {
//         if (!e.candidate) {
//           resolve(pc.localDescription.sdp.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)[0]);
//           pc.close();
//         }
//       };
  
//       pc.createOffer().then((desc) => {
//         pc.setLocalDescription(desc);
//       }).catch(reject);
//     });
//   }
// import ecex from 'child_process';

// function getLocalIpAddressFromProcess() {
//     let localIp = null;
//     exec('ipconfig', (err, stdout, stderr) => {
//         if (err) {
//           console.error('Error retrieving local IP address:', err);
//           return;
//         }
      
//         const localIpRegex = /IPv4 Address[.\s]+: ([\d.]+)/;
//         const match = stdout.match(localIpRegex);
//         localIp = match ? match[1] : null;
//     })      
//     return localIp;

// }

const sysip = '192.168.0.104'
module.exports = {sysip};
  


