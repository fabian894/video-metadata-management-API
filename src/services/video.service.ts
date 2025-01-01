import { Video } from '../models/video.model';
import connection from '../db';

export class VideoService {
  static addVideo(video: Video): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO videos (title, description, duration, genre, tags) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [video.title, video.description, video.duration, video.genre, video.tags], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static updateVideo(id: number, video: Video): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE videos SET title = ?, description = ?, duration = ?, genre = ?, tags = ? WHERE id = ?';
      connection.query(query, [video.title, video.description, video.duration, video.genre, video.tags, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getVideos(filters: { genre?: string; tags?: string[] }): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM videos';
      const params: any[] = [];
      
      if (filters.genre || filters.tags) {
        query += ' WHERE';
        if (filters.genre) {
          query += ' genre = ?';
          params.push(filters.genre);
        }
        if (filters.tags) {
          if (filters.genre) query += ' AND';
          query += ' tags LIKE ?';
          params.push(`%${filters.tags.join('%')}%`);
        }
      }
      
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static deleteVideo(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM videos WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}
