const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Route includes
const userRouter = require('./routes/user.router');
const recipeRouter = require('./routes/recipe.router');
const openaiRouter = require('./routes/openai.router');
const imageRouter = require('./routes/image.router');

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/completions', openaiRouter);
app.use('/api/photos', imageRouter);

// Serve static files with cache-control headers
app.use(express.static('build', {
  maxAge: '1y',
  etag: false
}));

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
