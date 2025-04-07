const express = require('express');
const cors = require('cors');
const MultimediaRouter = require('./controllers/multimedias.controller');
const TagsRouter = require('./controllers/tags.controller');
const EventsRouter = require('./controllers/events.controller');
const ThemesRouter = require('./controllers/themes.controller');
const MultimediaTypesRouter = require('./controllers/multimediaTypes.controller');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();
const path = require('path');

// Handle cors a lo maldita sea
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/multimedias', MultimediaRouter);
app.use('/tags', TagsRouter);
app.use('/events', EventsRouter);
app.use('/themes', ThemesRouter);
app.use('/multimedia-types', MultimediaTypesRouter);


app.listen(port, () => {
    console.log('Server is running on port:' + port);
});

