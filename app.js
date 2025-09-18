const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory posts array (no persistence)
let posts = [];

// Homepage
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Create new post
app.post('/posts', (req, res) => {
  const { author, title, content } = req.body;
  posts.push
  ({
    id: Date.now().toString(),
    author,
    title,
    content,
    createdAt: new Date().toLocaleString()
  });
  res.redirect('/');
});

// Display edit form
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render('edit', { post });
});

// Update post
app.post('/posts/:id/update', (req, res) => {
  const { author, title, content } = req.body;
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex >= 0) 
    {
    posts[postIndex] = {
      ...posts[postIndex],
      author,
      title,
      content,
      createdAt: new Date().toLocaleString()
    };
  }
  res.redirect('/');
});

// Delete post
app.post('/posts/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

