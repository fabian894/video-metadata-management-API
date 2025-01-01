import express, { Request, Response } from 'express';
import connection from './db';
import videoRoutes from './routes/video.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());  // For parsing JSON bodies

// Routes
app.use('/api', videoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Video Metadata Management API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
    } else {
      console.log('MySQL connection is working.');
    }
  });
});
