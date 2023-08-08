const axios = require('axios')
const headers = { 'email': 'google@google.com', 'password': 'google','url':'http://192.168.0.104:3030/google@google.com/files/arduinoWebSockets-master.zip' }
axios.get('http://192.168.0.104:3030/delete', { headers: headers })
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.log(error)
})
