const os = require('os');
    function getIpAddress() {
        const networkInterfaces = os.networkInterfaces();

        // Iterate over all network interfaces to find the one used for LAN
        for (const interfaceName in networkInterfaces) {
          const interfaces = networkInterfaces[interfaceName];
      
          for (const interface of interfaces) {
            // Check if the interface is IPv4 and not internal (e.g., loopback)
            if (interface.family === 'IPv4' && !interface.internal) {
              return interface.address;
            }
          }
        }
      
        // If no suitable interface is found, return undefined or an appropriate fallback value
        return undefined;
    }
module.exports = {getIpAddress};