const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory storage for comments
const comments = [];

// POST endpoint to add a new comment
app.post('/api/comments', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text field is required' });
  }

  const newComment = {
    id: comments.length + 1,
    text,
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  res.status(201).json(newComment);
});

// GET endpoint to retrieve all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// Vercel requires us to export the Express app
module.exports = app;

// Only listen if we're running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}