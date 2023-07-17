const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const logs = require('./logs');
const crypto = require('crypto'); 
const {v4: uuidv4} = require('uuid');
const sessions=()=>{
    const session = crypto.randomBytes(32).toString('hex');
    return session;
}

const app = express();
const port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
  
const db = new sqlite3.Database('./Meta.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Meta database.');
    logs.addlogs('Connected to the Meta database.');
});


// create table sessions (email text, session text);

app.get('/alldata', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.log(err);
            logs.addlogs(err);
            res.sendStatus(500);
        } else {
            res.send(rows);
            logs.addlogs("All data sent to client");
        }
    }
    )

});

app.get('/sendotp',(req,res)=>{
    const {email} = req.body;
    // generate otp 4 digit
    console.log(email);
    const otp = uuidv4().slice(0,4);
    setTimeout(()=>{
    res.status(200).json({message:"OTP sent successfully"});
    },1000)
})



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // checking if the email exists in the database
    db.get( 'SELECT * FROM users WHERE email = ?', email,(err,row)=>{
        err ? console.log(err) : console.log(row)
        if (err) {
            console.error('Error querying database:', err.message);
            logs.addlogs('Error querying database:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!row) {
            // Email doesn't exist
            logs.addlogs('Email does not exist');
            return res.status(401).json({ error: 'Incorrect email or password' });
            
        }
        // Email exists
        // Compare the password given by the user and the password in the database
        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err.message);
                logs.addlogs('Error comparing passwords:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (!result) {
                // Passwords don't match
                logs.addlogs('Passwords do not match');
                return res.status(401).json({ error: 'Incorrect email or password' });
            }
            // Passwords match
            // Create a new session for the user
            const session = sessions();
            db.run('INSERT INTO sessions (email, session) VALUES (?, ?)', [email, session], (err) => {
                if (err) {
                    console.error('Error creating session:', err.message);
                    logs.addlogs('Error creating session:', err.message);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // Send the session back to the user in a cookie
                res.cookie('session', session, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 3600000*24 // 24 hour
                });
                logs.addlogs('User logged in successfully');
                return res.status(200).json({ message: 'User logged in successfully' });
            });
        });

    })

});

app.get('/logout', (req, res) => {
    const { session } = req.cookies;
    // Delete the session from the database
    db.run('DELETE FROM sessions WHERE session = ?', session, (err) => {
        if (err) {
            console.error('Error deleting session:', err.message);
            logs.addlogs('Error deleting session:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Remove the session cookie
        res.clearCookie('session');
        logs.addlogs('User logged out successfully');
        return res.status(200).json({ message: 'User logged out successfully' });
    });
});





// POST /signup
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if the email already exists in the database
    db.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
      if (err) {
        console.error('Error querying database:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
        logs.addlogs('Error querying database:', err.message);
    }
  
      if (row) {
        // Email already exists
        return res.status(409).json({ error: 'Email already registered' });
      }
  
      // Encrypt the password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
            logs.addlogs('Error hashing password:', err.message);
        }
  
          // Insert the new user into the database
          db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hash],
            (err) => {
              if (err) {
                console.error('Error inserting user:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
                logs.addlogs('Error inserting user:', err.message);
            }
                logs.addlogs('User registered successfully'+name);
              return res.status(201).json({ message: 'User registered successfully' });
            }
          );
        });
      });
    });
  });
  

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });























// // create basic express server
// const express = require('express');
// const app = express();
// const port = 3030;
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./Meta.db')
// const path = require('path')
// // add json middleware
// app.use(express.json());
// // send database to client

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'screens','home.html'))
// })

// app.get('/login',(req,res)=>{
//     res.sendFile(path.join(__dirname,'screens','login.html'))
// })
// app.get('/signup',(req,res)=>{
//     res.sendFile(path.join(__dirname,'screens','signup.html'))
// })

// app.get('/getstarted',(req,res)=>{
//     res.sendFile(path.join(__dirname,'screens','getstart.html'))
// })

// app.get('/api', (req, res) => {
//     db.all('SELECT * FROM Meta', (err, rows) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500);
//         } else {
//             res.send(rows);
//         }
//     })
 
// });


// // add new data to database
// app.post('/api', (req, res) => {
//     const data = req.body;
//     db.run(`INSERT INTO Meta (username, email, password) VALUES (?, ?, ?)`, [data.username, data.email, data.password], (err) => {
//         if (err) {
//             if (err.message.includes('UNIQUE constraint failed')) {
//                console.log('Username already exists')
//                 res.status(409).send('Username already exists');
//             }else{
//             console.log(err);
//             res.sendStatus(500);
//             }
//         } else {
//             res.sendStatus(200);
//         }
//     })
// }
// );
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));