// create basic express server
const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Meta.db')
// add json middleware
app.use(express.json());
// send database to client
app.get('/api', (req, res) => {
    db.all('SELECT * FROM Meta', (err, rows) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(rows);
        }
    })
});

// add new data to database
app.post('/api', (req, res) => {
    const data = req.body;
    db.run(`INSERT INTO Meta (username, email, password) VALUES (?, ?, ?)`, [data.username, data.email, data.password], (err) => {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
               console.log('Username already exists')
                res.status(409).send('Username already exists');
            }else{
            console.log(err);
            res.sendStatus(500);
            }
        } else {
            res.sendStatus(200);
        }
    })
}
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));