const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(express.json());
app.use(cors());
const db = mysql.createPool({
    host:'localhost',
    user:'connexion',
    password:'pk1bEhzQyaD4QweD',
    database:'site_annonce',
});



app.get('/api/wilaya', (req, res) => {
    
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
    
        const query = 'SELECT nom_wilaya FROM wilaya';
    
        // Pass values as an array
        connection.query(query, (error, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error', details: error.message });
            } else {
    
                if (results.length > 0) {
                    // User with provided credentials exists
                    
                    res.json(results);
                } else {
                    // No user found with provided credentials
                    res.json( message= 'Invalid credentials');
                }
            }
        });
    });
})

app.post('/api/login', (req, res) => {
    
    const { email, password } = req.body;
    
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
    
        const query = 'SELECT * FROM compte WHERE email = ? AND pass_word = ?';
    
        // Pass values as an array
        connection.query(query, [email, password], (error, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error', details: error.message });
            } else {
                console.log(results)
                // Assuming results is an array of user data
                if (results.length > 0) {
                    // User with provided credentials exists
                    
                    res.json({ success: true, user: results[0] });
                } else {
                    // No user found with provided credentials
                    res.json({ success: false, message: 'Invalid credentials' });
                }
            }
        });
    });
});
app.post('/api/signup', (req, res) => {
    const { email, password, wilaya, nom, prenom, dateNaissance, genre } = req.body;

    const query1 = 'INSERT INTO COMPTE VALUES (?, ?, "client", NOW())';
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        connection.query(query1, [email, password], (error, results) => {
            // Release the connection back to the pool
            connection.release();

            if (error) {
                console.error('Error executing query1:', error);
                res.status(500).json({ error: 'Internal Server Error', details: error.message });
            } else {
               
                const query2 = 'INSERT INTO CLIENTS (EMAIL, ID_WILAYA, PASS_WORD, ROLE, DATE_DE_CREATION, NOM, PRENOM, DATE_DE_NAISSANCE, GENRE) VALUES (?, ?, ?, "client", NOW(), ?, ?,?, ?)';
                // Execute the second query after the first one
                connection.query(query2, [email, wilaya, password, nom, prenom, dateNaissance, genre], (error2, results2) => {
                    if (error2) {
                        console.error('Error executing query2:', error2);
                        res.status(500).json({ error: 'Internal Server Error', details: error2.message });
                    } else {
                       
                        res.json({ success: true });
                    }
                });
            }
        });
    });
});



 

app.listen(3001,()=>{
    console.log('rinning on port 3001')
});