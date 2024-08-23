const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const recipeRouter = require('./routes/recipe.router');
const openaiRouter = require('./routes/openai.router');
const imageRouter = require('./routes/image.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/completions', openaiRouter);
app.use('/photos', imageRouter);

// Serve static files
app.use(express.static('build'));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
