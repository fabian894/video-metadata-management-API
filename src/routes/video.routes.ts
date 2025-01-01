import { Router } from 'express';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video.model';

const router = Router();

// Add a new video
router.post('/videos', async (req, res) => {
  const { title, description, duration, genre, tags }: Video = req.body;
  try {
    const result = await VideoService.addVideo({ title, description, duration, genre, tags });
    res.status(201).json({ message: 'Video added successfully', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Error adding video', error: err });
  }
});

// Update video metadata
router.put('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, genre, tags }: Video = req.body;
  try {
    const result = await VideoService.updateVideo(parseInt(id), { title, description, duration, genre, tags });
    res.status(200).json({ message: 'Video updated successfully', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating video', error: err });
  }
});

// Get video metadata with optional filters (genre, tags)
router.get('/videos', async (req, res) => {
  const { genre, tags }: { genre?: string, tags?: string[] } = req.query;
  try {
    const filters = { genre, tags };
    const result = await VideoService.getVideos(filters);
    res.status(200).json({ message: 'Videos fetched successfully', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err });
  }
});

// Delete a video
router.delete('/videos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await VideoService.deleteVideo(parseInt(id));
    res.status(200).json({ message: 'Video deleted successfully', data: result });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video', error: err });
  }
});

export default router;
