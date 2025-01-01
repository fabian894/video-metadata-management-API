import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',  // Or your database host
  user: 'root',       // Replace with your MySQL username
  password: '123456',       // Replace with your MySQL password
  database: 'video_metadata',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default connection;
