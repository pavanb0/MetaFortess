const fs = require('fs');
// get current time
const now = new Date();

// create log file



function addlogs(logs){
    text = logs + " " + now.toString() + "\n"

    fs.appendFile('logs.txt', text, function (err) {
        if (err) throw err;
        console.log('logs registerd!');
      }
    );


}

module.exports = {addlogs}