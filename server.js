// create basic express server
const express = require('express');
const app = express();
const port = 3000;

// create a route for the app
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

// listen on port 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}   );
