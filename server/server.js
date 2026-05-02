import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const api = express();
const port = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

api.use(cors());
api.use(morgan('dev'));
api.use(express.json());

// Serve the uploads folder so the frontend can access the images
api.use('/uploads', express.static('uploads'));

// In-memory dummy database for posts
let posts = [
  {
    id: 1,
    photoUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Cute cat! 🐱"
  },
  {
    id: 2,
    photoUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Just another day out in nature... 🌿"
  }
];

// READ: View feed
api.get('/api/posts', (req, res) => {
  // Return reversed to show newest first
  res.json([...posts].reverse());
});

// CREATE: Post a photo (now accepts multipart form data with a 'photo' file)
api.post('/api/posts', upload.single('photo'), (req, res) => {
  let photoUrl = '';
  
  // If a file was uploaded, construct its URL
  if (req.file) {
    photoUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  } else if (req.body.photoUrl) {
    // Fallback if they passed a URL string instead
    photoUrl = req.body.photoUrl;
  } else {
    return res.status(400).json({ message: "No image provided" });
  }

  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    photoUrl: photoUrl,
    caption: req.body.caption || ''
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE: Edit caption
api.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[postIndex].caption = req.body.caption;
  res.json(posts[postIndex]);
});

// DELETE: Remove post
api.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(postIndex, 1);
  res.json({ message: "Post deleted" });
});

api.listen(port, () => {
  console.log(`Social Media API running at http://localhost:${port}`);
});