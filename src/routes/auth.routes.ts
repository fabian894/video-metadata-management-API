import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();

// Register endpoint
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = AuthService.register(username, password);
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const token = AuthService.login(username, password);
    if (!token) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

export default router;
