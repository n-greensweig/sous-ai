// server.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet'); // For security enhancements
require('dotenv').config();

const app = express();

// Import custom middleware and strategies
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// **1. Security Middleware**
app.use(helmet());

// **2. Compression Middleware**
app.use(compression());

// **3. CORS Middleware**
app.use(cors());

// **4. Body Parser Middleware**
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// **5. Passport Session Configuration**
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// **6. Serve Static Assets with Caching Headers**
// Serve static files from the 'public' directory with caching
app.use(
  express.static(path.join(__dirname, '..', 'public'), {
    maxAge: '1y', // Cache for 1 year
    immutable: true, // Assets will not change during the next year
    index: false, // Prevent serving index.html automatically
  })
);

// Serve static files from the project root for 'serviceworker.js' and 'app.webmanifest'
app.use(
  express.static(path.join(__dirname, '..'), {
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('app.webmanifest')) {
        res.setHeader('Content-Type', 'application/manifest+json');
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate'); // Manifest may update
      }
      if (filePath.endsWith('serviceworker.js')) {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-cache'); // Service workers update frequently
      }
    },
  })
);

// **7. API Routes**
// Import and use API routers
const userRouter = require('./routes/user.router');
const recipeRouter = require('./routes/recipe.router');
const openaiRouter = require('./routes/openai.router');
const imageRouter = require('./routes/image.router');

app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/completions', openaiRouter);
app.use('/api/photos', imageRouter);

// **8. Fallback Route to Serve index.html for Client-Side Routing**
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// **9. Start the Server**
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
